#!/usr/bin/env node
/**
 * Walks the site the way a visitor does.
 *
 * Starts at the homepage, follows every internal link and call to action it
 * finds, and keeps going until there is nothing new. For each destination it
 * checks that the route resolves, that a redirect ends somewhere real, and that
 * a fragment link has a matching element on the page it lands on.
 *
 * Everything else on this branch checks a page in isolation: the routes resolve,
 * the redirects fire, the copy is present. Nothing walks the graph. A link
 * pointing at a route that exists but is the wrong one, or a fragment whose
 * target was renamed, passes every other check and fails for a visitor on the
 * first click.
 *
 *   node scripts/check-links.mjs [baseUrl]
 */

const BASE = (process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Anchors, plus the form actions, since a form target is a link a visitor uses. */
const HREF = /<a\b[^>]*?href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
const FORM_ACTION = /<form\b[^>]*?action="([^"]+)"/gi;

const strip = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const isInternal = (href) =>
  href.startsWith("/") || href.startsWith("#") || href.startsWith(BASE);

async function main() {
  const pages = new Map(); // path -> html
  const problems = [];
  const queue = ["/"];
  const seen = new Set(["/"]);
  /** every link we followed, for the summary */
  let followed = 0;

  const fetchPath = async (path) => {
    if (pages.has(path)) return pages.get(path);
    const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
    const html = res.ok ? await res.text() : "";
    pages.set(path, { status: res.status, url: res.url, html });
    return pages.get(path);
  };

  while (queue.length) {
    const path = queue.shift();
    const page = await fetchPath(path);

    if (page.status >= 400) {
      problems.push({ from: "(entry)", href: path, why: `page returned ${page.status}` });
      continue;
    }

    const links = [];
    for (const m of page.html.matchAll(HREF)) links.push({ href: m[1], label: strip(m[2]) });
    for (const m of page.html.matchAll(FORM_ACTION)) links.push({ href: m[1], label: "(form action)" });

    for (const { href, label } of links) {
      if (!isInternal(href)) continue;
      followed += 1;

      const [rawPath, fragment] = href.replace(BASE, "").split("#");
      const target = rawPath === "" ? path : rawPath;

      // A form action is a POST endpoint. Fetching it with GET correctly gives
      // 405, which proves the route exists; 404 would mean it does not.
      if (label === "(form action)") {
        const res = await fetch(`${BASE}${target}`, { method: "GET" });
        if (res.status === 404) {
          problems.push({ from: path, href, label, why: "form posts to a route that does not exist" });
        }
        continue;
      }

      const dest = await fetchPath(target);
      if (dest.status >= 400) {
        problems.push({
          from: path,
          href,
          label,
          why: `lands on ${dest.status}`,
        });
        continue;
      }

      // A redirect is fine, an unresolved one is not.
      const landed = new URL(dest.url).pathname;
      if (landed !== target && !target.startsWith("/api")) {
        // Follow-through is expected for the six permanent redirects; record it
        // so a link pointing at a redirect rather than the canonical shows up.
        problems.push({
          from: path,
          href,
          label,
          why: `redirects to ${landed}, so the link is not canonical`,
          severity: "note",
        });
      }

      if (fragment) {
        const hasTarget =
          dest.html.includes(`id="${fragment}"`) || dest.html.includes(`name="${fragment}"`);
        if (!hasTarget) {
          problems.push({
            from: path,
            href,
            label,
            why: `no element with id="${fragment}" on ${target || path}`,
          });
        }
      }

      if (!seen.has(target) && !target.startsWith("/api")) {
        seen.add(target);
        queue.push(target);
      }
    }
  }

  // REACHABILITY. Every route the sitemap advertises must be linked from at
  // least one other served page.
  //
  // This exists because /services/how-we-work was linked from nowhere at all.
  // It resolved, its copy was complete, its metadata was right, and every check
  // passed on it. Nothing noticed that no crawler and no visitor could arrive.
  // The five other service pages were reachable only because the homepage cards
  // happen to link them, which is luck: had that section changed, they would
  // have orphaned the same way.
  {
    const res = await fetch(`${BASE}/sitemap.xml`).catch(() => null);
    if (!res?.ok) {
      problems.push({ from: "(sitemap)", href: "/sitemap.xml", why: "could not be fetched" });
    } else {
      const xml = await res.text();
      const advertised = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((m) => new URL(m[1]).pathname)
        .map((p) => (p === "" ? "/" : p));

      // A page is reachable if some OTHER served page links to it.
      const linkedFrom = new Map();
      for (const [path, page] of pages) {
        if (!page.html) continue;
        for (const m of page.html.matchAll(HREF)) {
          const target = m[1].replace(BASE, "").split("#")[0];
          if (!target.startsWith("/")) continue;
          if (target === path) continue;
          if (!linkedFrom.has(target)) linkedFrom.set(target, new Set());
          linkedFrom.get(target).add(path);
        }
      }

      for (const route of advertised) {
        if (route === "/") continue; // the entry point needs no inbound link
        if (!linkedFrom.has(route) || linkedFrom.get(route).size === 0) {
          problems.push({
            from: "(reachability)",
            href: route,
            label: "orphan",
            why: "in the sitemap but linked from no other page, so nobody can reach it",
          });
        }
      }
    }
  }

  const errors = problems.filter((p) => p.severity !== "note");
  const notes = problems.filter((p) => p.severity === "note");

  console.log(`link-check: walked ${seen.size} pages, followed ${followed} internal links`);
  console.log(`  reached: ${[...seen].sort().join(", ")}`);
  for (const n of notes) {
    console.log(`  note  ${n.from} -> ${n.href} (${n.label}): ${n.why}`);
  }
  if (errors.length === 0) {
    console.log("link-check: every internal link and CTA lands on a real route");
    return;
  }
  for (const e of errors) {
    console.error(`${e.from} -> ${e.href}  ${JSON.stringify(e.label ?? "")}`);
    console.error(`  ${e.why}`);
  }
  console.error(`\nlink-check: ${errors.length} broken link${errors.length === 1 ? "" : "s"}.`);
  process.exit(1);
}

main();
