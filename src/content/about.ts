import { PROOF } from "./homepage";

/**
 * About page copy, spec section 6.
 *
 * 6.1 is new and goes at the very top, immediately under the H1 and before the
 * existing "From pressure to Prime State" block.
 */
export const WHY_WE_EXIST = {
  heading: "Why Pivot Prime exists",
  body: [
    "Sitting on an executive committee, you see exactly where value is won or lost: in the gap between what leadership decides and what actually gets delivered.",
    "Large corporates have entire layers of people to close that gap. The businesses driving this region's growth, the founder-led companies, the mid-sized firms scaling fast, and the international businesses arriving here, mostly do not. They feel the cost of it directly on the P&L.",
  ],
  /**
   * Split so "Iram Kauser" can link to the team section, which the spec asks for
   * inline: "Iram Kauser (have this linked to meet the team section)".
   */
  founderSentence: {
    name: "Iram Kauser",
    nameHref: "/about#team",
    rest: " spent sixteen years closing that gap inside large organisations. Then she built Pivot Prime to close it for the businesses that need it most and have nobody to do it.",
  },
  ctaLabel: "Read the full interview",
  // Spec 6.1: "(Link to West Asia Interview)". Same URL as the proof bar, so it
  // is read from there rather than written twice.
  ctaHref: PROOF.publications[0].href,
};
