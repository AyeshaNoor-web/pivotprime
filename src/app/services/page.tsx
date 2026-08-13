import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, SERVICES_EYEBROW, SERVICES_HEADING } from "@/content/services";

// Spec 4. The parent overview lists all five in spec order with the 3.4 card
// copy and a link each. Order is deliberate: the audit first because it is the
// entry point and the only priced offer, the retainer second because it is the
// destination. Do not alphabetise.
export const metadata: Metadata = {
  title: "Services | Pivot Prime",
  description:
    "Operational audits, fractional leadership, embedded delivery teams, technology builds and UAE market entry. We find what is holding your business back, then fix it.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <section className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 sm:px-6 md:pt-40 lg:px-8">
        <header className="mb-14 max-w-3xl md:mb-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-mid uppercase">
            {SERVICES_EYEBROW}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {SERVICES_HEADING}
          </h1>
        </header>

        {/* Three across then two on desktop, per spec 3.4. Card surfaces are the
            forest token at low alpha rather than a new cream value, which gives
            the very light pale green the annotations ask for and keeps the
            palette at five. */}
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug} className="flex">
              <Link
                href={service.href}
                className="group flex w-full flex-col rounded-xl border border-forest/10 bg-forest/[0.04] p-8 transition-colors hover:bg-forest/[0.07] focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <h2 className="text-sm font-bold tracking-[0.12em] text-forest uppercase">
                  {service.title}
                </h2>

                {/* Same slot and type size on every card so the row stays
                    balanced whether or not it carries a figure. Spec 3.4. */}
                <p className="mt-3 text-lg font-bold text-mid">{service.priceLine}</p>

                <div className="mt-5 space-y-4">
                  {service.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="leading-relaxed text-neutral-600">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-neutral-500">{service.scopeLine}</p>

                <span className="mt-auto inline-flex items-center pt-8 text-sm font-bold tracking-wide text-forest uppercase">
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
        </ul>
      </section>
    </div>
  );
}
