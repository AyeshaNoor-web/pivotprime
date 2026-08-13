import { describe, expect, it } from "vitest";
import { DOMAIN_ORDER, type DomainId } from "./domains";
import { PER_DOMAIN, buildStatements, shuffleWithinDomains } from "./presentation";

const POOL = Object.fromEntries(
  DOMAIN_ORDER.map((d) => [d, Array.from({ length: 7 }, (_, i) => `${d} statement ${i + 1}`)]),
) as Record<DomainId, string[]>;

const STATEMENTS = buildStatements(POOL);

/** Reversing shuffle: worst case for block integrity. */
const alwaysFirst = () => 0;

describe("buildStatements", () => {
  it("produces 42 statements in six contiguous blocks of seven", () => {
    expect(STATEMENTS).toHaveLength(42);
    DOMAIN_ORDER.forEach((d, block) => {
      const slice = STATEMENTS.slice(block * PER_DOMAIN, (block + 1) * PER_DOMAIN);
      expect(slice).toHaveLength(PER_DOMAIN);
      expect(slice.every((s) => s.d === d)).toBe(true);
    });
  });

  it("gives every statement a unique, spec-derived id", () => {
    const ids = STATEMENTS.map((s) => s.id);
    expect(new Set(ids).size).toBe(42);
    expect(STATEMENTS[0].id).toBe("founder-1");
  });
});

describe("shuffleWithinDomains", () => {
  it("never moves a statement out of its domain block", () => {
    // The property the scoring depends on: index to domain mapping is fixed.
    for (const random of [alwaysFirst, Math.random]) {
      const shuffled = shuffleWithinDomains(STATEMENTS, random);
      DOMAIN_ORDER.forEach((d, block) => {
        const slice = shuffled.slice(block * PER_DOMAIN, (block + 1) * PER_DOMAIN);
        expect(slice.every((s) => s.d === d)).toBe(true);
      });
    }
  });

  it("preserves every statement exactly once", () => {
    const shuffled = shuffleWithinDomains(STATEMENTS, Math.random);
    expect(shuffled.map((s) => s.id).sort()).toEqual(STATEMENTS.map((s) => s.id).sort());
  });

  it("does actually reorder within a block", () => {
    const shuffled = shuffleWithinDomains(STATEMENTS, alwaysFirst);
    const before = STATEMENTS.slice(0, PER_DOMAIN).map((s) => s.id);
    const after = shuffled.slice(0, PER_DOMAIN).map((s) => s.id);
    expect(after).not.toEqual(before);
  });

  it("does not mutate its input", () => {
    const snapshot = STATEMENTS.map((s) => s.id);
    shuffleWithinDomains(STATEMENTS, Math.random);
    expect(STATEMENTS.map((s) => s.id)).toEqual(snapshot);
  });

  it("keeps ids stable so a later session can be compared to an earlier one", () => {
    const a = shuffleWithinDomains(STATEMENTS, Math.random);
    const b = shuffleWithinDomains(STATEMENTS, Math.random);
    for (const s of a) {
      const same = b.find((x) => x.id === s.id);
      expect(same?.t).toBe(s.t);
      expect(same?.d).toBe(s.d);
    }
  });
});
