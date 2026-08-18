#!/usr/bin/env node
/**
 * Copy coverage audit.
 *
 * For each spec section, takes every block of final copy out of docs/spec.md and
 * reports which ones are not in the served HTML for the page that section
 * governs.
 *
 * Nothing here is typed by hand. The needles are the spec's own sentences, read
 * from the document at run time, which is the whole point: the previous audit
 * was done with phrases I transcribed, and it produced both a false pass and a
 * false accusation.
 *
 * This reports, it does not fail. Coverage is a judgement, since a designed page
 * may legitimately reorder or split a block. Use it to find gaps, then decide.
 *
 *   node scripts/audit-spec-copy.mjs [baseUrl]
 */

import { loadSpecBlocks } from "./spec-blocks.mjs";

const BASE = process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000";

/** Which page each spec section governs. */
const SECTION_ROUTES = {
  "3.1": "/",
  "3.3": "/",
  "3.4": "/",
  "3.5": "/",
  "3.6": "/",
  "3.7": "/",
  "3.10": "/",
  "3.11": "/",
  "4.1": "/services/operational-clarity-audit",
  "4.2": "/services/fractional-coo",
  "4.3": "/services/build-and-place",
  "4.4": "/services/technology-builds",
  "4.5": "/services/uae-market-entry",
  "6.1": "/about",
  "6.3": "/about",
};

/**
 * Structural markers in the spec document rather than copy for the page: HERO,
 * WHY THIS EXISTS, CARD 1, METRIC 3 and so on. They are shouted, short, and
 * never sentences.
 */
const isMarker = (block) =>
  /^[A-Z0-9 ,&'’-]+$/.test(block) && block.length < 40 && !/[.?]$/.test(block);

const isButton = (block) => /^BUTTON:/i.test(block);

/**
 * Instruction text the spec embeds inside a copy block. Spec section 1 keeps
 * instruction and copy apart, but a few blocks carry a note inline, and matching
 * on it reports correct pages as missing copy.
 */
const stripInstructions = (block) =>
  block
    .replace(/^HEADING,[^-]*-\s*/i, "")
    .replace(/\(TEXT AS PER CARD SHOWN\)/i, "")
    .replace(/\(have this linked to [^)]*\)/i, "")
    // "Fractional COO #coo\ Owns execution..." embeds the anchor id the builder
    // must create. The id is an instruction; the sentence after it is the copy.
    .replace(/\s#[a-z-]+\\?\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Blocks that are deliberately not on the page yet.
 *
 * Every entry names the condition that makes it appear, not only the reason it
 * is absent today. Without that this list rots into permanent exemptions: an
 * item whose trigger is never written down is one nobody ever removes.
 *
 * CLIENT-FACING. Anything here waiting on Iram must also be in
 * docs/PENDING-COPY.md, because that is the list she is given. The `tracked`
 * field is the cross-reference, and "n/a" means the trigger is ours rather than
 * hers.
 */
const EXPECTED_ABSENT = [
  {
    section: "3.3",
    match: "Bespoke software and automation builds delivered",
    why: 'metric 6 has no figure, and spec 3.3 says "Do not launch this card with a placeholder"',
    appearsWhen: "the count of bespoke builds shipped is supplied",
    tracked: "PENDING-COPY item 1.2",
  },
  {
    section: "3.3",
    match: "Custom systems, CRMs, dashboards and automations",
    why: "metric 6 context, same card",
    appearsWhen: "the count of bespoke builds shipped is supplied",
    tracked: "PENDING-COPY item 1.2",
  },
  {
    section: "3.11",
    match: "Two ways to start. Take the diagnostic",
    why: "promises a scored view in four minutes, which the contact page cannot honour",
    appearsWhen: "NEXT_PUBLIC_ENABLE_DIAGNOSTIC is true and the diagnostic ships",
    tracked: "PENDING-COPY 0.1 and 0.4",
  },
];

/**
 * Blocks that ARE on the page but not as one contiguous string, because the
 * design splits them across elements. Distinct from EXPECTED_ABSENT: nothing is
 * pending and no condition will change them. Kept apart so the phase-gated list
 * stays a list of things somebody owes.
 */
const RENDERED_SPLIT = [
  {
    section: "6.3",
    match: "Iram Kauser, Founder and CEO",
    why: "the name is a heading and the role is the line beneath it, both present",
  },
];

const normalise = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;|’/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;|"|“|”/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    // <CountUp/> renders the figure and its suffix in separate elements, so
    // stripping tags leaves "53 %" where the spec says "53%". This has to run
    // after the tags are gone, not before, or there is no space to close up.
    .replace(/(\d)\s+%/g, "$1%")
    .toLowerCase();

/** A block counts as present if a distinctive run of it appears in the page. */
function isPresent(haystack, block) {
  const needle = normalise(block);
  if (needle.length < 25) return haystack.includes(needle);
  // Compare on the first clause, so a designed page that splits a long
  // paragraph across two elements still counts as carrying it.
  const clause = needle.split(/[.,:;]/)[0].trim();
  return haystack.includes(clause.length >= 25 ? clause : needle.slice(0, 60));
}

async function main() {
  const spec = loadSpecBlocks();
  const pages = new Map();
  let totalMissing = 0;
  let totalChecked = 0;

  for (const [section, route] of Object.entries(SECTION_ROUTES)) {
    const blocks = (spec[section] ?? [])
      .map(stripInstructions)
      .filter((b) => b && !isMarker(b) && !isButton(b));
    if (blocks.length === 0) {
      console.log(`${section.padEnd(5)} no copy blocks parsed, check the section number`);
      continue;
    }

    if (!pages.has(route)) {
      const res = await fetch(`${BASE}${route}`).catch(() => null);
      if (!res?.ok) {
        console.error(`${section.padEnd(5)} ${route} unreachable at ${BASE}`);
        continue;
      }
      pages.set(route, normalise(await res.text()));
    }
    const html = pages.get(route);

    const absent = blocks.filter((b) => !isPresent(html, b));
    const deliberate = [];
    const missing = [];
    for (const block of absent) {
      const gated = EXPECTED_ABSENT.find((e) => e.section === section && block.startsWith(e.match));
      const split = RENDERED_SPLIT.find((e) => e.section === section && block.startsWith(e.match));
      if (gated) deliberate.push({ block, why: `${gated.why}. Appears when ${gated.appearsWhen}. ${gated.tracked}` });
      else if (split) deliberate.push({ block, why: `${split.why}, so this is a matching artefact rather than an absence` });
      else missing.push(block);
    }

    totalChecked += blocks.length;
    totalMissing += missing.length;

    const status =
      missing.length === 0
        ? deliberate.length
          ? `complete, ${deliberate.length} deliberately absent`
          : "complete"
        : `${missing.length} of ${blocks.length} missing`;
    console.log(`\n${section.padEnd(5)} ${route.padEnd(38)} ${status}`);
    for (const block of missing) {
      console.log(`        - ${block.slice(0, 96)}${block.length > 96 ? "…" : ""}`);
    }
    for (const d of deliberate) {
      console.log(`        ~ ${d.block.slice(0, 60)}…  (${d.why})`);
    }
  }

  console.log(
    `\naudit: ${totalMissing} of ${totalChecked} spec copy blocks missing across ${pages.size} pages.`,
  );
}

main();
