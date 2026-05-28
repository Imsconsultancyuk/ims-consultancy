"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

/**
 * Three small artistic SVG visualisations describing what IMS does in
 * shapes a business owner reads at a glance:
 *
 *   1. Many manual tasks → one quiet pipeline (consolidation)
 *   2. Jagged handoffs   → continuous flow      (smoothing)
 *   3. One engagement    → recurring returns   (compounding)
 *
 * Each runs a draw-on-reveal animation when scrolled into view.
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

/* ============================================================
   Pattern 01 — Consolidation
   Six manual task lines on the left converge into one solid
   pipeline on the right. Business reading: "stop doing the
   same thing many times."
============================================================ */
function ConsolidationChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  const tasks = [
    { y: 40, w: 38 },
    { y: 60, w: 34 },
    { y: 80, w: 42 },
    { y: 100, w: 36 },
    { y: 120, w: 40 },
    { y: 140, w: 32 },
  ];
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="grad-consol" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#786478" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d4b0d4" stopOpacity="0.95" />
          </linearGradient>
          <filter id="glow-consol" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Six manual tick-marks on the left */}
        {tasks.map((t, i) => {
          const length = t.w;
          return (
            <line
              key={`t-${i}`}
              x1={20}
              y1={t.y}
              x2={20 + t.w}
              y2={t.y}
              stroke="url(#grad-consol)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
              data-draw
              style={
                {
                  strokeDasharray: length,
                  strokeDashoffset: length,
                  transitionDelay: `${i * 90}ms`,
                } as React.CSSProperties
              }
            />
          );
        })}

        {/* Curves converging to a single endpoint */}
        {tasks.map((t, i) => {
          const startX = 20 + t.w;
          const endX = 150;
          const endY = 95;
          const cpX = (startX + endX) / 2;
          const length = 130;
          return (
            <path
              key={`p-${i}`}
              d={`M ${startX} ${t.y} C ${cpX} ${t.y}, ${cpX} ${endY}, ${endX} ${endY}`}
              fill="none"
              stroke="url(#grad-consol)"
              strokeWidth="1"
              strokeOpacity="0.5"
              strokeLinecap="round"
              data-draw
              style={
                {
                  strokeDasharray: length,
                  strokeDashoffset: length,
                  transitionDelay: `${500 + i * 70}ms`,
                } as React.CSSProperties
              }
            />
          );
        })}

        {/* Single consolidated pipeline (output) */}
        <rect
          x="150"
          y="90"
          width="36"
          height="10"
          rx="3"
          fill="url(#grad-consol)"
          filter="url(#glow-consol)"
          data-fade
          style={{ transitionDelay: "1100ms" }}
        />
        <circle
          cx="186"
          cy="95"
          r="3"
          fill="#d4b0d4"
          filter="url(#glow-consol)"
          data-fade
          style={{ transitionDelay: "1300ms" }}
        />
      </svg>
    </div>
  );
}

/* ============================================================
   Pattern 02 — Smoothing
   Top: jagged manual handoff path.
   Bottom: continuous automation flow.
   Connector implies "one becomes the other."
============================================================ */
function SmoothingChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  const jagged =
    "M 20 60 L 35 48 L 50 72 L 65 50 L 80 76 L 95 54 L 110 70 L 125 50 L 140 66 L 155 56 L 180 62";
  const smooth =
    "M 20 140 C 60 140, 100 140, 180 140";
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="grad-smooth" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#786478" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#d4b0d4" stopOpacity="0.95" />
          </linearGradient>
          <filter id="glow-smooth" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Manual jagged path */}
        <path
          d={jagged}
          fill="none"
          stroke="url(#grad-smooth)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          filter="url(#glow-smooth)"
          data-draw
          style={
            {
              strokeDasharray: 320,
              strokeDashoffset: 320,
              transitionDelay: "0ms",
            } as React.CSSProperties
          }
        />

        {/* Connector arrow down */}
        <line
          x1="100"
          y1="90"
          x2="100"
          y2="125"
          stroke="#786478"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="3 4"
          data-draw
          style={
            {
              strokeDasharray: 40,
              strokeDashoffset: 40,
              transitionDelay: "600ms",
            } as React.CSSProperties
          }
        />
        <path
          d="M 96 121 L 100 127 L 104 121"
          fill="none"
          stroke="#786478"
          strokeWidth="1"
          strokeOpacity="0.5"
          data-fade
          style={{ transitionDelay: "1000ms" }}
        />

        {/* Smooth automated path */}
        <path
          d={smooth}
          fill="none"
          stroke="url(#grad-smooth)"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#glow-smooth)"
          data-draw
          style={
            {
              strokeDasharray: 200,
              strokeDashoffset: 200,
              transitionDelay: "1100ms",
            } as React.CSSProperties
          }
        />

        {/* End cap on smooth path */}
        <circle
          cx="180"
          cy="140"
          r="3"
          fill="#d4b0d4"
          filter="url(#glow-smooth)"
          data-fade
          style={{ transitionDelay: "1900ms" }}
        />
      </svg>
    </div>
  );
}

/* ============================================================
   Pattern 03 — Compounding
   One solid centre point. Four expanding arcs ripple outward
   representing recurring returns over time.
============================================================ */
function CompoundingChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="grad-compound-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4b0d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#786478" stopOpacity="0.75" />
          </radialGradient>
          <linearGradient id="grad-compound-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4b0d4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#786478" stopOpacity="0.45" />
          </linearGradient>
          <filter id="glow-compound" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ripple arcs growing outward (each arc covers about 280deg) */}
        {[35, 55, 78, 100].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="url(#grad-compound-arc)"
            strokeWidth={i === 0 ? 1.4 : 1.1}
            strokeLinecap="round"
            opacity={1 - i * 0.18}
            filter="url(#glow-compound)"
            data-draw
            style={
              {
                strokeDasharray: 2 * Math.PI * r,
                strokeDashoffset: 2 * Math.PI * r,
                transitionDelay: `${i * 220}ms`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Core engagement dot */}
        <circle
          cx="100"
          cy="100"
          r="6"
          fill="url(#grad-compound-core)"
          filter="url(#glow-compound)"
          data-fade
          style={{ transitionDelay: "0ms" }}
        />
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
        <p className="font-serif text-[1rem] font-medium text-paper-ink">{title}</p>
        <p className="mt-1 max-w-[220px] text-[0.8125rem] leading-[1.55] text-mauve-300">
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
            className="mt-4 text-center font-serif text-[clamp(1.375rem,2.4vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.01em] text-paper-ink"
          >
            What removing manual work actually looks like.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            <MiniChart
              title="Many tasks become one pipeline"
              caption="Six manual jobs done daily become a single quiet system that runs by itself."
            >
              <ConsolidationChart />
            </MiniChart>
            <MiniChart
              title="Jagged handoffs become flow"
              caption="The bumps between people, tools, and inboxes smooth into a continuous line."
            >
              <SmoothingChart />
            </MiniChart>
            <MiniChart
              title="One engagement keeps returning"
              caption="The work we ship together compounds for months after we have left the room."
            >
              <CompoundingChart />
            </MiniChart>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
