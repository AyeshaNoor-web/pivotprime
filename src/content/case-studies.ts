/**
 * The three case studies, spec 3.8 and section 6.
 *
 * Tagged KEEP: "Keep all three case studies and the existing carousel." The copy
 * below is carried over unchanged from the existing build.
 *
 * They appear in two places. Spec 3.8 places them on the homepage, directly
 * after the founder section and before the personas, and section 6 keeps them on
 * /about behind the #case-studies anchor. One source, so the two cannot drift.
 *
 * NOTE ON FIGURES. Several results here are also in the section 9 master table,
 * which the spec says still contains a direct contradiction on operational
 * waste. The 67% and the 13% retention figure are attributed to specific case
 * studies by section 9, which is how they are used. Sign-off is tracked as item
 * 1.4, and client naming as item 1.7, which is why these are described by sector
 * rather than named.
 */

export type CaseStudy = {
  id: string;
  sector: string;
  challenge: string;
  pivotLead: string;
  pivot: string[];
  results: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "financial-services",
    sector: "Financial Services Company",
    challenge:
      "Customer onboarding and policy processing were slow and inconsistent. Teams lacked visibility into workload, cost per client, and profitability at a client and transaction level. KYC timelines were unpredictable, creating customer frustration and internal pressure. Leadership could not clearly see where time and cost were being lost.",
    pivotLead: "We rebuilt operations with discipline and data at the centre.",
    pivot: [
      "Mapped end-to-end customer and transaction workflows",
      "Reduced duplication and rework across compliance and operations",
      "Offshored selected onboarding activities to reduce bottlenecks and cost",
      "Built real-time dashboards tracking cost per client, transaction time, CAC, and LTV",
    ],
    results: [
      "67% faster transaction processing per customer",
      "KYC completion time reduced from an average of 10 days to 3 days",
      "25% reduction in operational waste across onboarding and processing",
      "2 to 3 FTE roles removed from high-cost locations",
    ],
  },
  {
    id: "founder-led",
    sector: "Founder-Led Business",
    challenge:
      "The founder was deeply involved in every decision. While the business was growing, progress felt heavy. Most of the week was spent on admin, approvals, and rework, leaving little time for direction, partnerships, or growth initiatives. The team had skills but lacked confidence. Delegation existed in theory, but decisions still flowed back to the founder.",
    pivotLead: "We focused on founder load release through structure and behaviour.",
    pivot: [
      "Translated the founder's vision into clear decision standards and success criteria.",
      "Defined which decisions stayed with the founder and which should never escalate.",
      "Redesigned roles around ownership and judgement, not just task delivery.",
      "Introduced simple operating rhythms to reduce ad-hoc interruptions and constant checking.",
    ],
    results: [
      "Up to 2 days a week returned to the founder by removing admin work and decision drag",
      "Fewer escalations and faster team decisions",
      "Greater confidence in delegation without loss of quality or control",
    ],
  },
  {
    id: "fitness-wellness",
    sector: "Fitness and Wellness Company, UAE",
    challenge:
      "The business had strong demand and a loyal core community, but member churn was rising. Leadership could not clearly see why members were leaving, and teams were focused on selling new memberships rather than retaining existing ones. Effort was high, but results were uneven.",
    pivotLead: "We rebuilt retention around experience, behaviour, and ownership.",
    pivot: [
      "Identified the moments that mattered most to members, including onboarding, class atmosphere, music, and post-class follow-up.",
      "Shifted the focus from transactions to community and identity, reinforcing progress and belonging.",
      "Aligned team incentives to retention behaviours rather than sign-ups alone.",
      "Introduced simple dashboards tracking attendance patterns, engagement drop-off, and early churn signals.",
    ],
    results: [
      "13% increase in member retention",
      "17% improvement in profit margin through reduced churn and better utilisation",
      "Clear visibility on why members stayed, allowing teams to act before churn occurred",
    ],
  },
];

export const CASE_STUDIES_HEADING = "What we have achieved";
export const CASE_STUDIES_STANDFIRST = "Real problems, real execution, real results.";
