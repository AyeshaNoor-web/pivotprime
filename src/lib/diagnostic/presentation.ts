import { DOMAIN_ORDER, type DomainId } from "./domains";
import { isAnchor } from "./statements";

/**
 * Presentation order for the deep instrument.
 *
 * Deep spec 8.2: "One domain per screen, seven statements visible together, with
 * a progress indicator showing six steps." Statements are therefore grouped into
 * six contiguous blocks of seven, in canonical domain order.
 *
 * Within a block the order is randomised per session. Seven near-identical
 * statements in a fixed column invites a straight run down one point of the
 * scale, which is the failure mode the interleaved layout was reaching for.
 * Randomising inside the domain gets that protection without breaking 8.2.
 *
 * Two things must survive the shuffle:
 *
 *   1. Block boundaries. Index to domain mapping is what the scoring and the
 *      answer map rely on, so a statement never moves between blocks.
 *   2. Statement identity. Every statement carries a stable id derived from its
 *      position in the spec, not from where it happens to render. Reports key on
 *      the id, so a session can be compared to a later one and the twelve short
 *      instrument anchors still line up.
 */

export type Statement = {
  d: DomainId;
  t: string;
  /** Stable, spec-derived. Never changes with presentation order. */
  id: string;
  /** Shared with the short instrument, so the two can be compared. */
  anchor: boolean;
};

export const PER_DOMAIN = 7;

/** Builds the canonical, unshuffled statement list from the domain pools. */
export function buildStatements(pool: Record<DomainId, string[]>): Statement[] {
  const out: Statement[] = [];
  for (const d of DOMAIN_ORDER) {
    pool[d].forEach((t, i) => {
      const id = `${d}-${i + 1}`;
      out.push({ d, t, id, anchor: isAnchor(id) });
    });
  }
  return out;
}

/**
 * Fisher-Yates within each domain block. Pure apart from the injected random
 * source, which the tests replace to make the result deterministic.
 */
export function shuffleWithinDomains(
  statements: readonly Statement[],
  random: () => number = Math.random,
): Statement[] {
  const out = [...statements];
  for (let start = 0; start < out.length; start += PER_DOMAIN) {
    const end = Math.min(start + PER_DOMAIN, out.length);
    for (let i = end - 1; i > start; i--) {
      const j = start + Math.floor(random() * (i - start + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
  }
  return out;
}
