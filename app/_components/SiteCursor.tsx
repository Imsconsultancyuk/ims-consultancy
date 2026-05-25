"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Site-wide custom cursor. Three coordinated layers:
 *   1. dot   — fast tracking, 8px mauve dot
 *   2. ring  — slower trailing 28px ring, scales on link/CTA hover
 *   3. glow  — soft 560px radial that drifts behind everything
 *
 * Visible from frame 1 on any desktop (no hidden-until-mousemove flash).
 * Bails silently on touch or prefers-reduced-motion.
 *
 * Hover state read from `data-cursor` attribute on closest interactive
 * ancestor: data-cursor="link" | "cta" | "tilt" — but also automatic on
 * <a>, <button>, and form submit buttons.
 */
export function SiteCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    // Hide the native cursor on the page itself (interactive elements
    // still inherit `none` via the html-level rule in globals.css).
    document.documentElement.classList.add("has-custom-cursor");

    let state: "default" | "link" | "cta" | "tilt" = "default";

    const dotX = gsap.quickTo(dot, "x", { duration: 0.10, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.10, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const glowX = gsap.quickTo(glow, "x", { duration: 1.4, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 1.4, ease: "power3.out" });

    // Seed at viewport centre so the cursor is visible immediately
    const cx0 = window.innerWidth / 2;
    const cy0 = window.innerHeight / 2;
    gsap.set([dot, ring, glow], { x: cx0, y: cy0, opacity: 1 });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      glowX(e.clientX);
      glowY(e.clientY);
    };

    const setState = (next: typeof state) => {
      if (next === state) return;
      state = next;
      switch (next) {
        case "default":
          gsap.to(ring, {
            scale: 1,
            opacity: 1,
            borderColor: "rgba(212,176,212,0.7)",
            boxShadow: "0 0 0 rgba(212,176,212,0)",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
          break;
        case "link":
          gsap.to(ring, {
            scale: 1.85,
            opacity: 1,
            borderColor: "rgba(212,176,212,0.95)",
            boxShadow: "0 0 16px rgba(212,176,212,0.35)",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 0.35, opacity: 0.55, duration: 0.2 });
          break;
        case "cta":
          gsap.to(ring, {
            scale: 2.6,
            opacity: 1,
            borderColor: "rgba(212,176,212,1)",
            boxShadow: "0 0 28px rgba(212,176,212,0.65)",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
          break;
        case "tilt":
          gsap.to(ring, {
            scale: 3.4,
            opacity: 0.75,
            borderColor: "rgba(212,176,212,0.55)",
            boxShadow: "0 0 22px rgba(212,176,212,0.30)",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 0.6, opacity: 1, duration: 0.2 });
          break;
      }
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t?.closest) return;
      const cta = t.closest<HTMLElement>('[data-cursor="cta"], button[type="submit"]');
      const tilt = t.closest<HTMLElement>('[data-cursor="tilt"]');
      const link = t.closest<HTMLElement>('a, button, [data-cursor="link"], input, select, textarea');
      if (cta) setState("cta");
      else if (tilt) setState("tilt");
      else if (link) setState("link");
      else setState("default");
    };

    const onLeave = () => gsap.to([dot, ring, glow], { opacity: 0, duration: 0.25 });
    const onEnter = () => {
      gsap.to([dot, ring, glow], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[40] hidden md:block"
        style={{
          width: 560,
          height: 560,
          marginLeft: -280,
          marginTop: -280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,176,212,0.18), rgba(180,160,180,0.06) 35%, transparent 70%)",
          mixBlendMode: "screen",
          opacity: 1,
          willChange: "transform, opacity",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderRadius: "50%",
          border: "1.5px solid rgba(212,176,212,0.7)",
          opacity: 1,
          willChange: "transform, opacity, scale",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          background: "rgba(212,176,212,1)",
          boxShadow: "0 0 8px rgba(212,176,212,0.55)",
          opacity: 1,
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
