import type { DomainId } from "./domains";

/**
 * The 42 statements of the deep instrument, from
 * PivotPrime_Constraint_Diagnostic_v1 section 3.
 *
 * Within each domain the order is the spec's own numbering, and that order is
 * load-bearing: statement ids are derived from it as `<domain>-<position>`, and
 * reports key on those ids so a business can be compared to itself six months
 * later. Reordering a pool silently repoints every historic id. If a statement
 * must be replaced, replace it in place. If one must be added, append it.
 *
 * A guard test asserts the twelve anchor ids still resolve to their expected
 * text, so a reorder fails the build rather than corrupting comparisons.
 *
 * All statements are worded so that agreement is healthy. Deep spec section 3 is
 * explicit that this must not be broken by adding a reverse-worded item, because
 * it would silently invert that item's contribution to the score.
 */
export const POOL: Record<DomainId, string[]> = {
  founder: [
    "If the founder were uncontactable for two weeks, the business would continue without disruption.",
    "Decisions below a defined value are made without needing the founder to approve them.",
    "Client relationships are held by the business rather than by one person.",
    "The founder spends most of their time on work that only they can do.",
    "There is at least one person who could run day to day operations if the founder stepped back.",
    "The founder has taken two or more consecutive weeks of leave in the last year without checking in daily.",
    "Significant commercial and operational decisions have a named owner other than the founder.",
  ],
  process: [
    "Our core processes are documented well enough that a new person could follow them.",
    "Work is delivered on time without someone having to chase it.",
    "What sales commits to is consistently what operations can actually deliver.",
    "Work continues to run normally when a key person is on leave.",
    "Quality holds when volume increases.",
    "Work rarely has to be redone or corrected after it has been completed.",
    "A new hire becomes productive within a defined onboarding period rather than by absorbing it slowly.",
  ],
  commercial: [
    "We know our profit margin by product, service or client, not just overall.",
    "Our prices were set deliberately and have been reviewed in the last twelve months.",
    "We know whether a job or contract is making money while it is running, not months afterwards.",
    "Discounting is exceptional rather than routine.",
    "Cash is collected on the agreed terms without significant chasing.",
    "No single client represents more than a quarter of revenue.",
    "Profit has grown at least as fast as revenue over the last two years.",
  ],
  data: [
    "I can see how the business is performing this month without asking someone to prepare it.",
    "When two people report the same number, they agree.",
    "We have a small set of KPIs that leadership genuinely uses to make decisions.",
    "We find out about problems from our own data before customers tell us.",
    "Our forecasts have been reasonably accurate over the last three periods.",
    "Reporting is produced automatically rather than assembled by hand each time.",
    "We could answer a detailed board or investor question about performance within a day.",
  ],
  people: [
    "Every important outcome in the business has one clearly named owner.",
    "The team has the capacity to absorb the growth we are planning.",
    "Roles were designed around the work the business needs, not around the people who were available.",
    "If you asked three leaders for the top three priorities, you would get the same answers.",
    "Initiatives that are not working get stopped rather than quietly continuing.",
    "People who leave go for opportunity rather than frustration.",
    "Performance conversations happen on a defined rhythm rather than when something goes wrong.",
  ],
  tech: [
    "Our systems reduce manual work rather than creating more of it.",
    "Information moves between our tools without anyone re-entering it.",
    "Nobody in the business spends significant time copying data between systems.",
    "We actively use the software we pay for.",
    "Our CRM reflects what is genuinely happening in sales and delivery.",
    "Technology decisions are made against a defined problem rather than a feature we liked.",
    "We could describe our core process precisely enough for someone to automate it.",
  ],
};

/**
 * The twelve anchors: the statements the short instrument shares with the deep
 * one, two per domain, marked "Anchor: Yes" throughout the deep document.
 *
 * These are declared explicitly rather than derived from position. Deriving them
 * as "the first two of each pool" would mean any pool edit silently changes
 * which statements are comparable, which is precisely the failure this list
 * exists to prevent.
 *
 * The short instrument (website spec 7.2) MUST build its twelve questions from
 * these ids rather than restating the text. Two instruments that key differently
 * cannot be compared, and comparability is the whole reason for running both.
 */
export const ANCHOR_IDS = [
  "founder-1",
  "founder-2",
  "process-1",
  "process-2",
  "commercial-1",
  "commercial-2",
  "data-1",
  "data-2",
  "people-1",
  "people-2",
  "tech-1",
  "tech-2",
] as const;

export type AnchorId = (typeof ANCHOR_IDS)[number];

const ANCHOR_SET: ReadonlySet<string> = new Set(ANCHOR_IDS);

export function isAnchor(id: string): boolean {
  return ANCHOR_SET.has(id);
}
