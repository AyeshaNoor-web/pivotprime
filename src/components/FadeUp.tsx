"use client";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

/**
 * A subtle fade and rise on scroll. Spec 8.3, which asks for short duration and
 * no bounce, and names this as one of only two pieces of motion on the site.
 *
 * Content is visible by default. The previous version started at opacity-0, so
 * the server-rendered markup was invisible and stayed invisible for anyone
 * without JavaScript. Spec 4.5 is explicit that content must not depend on
 * JavaScript having run.
 *
 * The animation is layered on afterwards: on mount, if motion is allowed and the
 * element is still below the fold, it is hidden and then revealed on
 * intersection. Anything already on screen simply stays visible.
 */
export default function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, revealed] = useRevealOnScroll<HTMLDivElement>(delay);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
