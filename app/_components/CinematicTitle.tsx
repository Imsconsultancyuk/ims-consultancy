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
}

/**
 * Reusable cinematic chapter anchor. Video full-bleed inside a 16:10 frame
 * with a slow Ken Burns drift. Etched-glass typography overlays the video
 * with a scroll-driven parallax and a soft mauve glow that pans across the
 * frame on a loop. Every IMS long-form page can use this to anchor a
 * chapter with the same visual grammar.
 */
export function CinematicTitle({
  videoSrc,
  title,
  kicker,
  body,
  ctaLabel,
  ctaHref,
  videoFilter = "saturate(1.05) contrast(1.06) brightness(0.95)",
  id,
}: CinematicTitleProps) {
  const lines = title.split("\n");
  const sectionRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const section = sectionRef.current;
    const fig = figureRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const caption = captionRef.current;
    if (!section || !fig || !video || !title || !caption) return;

    const ctx = gsap.context(() => {
      // Scroll-driven parallax. Title rises through the frame while the
      // video drifts the other way. The whole frame breathes as it passes.
      gsap.to(title, {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
      });
      gsap.to(video, {
        yPercent: 8,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
      });

      // Reveal the heading lines one at a time with a slight clip mask
      // when the chapter enters the viewport. Restartable so scrolling back
      // up replays cleanly.
      const lineEls = title.querySelectorAll<HTMLElement>("[data-line]");
      gsap.set(lineEls, { yPercent: 110, opacity: 0 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        onEnter: () => {
          gsap.to(lineEls, {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "expo.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(lineEls, {
            yPercent: 110,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          });
        },
      });

      // Caption (body + CTA) fades in slightly after the title settles.
      gsap.set(caption, { y: 24, opacity: 0 });
      ScrollTrigger.create({
        trigger: section,
        start: "top 65%",
        onEnter: () => {
          gsap.to(caption, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.4,
          });
        },
        onLeaveBack: () => {
          gsap.to(caption, {
            y: 24,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });
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
      className="relative isolate overflow-hidden bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28 ims-cinematic"
    >
      {/* Ambient mauve drift behind the frame */}
      <div
        aria-hidden
        className="ims-cinematic-aura pointer-events-none absolute inset-0 -z-10"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        {kicker && (
          <p className="mb-8 text-center font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-mauve-200">
            {kicker}
          </p>
        )}

        <figure
          ref={figureRef}
          className="relative w-full overflow-hidden rounded-2xl border border-mauve-300/12 ims-cinema-frame"
          style={{ aspectRatio: "16 / 10" }}
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
            className="ims-cinema-video ims-cinema-kenburns absolute inset-0 h-full w-full object-cover"
            style={{
              filter: videoFilter,
              willChange: "transform",
            }}
          />

          {/* Atmospheric vignette + grain */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,22,32,0.40) 0%, rgba(26,22,32,0.20) 45%, rgba(26,22,32,0.60) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              boxShadow:
                "inset 0 0 220px 35px rgba(26,22,32,0.60), inset 0 0 0 1px rgba(212,176,212,0.12)",
            }}
          />

          {/* Drifting mauve spotlight that pans across the frame on a loop */}
          <div aria-hidden className="ims-cinema-spotlight absolute inset-0" />

          {/* Letterbox corners that pulse subtly */}
          <span
            aria-hidden
            className="ims-cinema-corner absolute top-4 left-4 h-6 w-6 border-l-2 border-t-2 border-mauve-200/60"
          />
          <span
            aria-hidden
            className="ims-cinema-corner absolute top-4 right-4 h-6 w-6 border-r-2 border-t-2 border-mauve-200/60"
          />
          <span
            aria-hidden
            className="ims-cinema-corner absolute bottom-4 left-4 h-6 w-6 border-l-2 border-b-2 border-mauve-200/60"
          />
          <span
            aria-hidden
            className="ims-cinema-corner absolute bottom-4 right-4 h-6 w-6 border-r-2 border-b-2 border-mauve-200/60"
          />

          {/* Etched-glass title sitting on top of the video */}
          <figcaption className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
            <h2
              ref={titleRef}
              id={id ? `${id}-heading` : undefined}
              className="ims-glass-cinema font-serif font-medium leading-[0.98] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 6.5rem)",
              }}
            >
              {lines.map((line, i) => (
                <span
                  key={i}
                  data-line
                  className="block overflow-hidden"
                  style={{ paddingBottom: "0.06em" }}
                >
                  <span className="inline-block">{line}</span>
                </span>
              ))}
            </h2>
          </figcaption>
        </figure>

        {(body || (ctaLabel && ctaHref)) && (
          <aside
            ref={captionRef}
            className="mx-auto mt-10 max-w-2xl text-center"
          >
            {body && (
              <p className="text-[1.0625rem] leading-[1.7] text-mauve-300">
                {body}
              </p>
            )}
            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                data-cursor="cta"
                className="mt-7 inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
              >
                {ctaLabel}
              </a>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
