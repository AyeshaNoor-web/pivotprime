"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up from zero when it scrolls into view. Spec 3.3 and 8.3.
 *
 * The final value is what renders on the server and what a visitor without
 * JavaScript sees. This matters: the figure is the content. Starting the state
 * at zero would put "0%" in the server-rendered HTML for every result on the
 * page, which spec 4.5 warns against directly, "if the copy only appears after
 * JavaScript runs, it is working against you".
 *
 * The animation is therefore an enhancement layered on afterwards. On mount the
 * value is reset to zero only when the element is still below the fold and
 * motion is allowed, so a figure already on screen is never blanked and then
 * refilled.
 *
 * Runs once per page load, not every time the element re-enters. Spec 3.3.
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
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Spec 8.3: all animation stops for users who have motion sensitivity
    // enabled. A count-up cannot be stopped by CSS, so it is checked here.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen: leave the figure alone rather than blanking it.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setCount(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const started = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - started) / duration);
          setCount(Math.round(end * progress));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
