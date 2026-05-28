"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { CharSplit } from "./CharSplit";

const STEPS = [
  { n: "01", title: "Audit", body: "Two weeks of close attention to how the business actually runs. The findings document is short and honest." },
  { n: "02", title: "Decide", body: "Name the few moves that compound and the many that don't. Strategy lives on a single readable page." },
  { n: "03", title: "Blueprint", body: "Architecture for the next twelve months, with tradeoffs visible. Open to challenge." },
  { n: "04", title: "Build", body: "Considered code, real tests, observable systems. Shipped in small atomic deliveries you can roll back." },
  { n: "05", title: "Automate", body: "Quiet AI workflows that take the dull edges off the week. Small models, well chosen, prove value first." },
  { n: "06", title: "Train", body: "Your team learns by doing the work with us. They can extend, debug, and own everything by hand-off." },
  { n: "07", title: "Hand-off", body: "Documentation, recordings, source, and a 90-day follow-up window. The door stays open." },
];

/**
 * Scroll-pinned methodology. The section grows tall, pins for the
 * duration, and the horizontal strip translates X based on vertical
 * scroll progress. No drag required — the visitor's normal scroll
 * advances through the seven steps. Pattern: Apple AirPods Pro.
 *
 * Falls back gracefully under prefers-reduced-motion to a normal
 * horizontal scrollable strip.
 */
export function MethodologyCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const strip = stripRef.current;
    const progress = progressRef.current;
    if (!section || !sticky || !strip || !progress || reduced) return;

    const ctx = gsap.context(() => {
      const measure = () => {
        // distance the strip must translate so the LAST card is centred in viewport
        const maxScroll = strip.scrollWidth - window.innerWidth;
        return Math.max(maxScroll, 0);
      };

      const tween = gsap.to(strip, {
        x: () => `-${measure()}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${measure()}`,
          pin: sticky,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress bar + active index
            const p = self.progress;
            progress.style.transform = `scaleX(${p})`;
            const idx = Math.min(
              STEPS.length - 1,
              Math.floor(p * STEPS.length + 0.0001)
            );
            setActiveIndex(idx);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="method"
      aria-labelledby="method-heading"
      className="relative isolate overflow-hidden bg-deep text-paper-ink"
    >
      <div
        ref={stickyRef}
        className="relative flex h-screen w-full flex-col justify-center px-6 py-20 sm:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,100,120,0.26), rgba(120,100,120,0.08) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
              Method · Seven steps · Scroll through
            </p>
            <h2 id="method-heading" className="sr-only">
              How an IMS engagement actually runs
            </h2>
            <CharSplit
              text={"How an IMS engagement\nactually runs."}
              className="mt-5 max-w-3xl font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.012em]"
              stagger={0.018}
            />
          </Reveal>

          {/* Horizontal strip — translated by scroll */}
          <div className="relative mt-10 overflow-hidden">
            <ol
              ref={stripRef}
              role="list"
              className="flex items-stretch gap-5 will-change-transform"
              style={{ width: "max-content" }}
            >
              {STEPS.map((step, i) => (
                <li
                  key={step.n}
                  className="w-[78vw] max-w-[420px] shrink-0 sm:w-[52vw] lg:w-[36vw]"
                >
                  <article
                    aria-current={i === activeIndex ? "true" : undefined}
                    className={`relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-xl border bg-deep-soft/60 p-6 backdrop-blur transition-all duration-500 sm:p-7 ${
                      i === activeIndex
                        ? "border-mauve-300/40 bg-deep-soft/80 shadow-[0_18px_44px_-20px_rgba(212,176,212,0.32)]"
                        : "border-mauve-300/12"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-3 -right-2 font-serif text-[7rem] leading-none text-mauve-300/12"
                    >
                      {step.n}
                    </span>
                    <header className="relative">
                      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                        Step {step.n}
                      </p>
                      <h3 className="mt-3 font-serif text-[1.5rem] font-medium leading-snug text-paper-ink">
                        {step.title}
                      </h3>
                    </header>
                    <p className="relative mt-4 text-[0.9375rem] leading-[1.65] text-mauve-300">
                      {step.body}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          {/* Progress + counter */}
          <div className="mt-8 flex items-center justify-between gap-6">
            <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-mauve-300">
              <span className="text-mauve-200">{STEPS[activeIndex].n}</span>
              <span className="mx-2 opacity-50">/</span>
              <span>{STEPS[activeIndex].title}</span>
            </div>
            <div
              aria-hidden
              className="relative h-px flex-1 overflow-hidden bg-mauve-300/15"
            >
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 h-full w-full origin-left bg-mauve-200"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-mauve-300">
              <span>{activeIndex + 1}</span>
              <span className="mx-1 opacity-50">of</span>
              <span>{STEPS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
