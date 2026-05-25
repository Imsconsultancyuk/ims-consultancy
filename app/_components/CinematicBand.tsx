"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  {
    kicker: "Decide",
    headline: "Walk in.",
    body: "Strategy that holds at three in the morning. Positioning that fits where the business actually sits today.",
  },
  {
    kicker: "Build",
    headline: "Walk forward.",
    body: "Architecture that ships, code that stays shipped, and decisions you can defend in any review at any hour.",
  },
  {
    kicker: "Compound",
    headline: "Walk away free.",
    body: "Quiet systems that keep returning value long after the engagement ends. AI native, considered, never noisy.",
  },
];

/**
 * Cinematic full-bleed section. The figure-walking video stays pinned for
 * the section duration while three text panels crossfade as the visitor
 * scrolls past. Mauve gradient overlay keeps the type readable without
 * dimming the video. Reduced-motion users get a single static panel and
 * no pin.
 */
export function CinematicBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const panelsWrap = panelsRef.current;
    if (!section || !sticky || !panelsWrap || reduced) return;

    const panels = panelsWrap.querySelectorAll<HTMLDivElement>("[data-panel]");
    if (panels.length === 0) return;

    // Set initial state: only first panel visible
    gsap.set(panels, { autoAlpha: 0, y: 40 });
    gsap.set(panels[0], { autoAlpha: 1, y: 0 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: sticky,
      pinSpacing: false,
      scrub: 1,
    });

    // Build a crossfade timeline that progresses with scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    panels.forEach((panel, i) => {
      if (i === 0) return; // first is visible at start
      const segmentStart = i / panels.length;
      // outgoing previous panel
      tl.to(
        panels[i - 1],
        { autoAlpha: 0, y: -40, duration: 0.4, ease: "power2.in" },
        segmentStart
      );
      // incoming current panel
      tl.fromTo(
        panel,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
        segmentStart + 0.05
      );
    });

    return () => {
      trigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-deep text-paper-ink"
      style={{ height: "300vh" }}
    >
      <div
        ref={stickyRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Video as full-bleed background. Portrait 9:16, cover-fitted with
            mauve veil so the sides letterbox cleanly without harsh black. */}
        <video
          src="/videos/ims-decide-figure-walking.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "hue-rotate(280deg) saturate(0.9) brightness(0.78) contrast(1.08)",
            transform: "scale(1.04)",
          }}
        />
        {/* Dark wash so the text reads */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(26,22,32,0.85) 0%, rgba(26,22,32,0.35) 45%, rgba(26,22,32,0.85) 100%)",
          }}
        />
        {/* Mauve top vignette for atmosphere */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(120,100,120,0.18), transparent 60%)",
          }}
        />

        {/* Text panels overlaid left */}
        <div
          ref={panelsRef}
          className="relative grid h-full place-items-center px-6"
        >
          <div className="grid h-full w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 lg:col-start-1">
              {PANELS.map((p) => (
                <div
                  key={p.kicker}
                  data-panel
                  className="absolute inset-x-6 max-w-2xl lg:relative lg:inset-auto"
                  style={{ willChange: "transform, opacity" }}
                >
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    {p.kicker}
                  </p>
                  <h2 className="mt-4 font-serif text-[clamp(3rem,6.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-paper-ink">
                    {p.headline}
                  </h2>
                  <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll dots indicator (right side) */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-8 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
        >
          {PANELS.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-mauve-300/45"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
