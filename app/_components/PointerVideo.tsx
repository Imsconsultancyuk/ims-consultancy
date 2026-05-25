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
  /** Maximum tilt in degrees applied to the container as the pointer moves. 0 disables tilt. */
  tilt?: number;
}

/**
 * Background video that subtly tilts toward the pointer and carries a soft
 * mauve radial glow that drifts behind the cursor. Auto-disables on touch
 * devices and when the user prefers reduced motion. Pattern adapted from
 * the Drift and Forge motion primitives (CursorGlow + Magnetic).
 */
export function PointerVideo({
  src,
  poster,
  className = "",
  filter = "hue-rotate(285deg) saturate(0.9) brightness(0.78)",
  glow = true,
  tilt = 3.5,
}: PointerVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduced) return;

    const container = containerRef.current;
    const glowEl = glowRef.current;
    if (!container) return;

    const tiltXTo = gsap.quickTo(container, "rotationX", {
      duration: 0.8,
      ease: "power3.out",
    });
    const tiltYTo = gsap.quickTo(container, "rotationY", {
      duration: 0.8,
      ease: "power3.out",
    });

    let glowXTo: ((v: number) => void) | null = null;
    let glowYTo: ((v: number) => void) | null = null;
    if (glow && glowEl) {
      glowXTo = gsap.quickTo(glowEl, "x", { duration: 1.0, ease: "power3.out" });
      glowYTo = gsap.quickTo(glowEl, "y", { duration: 1.0, ease: "power3.out" });
    }

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
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

    window.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [glow, tilt]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{
        perspective: "1400px",
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
        style={{ filter, willChange: "filter" }}
      />
      {glow && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 hidden lg:block"
          style={{
            width: 480,
            height: 480,
            marginLeft: -240,
            marginTop: -240,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212, 176, 212, 0.35), rgba(180, 160, 180, 0.12) 40%, transparent 72%)",
            mixBlendMode: "overlay",
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
}
