#!/usr/bin/env node
/**
 * Copy linter for the house rules in spec section 1.
 *
 * Parses the TypeScript/JSX AST and inspects only text a visitor can actually
 * read: JSX text nodes, the handful of JSX attributes that render as visible
 * text, and every string literal under src/content (which is copy by
 * definition). It deliberately does not grep raw source, because identifiers
 * and prop values legitimately contain these strings: scrollTo({ behavior })
 * is a Web API, not an American spelling.
 *
 * Reviewed exceptions go in scripts/copy-lint-allow.json.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const ALLOW_FILE = join(ROOT, "scripts", "copy-lint-allow.json");

/** JSX attributes whose values render as visible or assistive text. */
const VISIBLE_ATTRS = new Set(["alt", "title", "placeholder", "aria-label", "aria-description"]);

const AUDIT_FLOOR = "AED 15,000";

const RULES = [
  {
    id: "em-dash",
    test: (text) => [...text.matchAll(/—/g)],
    message: "em dash is not allowed, use a comma, a full stop or a colon (spec section 1)",
  },
  {
    id: "exclamation",
    test: (text) => [...text.matchAll(/!/g)],
    message: "exclamation mark is not allowed anywhere on the site (spec section 1)",
  },
  {
    id: "american-spelling",
    test: (text) => [
      ...text.matchAll(
        /\b(behaviou?r(?:s|al|ally)?|organiz\w*|analyz\w*|prioritiz\w*|optimiz\w*|specializ\w*|recogniz\w*|utiliz\w*|maximiz\w*|minimiz\w*|fulfillment|enrollment)\b/gi,
      ),
    ].filter((m) => !/behaviour/i.test(m[0])),
    message: "American spelling, the site is British English (spec section 1)",
  },
  {
    id: "aed-format",
    test: (text) => [
      ...text.matchAll(/AED\s*[\d,]*k?|\b\d+k\b(?=\s*(?:AED|dirham))/gi),
    ].filter((m) => m[0].trim() !== AUDIT_FLOOR),
    message: `the only price on the site is the audit floor, written exactly "${AUDIT_FLOOR}" (spec section 1 and the pricing rule)`,
  },
];

function loadAllowlist() {
  if (!existsSync(ALLOW_FILE)) return [];
  try {
    const parsed = JSON.parse(readFileSync(ALLOW_FILE, "utf8"));
    return Array.isArray(parsed.allow) ? parsed.allow : [];
  } catch (err) {
    console.error(`copy-lint: could not parse ${relative(ROOT, ALLOW_FILE)}: ${err.message}`);
    process.exit(2);
  }
}

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkFiles(full, out);
    } else if (/\.tsx?$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const TEXT_LITERAL_KINDS = new Set([
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
]);

/**
 * Collect { text, pos } fragments of visitor-facing copy from one source file.
 *
 * Three sources count as copy:
 *   1. JSX text nodes, the plain case.
 *   2. String and template literals inside a JSX expression container that is a
 *      *child* of an element, so {cond ? "—" : x} is caught. Attribute values
 *      are excluded, so className={cond ? "a" : "b"} is not.
 *   3. Every literal in src/content, which holds copy by definition.
 */
function collectCopy(sourceFile, isContentFile) {
  const fragments = [];

  const visit = (node, rendered) => {
    if (ts.isJsxText(node)) {
      const text = node.getFullText();
      if (text.trim()) fragments.push({ text, pos: node.getFullStart() });
      return;
    }

    if (ts.isJsxAttribute(node)) {
      // Attribute values are markup, not copy, with a few visible exceptions.
      const name = node.name.getText();
      if (node.initializer && VISIBLE_ATTRS.has(name) && ts.isStringLiteral(node.initializer)) {
        fragments.push({ text: node.initializer.text, pos: node.initializer.getStart() + 1 });
      }
      if (node.initializer) ts.forEachChild(node.initializer, (child) => visit(child, false));
      return;
    }

    let inRendered = rendered;
    if (
      ts.isJsxExpression(node) &&
      node.parent &&
      (ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent))
    ) {
      inRendered = true;
    }

    if ((inRendered || isContentFile) && TEXT_LITERAL_KINDS.has(node.kind)) {
      if (!ts.isImportDeclaration(node.parent) && !ts.isExportDeclaration(node.parent)) {
        const text = node.text ?? "";
        if (text.trim()) fragments.push({ text, pos: node.getStart() + 1 });
      }
    }

    ts.forEachChild(node, (child) => visit(child, inRendered));
  };

  visit(sourceFile, false);
  return fragments;
}

function main() {
  if (!existsSync(SRC)) {
    console.error("copy-lint: no src directory found");
    process.exit(2);
  }

  const allow = loadAllowlist();
  const findings = [];

  for (const file of walkFiles(SRC)) {
    const rel = relative(ROOT, file).split(sep).join("/");
    const isContentFile = rel.startsWith("src/content/");
    const source = readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

    for (const { text, pos } of collectCopy(sourceFile, isContentFile)) {
      for (const rule of RULES) {
        for (const match of rule.test(text)) {
          const offending = match[0].trim();
          const allowed = allow.some(
            (a) => a.file === rel && a.rule === rule.id && a.match === offending,
          );
          if (allowed) continue;

          const { line, character } = sourceFile.getLineAndCharacterOfPosition(pos + match.index);
          findings.push({
            rel,
            line: line + 1,
            column: character + 1,
            rule: rule.id,
            offending,
            message: rule.message,
          });
        }
      }
    }
  }

  if (findings.length === 0) {
    console.log("copy-lint: clean");
    return;
  }

  findings.sort((a, b) => a.rel.localeCompare(b.rel) || a.line - b.line);
  for (const f of findings) {
    console.error(`${f.rel}:${f.line}:${f.column}  ${f.rule}  ${JSON.stringify(f.offending)}`);
    console.error(`  ${f.message}`);
  }
  console.error(
    `\ncopy-lint: ${findings.length} problem${findings.length === 1 ? "" : "s"}. ` +
      `If one is correct after review, add it to scripts/copy-lint-allow.json.`,
  );
  process.exit(1);
}

main();
