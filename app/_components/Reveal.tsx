"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Fades + translates children in when scrolled into view.
 * Uses IntersectionObserver for low cost. The visual transition is driven
 * by CSS via the `[data-reveal]` and `.is-ready` rules in globals.css,
 * which also respects prefers-reduced-motion automatically.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.classList.add("is-ready");
      return;
    }

    // Only animate items that start out of view. In-view items get is-ready
    // immediately so they render visible at first paint. This keeps Lenis
    // smooth-scroll from fighting IntersectionObserver.
    const rect = node.getBoundingClientRect();
    const inViewAtMount = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewAtMount) {
      node.classList.add("is-ready");
      return;
    }

    node.setAttribute("data-reveal-animating", "true");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (delay > 0) {
              window.setTimeout(() => target.classList.add("is-ready"), delay);
            } else {
              target.classList.add("is-ready");
            }
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );

    io.observe(node);

    // Safety net: if Lenis or the scroll context prevents IO from firing
    // within 2s, force-reveal so content is never permanently hidden.
    const safety = window.setTimeout(() => {
      if (!node.classList.contains("is-ready")) {
        node.classList.add("is-ready");
      }
    }, 2000);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [delay]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
