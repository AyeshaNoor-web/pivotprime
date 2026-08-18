import { describe, expect, it } from "vitest";
import { DOMAIN_ORDER } from "./domains";
import { ANCHOR_IDS, POOL, isAnchor } from "./statements";
import { buildStatements } from "./presentation";

const STATEMENTS = buildStatements(POOL);
const byId = new Map(STATEMENTS.map((s) => [s.id, s]));

/**
 * The contract this file exists to defend.
 *
 * Statement ids are derived from position within a domain pool, and reports key
 * on those ids so a business can be compared to itself later, and so the short
 * and deep instruments can be compared to each other. That makes pool order
 * load-bearing in a way nothing in the type system expresses: reorder a pool and
 * every historic answer silently repoints to a different statement.
 *
 * These expectations are copied from PivotPrime_Constraint_Diagnostic_v1
 * section 3. They are duplication on purpose. If someone reorders a pool, this
 * fails rather than the corruption surfacing months later when two sessions are
 * compared and the numbers make no sense.
 */
const ANCHOR_CONTRACT: Record<string, { domain: string; startsWith: string }> = {
  "founder-1": { domain: "founder", startsWith: "If the founder were uncontactable" },
  "founder-2": { domain: "founder", startsWith: "Decisions below a defined value" },
  "process-1": { domain: "process", startsWith: "Our core processes are documented" },
  "process-2": { domain: "process", startsWith: "Work is delivered on time" },
  "commercial-1": { domain: "commercial", startsWith: "We know our profit margin" },
  "commercial-2": { domain: "commercial", startsWith: "Our prices were set deliberately" },
  "data-1": { domain: "data", startsWith: "I can see how the business is performing" },
  "data-2": { domain: "data", startsWith: "When two people report the same number" },
  "people-1": { domain: "people", startsWith: "Every important outcome" },
  "people-2": { domain: "people", startsWith: "The team has the capacity" },
  "tech-1": { domain: "tech", startsWith: "Our systems reduce manual work" },
  "tech-2": { domain: "tech", startsWith: "Information moves between our tools" },
};

describe("the statement pool", () => {
  it("holds seven statements for each of the six domains", () => {
    expect(Object.keys(POOL).sort()).toEqual([...DOMAIN_ORDER].sort());
    for (const d of DOMAIN_ORDER) {
      expect(POOL[d], `${d} pool`).toHaveLength(7);
    }
  });

  it("contains no duplicate statements", () => {
    const all = DOMAIN_ORDER.flatMap((d) => POOL[d]);
    expect(new Set(all).size).toBe(42);
  });
});

describe("statement id contract", () => {
  it("maps every anchor id to the same domain and the same statement, always", () => {
    for (const [id, expected] of Object.entries(ANCHOR_CONTRACT)) {
      const statement = byId.get(id);
      expect(statement, `${id} should exist`).toBeDefined();
      expect(statement!.d, `${id} domain`).toBe(expected.domain);
      expect(statement!.t.startsWith(expected.startsWith), `${id} text drifted: "${statement!.t}"`).toBe(true);
    }
  });

  it("marks exactly the twelve anchors, and no others", () => {
    const flagged = STATEMENTS.filter((s) => s.anchor).map((s) => s.id).sort();
    expect(flagged).toEqual([...ANCHOR_IDS].sort());
    expect(flagged).toHaveLength(12);
  });

  it("gives every anchor id a stable anchor flag", () => {
    for (const id of ANCHOR_IDS) {
      expect(isAnchor(id), `${id} should be an anchor`).toBe(true);
      expect(byId.get(id)?.anchor, `${id} statement anchor flag`).toBe(true);
    }
  });

  it("puts two anchors in every domain, so the short instrument covers all six", () => {
    for (const d of DOMAIN_ORDER) {
      const anchors = STATEMENTS.filter((s) => s.d === d && s.anchor);
      expect(anchors, `${d} anchors`).toHaveLength(2);
    }
  });

  it("does not treat an unknown or near-miss id as an anchor", () => {
    expect(isAnchor("founder-3")).toBe(false);
    expect(isAnchor("founder-11")).toBe(false);
    expect(isAnchor("")).toBe(false);
    expect(isAnchor("nonsense")).toBe(false);
  });
});
