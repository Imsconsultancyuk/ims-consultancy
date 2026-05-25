"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CharSplitProps {
  text: string;
  className?: string;
  /** Delay between chars in seconds. */
  stagger?: number;
  /** Initial delay before first char. */
  delay?: number;
  /** Initial Y offset in em. */
  y?: number;
}

/**
 * Per-character heading reveal. Splits the text into character spans
 * (preserving spaces) and slides each one up on scroll-into-view with a
 * small stagger. Combined with the SplitReveal (word-level) elsewhere,
 * this gives a layered typographic motion grammar.
 */
export function CharSplit({
  text,
  className = "",
  stagger = 0.022,
  delay = 0,
  y = 0.6,
}: CharSplitProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = ref.current;
    if (!node) return;

    const chars = node.querySelectorAll<HTMLSpanElement>("[data-char]");
    if (chars.length === 0) return;

    if (reduced) {
      gsap.set(chars, { y: 0, opacity: 1 });
      return;
    }

    gsap.set(chars, { y: `${y}em`, opacity: 0 });

    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            gsap.to(chars, {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power3.out",
              stagger,
              delay,
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(node);

    const safety = window.setTimeout(() => {
      const stillHidden = node.querySelector<HTMLSpanElement>(
        '[data-char][style*="opacity: 0"]'
      );
      if (stillHidden) {
        gsap.to(chars, { y: 0, opacity: 1, duration: 0.5, stagger: 0.01 });
      }
    }, 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [stagger, delay, y, text]);

  // Preserve newlines as <br>; split into characters elsewhere.
  const lines = text.split("\n");

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      {lines.map((line, li) => (
        <span key={`l-${li}`} className="block">
          {Array.from(line).map((ch, ci) => {
            const isSpace = ch === " ";
            return (
              <span
                key={`c-${li}-${ci}`}
                data-char
                className="inline-block"
                style={{ willChange: "transform, opacity" }}
              >
                {isSpace ? " " : ch}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
