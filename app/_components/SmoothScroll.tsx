"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Mounts Lenis smooth scroll and wires it into GSAP ScrollTrigger so every
 * scroll-driven animation in the site stays in lockstep with the Lenis
 * inertia. Renders nothing.
 *
 * Pattern: Lenis owns the scroll loop, GSAP ticker drives Lenis frames,
 * and ScrollTrigger.update fires on every Lenis scroll event so pinned
 * sections, scrub timelines, and reveals all read the right scrollY.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      lerp: 0.1,
    });

    // ScrollTrigger reads Lenis scroll position on every scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker drives Lenis's RAF loop (single source of truth)
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose for any component that needs to scrollTo / stop / start
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
