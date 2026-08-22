#!/usr/bin/env node
/**
 * The audit, run backwards.
 *
 * WHY THIS EXISTS
 *
 * `audit-spec-copy.mjs` asks one question, 198 times: is this spec block on the
 * site? It reached 0 of 198 missing and stayed there while two calls to action
 * that the spec never authorised sat on screen, one of them the exact wording
 * spec 2.2 line 226 instructs removing. It could not have caught either. Copy
 * the document never asked for is invisible to a check that only walks the
 * document.
 *
 * So this one walks the other way: every heading and every call to action the
 * site actually renders must trace to a block in docs/spec.md, or to an entry
 * in scripts/sanctioned-copy.json that says who decided it and where the client
 * can read about it. Anything else fails.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 *
 * It does not check body copy. Prose is recombined, split across elements and
 * interleaved with markup, and a substring test over it produces noise rather
 * than findings. Headings and CTAs are short, whole, and are exactly where
 * invented copy has actually appeared.
 *
 *   node scripts/check-unsanctioned-copy.mjs [baseUrl]
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadSpecBlocks } from "./spec-blocks.mjs";

const BASE = (process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const SANCTIONED = JSON.parse(readFileSync(join(process.cwd(), "scripts", "sanctioned-copy.json"), "utf8"));

/** Compare on letters and digits only: casing, punctuation and entities differ
 *  between the document and the DOM and none of those differences are the
 *  defect this is looking for. */
const norm = (s) =>
  s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

const stripTags = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// Every word of the spec, normalised, as one haystack. A heading is sanctioned
// if the document contains it anywhere: which section it came from is the copy
// audit's job, not this one's.
const specHaystack = norm(Object.values(loadSpecBlocks()).flat().join(" "));

const sanctioned = new Map(SANCTIONED.entries.map((e) => [norm(e.text), e]));

async function routes() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname || "/");
}

const HEADING = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
const LINK = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
const BUTTON = /<button\b[^>]*>([\s\S]*?)<\/button>/gi;

const findings = [];
const seen = new Set();
let inspected = 0;

for (const route of await routes()) {
  const res = await fetch(`${BASE}${route}`);
  if (!res.ok) continue;
  const html = await res.text();
  const body = html.split(/<\/header>/i).pop();

  const items = [];
  for (const m of html.matchAll(HEADING)) items.push({ kind: `h${m[1]}`, text: stripTags(m[2]) });
  for (const m of body.matchAll(LINK)) items.push({ kind: "link", text: stripTags(m[1]) });
  for (const m of body.matchAll(BUTTON)) items.push({ kind: "button", text: stripTags(m[1]) });

  for (const { kind, text } of items) {
    // Icon-only controls, single words of chrome and anything numeric are not
    // copy decisions. Two words is the floor for a label worth tracing.
    if (!text || text.split(" ").length < 2) continue;
    // A link wrapping a whole card yields the card's entire prose as one string.
    // That is the matcher seeing markup structure, not a label anyone wrote.
    if (text.split(" ").length > 14) continue;
    const key = norm(text);
    if (!key) continue;
    inspected += 1;

    if (specHaystack.includes(key)) continue;
    if (sanctioned.has(key)) continue;

    const id = `${key}`;
    if (seen.has(id)) continue;
    seen.add(id);
    findings.push({ route, kind, text });
  }
}

// An allowlist entry that no longer matches anything is a decision that has been
// quietly reverted or reworded, which is the same defect pointing the other way.
const live = new Set();
for (const route of await routes()) {
  const res = await fetch(`${BASE}${route}`);
  if (!res.ok) continue;
  const html = await res.text();
  for (const m of html.matchAll(HEADING)) live.add(norm(stripTags(m[2])));
  for (const m of html.matchAll(LINK)) live.add(norm(stripTags(m[1])));
  for (const m of html.matchAll(BUTTON)) live.add(norm(stripTags(m[1])));
}
const stale = SANCTIONED.entries.filter((e) => !live.has(norm(e.text)) && e.mustAppear !== false);

console.log(`reverse-audit: inspected ${inspected} headings and calls to action across the site`);

if (!findings.length && !stale.length) {
  const awaiting = SANCTIONED.entries.filter((e) => e.status === "awaiting-client").length;
  console.log(
    `reverse-audit: clean (${SANCTIONED.entries.length - awaiting} traced, ` +
      `${awaiting} awaiting the client in PENDING-COPY 1f)`,
  );
  process.exit(0);
}

for (const f of findings) {
  console.error(`\n  ${f.route}  <${f.kind}>  "${f.text}"`);
  console.error("    not in docs/spec.md and not in scripts/sanctioned-copy.json");
}
for (const s of stale) {
  console.error(`\n  sanctioned but no longer rendered: "${s.text}"`);
  console.error(`    ${s.why}`);
}
console.error(
  `\nreverse-audit: ${findings.length} unsanctioned, ${stale.length} stale.` +
    `\nEvery entry needs a spec block behind it, or an entry in scripts/sanctioned-copy.json` +
    `\nnaming who decided it and where the client can read about it.`,
);
process.exit(1);
