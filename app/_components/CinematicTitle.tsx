"use client";

import { useId } from "react";

interface CinematicTitleProps {
  /** Path to a looping video file (mp4). */
  videoSrc: string;
  /** Single short title that becomes the video-window. Use line breaks with \n. */
  title: string;
  /** Small kicker above the cinematic block. */
  kicker?: string;
  /** Optional body copy below the cinematic block. */
  body?: string;
  /** Optional CTA label. */
  ctaLabel?: string;
  /** Optional CTA href. */
  ctaHref?: string;
  /** CSS filter to colour-grade the video. Default keeps it close to native. */
  videoFilter?: string;
  /** SVG viewBox width. Default 1600. */
  vbW?: number;
  /** SVG viewBox height. Default 900 (16:9). */
  vbH?: number;
  /** SVG text size in viewBox units. Default 260. */
  textSize?: number;
  /** Letter spacing in viewBox units. Default -12. */
  textLetterSpacing?: number;
  /** Section background colour token. Default --color-deep. */
  bg?: string;
  /** Optional id for the section. */
  id?: string;
}

/**
 * Reusable cinematic title section. The title's characters become a
 * window through which the looping video plays. Everything around the
 * characters is the brand-dark surface. Apple Vision Pro pattern.
 *
 * Implementation: a single SVG covers the video with a dark-filled rect
 * whose mask is "white everywhere, black inside the text" — so the rect
 * is opaque except inside the text shapes, which reveal the video.
 *
 * The video uses a light, almost-neutral colour grade by default so the
 * footage reads realistic rather than over-tinted.
 */
export function CinematicTitle({
  videoSrc,
  title,
  kicker,
  body,
  ctaLabel,
  ctaHref,
  videoFilter = "saturate(1.05) contrast(1.06) brightness(0.95)",
  vbW = 1600,
  vbH = 900,
  textSize = 260,
  textLetterSpacing = -12,
  bg = "var(--color-deep)",
  id,
}: CinematicTitleProps) {
  const reactId = useId();
  const maskId = `cinematic-mask-${reactId.replace(/[:]/g, "")}`;

  const lines = title.split("\n");
  const lineCount = lines.length;
  const lineHeight = textSize * 0.95;
  const totalHeight = lineHeight * lineCount;
  // vertically centre the block of lines inside the viewBox
  const firstBaselineY =
    vbH / 2 - totalHeight / 2 + textSize * 0.78; // baseline offset (~0.78 of cap height)

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden bg-deep px-6 py-24 text-paper-ink sm:py-32"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        {kicker && (
          <p className="mb-10 text-center font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-mauve-200">
            {kicker}
          </p>
        )}

        {/* Cinematic title block — 16:9 stage */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: `${vbW} / ${vbH}` }}
        >
          {/* Soft mauve halo behind the video for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(120,100,120,0.30), transparent 65%)",
            }}
          />

          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: videoFilter,
              transform: "scale(1.04)",
              willChange: "transform",
            }}
          />

          {/* The brand-dark cover with a text-shaped hole */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${vbW} ${vbH}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label={title.replace(/\n/g, " ")}
          >
            <title>{title.replace(/\n/g, " ")}</title>
            <defs>
              <mask id={maskId}>
                {/* white = visible (= opaque cover), black = hidden (= hole = video shows) */}
                <rect width="100%" height="100%" fill="white" />
                <g
                  fontFamily="var(--font-serif), 'Cormorant Garamond', Georgia, serif"
                  fontWeight="500"
                  textAnchor="middle"
                  style={{
                    fontKerning: "normal",
                    letterSpacing: `${textLetterSpacing}px`,
                  }}
                >
                  {lines.map((line, i) => (
                    <text
                      key={`l-${i}`}
                      x="50%"
                      y={firstBaselineY + i * lineHeight}
                      fontSize={textSize}
                      fill="black"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill={bg}
              mask={`url(#${maskId})`}
            />
          </svg>

          {/* Subtle edge vignette so the rectangle has cinema feel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow:
                "inset 0 0 120px 20px rgba(26,22,32,0.55), inset 0 0 0 1px rgba(212,176,212,0.10)",
            }}
          />
        </div>

        {(body || (ctaLabel && ctaHref)) && (
          <div className="mx-auto mt-12 max-w-2xl text-center">
            {body && (
              <p className="text-[1.0625rem] leading-[1.7] text-mauve-300">
                {body}
              </p>
            )}
            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                data-cursor="cta"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
