"use client";

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
 * Reusable cinematic title. Video full-bleed inside a responsive frame,
 * etched-glass typography sitting on top. The video is object-cover with
 * a smart object-position so the figure stays visible from mobile
 * portrait through to ultrawide desktop. Mauve gradient wash keeps the
 * type legible without dimming the figure.
 *
 * Reusable across the site — every long-form page can use a CinematicTitle
 * to anchor a chapter with the same visual grammar.
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

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="relative isolate overflow-hidden bg-deep px-6 py-20 text-paper-ink sm:py-24 lg:py-28 ims-cinematic"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        {kicker && (
          <p className="mb-8 text-center font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-mauve-200">
            {kicker}
          </p>
        )}

        <figure
          className="relative w-full overflow-hidden rounded-2xl border border-mauve-300/12 ims-cinema-frame"
          style={{ aspectRatio: "16 / 10" }}
        >
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="ims-cinema-video absolute inset-0 h-full w-full object-cover"
            style={{
              filter: videoFilter,
              transform: "scale(1.02)",
              willChange: "transform",
            }}
          />

          {/* Dark vignette so the etched type stays legible across the entire frame */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,22,32,0.35) 0%, rgba(26,22,32,0.22) 45%, rgba(26,22,32,0.55) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              boxShadow:
                "inset 0 0 200px 30px rgba(26,22,32,0.55), inset 0 0 0 1px rgba(212,176,212,0.10)",
            }}
          />

          {/* Etched-glass title sitting on top of the video */}
          <figcaption className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
            <h2
              id={id ? `${id}-heading` : undefined}
              className="ims-glass-cinema font-serif font-medium leading-[0.98] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 6.5rem)",
              }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </figcaption>
        </figure>

        {(body || (ctaLabel && ctaHref)) && (
          <div className="mx-auto mt-10 max-w-2xl text-center">
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
          </div>
        )}
      </div>
    </section>
  );
}
