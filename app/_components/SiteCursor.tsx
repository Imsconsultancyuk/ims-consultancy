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
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduced) return;

    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    document.documentElement.classList.add("has-custom-cursor");

    let state: "default" | "link" | "cta" | "tilt" = "default";

    const dotX = gsap.quickTo(dot, "x", { duration: 0.10, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.10, ease: "power3" });
    const glowX = gsap.quickTo(glow, "x", { duration: 1.4, ease: "power3.out" });
    const glowY = gsap.quickTo(glow, "y", { duration: 1.4, ease: "power3.out" });

    const cx0 = window.innerWidth / 2;
    const cy0 = window.innerHeight / 2;
    gsap.set([dot, glow], { x: cx0, y: cy0, opacity: 1 });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      glowX(e.clientX);
      glowY(e.clientY);
    };

    const setState = (next: typeof state) => {
      if (next === state) return;
      state = next;
      switch (next) {
        case "default":
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            backgroundColor: "rgba(126, 160, 255,1)",
            boxShadow: "0 0 10px rgba(126, 160, 255,0.55)",
            duration: 0.25,
            ease: "power3.out",
          });
          break;
        case "link":
          gsap.to(dot, {
            scale: 1.6,
            opacity: 1,
            backgroundColor: "rgba(126, 160, 255,1)",
            boxShadow: "0 0 18px rgba(126, 160, 255,0.75)",
            duration: 0.25,
            ease: "power3.out",
          });
          break;
        case "cta":
          gsap.to(dot, {
            scale: 2.2,
            opacity: 1,
            backgroundColor: "rgba(126, 160, 255,1)",
            boxShadow: "0 0 32px rgba(126, 160, 255,0.95)",
            duration: 0.25,
            ease: "power3.out",
          });
          break;
        case "tilt":
          gsap.to(dot, {
            scale: 1.3,
            opacity: 0.9,
            backgroundColor: "rgba(126, 160, 255,1)",
            boxShadow: "0 0 22px rgba(126, 160, 255,0.55)",
            duration: 0.25,
            ease: "power3.out",
          });
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

    const onLeave = () => gsap.to([dot, glow], { opacity: 0, duration: 0.25 });
    const onEnter = () => gsap.to([dot, glow], { opacity: 1, duration: 0.3 });

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
            "radial-gradient(circle, rgba(126, 160, 255,0.18), rgba(58, 109, 240,0.06) 35%, transparent 70%)",
          mixBlendMode: "screen",
          opacity: 1,
          willChange: "transform, opacity",
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
          background: "rgba(126, 160, 255,1)",
          boxShadow: "0 0 10px rgba(126, 160, 255,0.55)",
          opacity: 1,
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
