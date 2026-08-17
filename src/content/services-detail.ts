/**
 * Spec copy for the service pages that the build compressed.
 *
 * The pages were built from the mockups rather than from the spec, and the
 * designer's captions replaced the copy: spec 4.3's five cards, each a full
 * paragraph, arrived as a diagram with two-word labels. Spec section 1 is
 * explicit that green-block copy is used verbatim, and a two-word caption is not
 * a compression of a paragraph, it is an omission of one.
 *
 * The design is kept in every case. Where a caption would repeat a paragraph
 * word for word, the caption goes and the copy carries the meaning, because a
 * diagram of five roles beside five cards naming those roles reads as a mistake.
 * If Iram wants the diagram to say more once she has seen the page, that is a
 * conversation, not a decision to take on her behalf now.
 *
 * Gaps were measured with `npm run audit:copy`, which reads the phrases out of
 * docs/spec.md rather than from anyone's transcription.
 */

export type ServiceDetailCard = { title: string; body: string };

/** Spec 4.3, blocks 6 to 25. */
export const BUILD_AND_PLACE = {
  whyHeading: "Why this exists",
  why: [
    "Most consultancies sell advice and leave the client to execute it. We place people inside the business and stay accountable for the outcome.",
    "Everyone we place is sourced, vetted and managed by us. They report to us rather than to you, which means you are not carrying the recruitment risk, the performance management, or the awkward conversation if it is not working. One contract, one invoice, one accountable party.",
  ],
  rolesHeading: "The seats we place",
  cards: [
    {
      title: "Project management",
      body: "Runs delivery inside your team: the order and project lifecycle, supplier and stakeholder coordination, SLA and timeline tracking, and documentation that outlives the engagement. Used where the plan is clear and the problem is that nothing is being driven.",
    },
    {
      title: "Finance",
      body: "Fractional CFO support: board and investor reporting, cash, runway and forecasting, collections and credit control, statutory reporting, and readiness for the next round. Used where the founder feels the absence of a finance seat every single week.",
    },
    {
      title: "Technology",
      body: "Engineers who build the automation, the CRM, the dashboards and the internal tools. Scoped after the diagnosis, never before it. If the work is a standalone build rather than an embedded seat, see Technology Builds.",
    },
    {
      title: "Marketing and brand",
      body: "Positioning, go-to-market, and the client-facing material that carries it. Used where the operation has been fixed but the business still is not being bought.",
    },
    {
      title: "Web and digital",
      body: "Website design, build and maintenance, and the digital estate around it. Used where the shopfront no longer matches the business behind it.",
    },
  ] satisfies ServiceDetailCard[],
  pricedHeading: "How it is priced",
  priced:
    "We scope the work with you, agree the days and what good looks like, and put it into a single proposal. You pay Pivot Prime and we pay the delivery partner. If the full team is not affordable, we reduce the scope rather than quietly reducing the quality of who we put in front of you.",
  scopeLine: "Priced on the roles, the days a month and the length of the engagement.",
};

/** Spec 4.5, THE MISCONCEPTION and WHAT WE BUILD and CLOSE. */
export const MARKET_ENTRY = {
  misconceptionHeading: "The misconception",
  misconception: [
    "The most common assumption is that a business which works elsewhere can be copied into Dubai. Almost nothing pastes cleanly.",
    "The regulatory position changes depending on whether you sit in a free zone or on the mainland. Consumer habits are different: this is a market that lives on delivery apps, expects service levels that would be considered premium elsewhere, and buys through community and word of mouth as much as through marketing.",
    "The commercial calendar is different too. Ramadan reshapes trading for a month, and a large part of your customer base leaves the country over the summer, so a plan built on twelve even months will miss badly. Heat changes how logistics, storage and footfall work for half the year. And the culture rewards relationships and patience, so businesses that arrive expecting to transact at home-market speed stall in ways they cannot explain.",
  ],
  buildHeading: "What we build",
  build: [
    "Entity structure, licensing and regulatory approvals",
    "A full financial model: investment, breakeven, return, and pricing built for this market",
    "Product and regulatory compliance, so what you sell can legally be sold here",
    "Commercial real estate and office fit-out",
    "Hiring, with local market HR expertise",
    "Manufacturing, logistics and supply chain",
    "Brand localisation and go-to-market",
    "The operating model, and the people to run it once you are live",
  ],
  closeHeading: "Where it ends up",
  close:
    "We take clients from a licence to a functioning, properly priced operation that can actually succeed here. If the model says it will not, we would rather tell you before you spend the money than after.",
};
