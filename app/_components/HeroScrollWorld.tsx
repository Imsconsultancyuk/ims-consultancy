"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

/**
 * HeroScrollWorld — IMS's flagship scroll hero.
 *
 * A tall outer track holds the scroll distance; an inner CSS-`sticky` stage
 * stays fixed in the viewport while the cinematic clip is scrubbed frame-by-
 * frame by scroll position and solution beats reveal over it. CSS sticky is
 * used for the visual hold (GSAP pinning fights Lenis smooth scroll and was
 * letting the section scroll away). ScrollTrigger only reads progress to drive
 * the video time, the active beat, and the end-dim.
 *
 * Non-negotiables:
 * - Text never gated behind animation (LESSONS #2): every beat is in the SSR
 *   DOM; reduced-motion / no-JS sees poster + beat 1.
 * - The clip loads as a seekable blob so scrubbing works on any host.
 */

interface Beat {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  cta: { label: string; href: string };
}

const BEATS: Beat[] = [
  {
    id: "overload",
    eyebrow: "Intelligence made simple",
    title: (
      <>
        Get the manual work
        <br />
        off your team.
      </>
    ),
    body: "We audit what eats your week, build the quiet systems to remove it, and hand them over so they keep returning value.",
    cta: { label: "Start a conversation", href: "/contact" },
  },
  {
    id: "decide",
    eyebrow: "01 · Decide",
    title: <>The right call, said plainly.</>,
    body: "We measure where your week actually goes before we touch a line of code.",
    cta: { label: "Book a decision audit", href: "/services/strategic-advisory" },
  },
  {
    id: "build",
    eyebrow: "02 · Build",
    title: (
      <>
        Software that ships
        <br />
        and stays shipped.
      </>
    ),
    body: "Next.js, TypeScript, Postgres, sensible defaults. Systems built along the lines the audit drew.",
    cta: { label: "See how we build", href: "/services/custom-software" },
  },
  {
    id: "connect",
    eyebrow: "03 · Automate",
    title: (
      <>
        AI in the background,
        <br />
        not in the way.
      </>
    ),
    body: "Your tools already hold the work. We connect them quietly so AI runs where the work already lives.",
    cta: { label: "Explore AI automation", href: "/services/ai-automation" },
  },
  {
    id: "compound",
    eyebrow: "04 · Compound",
    title: <>Quiet automation, loud results.</>,
    body: "The work moves on its own. Eighty-two minutes per person per day, returned.",
    cta: { label: "See the outcomes", href: "/case-studies" },
  },
  {
    id: "payoff",
    eyebrow: "Ready when you are",
    title: <>Make a clearer move.</>,
    cta: { label: "Start a conversation", href: "/contact" },
  },
];

interface HeroScrollWorldProps {
  videoSrc?: string;
  posterSrc?: string;
  /** Viewport-heights of scroll distance the hero occupies. */
  scrollLength?: number;
}

