"use client";

import { useRef, useState } from "react";
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
 * On mobile (< md): Renders as a smooth, horizontal swipeable snap-track to
 * prevent excessive vertical scrolling.
 * On desktop (md+): Renders as a clean, balanced responsive grid.
 *
 * Cards use 2-line clamping with an inline "Read more" toggle to keep the section
 * compact and uniform while preserving 100% crawlable markup in the HTML.
 */
export default function ServiceCards() {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const totalCards = SERVICES.length + (DIAGNOSTIC_ENABLED ? 1 : 0);

  const toggleExpand = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCards((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardStep = offsetWidth * 0.85;
    const index = Math.round(scrollLeft / (cardStep || 1));
    setActiveIndex(Math.min(Math.max(index, 0), totalCards - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const children = scrollRef.current.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative">
      <ul
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:pb-0 md:pt-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:snap-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SERVICES.map((service) => {
          const isExpanded = !!expandedCards[service.slug];
          return (
            <li
              key={service.slug}
              className="flex flex-shrink-0 w-[84vw] max-w-[340px] snap-center md:w-auto md:max-w-none md:flex-shrink"
            >
              <Link
                href={service.href}
                className="group frosted-card-light flex w-full flex-col rounded-2xl p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-mid/30 focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <div className="flex items-center justify-end mb-2 md:hidden">
                  <span className="text-[11px] font-semibold text-mid/80 uppercase tracking-wider">
                    Swipe →
                  </span>
                </div>

                <h3 className="text-lg font-bold text-forest group-hover:text-mid transition-colors">
                  {service.title}
                </h3>

                {/* Price Line */}
                <p className="mt-1.5 font-bold text-mid text-sm sm:text-base">{service.priceLine}</p>

                {/* Clamped or Expanded Body Copy */}
                <div className="mt-4 space-y-3">
                  {service.body.map((paragraph, pIdx) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className={`leading-relaxed text-neutral-600 text-sm transition-all duration-200 ${
                        !isExpanded && pIdx === 0
                          ? "line-clamp-2"
                          : !isExpanded && pIdx > 0
                            ? "hidden"
                            : "block"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Read More / Read Less Inline Toggle */}
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(service.slug, e)}
                    className="text-xs font-bold text-mid hover:underline focus:outline-none"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                </div>

                {/* Scope Line (compact font) */}
                <p
                  className={`mt-4 border-t border-neutral-200/80 pt-3 text-xs leading-relaxed text-neutral-500 ${
                    !isExpanded ? "line-clamp-1" : ""
                  }`}
                >
                  {service.scopeLine}
                </p>

                {/* CTA Link */}
                <span className="mt-auto inline-flex items-center pt-5 text-sm font-bold text-forest group-hover:text-mid">
                  {service.ctaLabel}
                  <span
                    aria-hidden="true"
                    className="ml-2 text-lg leading-none transition-transform group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}

        {/* Diagnostic Card */}
        {DIAGNOSTIC_ENABLED && (
          <li className="flex flex-shrink-0 w-[84vw] max-w-[340px] snap-center md:w-auto md:max-w-none md:flex-shrink">
            <Link
              href={DIAGNOSTIC_CARD.href}
              className="group flex w-full flex-col rounded-2xl bg-forest p-6 sm:p-7 text-white transition-colors hover:bg-forest/90 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span className="mb-3 block text-xs font-semibold tracking-[0.2em] text-neon uppercase">
                {DIAGNOSTIC_CARD.eyebrow}
              </span>
              <h3 className="text-xl font-bold">{DIAGNOSTIC_CARD.title}</h3>
              <p className="mt-3 leading-relaxed text-white/80 text-sm line-clamp-3">{DIAGNOSTIC_CARD.body}</p>
              <span className="mt-auto inline-flex items-center pt-6 text-sm font-bold text-neon">
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

      {/* Mobile Swipe / Page Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6 md:hidden" aria-hidden="true">
        {Array.from({ length: totalCards }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "w-6 bg-mid" : "w-2 bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
