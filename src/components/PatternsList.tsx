"use client";

import { PATTERNS } from "@/content/homepage";
import { useSequentialReveal } from "@/lib/use-reveal-on-scroll";

/**
 * The patterns list, spec 3.5.
 *
 * The spec asks for the items to "type onto the screen, hold long enough to be
 * read, then the next one follows", with two or three visible at a time and the
 * animation pausing on hover.
 *
 * IMPLEMENTED AS A SEQUENTIAL REVEAL, NOT CHARACTER-BY-CHARACTER TYPING.
 *
 * A true typing effect builds each string one character at a time, which means
 * the full sentence is not in the DOM until the animation reaches the end of it.
 * That is the same defect as the results band shipping zeroes: ten pattern
 * statements, the section's entire content, would be absent from the
 * server-rendered HTML and from any reader without JavaScript. Spec 4.5 rules
 * that out.
 *
 * So every pattern is rendered in full, always, and the animation reveals them
 * in sequence. The reading experience the spec describes is preserved, the
 * content survives without JavaScript, and reduced motion shows the complete
 * list at once. The deviation is recorded in docs/PENDING-COPY.md.
 */
export default function PatternsList() {
  const [ref, visibleCount, setPaused] = useSequentialReveal<HTMLDivElement>(
    PATTERNS.items.length,
  );

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ul className="space-y-3">
        {PATTERNS.items.map((item, i) => (
          <li
            key={item}
            className={`text-xl leading-snug font-semibold transition-all duration-500 md:text-2xl ${
              // A mix of the palette greens, per the v1.7.1 annotation on 3.5.
              [0, 3, 6, 9].includes(i)
                ? "text-forest"
                : [1, 4, 7].includes(i)
                  ? "text-mid"
                  : "text-forest/70"
            } ${i < visibleCount ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
