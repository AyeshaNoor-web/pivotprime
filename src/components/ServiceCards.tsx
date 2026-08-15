import Link from "next/link";
import { DIAGNOSTIC_CARD, SERVICES } from "@/content/services";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";

/**
 * The service card grid, spec 3.4.
 *
 * Shared between the homepage section and the /services parent page, because
 * spec 4 defines the parent as "a copy of the services section from the home
 * page" with "no new copy needed for it". Two implementations would drift.
 *
 * Layout follows the reference image the spec points at: a numbered eyebrow, the
 * service name, the price or scope line in the same slot on every card so the
 * row stays balanced, the body, then a rule above the pricing basis and the
 * link. Only the audit carries a figure.
 */
export default function ServiceCards() {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((service, i) => (
        <li key={service.slug} className="flex">
          <Link
            href={service.href}
            className="group flex w-full flex-col rounded-xl border border-forest/10 bg-forest/[0.04] p-8 transition-colors hover:bg-forest/[0.07] focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className="mb-4 block text-xs font-semibold tracking-[0.2em] text-forest/45"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="text-lg font-bold text-forest">{service.title}</h3>

            {/* Same slot and type size on every card, so the row stays balanced
                whether or not it carries a figure. Spec 3.4. */}
            <p className="mt-2 font-bold text-mid">{service.priceLine}</p>

            <div className="mt-5 space-y-4">
              {service.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-neutral-600">
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-6 border-t border-forest/10 pt-5 text-sm leading-relaxed text-neutral-500">
              {service.scopeLine}
            </p>

            <span className="mt-auto inline-flex items-center pt-6 text-sm font-bold text-forest">
              {service.ctaLabel}
              <span
                aria-hidden="true"
                className="ml-2 text-lg leading-none transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      ))}

      {/* Card 6 sells the diagnostic and nothing else, so it appears only when
          the diagnostic does. Unlike the hero button there is nothing here a
          contact form could honour: every line names the instrument by duration
          and output. */}
      {DIAGNOSTIC_ENABLED && (
        <li className="flex">
          <Link
            href={DIAGNOSTIC_CARD.href}
            className="group flex w-full flex-col rounded-xl bg-forest p-8 text-white transition-colors hover:bg-forest/90 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span className="mb-4 block text-xs font-semibold tracking-[0.2em] text-neon uppercase">
              {DIAGNOSTIC_CARD.eyebrow}
            </span>
            <h3 className="text-xl font-bold">{DIAGNOSTIC_CARD.title}</h3>
            <p className="mt-4 leading-relaxed text-white/80">{DIAGNOSTIC_CARD.body}</p>
            <span className="mt-auto inline-flex items-center pt-8 text-sm font-bold text-neon">
              {DIAGNOSTIC_CARD.ctaLabel}
              <span
                aria-hidden="true"
                className="ml-2 text-lg leading-none transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      )}
    </ul>
  );
}
