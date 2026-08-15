"use client";
import { useEffect, useRef, useState } from "react";

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
  const [hidden, setHidden] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Spec 8.3: all animation stops for users who have motion sensitivity
    // enabled. Nothing is hidden, so nothing needs revealing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen: never hide it, or it flashes out and back in.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setHidden(true);

    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(() => setHidden(false), delay);
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        hidden ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