export function HeroScrollWorld({
  videoSrc = "/videos/hero/flagship.mp4",
  posterSrc = "/videos/hero/flagship-poster.jpg",
  scrollLength = 6,
}: HeroScrollWorldProps) {
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<[number, number]>([0.5, 0.5]);
  const [activeBeat, setActiveBeat] = useState(0);
  const [clipReady, setClipReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    // ?motion=on forces the animated path (used to verify in headless browsers
    // that report prefers-reduced-motion: reduce).
    const forced = new URLSearchParams(window.location.search).has("motion");
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forced,
    );
  }, []);

  // Seekable-blob load of the clip.
  useEffect(() => {
    if (typeof window === "undefined" || !videoSrc || reduced) return;
    const el = videoRef.current;
    if (!el) return;
    let objectUrl: string | null = null;
    let cancelled = false;
    fetch(videoSrc)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error("clip fetch failed"))))
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        el.src = objectUrl;
        el.load();
      })
      .catch(() => {});
    const onReady = () => setClipReady(true);
    el.addEventListener("loadeddata", onReady);
    return () => {
      cancelled = true;
      el.removeEventListener("loadeddata", onReady);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [videoSrc, reduced]);

  // Scrub progress off the tall track. Sticky handles the visual hold.
  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const video = videoRef.current;
          if (video && clipReady && video.duration) {
            video.currentTime = p * video.duration;
          }
          setActiveBeat(Math.min(BEATS.length - 1, Math.floor(p * BEATS.length)));
          // Dim the last frame so the closing CTA reads (ramps over final 26%).
          if (dimRef.current) {
            const dim = Math.max(0, (p - 0.74) / 0.26);
            dimRef.current.style.opacity = String(Math.min(1, dim) * 0.62);
          }
        },
      });
    }, track);
    return () => ctx.revert();
  }, [clipReady, reduced]);

  // Pointer parallax on the copy.
  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      pointer.current = [
        e.clientX / window.innerWidth - 0.5,
        e.clientY / window.innerHeight - 0.5,
      ];
    };
    const tick = () => {
      const [px, py] = pointer.current;
      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(${px * -16}px, ${py * -10}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      ref={trackRef}
      aria-labelledby="hero-heading"
      className="relative bg-paper"
      style={{ height: reduced ? "100dvh" : `${scrollLength * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden text-ink">
        {/* Film: poster until the blob paints, then the scrubbed clip. */}
        <div aria-hidden className="absolute inset-0 -z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterSrc}
            alt=""
            className="h-full w-full object-cover"
            style={{ opacity: clipReady ? 0 : 1, transition: "opacity 600ms ease" }}
          />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: clipReady ? 1 : 0, transition: "opacity 600ms ease" }}
            muted
            playsInline
            preload="none"
            poster={posterSrc}
          />
        </div>

        {/* Legibility scrim: cream-left behind the copy, clearing right. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(100deg, rgba(247,243,236,0.95) 0%, rgba(247,243,236,0.82) 32%, rgba(247,243,236,0.45) 60%, rgba(247,243,236,0.10) 100%), linear-gradient(to top, rgba(247,243,236,0.55) 0%, rgba(247,243,236,0) 44%)",
          }}
        />
        {/* End-dim: fades up to cream over the final stretch so the closing CTA pops. */}
        <div
          ref={dimRef}
          aria-hidden
          className="absolute inset-0 -z-10 bg-paper"
          style={{ opacity: 0 }}
        />

        <div
          ref={stageRef}
          className="relative mx-auto flex h-[100dvh] w-full max-w-[1400px] items-center px-6 will-change-transform lg:px-12"
        >
          <div className="relative w-full max-w-2xl">
            {BEATS.map((beat, i) => {
              const isFirst = i === 0;
              const isLast = i === BEATS.length - 1;
              const visible = mounted && !reduced ? i === activeBeat : isFirst;
              return (
                <div
                  key={beat.id}
                  className={isFirst ? "relative" : "pointer-events-none absolute inset-0 top-1/2"}
                  style={
                    isFirst
                      ? { opacity: visible ? 1 : 0, transition: "opacity 500ms ease" }
                      : {
                          opacity: visible ? 1 : 0,
                          transform: `translateY(${visible ? "-50%" : "calc(-50% + 26px)"})`,
                          transition: isLast
                            ? "opacity 700ms ease, transform 700ms ease"
                            : "opacity 550ms ease, transform 550ms ease",
                        }
                  }
                >
                  {beat.eyebrow ? (
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                      style={{ color: "#1e3ea6" }}
                    >
                      {beat.eyebrow}
                    </p>
                  ) : null}
                  <h1
                    id={isFirst ? "hero-heading" : undefined}
                    className="mt-6 font-serif text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink"
                    style={{ textShadow: "0 1px 1px rgba(247,243,236,0.6)" }}
                  >
                    {beat.title}
                  </h1>
                  {beat.body ? (
                    <p className="mt-7 max-w-lg text-[1.0625rem] leading-[1.7] text-ink/75 sm:text-[1.125rem]">
                      {beat.body}
                    </p>
                  ) : null}
                  <div className="pointer-events-auto mt-9">
                    <MagneticButton strength={0.4} radius={110}>
                      <Link
                        href={beat.cta.href}
                        data-cursor="cta"
                        className="group inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-medium tracking-[0.02em] text-paper-pure transition-all duration-300"
                        style={{
                          background: "linear-gradient(120deg, #5f86f7 0%, #3a6df0 55%, #2a54d4 100%)",
                          boxShadow: "0 8px 34px -10px rgba(58,109,240,0.65)",
                        }}
                      >
                        <span>{beat.cta.label}</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                          <path d="M3 7h8M8 3l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
