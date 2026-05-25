"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitRevealProps {
  text: string;
  className?: string;
  /** Stagger between word reveals in seconds. */
  stagger?: number;
  /** Delay before the first word reveals, in seconds. */
  delay?: number;
}

/**
 * Splits text into word-level spans inside a div wrapper and reveals them
 * on scroll with a staggered slide-up + fade. Use inside a heading-level
 * tag for semantics. Pattern adapted from Terminal Industries' scroll-driven
 * headline treatment. Respects prefers-reduced-motion.
 */
export function SplitReveal({
  text,
  className = "",
  stagger = 0.06,
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = ref.current;
    if (!node) return;

    const words = node.querySelectorAll<HTMLSpanElement>("[data-word]");
    if (words.length === 0) return;

    if (reduced) {
      gsap.set(words, { y: 0, opacity: 1 });
      return;
    }

    gsap.set(words, { y: "0.5em", opacity: 0 });

    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            gsap.to(words, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger,
              delay,
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    io.observe(node);

    const safety = window.setTimeout(() => {
      const stillHidden = node.querySelector<HTMLSpanElement>(
        '[data-word][style*="opacity: 0"]'
      );
      if (stillHidden) {
        gsap.to(words, { y: 0, opacity: 1, duration: 0.6, stagger });
      }
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [stagger, delay, text]);

  const tokens = text.split(/(\s+|\n)/).filter(Boolean);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      {tokens.map((tok, i) => {
        if (tok === "\n") return <br key={`br-${i}`} />;
        if (/^\s+$/.test(tok)) return <span key={`sp-${i}`}>{tok}</span>;
        return (
          <span
            key={`w-${i}`}
            data-word
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {tok}
          </span>
        );
      })}
    </div>
  );
}
