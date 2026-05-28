"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

/**
 * Three small artistic SVG visualisations carrying the mauve brand.
 * Pure visual flourish, no specific data. Each runs a draw-on-reveal
 * animation when scrolled into view.
 *
 * Condensed layout: three small inline SVGs in a single row, no card
 * chrome, just a one-line caption per chart.
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return ref;
}

function CompoundChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="grad-compound-sm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4b0d4" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#786478" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4e3f4e" stopOpacity="0.55" />
          </linearGradient>
          <filter id="glow-compound-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[88, 70, 52, 34, 18].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="url(#grad-compound-sm)"
            strokeWidth={i === 0 ? 1.3 : 1.0}
            strokeLinecap="round"
            opacity={1 - i * 0.12}
            filter="url(#glow-compound-sm)"
            data-draw
            style={
              {
                strokeDasharray: 2 * Math.PI * r,
                strokeDashoffset: 2 * Math.PI * r,
                transitionDelay: `${i * 140}ms`,
              } as React.CSSProperties
            }
          />
        ))}
        <circle cx="100" cy="100" r="2.5" fill="#d4b0d4" filter="url(#glow-compound-sm)" />
      </svg>
    </div>
  );
}

function ConvergeChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
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
          <linearGradient id="grad-converge-sm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4e3f4e" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#786478" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d4b0d4" stopOpacity="0.95" />
          </linearGradient>
          <filter id="glow-converge-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
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
            stroke="url(#grad-converge-sm)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={0.95 - i * 0.05}
            filter="url(#glow-converge-sm)"
            data-draw
            style={
              {
                strokeDasharray: 320,
                strokeDashoffset: 320,
                transitionDelay: `${i * 110}ms`,
              } as React.CSSProperties
            }
          />
        ))}
        <circle cx="180" cy="100" r="3.5" fill="#d4b0d4" filter="url(#glow-converge-sm)" />
        <circle cx="180" cy="100" r="9" fill="none" stroke="#d4b0d4" strokeOpacity="0.4" strokeWidth="0.7" />
      </svg>
    </div>
  );
}

function NetworkChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  const NODES: Array<[number, number, number]> = [
    [40, 60, 3.5],
    [100, 30, 4.5],
    [160, 70, 3],
    [50, 130, 2.5],
    [110, 110, 5],
    [170, 150, 3.5],
    [85, 170, 2.5],
    [140, 40, 2.2],
  ];
  const EDGES: Array<[number, number]> = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 4],
    [3, 4], [4, 5], [3, 6], [4, 6], [5, 6],
    [1, 7], [2, 7],
  ];
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="dot-grad-sm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4b0d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#786478" stopOpacity="0.7" />
          </radialGradient>
          <filter id="glow-network-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
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
              strokeWidth="0.8"
              strokeOpacity="0.6"
              data-draw
              style={
                {
                  strokeDasharray: length,
                  strokeDashoffset: length,
                  transitionDelay: `${i * 70}ms`,
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
            fill="url(#dot-grad-sm)"
            filter="url(#glow-network-sm)"
            data-fade
            style={{ transitionDelay: `${700 + i * 55}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}

interface MiniChartProps {
  title: string;
  caption: string;
  children: React.ReactNode;
}

function MiniChart({ title, caption, children }: MiniChartProps) {
  return (
    <figure className="group relative flex flex-col items-center text-center">
      <div className="relative h-[120px] w-[120px] transition-transform duration-500 group-hover:scale-[1.04] sm:h-[140px] sm:w-[140px]">
        {children}
      </div>
      <figcaption className="mt-4">
        <p className="font-serif text-[0.9375rem] font-medium text-paper-ink">{title}</p>
        <p className="mt-1 max-w-[200px] text-[0.75rem] leading-[1.55] text-mauve-300">
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

export function ArtisticCharts() {
  return (
    <section
      id="patterns"
      aria-labelledby="patterns-heading"
      className="relative bg-deep px-6 py-16 text-paper-ink sm:py-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="text-center font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
            Quiet patterns
          </p>
          <h2
            id="patterns-heading"
            className="mt-4 text-center font-serif text-[clamp(1.25rem,2.2vw,1.625rem)] font-medium leading-[1.3] tracking-[-0.01em] text-paper-ink"
          >
            Three shapes that describe how we work.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            <MiniChart
              title="Compounding"
              caption="A single right call ripples outward."
            >
              <CompoundChart />
            </MiniChart>
            <MiniChart
              title="Convergence"
              caption="Many open questions narrow into one move."
            >
              <ConvergeChart />
            </MiniChart>
            <MiniChart
              title="Network"
              caption="Small, well-chosen systems that talk."
            >
              <NetworkChart />
            </MiniChart>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
