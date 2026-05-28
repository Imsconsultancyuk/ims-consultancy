"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { CharSplit } from "./CharSplit";

const STEPS = [
  {
    n: "01",
    title: "Audit",
    body: "Two weeks of close attention to how the business actually runs. The findings document is short and honest.",
    duration: "Weeks 1 — 2",
  },
  {
    n: "02",
    title: "Decide",
    body: "Name the few moves that compound and the many that don't. Strategy lives on a single readable page.",
    duration: "Week 3",
  },
  {
    n: "03",
    title: "Blueprint",
    body: "Architecture for the next twelve months, with tradeoffs visible. Open to challenge.",
    duration: "Weeks 4 — 5",
  },
  {
    n: "04",
    title: "Build",
    body: "Considered code, real tests, observable systems. Shipped in small atomic deliveries you can roll back.",
    duration: "Weeks 6 onward",
  },
  {
    n: "05",
    title: "Automate",
    body: "Quiet AI workflows that take the dull edges off the week. Small models, well chosen, prove value first.",
    duration: "In parallel",
  },
  {
    n: "06",
    title: "Train",
    body: "Your team learns by doing the work with us. They can extend, debug, and own everything by hand-off.",
    duration: "Final third",
  },
  {
    n: "07",
    title: "Hand-off",
    body: "Documentation, recordings, source, and a 90-day follow-up window. The door stays open.",
    duration: "Final two weeks",
  },
];

/**
 * Vertical immersive method reveal. Each step is a full-width row that
 * animates into focus as it enters the viewport — number scales up, title
 * slides in from the left, body fades from below. A continuous vertical
 * progress rail fills as the visitor descends.
 *
 * No scroll-jacking. No pinned horizontal carousel. The visitor controls
 * the cadence; the animation amplifies whichever step they are reading.
 */
export function MethodologyCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which step is closest to viewport centre — used to highlight the
  // active marker on the left rail and to drive the rail fill height.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rows = section.querySelectorAll<HTMLElement>("[data-step-row]");
    if (rows.length === 0) return;

    const io = new IntersectionObserver(
      () => {
        const center = window.innerHeight * 0.5;
        let closest = 0;
        let closestDist = Infinity;
        rows.forEach((row, i) => {
          const rect = row.getBoundingClientRect();
          const rowCenter = rect.top + rect.height / 2;
          const dist = Math.abs(rowCenter - center);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
      },
      { threshold: Array.from({ length: 11 }, (_, k) => k / 10) }
    );
    rows.forEach((r) => io.observe(r));

    // Also listen to scroll to refresh continuously between IO ticks
    const onScroll = () => {
      const center = window.innerHeight * 0.5;
      let closest = 0;
      let closestDist = Infinity;
      rows.forEach((row, i) => {
        const rect = row.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const dist = Math.abs(rowCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);

      // Rail fill — measures how far through the section the visitor is
      const rail = railRef.current;
      if (rail) {
        const secRect = section.getBoundingClientRect();
        const totalHeight = secRect.height - window.innerHeight;
        const scrolled = Math.max(0, Math.min(totalHeight, -secRect.top));
        const pct = totalHeight > 0 ? scrolled / totalHeight : 0;
        rail.style.transform = `scaleY(${pct})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="method"
      aria-labelledby="method-heading"
      className="relative isolate overflow-hidden bg-deep px-6 py-24 text-paper-ink sm:py-32 lg:py-40"
    >
      {/* Ambient mauve drift */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,100,120,0.26), rgba(120,100,120,0.08) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-mauve-200">
            Method · Seven steps
          </p>
          <h2 id="method-heading" className="sr-only">
            How an IMS engagement actually runs
          </h2>
          <CharSplit
            text={"How an IMS engagement\nactually runs."}
            className="mt-6 max-w-3xl font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.012em]"
            stagger={0.018}
          />
        </Reveal>

        {/* Steps grid: vertical rail on the left, rows on the right */}
        <div className="mt-20 grid gap-10 sm:gap-14 lg:grid-cols-[64px_1fr] lg:gap-16">
          {/* Vertical progress rail */}
          <div
            aria-hidden
            className="relative hidden lg:block"
          >
            <div className="sticky top-1/2 -translate-y-1/2">
              <div className="relative h-[640px]">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-mauve-300/15" />
                <div
                  ref={railRef}
                  className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-mauve-200"
                  style={{ transform: "scaleY(0)" }}
                />
                {/* Step markers along the rail */}
                {STEPS.map((s, i) => {
                  const top = (i / (STEPS.length - 1)) * 100;
                  const active = i === activeIndex;
                  return (
                    <div
                      key={s.n}
                      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                      style={{ top: `${top}%` }}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
                          active
                            ? "border-mauve-200 bg-mauve-200 text-deep shadow-[0_0_24px_4px_rgba(212,176,212,0.45)]"
                            : "border-mauve-300/30 bg-deep text-mauve-300"
                        }`}
                      >
                        <span className="font-sans text-[10px] font-medium tracking-[0.06em]">
                          {s.n}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step rows */}
          <ol className="flex flex-col gap-16 sm:gap-24" role="list">
            {STEPS.map((s, i) => {
              const active = i === activeIndex;
              return (
                <li
                  key={s.n}
                  data-step-row
                  data-active={active ? "true" : "false"}
                  className="ims-method-row group relative"
                >
                  <div className="grid gap-6 sm:grid-cols-[140px_1fr] sm:gap-10 lg:gap-14">
                    <div>
                      <p
                        className={`font-serif leading-none transition-all duration-700 ${
                          active
                            ? "text-mauve-200"
                            : "text-mauve-300/35"
                        }`}
                        style={{
                          fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.n}
                      </p>
                      <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.28em] text-mauve-300">
                        {s.duration}
                      </p>
                    </div>
                    <div>
                      <h3
                        className={`font-serif text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.012em] transition-colors duration-700 ${
                          active ? "text-paper-ink" : "text-paper-ink/65"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <div
                        className={`mt-4 h-px origin-left transition-all duration-700 ${
                          active
                            ? "w-32 bg-mauve-200"
                            : "w-12 bg-mauve-300/30"
                        }`}
                      />
                      <p
                        className={`mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] transition-colors duration-700 ${
                          active ? "text-mauve-200" : "text-mauve-300/70"
                        }`}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
