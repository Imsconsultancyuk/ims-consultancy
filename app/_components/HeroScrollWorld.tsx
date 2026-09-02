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
 * stays fixed in the viewport while a cinematic frame sequence is scrubbed by
 * scroll position and solution beats reveal over it. CSS sticky is used for the
 * visual hold (GSAP pinning fights Lenis smooth scroll and was letting the
 * section scroll away). ScrollTrigger only reads progress to drive the frame
 * index, the active beat, and the end-dim.
 *
 * Why a frame sequence and not <video>:
 * The clip used to be scrubbed by writing `video.currentTime` on every
 * ScrollTrigger update. Lenis emits scroll events at rAF rate, so that issued a
 * seek every ~16ms into a 1080p decoder, and each new write aborts the seek
 * still in flight. Measured on this page: 212 seeks issued per pass, 105 of
 * them aborted before completing — the film froze, then snapped, for the whole
 * scrub. Seeking cannot be made reliable at scroll frequency, so the seek is
 * gone: 194 pre-decoded WebP frames are painted straight to a canvas. Zero
 * seeks, one draw per animation frame, and the sequence streams in
 * progressively instead of blocking on a 37MB blob download.
 *
 * Non-negotiables:
 * - Text never gated behind animation (LESSONS #2): every beat is in the SSR
 *   DOM; reduced-motion / no-JS sees poster + beat 1.
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

/** Frames extracted from flagship.mp4 at 8fps (24.29s clip → 194 frames). */
const FRAME_COUNT = 194;
const frameUrl = (i: number) =>
  `/videos/hero/frames/f-${String(i + 1).padStart(3, "0")}.webp`;

interface HeroScrollWorldProps {
  posterSrc?: string;
  /**
   * Viewport-heights of scroll distance the hero occupies.
   *
   * This sets the scrub pace. The sequence is scrubbed over ScrollTrigger's
   * range, which is trackHeight - viewportHeight, so the denominator is
   * (scrollLength - 1) viewport-heights, NOT scrollLength — the final viewport
   * height is the sticky release. House pace is 6.16 s/vh (the original 30.8s
   * clip over 6vh, i.e. 5vh of scrub). The source clip runs 24.27s, so
   * 24.27 / 6.16 = 3.94 vh of scrub, +1 for the release = 4.94. Recompute this
   * whenever the clip changes.
   */
  scrollLength?: number;
}

export function HeroScrollWorld({
  posterSrc = "/videos/hero/flagship-poster.jpg",
  scrollLength = 4.94,
}: HeroScrollWorldProps) {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<[number, number]>([0.5, 0.5]);
  /** Frame index the scroll wants; read by the paint loop, never painted from directly. */
  const wantedFrame = useRef(0);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
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

  // Load the sequence, then paint it. One effect: the loader and the paint loop
  // share the same frame store and must be torn down together.
  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    framesRef.current = frames;
    let cancelled = false;
    let painted = -1;
    let raf = 0;

    // Backing store in device pixels, capped at 2x — a 3x DPR phone would other-
    // wise allocate a 9x canvas for no visible gain and drop frames drawing it.
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        painted = -1; // resized buffer is blank; force a repaint
      }
    };
    size();

    /** Nearest loaded frame to `i`, so a gap in the sequence never blanks the stage. */
    const nearestLoaded = (i: number) => {
      if (frames[i]) return frames[i];
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (i - d >= 0 && frames[i - d]) return frames[i - d];
        if (i + d < FRAME_COUNT && frames[i + d]) return frames[i + d];
      }
      return null;
    };

    // object-cover, computed against the backing store.
    const draw = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const tick = () => {
      if (cancelled) return;
      size();
      const want = wantedFrame.current;
      if (want !== painted) {
        const img = nearestLoaded(want);
        if (img) {
          draw(img);
          // Only bank the index once the exact frame is the one on screen;
          // otherwise a stand-in would suppress the repaint when it arrives.
          painted = frames[want] ? want : -1;
          if (!clipReady) setClipReady(true);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Load order: frame 0, then a coarse sweep so scrubbing is usable early,
    // then everything else. Concurrency-capped so the sweep isn't starved by
    // 194 parallel requests competing for sockets.
    const order: number[] = [0];
    for (let i = 0; i < FRAME_COUNT; i += 8) if (!order.includes(i)) order.push(i);
    for (let i = 0; i < FRAME_COUNT; i++) if (!order.includes(i)) order.push(i);

    let cursor = 0;
    const pump = () => {
      if (cancelled || cursor >= order.length) return;
      const index = order[cursor++];
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        frames[index] = img;
        if (index === wantedFrame.current) painted = -1; // repaint at full fidelity
        pump();
      };
      img.onerror = () => {
        if (!cancelled) pump();
      };
      img.src = frameUrl(index);
    };
    for (let i = 0; i < 6; i++) pump();

    const onResize = () => size();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      framesRef.current = [];
    };
    // clipReady is intentionally absent: it flips once, and re-running would
    // restart the whole download.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

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
          // Hand the paint loop an index and nothing else — no decode work runs
          // on the scroll event itself.
          wantedFrame.current = Math.min(
            FRAME_COUNT - 1,
            Math.max(0, Math.round(p * (FRAME_COUNT - 1))),
          );
          setActiveBeat(Math.min(BEATS.length - 1, Math.floor(p * BEATS.length)));
          // The clip opens on its own wordmark and logo, which land in the same
          // column as beat 1's headline and body. Rather than trim the clip
          // (it plays front to end), hold a paper wash over the copy column
          // while the wordmark is in frame. Held solid to 5%, released by 15%:
          // an earlier 11% linear release left the wash at 0.27 while the
          // wordmark was still full-height behind the headline.
          if (introRef.current) {
            introRef.current.style.opacity = String(
              Math.min(1, Math.max(0, 1 - (p - 0.05) / 0.1)),
            );
          }
          // Dim the last frame so the closing CTA reads (ramps over final 26%).
          if (dimRef.current) {
            const dim = Math.max(0, (p - 0.74) / 0.26);
            dimRef.current.style.opacity = String(Math.min(1, dim) * 0.62);
          }
        },
      });
    }, track);
    return () => ctx.revert();
  }, [reduced]);

  // Pointer parallax on the copy.
  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    // Touch devices never fire mousemove, so the rAF loop would run every frame
    // for the life of the page writing the same transform.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    // Eased follower. Writing the pointer straight to transform tracks the
    // cursor exactly, which reads as mechanical; lerping gives the copy its own
    // small amount of inertia.
    const eased: [number, number] = [0, 0];
    const onMove = (e: MouseEvent) => {
      pointer.current = [
        e.clientX / window.innerWidth - 0.5,
        e.clientY / window.innerHeight - 0.5,
      ];
    };
    const tick = () => {
      eased[0] += (pointer.current[0] - eased[0]) * 0.08;
      eased[1] += (pointer.current[1] - eased[1]) * 0.08;
      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(${eased[0] * -16}px, ${eased[1] * -10}px, 0)`;
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
        {/* Film: poster until the first frame paints, then the scrubbed canvas. */}
        <div aria-hidden className="absolute inset-0 -z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterSrc}
            alt=""
            className="h-full w-full object-cover"
            style={{ opacity: clipReady ? 0 : 1, transition: "opacity 600ms ease" }}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: clipReady ? 1 : 0, transition: "opacity 600ms ease" }}
          />
        </div>

        {/* Legibility scrim: paper-left behind the copy, clearing right.
            Tinted to --color-paper (#eff2fb); an earlier warm-cream mix threw a
            muddy cast over the whole film once the palette went cool. Held at
            0.90 behind the headline column so near-black type keeps AA, then
            released hard past 55% so the film itself actually reads. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(100deg, rgba(239,242,251,0.90) 0%, rgba(239,242,251,0.76) 34%, rgba(239,242,251,0.30) 62%, rgba(239,242,251,0) 100%), linear-gradient(to top, rgba(239,242,251,0.40) 0%, rgba(239,242,251,0) 40%)",
          }}
        />
        {/* Mobile reinforcement. The scrim's gradient stops are element-relative:
            34% of 1440px clears the desktop copy column, but 34% of 390px stops
            short and body copy ends up over raw film. Flat wash under lg only. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(239,242,251,0.62) 0%, rgba(239,242,251,0.80) 30%, rgba(239,242,251,0.80) 82%, rgba(239,242,251,0.62) 100%)",
          }}
        />
        {/* Intro wash: the clip's own opening title card sits exactly where beat 1's
            copy sits. Opaque paper over the copy column at p=0, released by ~15%
            once the wordmark has left frame, so the clip still runs front to end. */}
        <div
          ref={introRef}
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            // Reduced motion never scrubs, so nothing would ever fade this out.
            opacity: reduced ? 0 : 1,
            // Two passes: horizontal clears the copy column, vertical knocks
            // back the lower band where the clip's wordmark tail sits.
            background:
              "linear-gradient(100deg, rgba(239,242,251,1) 0%, rgba(239,242,251,1) 48%, rgba(239,242,251,0.74) 72%, rgba(239,242,251,0.30) 100%), linear-gradient(to top, rgba(239,242,251,0.72) 0%, rgba(239,242,251,0.55) 40%, rgba(239,242,251,0) 72%)",
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
              // Entering beats get a strong ease-out; the built-in `ease` is
              // too weak to read as deliberate at this size. Exits run ~65% of
              // the enter duration so the outgoing beat clears before the next
              // one lands rather than the two overlapping at half opacity.
              const enterMs = isFirst ? 500 : isLast ? 700 : 550;
              const ms = visible ? enterMs : Math.round(enterMs * 0.65);
              const curve = "cubic-bezier(0.23, 1, 0.32, 1)";
              return (
                <div
                  key={beat.id}
                  // opacity:0 still leaves the beat focusable and readable by
                  // screen readers, so all six CTAs sat in the tab order at once.
                  inert={!visible}
                  className={isFirst ? "relative" : "pointer-events-none absolute inset-0 top-1/2"}
                  style={
                    isFirst
                      ? {
                          opacity: visible ? 1 : 0,
                          transition: `opacity ${ms}ms ${curve}`,
                        }
                      : {
                          opacity: visible ? 1 : 0,
                          transform: `translateY(${visible ? "-50%" : "calc(-50% + 26px)"})`,
                          transition: `opacity ${ms}ms ${curve}, transform ${ms}ms ${curve}`,
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
                    style={{ textShadow: "0 1px 2px rgba(239,242,251,0.55)" }}
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
                        className="group inline-flex h-12 items-center gap-2 rounded-full px-8 text-sm font-medium tracking-[0.02em] text-paper-pure transition-[transform,box-shadow] duration-200 ease-out active:scale-[0.97]"
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
