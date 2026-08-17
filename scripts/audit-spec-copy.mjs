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
    const blocks = (spec[section] ?? []).filter((b) => !isMarker(b) && !isButton(b));
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

    const missing = blocks.filter((b) => !isPresent(html, b));
    totalChecked += blocks.length;
    totalMissing += missing.length;

    const status = missing.length === 0 ? "complete" : `${missing.length} of ${blocks.length} missing`;
    console.log(`\n${section.padEnd(5)} ${route.padEnd(38)} ${status}`);
    for (const block of missing) {
      console.log(`        - ${block.slice(0, 96)}${block.length > 96 ? "…" : ""}`);
    }
  }

  console.log(
    `\naudit: ${totalMissing} of ${totalChecked} spec copy blocks missing across ${pages.size} pages.`,
  );
}

main();
