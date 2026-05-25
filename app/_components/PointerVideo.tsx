"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PointerVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /** CSS filter string applied to the video element. Used to recolour native palette toward mauve. */
  filter?: string;
  /** Show the soft mauve radial that follows the pointer inside the video bounds. */
  glow?: boolean;
  /** Maximum tilt in degrees applied to the inner layer as the pointer moves. 0 disables tilt. */
  tilt?: number;
}

/**
 * Cinematic background video with pointer reactivity:
 *  - Inner layer tilts toward the cursor (real CSS 3D perspective applied
 *    on the OUTER container so the child's rotateX/Y has depth).
 *  - Mauve radial glow drifts behind the cursor inside the video bounds.
 *
 * Auto-disables on touch devices and when prefers-reduced-motion is set.
 * Pattern adapted from Drift and Forge's CursorGlow + Magnetic primitives.
 */
export function PointerVideo({
  src,
  poster,
  className = "",
  filter = "hue-rotate(160deg) saturate(1.05) brightness(0.85) contrast(1.05)",
  glow = true,
  tilt = 6,
}: PointerVideoProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduced) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    const glowEl = glowRef.current;
    if (!outer || !inner) return;

    // The INNER element receives the rotation. Perspective is on the OUTER so
    // the rotation has actual depth.
    const tiltXTo = gsap.quickTo(inner, "rotationX", {
      duration: 0.9,
      ease: "power3.out",
    });
    const tiltYTo = gsap.quickTo(inner, "rotationY", {
      duration: 0.9,
      ease: "power3.out",
    });

    let glowXTo: ((v: number) => void) | null = null;
    let glowYTo: ((v: number) => void) | null = null;
    if (glow && glowEl) {
      glowXTo = gsap.quickTo(glowEl, "x", { duration: 1.0, ease: "power3.out" });
      glowYTo = gsap.quickTo(glowEl, "y", { duration: 1.0, ease: "power3.out" });
      // Seed glow position to centre so it appears immediately on first move.
      const r = outer.getBoundingClientRect();
      gsap.set(glowEl, { x: r.width / 2, y: r.height / 2 });
    }

    const onMove = (e: MouseEvent) => {
      const rect = outer.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        tiltXTo(0);
        tiltYTo(0);
        return;
      }

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      tiltYTo(dx * tilt);
      tiltXTo(-dy * tilt);

      if (glowXTo && glowYTo) {
        glowXTo(e.clientX - rect.left);
        glowYTo(e.clientY - rect.top);
      }
    };

    const onLeave = () => {
      tiltXTo(0);
      tiltYTo(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    outer.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      outer.removeEventListener("mouseleave", onLeave);
    };
  }, [glow, tilt]);

  return (
    <div
      ref={outerRef}
      className={`overflow-hidden ${className}`}
      style={{
        perspective: "1400px",
        perspectiveOrigin: "center center",
      }}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter,
            transform: "scale(1.06)",
            willChange: "filter, transform",
          }}
        />
        {glow && (
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 hidden lg:block"
            style={{
              width: 520,
              height: 520,
              marginLeft: -260,
              marginTop: -260,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212, 176, 212, 0.55), rgba(180, 160, 180, 0.20) 35%, transparent 70%)",
              mixBlendMode: "screen",
              willChange: "transform",
            }}
          />
        )}
      </div>
    </div>
  );
}
