/**
 * The six operational domains, shared by both diagnostic instruments.
 *
 * Order is load-bearing, not presentational. Both instruments break ties by it:
 * spec 7.2 says of the short version "if two tie, take the one earlier in the
 * domain order above, since it usually sits upstream of the other", and the deep
 * instrument ranks by weighted deficit over the same sequence. The domains are
 * ordered so that upstream causes come before downstream symptoms.
 *
 * Sources: website spec section 7.1, and PivotPrime_Constraint_Diagnostic_v1
 * section 2, which agree.
 */

export const DOMAIN_ORDER = [
  "founder",
  "process",
  "commercial",
  "data",
  "people",
  "tech",
] as const;

export type DomainId = (typeof DOMAIN_ORDER)[number];

export const DOMAIN_NAMES: Record<DomainId, string> = {
  founder: "Founder dependency",
  process: "Process and delivery",
  commercial: "Commercial and margin",
  data: "Data and visibility",
  people: "People and accountability",
  tech: "Technology leverage",
};

/** Position of a domain in the canonical order. Lower sits further upstream. */
export function domainOrderIndex(id: DomainId): number {
  return DOMAIN_ORDER.indexOf(id);
}

/**
 * Rank domains by weighted deficit, highest first (deep instrument, scoring 4.4).
 *
 * Ties break towards the upstream domain. This is done explicitly rather than by
 * relying on a stable sort over a correctly ordered input, so the rule survives
 * the input being filtered, reordered or built from an object's keys.
 */
export function rankByWeightedDeficit<T extends { d: DomainId; deficit: number }>(
  rows: readonly T[],
): T[] {
  return [...rows].sort(
    (a, b) => b.deficit - a.deficit || domainOrderIndex(a.d) - domainOrderIndex(b.d),
  );
}

/**
 * The constraint for the short instrument (spec 7.2): the lowest-scoring domain,
 * ties broken towards the upstream domain.
 */
export function lowestScoringDomain<T extends { d: DomainId; score: number }>(
  rows: readonly T[],
): T | null {
  if (rows.length === 0) return null;
  return [...rows].sort(
    (a, b) => a.score - b.score || domainOrderIndex(a.d) - domainOrderIndex(b.d),
  )[0];
}
