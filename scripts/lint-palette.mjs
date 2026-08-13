#!/usr/bin/env node
/**
 * Palette guard.
 *
 * The approved brand palette is five values, defined once as tokens in
 * src/app/globals.css. Everything else on dark is derived from them with white
 * alpha, following the mockups, rather than by inventing new greens. This script
 * fails the build when a raw hex colour appears anywhere it should not.
 *
 * Two exemptions, both deliberate:
 *
 *   globals.css      the one place hex values belong, since it defines the tokens
 *   GRANDFATHERED    components transcribed directly from the approved mockups in
 *                    req/. Every hex in them traces back to a mockup, so they are
 *                    correct but not yet tokenised. They are frozen rather than
 *                    normalised, so this guard can run today instead of after a
 *                    large refactor. Removing a path from this list is the way to
 *                    tokenise that component.
 *
 * Reviewed exceptions go in scripts/palette-allow.json.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const ALLOW_FILE = join(ROOT, "scripts", "palette-allow.json");

const TOKEN_SOURCE = "src/app/globals.css";

const GRANDFATHERED = ["src/components/services/", "src/components/diagnostic/"];

const HEX = /#[0-9a-fA-F]{3,8}\b/g;

function loadAllowlist() {
  if (!existsSync(ALLOW_FILE)) return [];
  try {
    const parsed = JSON.parse(readFileSync(ALLOW_FILE, "utf8"));
    return Array.isArray(parsed.allow) ? parsed.allow : [];
  } catch (err) {
    console.error(`palette-lint: could not parse ${relative(ROOT, ALLOW_FILE)}: ${err.message}`);
    process.exit(2);
  }
}

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkFiles(full, out);
    else if (/\.(tsx?|css)$/.test(entry)) out.push(full);
  }
  return out;
}

function main() {
  const allow = loadAllowlist();
  const findings = [];

  for (const file of walkFiles(SRC)) {
    const rel = relative(ROOT, file).split(sep).join("/");
    if (rel === TOKEN_SOURCE) continue;
    if (GRANDFATHERED.some((p) => rel.startsWith(p))) continue;

    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      // A hex inside an SVG path or a comment is not a colour decision.
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      for (const match of line.matchAll(HEX)) {
        const hex = match[0];
        const allowed = allow.some(
          (a) => a.file === rel && a.hex.toLowerCase() === hex.toLowerCase(),
        );
        if (allowed) continue;
        findings.push({ rel, line: i + 1, column: match.index + 1, hex });
      }
    });
  }

  if (findings.length === 0) {
    console.log("palette-lint: clean");
    return;
  }

  for (const f of findings) {
    console.error(`${f.rel}:${f.line}:${f.column}  raw hex ${f.hex}`);
    console.error(
      `  use a palette token (forest, neon, mid, background, foreground), or derive from one ` +
        `with white alpha as the mockups do. If this value is genuinely correct, add it to ` +
        `scripts/palette-allow.json with a reason.`,
    );
  }
  console.error(`\npalette-lint: ${findings.length} raw hex colour${findings.length === 1 ? "" : "s"}.`);
  process.exit(1);
}

main();
