"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CinematicTitleProps {
  videoSrc: string;
  title: string;
  kicker?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  videoFilter?: string;
  id?: string;
  /** Optional second line under the body when the chapter calls for one. */
  meta?: string;
}

/**
 * Editorial cinematic chapter anchor. Video plays full-bleed as a backdrop,
 * type sits over it in a magazine cover composition.
 *
 * The title is ALWAYS visible on first render (no JS gatekeeping). GSAP
 * only layers in parallax drift and a continuous Ken Burns. The entrance
 * polish is driven by a CSS class toggled via IntersectionObserver so the
 * scroll layer never blocks the text from appearing.
 */
export function CinematicTitle({
  videoSrc,
  title,
  kicker,
  body,
  ctaLabel,
  ctaHref,
  meta,
  videoFilter = "saturate(1.08) contrast(1.08) brightness(0.80)",
  id,
}: CinematicTitleProps) {
  const lines = title.split("\n");
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Add an entrance class when the section enters the viewport. Done with
  // IntersectionObserver (not GSAP) so the text is not at the mercy of
  // ScrollTrigger / Lenis timing. If JS fails entirely the text is still
  // visible — CSS treats the absence of the class as the final state.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            section.classList.add("ims-cinema-in");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    io.observe(section);
    // Safety: if observer hasn't fired within 1200ms, force-show anyway.
    const safety = window.setTimeout(() => {
      section.classList.add("ims-cinema-in");
    }, 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  // GSAP: parallax + Ken Burns only. Skip under reduced motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    if (!section || !video || !title) return;

    const ctx = gsap.context(() => {
      gsap.to(video, {
        yPercent: 8,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
      });
      gsap.to(title, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="ims-cinema-section relative isolate overflow-hidden bg-deep text-paper-ink"
    >
      <figure
        className="relative w-full overflow-hidden ims-cinema-stage"
        style={{ minHeight: "min(100svh, 820px)" }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="ims-cinema-kenburns absolute inset-0 h-full w-full object-cover"
          style={{
            filter: videoFilter,
            willChange: "transform",
          }}
        />

        {/* Editorial vignette */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,22,32,0.55) 0%, rgba(26,22,32,0.15) 30%, rgba(26,22,32,0.20) 55%, rgba(26,22,32,0.85) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(26,22,32,0.55) 0%, rgba(26,22,32,0.05) 35%, rgba(26,22,32,0.10) 65%, rgba(26,22,32,0.55) 100%)",
          }}
        />

        {/* Drifting mauve spotlight */}
        <div aria-hidden className="ims-cinema-spotlight absolute inset-0" />

        {/* Grain */}
        <div
          aria-hidden
          className="ims-cinema-grain pointer-events-none absolute inset-0 opacity-[0.10]"
        />

        {/* Chapter index, top-right */}
        {id && (
          <div className="absolute top-6 right-6 z-10 flex items-baseline gap-2 sm:top-8 sm:right-10">
            <span className="font-serif text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-200">
              Chapter
            </span>
            <span className="font-serif text-[10px] font-medium uppercase tracking-[0.32em] text-paper-ink">
              ·
            </span>
            <span className="font-serif text-[10px] font-medium uppercase tracking-[0.32em] text-paper-ink">
              IMS
            </span>
          </div>
        )}

        {/* Kicker top-left */}
        {kicker && (
          <div className="ims-cinema-kicker absolute top-6 left-6 z-10 max-w-md sm:top-8 sm:left-10 lg:left-16">
            <div className="flex items-center gap-4">
              <span aria-hidden className="ims-cinema-rule block h-px w-16 bg-mauve-200" />
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.34em] text-mauve-200">
                {kicker}
              </p>
            </div>
          </div>
        )}

        {/* Editorial title block, bottom-left */}
        <figcaption className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-20">
          <div className="max-w-5xl">
            <h2
              ref={titleRef}
              id={id ? `${id}-heading` : undefined}
              className="ims-glass-cinema ims-cinema-title font-serif font-medium leading-[0.92] tracking-[-0.025em]"
              style={{
                fontSize: "clamp(3.5rem, 13vw, 11rem)",
              }}
            >
              {lines.map((line, i) => (
                <span
                  key={i}
                  data-line
                  data-line-index={i}
                  className="ims-cinema-line block overflow-hidden"
                  style={{ paddingBottom: "0.04em" }}
                >
                  <span className="inline-block">{line}</span>
                </span>
              ))}
            </h2>

            {(body || meta || (ctaLabel && ctaHref)) && (
              <div className="ims-cinema-caption mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
                <div className="max-w-xl">
                  {body && (
                    <p className="font-serif text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.5] text-paper-ink/95">
                      {body}
                    </p>
                  )}
                  {meta && (
                    <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.28em] text-mauve-200">
                      {meta}
                    </p>
                  )}
                </div>

                {ctaLabel && ctaHref && (
                  <a
                    href={ctaHref}
                    data-cursor="cta"
                    className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-md border border-mauve-200/50 bg-deep/30 px-7 text-sm font-medium tracking-[0.04em] text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/60 sm:self-end"
                  >
                    <span>{ctaLabel}</span>
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
                  </a>
                )}
              </div>
            )}
          </div>
        </figcaption>

        <span
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mauve-200/45 to-transparent"
        />
      </figure>
    </section>
  );
}
