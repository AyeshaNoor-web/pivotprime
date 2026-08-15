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
