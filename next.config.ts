import type { NextConfig } from "next";

/**
 * Fail loudly rather than degrade quietly.
 *
 * When NEXT_PUBLIC_WHATSAPP_NUMBER is missing, every WhatsApp call to action
 * falls back to /contact and relabels itself. That fallback exists so a missing
 * variable never produces a broken wa.me link, but it is a downgrade: WhatsApp
 * is the default business channel in this market and spec 2.2 makes it the
 * primary CTA. A production deploy that silently ships without it would lose the
 * main conversion path with nothing in the logs to say so.
 *
 * This runs during `next build` and `next dev`, because next.config.ts is
 * evaluated on both.
 */
function warnOnMissingWhatsAppNumber() {
  if (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) return;

  const rule = "=".repeat(72);
  console.warn(
    [
      "",
      rule,
      "  WARNING  NEXT_PUBLIC_WHATSAPP_NUMBER is not set.",
      "",
      "  Every WhatsApp call to action will fall back to /contact and relabel",
      "  itself from 'Talk to us on WhatsApp' to 'Talk to us'. The site will",
      "  work, but the primary conversion path in spec 2.2 is not shipping.",
      "",
      "  Set it in .env.local for development, or in the project environment",
      "  before deploying. Format: international, digits only, no plus.",
      rule,
      "",
    ].join("\n"),
  );
}

warnOnMissingWhatsAppNumber();

/**
 * Permanent redirects from the old WordPress information architecture to the
 * one specified in spec 2.1.
 *
 * These are 308s. Spec 4.5 requires a 301 from every current URL to its new
 * equivalent so existing pages do not lose the ranking they hold, and 308 is
 * the permanent redirect that also preserves the request method. Search engines
 * treat both as permanent for ranking purposes.
 *
 * The four persona pages keep their live URLs, apart from Corporate Owners
 * which becomes P&L Owners per spec 5.4, so no other persona redirect exists.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Spec 4.6: "What We Do" is renamed and moves under Services.
      { source: "/what-we-do", destination: "/services/how-we-work", permanent: true },

      // Spec 6: the About page absorbs Who We Are, with team and case studies
      // as in-page anchors. Anchors cannot be set from a config redirect, so
      // the deep links land at the top of /about and the anchor nav takes over.
      { source: "/who-we-are", destination: "/about", permanent: true },

      // Spec 2.1: Prime Insights becomes Insights.
      { source: "/our-blog", destination: "/insights", permanent: true },

      // Spec 5.4: the nav label changes from Corporate Owners to P&L Owners.
      { source: "/for-corporate-owners", destination: "/for-pl-owners", permanent: true },

      // The spec contradicts itself on this slug: 2.1 lists
      // /services/fractional-coo under "New URLs required", while 4.2 and the
      // 3.4 card button both point at /services/fractional-leadership. We hold
      // the COO slug because it matches the nav label and is the term searched
      // in this market, and redirect the other so either link resolves.
      // Logged in docs/PENDING-COPY.md for Iram.
      {
        source: "/services/fractional-leadership",
        destination: "/services/fractional-coo",
        permanent: true,
      },

      // Spec 2.4: the footer link points at /contact, the live page is
      // /contact-us. Standardising on /contact and redirecting the old path.
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
