/**
 * Site navigation, spec 2.1.
 *
 * Order within the services dropdown is deliberate and must not be
 * alphabetised. Spec 2.1: "The audit is first because it is the entry point and
 * the only priced offer. The retainer is second because it is the destination."
 *
 * The About dropdown items are in-page anchors into /about, not routes. They
 * carry real URL fragments so /about#team can be linked directly from anywhere.
 */

export type NavLink = {
  label: string;
  href: string;
  /** True where the target is a section of a page rather than its own route. */
  anchor?: boolean;
};

export type NavItem = NavLink & { children?: NavLink[] };

export const NAVIGATION: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Operational Clarity Audit", href: "/services/operational-clarity-audit" },
      { label: "Fractional COO", href: "/services/fractional-coo" },
      { label: "Build and Place", href: "/services/build-and-place" },
      { label: "Technology Builds", href: "/services/technology-builds" },
      { label: "UAE Market Entry", href: "/services/uae-market-entry" },
      { label: "How We Work", href: "/services/how-we-work" },
    ],
  },
  {
    label: "Who It's For",
    href: "/for-founders",
    children: [
      { label: "For Founders", href: "/for-founders" },
      { label: "For SMEs", href: "/for-smes" },
      { label: "For Corporate Leaders", href: "/for-corporate-leaders" },
      { label: "For P&L Owners", href: "/for-pl-owners" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Pivot Prime", href: "/about" },
      { label: "Our Team", href: "/about#team", anchor: true },
      { label: "Case Studies", href: "/about#case-studies", anchor: true },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/** Spec 3.12: the footer link list matches the top level of the navigation. */
export const FOOTER_LINKS: NavLink[] = [
  ...NAVIGATION.map(({ label, href }) => ({ label, href })),
  { label: "Privacy", href: "/privacy" },
];

// Calls to action live in src/content/cta.ts, which is the single place the
// stage one substitution is expressed. Nothing here should hold a CTA label or
// a WhatsApp number.
//
// Note there is deliberately no diagnostic entry in either list above: stage one
// does not ship it, and spec 2.1 does not put it in the navigation in any case.
