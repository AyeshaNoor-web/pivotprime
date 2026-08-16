"use client";
import { useCountUp } from "@/lib/use-reveal-on-scroll";

/**
 * Counts a figure up from zero when it scrolls into view. Spec 3.3 and 8.3.
 *
 * All behaviour lives in useCountUp, alongside the other reveal primitives, so
 * the below-the-fold and reduced-motion checks exist once rather than in three
 * near-identical copies.
 */
export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [ref, value] = useCountUp<HTMLSpanElement>(end, duration);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
