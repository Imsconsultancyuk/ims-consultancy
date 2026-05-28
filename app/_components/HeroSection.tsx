"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PointerVideo } from "./PointerVideo";
import { MagneticButton } from "./MagneticButton";

/**
 * Hero. Direct, to-the-point messaging about removing manual work.
 * No IMS branding here — the brand carries through the rest of the page
 * and the trophy header. The hero exists to land one promise and offer
 * two clean next steps.
 *
 * On scroll, every element parallax-glides out at a different speed so
 * the hero hands the visitor cleanly into the approach band below.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const section = sectionRef.current;
    const kicker = kickerRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const ctas = ctasRef.current;
    const cue = cueRef.current;
    if (!section || !kicker || !headline || !body || !ctas || !cue) return;

    const els = [kicker, headline, body, ctas, cue];

    const entrance = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.0 },
    });
    if (reduced) {
      gsap.set(els, { opacity: 1, y: 0 });
    } else {
      gsap.set(els, { opacity: 0, y: 28 });
      entrance
        .to(kicker, { opacity: 1, y: 0 }, 0.05)
        .to(headline, { opacity: 1, y: 0 }, 0.22)
        .to(body, { opacity: 1, y: 0 }, 0.44)
        .to(ctas, { opacity: 1, y: 0 }, 0.62)
        .to(cue, { opacity: 1, y: 0 }, 0.82);
    }

    // Cinematic parallax only — opacity stays at 1 the whole way so content
    // is always visible when the visitor scrolls back to the top. The next
    // section's solid background naturally covers the hero as it scrolls up.
    let trigger: ScrollTrigger | null = null;
    if (!reduced) {
      const drift = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });
      drift
        .to(kicker, { y: -40, ease: "none" }, 0)
        .to(headline, { y: -90, ease: "none" }, 0)
        .to(body, { y: -130, ease: "none" }, 0)
        .to(ctas, { y: -170, ease: "none" }, 0)
        .to(cue, { y: 60, opacity: 0, ease: "none" }, 0);
      trigger = drift.scrollTrigger ?? null;
    }

    return () => {
      entrance.kill();
      trigger?.kill();
      // Restore final visible state in case the trigger was killed mid-scroll
      gsap.set(els, { clearProps: "opacity" });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-deep px-6 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28"
    >
      <PointerVideo
        src="/videos/ims-hero-particle-wave.mp4"
        className="absolute inset-0 -z-20 h-full w-full"
        filter="hue-rotate(160deg) saturate(1.05) brightness(0.85) contrast(1.05)"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(26,22,32,0.20) 0%, rgba(26,22,32,0.55) 55%, rgba(26,22,32,0.85) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl text-center text-paper-ink">
        <div ref={kickerRef} className="will-change-transform">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-mauve-200">
            Strategy · Build · Automate
          </p>
        </div>

        <div ref={headlineRef} className="will-change-transform">
          <h1
            id="hero-heading"
            className="ims-glass-text mt-8 font-serif text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.018em]"
          >
            Get the manual work
            <br />
            off your team.
          </h1>
        </div>

        <div ref={bodyRef} className="will-change-transform">
          <p className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300 sm:text-[1.125rem]">
            We audit what eats your week, build the quiet systems to remove
            it, and hand them over so they keep returning value long after
            we leave.
          </p>
        </div>

        <div
          ref={ctasRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 will-change-transform sm:flex-row"
        >
          <MagneticButton strength={0.4} radius={110}>
            <Link
              href="/contact"
              data-cursor="cta"
              className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-7 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
            >
              Start a conversation
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.28} radius={90}>
            <Link
              href="/services"
              data-cursor="link"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-mauve-300/40 bg-deep/40 px-7 text-sm font-medium tracking-[0.02em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/70"
            >
              <span>Explore Services</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 7h8M8 3l3 4-3 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </MagneticButton>
        </div>

        <div
          ref={cueRef}
          className="mt-16 flex flex-col items-center text-mauve-200 will-change-transform"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
            Scroll on
          </span>
          <span
            aria-hidden
            className="mt-2 inline-block h-10 w-px animate-[scrollHint_2.4s_ease-in-out_infinite]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(212,176,212,0.75), rgba(212,176,212,0))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
