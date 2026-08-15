#!/usr/bin/env node
/**
 * Served-HTML content check.
 *
 * Fetches each route's raw HTML, with no browser and no JavaScript, and asserts
 * that the copy which defines the page is actually in it.
 *
 * This exists because of a defect that no amount of looking at the site in a
 * browser would have found. CountUp initialised its state to zero, so every
 * result figure on the homepage was the string "0" in the server-rendered HTML.
 * The page looked perfect and served a crawler a set of zero per cent
 * improvements, on the one page whose entire job is credibility.
 *
 * Spec 4.5: "Server-side render or pre-render the content. If the copy only
 * appears after JavaScript runs, it is working against you."
 *
 * A plain fetch is the right tool. Using a browser would run the JavaScript and
 * hide exactly the failure being tested for.
 *
 * Usage:
 *   node scripts/check-content.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000";

/**
 * Each route names the copy that must survive without JavaScript: the headline,
 * any figure that is itself the content, and the primary call to action.
 */
const EXPECTATIONS = [
  {
    route: "/",
    must: [
      "The consultancy that actually executes",
      "Most consultants recommend the fix. We build it.",
      "Find out what is holding your business back",
      "This is what our team has delivered",
      // The results figures. These were all "0" before the CountUp fix.
      ">53<",
      ">62<",
      ">16<",
      ">27<",
      ">67<",
      "What do we actually do",
      "From AED 15,000",
      "Trusted by businesses across insurance",
    ],
  },
  { route: "/services", must: ["What do we actually do", "From AED 15,000", "Operational Clarity Audit"] },
  { route: "/services/operational-clarity-audit", must: ["Operational Clarity Audit", "From AED 15,000"] },
  { route: "/services/fractional-coo", must: ["Fractional Leadership", 'id="coo"', 'id="chief-of-staff"', 'id="cfo"'] },
  { route: "/services/build-and-place", must: ["Build and Place"] },
  { route: "/services/technology-builds", must: ["Technology Builds"] },
  { route: "/services/uae-market-entry", must: ["UAE Market Entry"] },
  { route: "/services/how-we-work", must: ["How we"] },
  { route: "/about", must: ['id="team"', 'id="case-studies"', "How we staff an engagement"] },
  { route: "/for-founders", must: ["You"] },
  { route: "/contact", must: ["conversation"] },
  { route: "/privacy", must: ["Privacy policy", "What we collect"] },
];

/**
 * Copy that must NOT appear, because it belongs to a gated phase. Catches the
 * opposite failure: shipping something the flag was meant to hide.
 */
const FORBIDDEN = [
  { route: "/", never: ["four-minute assessment", "Start with the diagnostic"], why: "diagnostic is gated" },
];

/** Strips tags so a phrase split across elements still matches. */
const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");

async function main() {
  const failures = [];
  let assertions = 0;

  for (const { route, must } of EXPECTATIONS) {
    let html;
    try {
      const res = await fetch(`${BASE}${route}`);
      if (!res.ok) {
        failures.push({ route, kind: "status", detail: res.status });
        continue;
      }
      html = await res.text();
    } catch (err) {
      failures.push({ route, kind: "unreachable", detail: err.message });
      continue;
    }

    const text = textOf(html);
    for (const phrase of must) {
      assertions += 1;
      // Attribute assertions are checked against raw HTML, copy against text.
      const haystack = phrase.startsWith("id=") || phrase.startsWith(">") ? html : text;
      if (!haystack.includes(phrase)) {
        failures.push({ route, kind: "missing", detail: phrase });
      }
    }
  }

  for (const { route, never, why } of FORBIDDEN) {
    const res = await fetch(`${BASE}${route}`).catch(() => null);
    if (!res || !res.ok) continue;
    const text = textOf(await res.text());
    for (const phrase of never) {
      assertions += 1;
      if (text.includes(phrase)) {
        failures.push({ route, kind: "leaked", detail: phrase, why });
      }
    }
  }

  if (failures.length === 0) {
    console.log(`content-check: clean (${assertions} assertions with JavaScript off)`);
    return;
  }

  for (const f of failures) {
    if (f.kind === "missing") {
      console.error(`${f.route}  missing from the server-rendered HTML: ${JSON.stringify(f.detail)}`);
      console.error("  this copy only exists after JavaScript runs, which spec 4.5 rules out.");
      console.error("  usually state initialised to a blank or zero value rather than the real content.");
    } else if (f.kind === "leaked") {
      console.error(`${f.route}  should not be present: ${JSON.stringify(f.detail)} (${f.why})`);
    } else if (f.kind === "status") {
      console.error(`${f.route}  returned ${f.detail}`);
    } else {
      console.error(`${f.route}  unreachable: ${f.detail}. Is the server running at ${BASE}?`);
    }
  }

  console.error(`\ncontent-check: ${failures.length} problem${failures.length === 1 ? "" : "s"}.`);
  process.exit(1);
}

main();
