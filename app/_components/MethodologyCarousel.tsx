"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PointerTilt } from "./PointerTilt";
import { Reveal } from "./Reveal";
import { CharSplit } from "./CharSplit";

const STEPS = [
  {
    n: "01",
    title: "Audit",
    body:
      "We start by listening. Two weeks of close attention to how the business actually runs. The findings document is honest and short.",
  },
  {
    n: "02",
    title: "Decide",
    body:
      "We name the few moves that compound and the many that don't. Strategy becomes a single readable page, not a deck.",
  },
  {
    n: "03",
    title: "Blueprint",
    body:
      "Architecture for the next twelve months. What gets built, in what order, with which tradeoffs visible. Open to challenge.",
  },
  {
    n: "04",
    title: "Build",
    body:
      "Considered code, real tests, observable systems. We ship in small atomic deliveries you can review, deploy, and roll back.",
  },
  {
    n: "05",
    title: "Automate",
    body:
      "AI workflows that take the dull edges off your team's week. Small models, well chosen, that prove their value before they grow.",
  },
  {
    n: "06",
    title: "Train",
    body:
      "Your team learns by doing the work with us. By the end of the engagement they can extend, debug, and own everything that ships.",
  },
  {
    n: "07",
    title: "Hand-off",
    body:
      "A clean exit. Documentation, recordings, source, and a 90-day follow-up window. Most clients ask us back. The door stays open.",
  },
];

export function MethodologyCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  return (
    <section
      id="method"
      className="relative isolate overflow-hidden bg-deep px-6 py-32 text-paper-ink sm:py-40"
    >
      {/* Atmospheric mauve veil top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,100,120,0.30), rgba(120,100,120,0.10) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
            Method · Seven steps
          </p>
          <CharSplit
            text={"How an IMS engagement\nactually runs."}
            className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.012em]"
            stagger={0.018}
          />
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
            Seven steps, in this order, every time. No skipped chapters,
            no surprise upsell. The first two are funded by us before any
            decision to continue. Drag, swipe, or use the dots.
          </p>
        </Reveal>

        {/* Carousel */}
        <div className="relative mt-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_60%] lg:flex-[0_0_42%]"
                >
                  <PointerTilt className="h-full" tilt={4}>
                    <article
                      className={`group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl border bg-deep-soft/60 p-8 backdrop-blur transition-all duration-500 sm:p-10 ${
                        i === selectedIndex
                          ? "border-mauve-300/40 bg-deep-soft/80 shadow-[0_24px_60px_-24px_rgba(212,176,212,0.30)]"
                          : "border-mauve-300/12 hover:border-mauve-300/25"
                      }`}
                    >
                      {/* Step number watermark */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-6 -right-2 font-serif text-[12rem] leading-none text-mauve-300/10 transition-all duration-700 group-hover:text-mauve-300/20 sm:text-[16rem]"
                      >
                        {step.n}
                      </span>

                      <div className="relative">
                        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                          Step {step.n}
                        </p>
                        <h3 className="mt-5 font-serif text-[clamp(1.875rem,3.2vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.012em] text-paper-ink">
                          {step.title}
                        </h3>
                      </div>
                      <p className="relative mt-6 max-w-md text-[1rem] leading-[1.7] text-mauve-300">
                        {step.body}
                      </p>
                      <div className="relative mt-8">
                        <div className="h-px w-12 bg-mauve-300/40 transition-all duration-500 group-hover:w-32 group-hover:bg-mauve-200/80" />
                      </div>
                    </article>
                  </PointerTilt>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            type="button"
            aria-label="Previous step"
            onClick={scrollPrev}
            disabled={!canPrev}
            data-cursor="link"
            className={`absolute top-1/2 -left-1 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-mauve-300/30 bg-deep/60 text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/80 hover:shadow-[0_8px_28px_-8px_rgba(212,176,212,0.45)] disabled:opacity-30 disabled:cursor-not-allowed lg:flex ${
              canPrev ? "opacity-100" : "opacity-30"
            }`}
            style={{ left: "calc(-1.5rem)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next step"
            onClick={scrollNext}
            disabled={!canNext}
            data-cursor="link"
            className={`absolute top-1/2 -right-1 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-mauve-300/30 bg-deep/60 text-paper-ink backdrop-blur transition-all duration-300 hover:border-mauve-200 hover:bg-deep/80 hover:shadow-[0_8px_28px_-8px_rgba(212,176,212,0.45)] disabled:opacity-30 disabled:cursor-not-allowed lg:flex ${
              canNext ? "opacity-100" : "opacity-30"
            }`}
            style={{ right: "calc(-1.5rem)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dot pagination + step label */}
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <div className="font-sans text-[11px] uppercase tracking-[0.22em] text-mauve-300">
            <span className="text-mauve-200">{STEPS[selectedIndex].n}</span>
            <span className="mx-2 opacity-50">/</span>
            <span>{STEPS[selectedIndex].title}</span>
          </div>
          <div
            role="tablist"
            aria-label="Methodology steps"
            className="flex items-center gap-2"
          >
            {STEPS.map((s, i) => (
              <button
                key={s.n}
                type="button"
                role="tab"
                aria-selected={i === selectedIndex}
                aria-label={`Go to step ${s.n}, ${s.title}`}
                onClick={() => scrollTo(i)}
                data-cursor="link"
                className="group relative h-6 px-0.5"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    i === selectedIndex
                      ? "w-10 bg-mauve-200"
                      : "w-6 bg-mauve-300/40 group-hover:bg-mauve-300/70"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="font-sans text-[11px] uppercase tracking-[0.22em] text-mauve-300">
            <span>{selectedIndex + 1}</span>
            <span className="mx-1 opacity-50">of</span>
            <span>{STEPS.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
