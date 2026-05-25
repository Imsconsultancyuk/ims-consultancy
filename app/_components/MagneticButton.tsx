"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  /** Pull strength 0 to 1. Default 0.4 (strong but subtle). */
  strength?: number;
  /** Magnetic field radius in pixels beyond the element. Default 100. */
  radius?: number;
  className?: string;
}

/**
 * Wraps a child element so it is physically pulled toward the pointer when
 * the pointer enters its magnetic field. The visible label inside also
 * tilts slightly. Snaps back to neutral on leave with a gentle spring.
 *
 * Reads `prefers-reduced-motion` and silently disables.
 */
export function MagneticButton({
  children,
  strength = 0.4,
  radius = 100,
  className = "",
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduced) return;

    const wrap = wrapRef.current;
    const child = childRef.current;
    if (!wrap || !child) return;

    const wrapX = gsap.quickTo(wrap, "x", { duration: 0.6, ease: "power3.out" });
    const wrapY = gsap.quickTo(wrap, "y", { duration: 0.6, ease: "power3.out" });
    const childX = gsap.quickTo(child, "x", { duration: 0.7, ease: "power3.out" });
    const childY = gsap.quickTo(child, "y", { duration: 0.7, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const fieldR = Math.max(r.width, r.height) / 2 + radius;
      if (dist < fieldR) {
        const k = strength;
        wrapX(dx * k);
        wrapY(dy * k);
        // The inner element gets a slightly smaller, slower pull —
        // creates a parallax feel inside the button.
        childX(dx * k * 0.35);
        childY(dy * k * 0.35);
      } else {
        wrapX(0);
        wrapY(0);
        childX(0);
        childY(0);
      }
    };

    const onLeave = () => {
      gsap.to(wrap, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.45)",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius]);

  return (
    <div ref={wrapRef} className={`inline-block ${className}`} style={{ willChange: "transform" }}>
      <div ref={childRef} className="inline-block" style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
