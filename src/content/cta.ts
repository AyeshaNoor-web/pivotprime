import { DIAGNOSTIC_ENABLED, HAS_WHATSAPP, WHATSAPP_URL } from "@/lib/flags";

/**
 * Every call to action on the site, in one place.
 *
 * THE STAGE ONE SUBSTITUTION
 *
 * The spec makes the diagnostic the destination of the secondary CTA
 * everywhere: hero, homepage close, and the routing blocks on the service and
 * persona pages. Stage one does not ship the diagnostic, so those CTAs would
 * lead to a 404, which would break the one thing stage one exists to do.
 *
 * For stage one they point at /contact instead. Both labels below are the
 * spec's own wording rather than anything invented:
 *
 *   phase two   "Take the 4-minute diagnostic"  ->  /diagnostic   (spec 2.2, secondary CTA)
 *   stage one   "Talk to us"                    ->  /contact      (spec 2.2, header button)
 *
 * The label changes with the destination on purpose. Carrying "Take the
 * 4-minute diagnostic" through to a contact form would promise an instrument
 * that does not exist yet and deliver a form instead, which is a worse defect
 * than the substitution it is meant to avoid. Raised rather than assumed, and
 * recorded in docs/PENDING-COPY.md section 0.4.
 *
 * Reverting is not an edit at all: turn NEXT_PUBLIC_ENABLE_DIAGNOSTIC on and
 * every consumer follows, because they all read JOURNEY_CTA rather than a
 * literal.
 */

export type Cta = { label: string; href: string; external?: boolean };

/** Spec 2.2 secondary CTA. The phase two destination. */
export const DIAGNOSTIC_CTA: Cta = {
  label: "Take the 4-minute diagnostic",
  href: "/diagnostic",
};

/** Spec 2.2 header button wording. The stage one stand-in. */
export const CONTACT_CTA: Cta = {
  label: "Talk to us",
  href: "/contact",
};

/**
 * The secondary journey CTA, wherever the spec points at the diagnostic.
 * Flag-driven, so no component holds a phase assumption.
 */
export const JOURNEY_CTA: Cta = DIAGNOSTIC_ENABLED ? DIAGNOSTIC_CTA : CONTACT_CTA;

/**
 * Spec 2.2 primary CTA. WhatsApp is the default business channel in this market
 * and is fully in scope for stage one.
 *
 * Degrades to the contact page when NEXT_PUBLIC_WHATSAPP_NUMBER is unset, so a
 * missing variable produces a working route rather than a broken wa.me link.
 */
export const WHATSAPP_CTA: Cta = {
  label: HAS_WHATSAPP ? "Talk to us on WhatsApp" : "Talk to us",
  href: WHATSAPP_URL,
  external: HAS_WHATSAPP,
};

/** The short form used in the header, where the full label does not fit. */
export const HEADER_CTA: Cta = {
  label: "Talk to us",
  href: WHATSAPP_URL,
  external: HAS_WHATSAPP,
};

/**
 * The hero's primary CTA, spec 3.1.
 *
 * The label is kept in both phases, unlike JOURNEY_CTA. "Find out what is
 * holding your business back" is an invitation rather than a promise of a
 * specific instrument, so a contact form honours it. What must not survive the
 * substitution is the explainer beneath it, which names a four-minute assessment
 * and a scored result. That is rendered only when the diagnostic is live.
 */
export const HERO_CTA: Cta = {
  label: "Find out what is holding your business back",
  href: DIAGNOSTIC_ENABLED ? "/diagnostic" : "/contact",
};
