"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

interface PointerTiltProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Default 6. */
  tilt?: number;
  /** Sheen highlight that follows the cursor inside the card. Default true. */
  sheen?: boolean;
}

/**
 * Adds a subtle 3D tilt and a mauve sheen that follows the pointer across
 * any interactive card. Wraps children in a perspective container so the
 * tilt has real depth. Auto-disables on touch and reduced-motion.
 */
export function PointerTilt({
  children,
  className = "",
  tilt = 6,
  sheen = true,
}: PointerTiltProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduced) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    const sheenEl = sheenRef.current;
    if (!outer || !inner) return;

    const tiltX = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
    const tiltY = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });
    const sheenX = sheenEl
      ? gsap.quickTo(sheenEl, "x", { duration: 0.45, ease: "power3.out" })
      : null;
    const sheenY = sheenEl
      ? gsap.quickTo(sheenEl, "y", { duration: 0.45, ease: "power3.out" })
      : null;

    const onMove = (e: MouseEvent) => {
      const r = outer.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      tiltY(dx * tilt);
      tiltX(-dy * tilt);
      if (sheenX && sheenY) {
        sheenX(e.clientX - r.left);
        sheenY(e.clientY - r.top);
      }
    };
    const onLeave = () => {
      tiltX(0);
      tiltY(0);
    };
    const onEnter = () => {
      if (sheenEl) gsap.to(sheenEl, { opacity: 1, duration: 0.4 });
    };
    const onMouseLeaveCard = () => {
      if (sheenEl) gsap.to(sheenEl, { opacity: 0, duration: 0.4 });
    };

    outer.addEventListener("mousemove", onMove);
    outer.addEventListener("mouseleave", onLeave);
    outer.addEventListener("mouseenter", onEnter);
    outer.addEventListener("mouseleave", onMouseLeaveCard);
    return () => {
      outer.removeEventListener("mousemove", onMove);
      outer.removeEventListener("mouseleave", onLeave);
      outer.removeEventListener("mouseenter", onEnter);
      outer.removeEventListener("mouseleave", onMouseLeaveCard);
    };
  }, [tilt, sheen]);

  return (
    <div
      ref={outerRef}
      className={`relative ${className}`}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      data-cursor="tilt"
    >
      <div
        ref={innerRef}
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
        {sheen && (
          <div
            ref={sheenRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 hidden opacity-0 lg:block"
            style={{
              width: 300,
              height: 300,
              marginLeft: -150,
              marginTop: -150,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,176,212,0.20), transparent 70%)",
              mixBlendMode: "screen",
              willChange: "transform, opacity",
            }}
          />
        )}
      </div>
    </div>
  );
}
