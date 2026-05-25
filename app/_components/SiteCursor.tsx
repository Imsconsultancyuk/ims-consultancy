"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Site-wide custom cursor.
 *
 * Three coordinated layers:
 *   1. dot   — fast tracking, 6px mauve dot
 *   2. ring  — slower trailing 24px ring that scales on link/CTA hover
 *   3. glow  — soft 520px radial that drifts behind everything
 *
 * Bails on touch devices and prefers-reduced-motion. Hover state is read
 * from a `data-cursor` attribute on closest interactive ancestor so any
 * element can opt in: data-cursor="link" | "cta" | "tilt".
 *
 * Pattern adapted from Drift and Forge's Cursor + CursorGlow primitives.
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

    document.body.style.cursor = "none";

    let state: "default" | "link" | "cta" | "tilt" = "default";

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const glowX = gsap.quickTo(glow, "x", { duration: 1.4, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 1.4, ease: "power3.out" });

    // Seed centre so the glow appears without a snap on first move
    gsap.set([dot, ring, glow], {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    gsap.to([dot, ring], { opacity: 1, duration: 0.4, delay: 0.15 });
    gsap.to(glow, { opacity: 1, duration: 1.2, delay: 0.4 });

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
            borderColor: "rgba(212,176,212,0.55)",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
          break;
        case "link":
          gsap.to(ring, {
            scale: 1.7,
            opacity: 1,
            borderColor: "rgba(212,176,212,0.85)",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 0.4, opacity: 0.6, duration: 0.2 });
          break;
        case "cta":
          gsap.to(ring, {
            scale: 2.4,
            opacity: 1,
            borderColor: "rgba(212,176,212,1)",
            boxShadow: "0 0 24px rgba(212,176,212,0.55)",
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
          break;
        case "tilt":
          gsap.to(ring, {
            scale: 3.2,
            opacity: 0.7,
            borderColor: "rgba(212,176,212,0.45)",
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
      const link = t.closest<HTMLElement>('a, button, [data-cursor="link"]');
      if (cta) setState("cta");
      else if (tilt) setState("tilt");
      else if (link) setState("link");
      else setState("default");
    };

    const onLeave = () => gsap.to([dot, ring, glow], { opacity: 0, duration: 0.25 });
    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      gsap.to(glow, { opacity: 1, duration: 0.4 });
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
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Big soft glow, sits behind everything via mix-blend */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-0 hidden lg:block"
        style={{
          width: 520,
          height: 520,
          marginLeft: -260,
          marginTop: -260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,160,180,0.12), rgba(180,160,180,0.04) 35%, transparent 70%)",
          mixBlendMode: "screen",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden lg:block"
        style={{
          width: 24,
          height: 24,
          marginLeft: -12,
          marginTop: -12,
          borderRadius: "50%",
          border: "1px solid rgba(212,176,212,0.55)",
          opacity: 0,
          willChange: "transform, opacity, scale",
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden lg:block"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          background: "rgba(212,176,212,1)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
