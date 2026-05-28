"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Reveal } from "./Reveal";
import { PointerTilt } from "./PointerTilt";
import { CharSplit } from "./CharSplit";

/**
 * Three artistic SVG visualisations carrying the mauve brand. Pure visual
 * flourish, no specific data: they are about feel, not numbers. Each chart
 * runs a draw-on-reveal animation when scrolled into view, and lifts a
 * soft glow on hover (via the PointerTilt sheen).
 */

function useDrawOnReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-drawn");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Concentric arcs expanding outward — for the "Compounding" idea. */
function CompoundChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="grad-compound" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4b0d4" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#786478" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4e3f4e" stopOpacity="0.55" />
          </linearGradient>
          <filter id="glow-compound" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* outer to inner — each path drawn from a different start point so
            the sweep feels organic */}
        {[88, 70, 52, 34, 18].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="url(#grad-compound)"
            strokeWidth={i === 0 ? 1.4 : 1.1}
            strokeLinecap="round"
            opacity={1 - i * 0.12}
            filter="url(#glow-compound)"
            data-draw
            style={
              {
                strokeDasharray: 2 * Math.PI * r,
                strokeDashoffset: 2 * Math.PI * r,
                transitionDelay: `${i * 160}ms`,
              } as React.CSSProperties
            }
          />
        ))}
        {/* tiny core dot */}
        <circle cx="100" cy="100" r="3" fill="#d4b0d4" filter="url(#glow-compound)" />
      </svg>
    </div>
  );
}

/** Multiple paths converging into a single point — "Convergence" */
function ConvergeChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  // Curves originate around the edges and end at the centre right
  const PATHS = [
    "M 10 30 C 80 30, 120 90, 180 100",
    "M 10 70 C 70 70, 130 95, 180 100",
    "M 10 110 C 80 110, 130 100, 180 100",
    "M 10 150 C 70 150, 130 110, 180 100",
    "M 10 190 C 80 190, 130 130, 180 100",
  ];
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="grad-converge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4e3f4e" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#786478" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d4b0d4" stopOpacity="0.95" />
          </linearGradient>
          <filter id="glow-converge" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#grad-converge)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.95 - i * 0.05}
            filter="url(#glow-converge)"
            data-draw
            style={
              {
                strokeDasharray: 320,
                strokeDashoffset: 320,
                transitionDelay: `${i * 120}ms`,
              } as React.CSSProperties
            }
          />
        ))}
        {/* convergence point */}
        <circle
          cx="180"
          cy="100"
          r="4"
          fill="#d4b0d4"
          filter="url(#glow-converge)"
        />
        <circle
          cx="180"
          cy="100"
          r="10"
          fill="none"
          stroke="#d4b0d4"
          strokeOpacity="0.4"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

/** Constellation of dots with connecting lines — "Network" */
function NetworkChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  const NODES: Array<[number, number, number]> = [
    [40, 60, 4],
    [100, 30, 5],
    [160, 70, 3.5],
    [50, 130, 3],
    [110, 110, 5.5],
    [170, 150, 4],
    [85, 170, 3],
    [140, 40, 2.5],
  ];
  const EDGES: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 6],
    [5, 6],
    [1, 7],
    [2, 7],
  ];
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="dot-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4b0d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#786478" stopOpacity="0.7" />
          </radialGradient>
          <filter id="glow-network" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* edges first so dots sit on top */}
        {EDGES.map(([a, b], i) => {
          const [x1, y1] = NODES[a];
          const [x2, y2] = NODES[b];
          const length = Math.hypot(x2 - x1, y2 - y1);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#786478"
              strokeWidth="0.9"
              strokeOpacity="0.6"
              data-draw
              style={
                {
                  strokeDasharray: length,
                  strokeDashoffset: length,
                  transitionDelay: `${i * 80}ms`,
                } as React.CSSProperties
              }
            />
          );
        })}
        {NODES.map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="url(#dot-grad)"
            filter="url(#glow-network)"
            data-fade
            style={{ transitionDelay: `${800 + i * 60}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}

interface ChartCardProps {
  kicker: string;
  title: string;
  caption: string;
  children: ReactNode;
}

function ChartCard({ kicker, title, caption, children }: ChartCardProps) {
  return (
    <PointerTilt className="h-full" tilt={4}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-7 backdrop-blur transition-all duration-500 hover:border-mauve-300/30 hover:bg-deep-soft/75 sm:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(212,176,212,0.18), transparent 65%)",
          }}
        />
        <p className="relative font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
          {kicker}
        </p>
        <h3 className="relative mt-4 font-serif text-2xl font-medium leading-snug text-paper-ink">
          {title}
        </h3>
        <div className="relative mt-8 aspect-square w-full">{children}</div>
        <p className="relative mt-6 text-[0.9375rem] leading-[1.7] text-mauve-300">
          {caption}
        </p>
      </article>
    </PointerTilt>
  );
}

export function ArtisticCharts() {
  return (
    <section
      id="patterns"
      className="relative isolate overflow-hidden bg-deep px-6 py-32 text-paper-ink sm:py-40"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
            Quiet patterns · A visual grammar
          </p>
          <CharSplit
            text={"Three shapes that describe\nhow we work."}
            className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.012em]"
            stagger={0.018}
          />
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
            Not data. Not a chart you read for numbers. A visual grammar for
            the way decisions compound, signals converge, and small systems
            quietly form a network that does the work for you.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <Reveal delay={80}>
            <ChartCard
              kicker="Pattern 01"
              title="Compounding"
              caption="A single right call rippling outward. Each engagement leaves an artefact that earns its keep long after we have left the room."
            >
              <CompoundChart />
            </ChartCard>
          </Reveal>
          <Reveal delay={180}>
            <ChartCard
              kicker="Pattern 02"
              title="Convergence"
              caption="Many open questions narrowing into one clear move. Strategy as the discipline of subtraction, written in a single readable page."
            >
              <ConvergeChart />
            </ChartCard>
          </Reveal>
          <Reveal delay={280}>
            <ChartCard
              kicker="Pattern 03"
              title="Network"
              caption="Small, well-chosen systems that talk to each other. The quiet automation that turns one engagement into recurring advantage."
            >
              <NetworkChart />
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
