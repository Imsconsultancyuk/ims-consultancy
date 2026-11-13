"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

import { useReducedMotion } from "./useReducedMotion";

interface MotionCueProps {
  children: ReactNode;
  onClick: () => void;
  // "dark" sits on the dark hero, "light" on the paper background.
  tone?: "dark" | "light";
  controls?: string;
}

// The call to act: an amber pill with two rings that breathe outward and an arrow that
// drops and returns. It is a real button with a visible label, so it works with no JS
// motion; the rings and arrow are decoration and stop under reduced motion.
export function MotionCue({ children, onClick, tone = "light", controls }: MotionCueProps) {
  const root = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = root.current;
    if (!node || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ring]",
        { scale: 1, autoAlpha: 0.55 },
        { scale: 1.45, autoAlpha: 0, duration: 1.9, ease: "power2.out", repeat: -1, stagger: 0.95 },
      );
      gsap.fromTo(
        "[data-arrow]",
        { y: -3 },
        { y: 4, duration: 0.7, ease: "sine.inOut", repeat: -1, yoyo: true },
      );
    }, node);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <span ref={root} className="relative inline-flex">
      <span
        data-ring
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-full border-2 ${tone === "dark" ? "border-accent-400" : "border-accent-500"} opacity-0`}
      />
      <span
        data-ring
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-full border-2 ${tone === "dark" ? "border-accent-400" : "border-accent-500"} opacity-0`}
      />
      <button
        type="button"
        onClick={onClick}
        aria-controls={controls}
        className="relative inline-flex min-h-12 items-center gap-3 rounded-full bg-accent-500 pl-6 pr-5 text-[0.9375rem] font-semibold text-on-amber transition-[transform,background-color] duration-200 hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 active:scale-[0.97] motion-reduce:transition-none"
      >
        {children}
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <g data-arrow>
            <path d="M12 5v13M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </button>
    </span>
  );
}
