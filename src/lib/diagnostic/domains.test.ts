import { describe, expect, it } from "vitest";
import {
  DOMAIN_ORDER,
  DOMAIN_NAMES,
  domainOrderIndex,
  lowestScoringDomain,
  rankByWeightedDeficit,
} from "./domains";

describe("canonical domain order", () => {
  it("matches spec 7.1 and the deep instrument section 2", () => {
    expect([...DOMAIN_ORDER]).toEqual([
      "founder",
      "process",
      "commercial",
      "data",
      "people",
      "tech",
    ]);
  });

  it("names every domain exactly once", () => {
    expect(Object.keys(DOMAIN_NAMES).sort()).toEqual([...DOMAIN_ORDER].sort());
  });

  it("puts process upstream of commercial, and data upstream of tech", () => {
    expect(domainOrderIndex("process")).toBeLessThan(domainOrderIndex("commercial"));
    expect(domainOrderIndex("data")).toBeLessThan(domainOrderIndex("tech"));
  });
});

describe("rankByWeightedDeficit", () => {
  it("orders by deficit, highest first", () => {
    const ranked = rankByWeightedDeficit([
      { d: "people", deficit: 4 },
      { d: "founder", deficit: 12 },
      { d: "tech", deficit: 8 },
    ] as const);
    expect(ranked.map((r) => r.d)).toEqual(["founder", "tech", "people"]);
  });

  it("breaks a deliberate tie towards the upstream domain", () => {
    // commercial and data are tied. commercial sits upstream, so it wins.
    const ranked = rankByWeightedDeficit([
      { d: "data", deficit: 9 },
      { d: "commercial", deficit: 9 },
      { d: "people", deficit: 2 },
    ] as const);
    expect(ranked[0].d).toBe("commercial");
  });

  it("breaks the tie by order even when the input arrives reversed", () => {
    // Guards the real regression: relying on a stable sort over a correctly
    // ordered input silently returns the wrong constraint once the input is
    // filtered or rebuilt from object keys.
    const ranked = rankByWeightedDeficit([
      { d: "tech", deficit: 7 },
      { d: "people", deficit: 7 },
      { d: "data", deficit: 7 },
      { d: "commercial", deficit: 7 },
      { d: "process", deficit: 7 },
      { d: "founder", deficit: 7 },
    ] as const);
    expect(ranked.map((r) => r.d)).toEqual([...DOMAIN_ORDER]);
  });

  it("does not mutate its input", () => {
    const rows = [
      { d: "people", deficit: 1 },
      { d: "founder", deficit: 9 },
    ] as const;
    rankByWeightedDeficit(rows);
    expect(rows.map((r) => r.d)).toEqual(["people", "founder"]);
  });
});

describe("lowestScoringDomain", () => {
  it("returns the lowest score", () => {
    const constraint = lowestScoringDomain([
      { d: "founder", score: 75 },
      { d: "tech", score: 25 },
      { d: "people", score: 50 },
    ] as const);
    expect(constraint?.d).toBe("tech");
  });

  it("breaks a deliberate tie towards the upstream domain", () => {
    // Spec 7.2: "if two tie, take the one earlier in the domain order above".
    // founder and people are tied at 30. founder sits upstream.
    const constraint = lowestScoringDomain([
      { d: "people", score: 30 },
      { d: "founder", score: 30 },
      { d: "process", score: 80 },
    ] as const);
    expect(constraint?.d).toBe("founder");
  });

  it("returns null when there is nothing to rank", () => {
    expect(lowestScoringDomain([])).toBeNull();
  });
});
