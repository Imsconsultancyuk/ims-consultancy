"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PointerVideo } from "./PointerVideo";

/**
 * Cinematic hero section with full scroll choreography.
 *
 * Visible behaviour:
 *  - Pointer-reactive video background (mauve particle wave, tilts toward cursor).
 *  - Logo, headline, body, CTAs all enter on mount with staggered slide-up
 *    and fade.
 *  - On scroll, each element parallax-glides out at a different rate so the
 *    hero "delivers" the visitor into the next section rather than abruptly
 *    cutting. The logo specifically shrinks and lifts toward the header
 *    pill position, completing a soft FLIP between hero centre and header.
 *  - Scroll-progress cue blinks at the bottom until the visitor moves past
 *    the first viewport.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const section = sectionRef.current;
    const logo = logoRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const ctas = ctasRef.current;
    const cue = cueRef.current;
    if (!section || !logo || !headline || !body || !ctas || !cue) return;

    // ENTRANCE — runs once on mount
    const entrance = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.0 },
    });
    if (reduced) {
      gsap.set([logo, headline, body, ctas, cue], { opacity: 1, y: 0, scale: 1 });
    } else {
      gsap.set([logo, headline, body, ctas, cue], { opacity: 0 });
      gsap.set(logo, { scale: 0.92, y: 16 });
      gsap.set(headline, { y: 32 });
      gsap.set(body, { y: 24 });
      gsap.set(ctas, { y: 20 });
      gsap.set(cue, { y: 8 });
      entrance
        .to(logo, { opacity: 1, scale: 1, y: 0 }, 0.1)
        .to(headline, { opacity: 1, y: 0 }, 0.32)
        .to(body, { opacity: 1, y: 0 }, 0.52)
        .to(ctas, { opacity: 1, y: 0 }, 0.7)
        .to(cue, { opacity: 1, y: 0 }, 0.9);
    }

    // SCROLL-OUT — parallax glide out as visitor scrolls into next section
    let scrollTrigger: ScrollTrigger | null = null;
    if (!reduced) {
      const scrollOut = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom 30%",
          scrub: 1.1,
        },
      });
      scrollOut
        // Logo shrinks toward the header pill, lifts up + fades
        .to(
          logo,
          { y: -120, scale: 0.35, opacity: 0, ease: "power2.in" },
          0
        )
        // Headline glides up faster (parallax depth feel)
        .to(headline, { y: -180, opacity: 0, ease: "power2.in" }, 0.04)
        .to(body, { y: -240, opacity: 0, ease: "power2.in" }, 0.08)
        .to(ctas, { y: -300, opacity: 0, ease: "power2.in" }, 0.12)
        .to(cue, { y: -60, opacity: 0, ease: "power2.in" }, 0);
      scrollTrigger = scrollOut.scrollTrigger ?? null;
    }

    return () => {
      entrance.kill();
      scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-deep px-6 pt-32 pb-32 sm:pt-44 sm:pb-40 lg:pt-52 lg:pb-48"
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
        <div ref={logoRef} className="will-change-transform">
          <Image
            src="/logos/ims-horizontal-transparent.png"
            alt="IMS Consultancy. Intelligence Made Simple."
            width={520}
            height={170}
            priority
            sizes="(min-width: 1024px) 460px, (min-width: 640px) 380px, 300px"
            style={{ height: "auto" }}
            className="mx-auto w-[300px] sm:w-[380px] lg:w-[460px]"
          />
        </div>

        <div ref={headlineRef} className="will-change-transform">
          <h1
            className="ims-glass-text mt-14 font-serif text-[clamp(3rem,6.2vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.018em]"
          >
            Considered work
            <br />
            for ambitious operators.
          </h1>
        </div>

        <div ref={bodyRef} className="will-change-transform">
          <p className="mx-auto mt-8 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
            A strategic consultancy for business decisions, development, and
            AI workflows. Honest answers and results that hold up over time.
          </p>
        </div>

        <div
          ref={ctasRef}
          className="mt-12 flex flex-col items-center justify-center gap-4 will-change-transform sm:flex-row"
        >
          <a
            href="mailto:hello@intelmadesimple.com"
            data-cursor="cta"
            className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
          >
            Start a conversation
          </a>
          <Link
            href="#approach"
            data-cursor="link"
            className="inline-flex h-12 items-center justify-center px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-ink transition-colors hover:text-mauve-200"
          >
            How we work
          </Link>
        </div>

        <div
          ref={cueRef}
          className="mt-20 flex flex-col items-center text-mauve-200 will-change-transform"
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
