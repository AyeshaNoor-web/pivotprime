"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll, done so that the content exists without JavaScript.
 *
 * The naive version of this pattern, `useState(false)` plus an
 * IntersectionObserver, has a defect that is invisible in a browser and obvious
 * to a crawler: whatever the flag hides is hidden in the server-rendered HTML
 * and stays hidden for anyone whose JavaScript does not run. Spec 4.5: "if the
 * copy only appears after JavaScript runs, it is working against you."
 *
 * So the flag starts *revealed*. On mount it is un-revealed only when the
 * element is still below the fold and motion is allowed, then revealed again on
 * intersection. Three consequences, all wanted:
 *
 *   - Server-rendered markup is complete and visible.
 *   - prefers-reduced-motion never hides anything. Spec 8.3.
 *   - Content already on screen is never hidden and re-shown, so nothing
 *     flashes on load.
 *
 * Returns [ref, revealed]. Attach the ref to the element being observed.
 */
export function useRevealOnScroll<T extends Element>(
  delay = 0,
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setRevealed(false);

    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(() => setRevealed(true), delay);
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return [ref, revealed];
}

/**
 * Sequential reveal, for a list whose items appear one after another.
 *
 * Same contract as useRevealOnScroll and for the same reason: every item is
 * counted as visible by default, so the server-rendered HTML is complete and a
 * reader without JavaScript, or with reduced motion enabled, gets the whole list
 * at once. The sequence only exists as an enhancement.
 *
 * Returns [ref, visibleCount, setPaused]. Pausing holds the sequence where it
 * is, which spec 3.5 asks for on hover.
 */
export function useSequentialReveal<T extends Element>(
  total: number,
  intervalMs = 900,
): [React.RefObject<T | null>, number, (paused: boolean) => void] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(total);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setVisible(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setVisible(1);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || visible === 0 || visible >= total) return;
    const timer = setTimeout(() => setVisible((n) => n + 1), intervalMs);
    return () => clearTimeout(timer);
  }, [visible, paused, total, intervalMs]);

  return [ref, visible, setPaused];
}

/**
 * Count a figure up from zero when it scrolls into view.
 *
 * Lives here rather than in the component for the same reason as the other two:
 * the below-the-fold check and the prefers-reduced-motion check are identical in
 * all three, and a bug fixed in one copy would diverge from the others. It also
 * keeps every setState out of a component effect body, which the React lint rule
 * rejects.
 *
 * The final value is the initial state, so the figure is what renders on the
 * server and what a reader without JavaScript sees. The figure is the content:
 * starting at zero put "0%" in the server-rendered HTML for every result on the
 * homepage.
 *
 * Returns [ref, value].
 */
export function useCountUp<T extends Element>(
  end: number,
  duration = 2000,
): [React.RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(end);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setValue(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const started = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - started) / duration);
          setValue(Math.round(end * progress));
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

  return [ref, value];
}
