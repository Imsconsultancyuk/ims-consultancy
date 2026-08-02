"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

/**
 * Three artistic SVG visualisations describing what IMS does in shapes a
 * business owner reads at a glance. Each one runs a draw-on-reveal first,
 * then continues with a CONTINUOUS idle loop so the charts are never still.
 *
 *   1. Consolidation — six tasks march into one pipeline
 *   2. Smoothing    — jagged path resolves into a flowing line
 *   3. Compounding  — centre pulses, ripples expand on a loop
 *
 * All idle motion is CSS-driven so it survives JS pauses, hot reloads, and
 * tab-backgrounding.
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
    // Safety: force-show after 1500ms if observer somehow misses
    const safety = window.setTimeout(() => node.classList.add("is-drawn"), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);
  return ref;
}

/* ============================================================
   Pattern 01 — Consolidation
   - Six tick-marks on the left, each glides into a packet that
     travels along its curve to the central pipeline
   - Output bar opacity-pulses
   - Pipeline endpoint dot has a strong outward pulse
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
            <stop offset="0%" stopColor="#3a6df0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8aa9ff" stopOpacity="0.95" />
          </linearGradient>
          <filter id="glow-consol" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tick-marks left */}
        {tasks.map((t, i) => (
          <line
            key={`t-${i}`}
            x1={20}
            y1={t.y}
            x2={20 + t.w}
            y2={t.y}
            stroke="url(#grad-consol)"
            strokeWidth="2"
            strokeLinecap="round"
            className="ims-chart-tick"
            data-draw
            style={
              {
                strokeDasharray: t.w,
                strokeDashoffset: t.w,
                transitionDelay: `${i * 90}ms`,
                animationDelay: `${i * 0.2}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Curves converging — static reference paths */}
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
              strokeOpacity="0.45"
              strokeLinecap="round"
              className="ims-chart-flow"
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

        {/* Travelling packets — each rides along its converging curve on a
            staggered loop. Built with motion-path keyframes via SMIL-style
            <animateMotion> for broad browser support, falling through to
            static dots where unsupported. */}
        {tasks.map((t, i) => {
          const startX = 20 + t.w;
          const endX = 150;
          const endY = 95;
          const cpX = (startX + endX) / 2;
          const pathD = `M ${startX} ${t.y} C ${cpX} ${t.y}, ${cpX} ${endY}, ${endX} ${endY}`;
          return (
            <g key={`packet-${i}`} data-fade style={{ transitionDelay: `${1400 + i * 80}ms` }}>
              <circle r="1.8" fill="#8aa9ff" filter="url(#glow-consol)">
                <animateMotion
                  dur="3.6s"
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                  path={pathD}
                  rotate="auto"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur="3.6s"
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Output pipeline */}
        <rect
          x="150"
          y="90"
          width="36"
          height="10"
          rx="3"
          fill="url(#grad-consol)"
          filter="url(#glow-consol)"
          className="ims-chart-bar"
          data-fade
          style={{ transitionDelay: "1100ms" }}
        />

        {/* Endpoint pulse — strong pulse so motion is visible */}
        <circle
          cx="186"
          cy="95"
          r="3"
          fill="#8aa9ff"
          filter="url(#glow-consol)"
          className="ims-chart-pulse-strong"
          data-fade
          style={{ transitionDelay: "1300ms" }}
        />
      </svg>
    </div>
  );
}

/* ============================================================
   Pattern 02 — Smoothing
   - Jagged manual path on top, smooth automation on bottom
   - Three packets march along the smooth path on a loop
   - Endpoint dot pulses
============================================================ */
function SmoothingChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  const jagged =
    "M 20 60 L 35 48 L 50 72 L 65 50 L 80 76 L 95 54 L 110 70 L 125 50 L 140 66 L 155 56 L 180 62";
  const smooth = "M 20 140 C 60 140, 100 140, 180 140";
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="grad-smooth" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3a6df0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8aa9ff" stopOpacity="0.95" />
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
          className="ims-chart-jagged"
          data-draw
          style={
            {
              strokeDasharray: 320,
              strokeDashoffset: 320,
              transitionDelay: "0ms",
            } as React.CSSProperties
          }
        />

        {/* Connector arrow */}
        <line
          x1="100"
          y1="90"
          x2="100"
          y2="125"
          stroke="#3a6df0"
          strokeWidth="1"
          strokeOpacity="0.4"
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
          stroke="#3a6df0"
          strokeWidth="1"
          strokeOpacity="0.5"
          className="ims-chart-arrow"
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

        {/* Three packets riding the smooth path on a loop */}
        {[0, 1, 2].map((i) => (
          <g key={`s-pkt-${i}`} data-fade style={{ transitionDelay: `${1900 + i * 80}ms` }}>
            <circle r="2.2" fill="#8aa9ff" filter="url(#glow-smooth)">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 1.0}s`}
                path={smooth}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.9;1"
                dur="3s"
                begin={`${i * 1.0}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* End cap */}
        <circle
          cx="180"
          cy="140"
          r="3"
          fill="#8aa9ff"
          filter="url(#glow-smooth)"
          className="ims-chart-pulse-strong"
          data-fade
          style={{ transitionDelay: "1900ms" }}
        />
      </svg>
    </div>
  );
}

/* ============================================================
   Pattern 03 — Compounding
   - Static reference arcs
   - Multiple looped ripples emerging from centre (strong motion)
   - Core dot pulses
============================================================ */
function CompoundingChart() {
  const ref = useDrawOnReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="ims-chart">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="grad-compound-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8aa9ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#3a6df0" stopOpacity="0.75" />
          </radialGradient>
          <linearGradient id="grad-compound-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8aa9ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#3a6df0" stopOpacity="0.45" />
          </linearGradient>
          <filter id="glow-compound" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Reference arcs (draw on reveal) */}
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

        {/* Looped ripples using SMIL — broadly supported and continuous */}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={`ripple-${i}`}
            cx="100"
            cy="100"
            fill="none"
            stroke="#8aa9ff"
            strokeWidth="1.2"
            data-fade
            style={{ transitionDelay: `${1500 + i * 60}ms` }}
          >
            <animate
              attributeName="r"
              values="8;100"
              dur="3s"
              begin={`${i * 0.75}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.9;0"
              dur="3s"
              begin={`${i * 0.75}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              values="1.4;0.3"
              dur="3s"
              begin={`${i * 0.75}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Core */}
        <circle
          cx="100"
          cy="100"
          r="6"
          fill="url(#grad-compound-core)"
          filter="url(#glow-compound)"
          className="ims-chart-pulse-strong"
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
    <article className="ims-flip-card group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-mauve-500/15 bg-paper-soft/80 p-8 text-center backdrop-blur transition-all duration-500 hover:border-accent-500/0 hover:bg-accent-500 hover:shadow-[0_24px_60px_-22px_rgba(58,109,240,0.6)]">
      <span
        aria-hidden="true"
        className="ims-flip-sweep pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative h-[140px] w-[140px] transition-transform duration-500 group-hover:scale-[1.06] sm:h-[160px] sm:w-[160px]">
        {children}
      </div>
      <div className="relative mt-6">
        <p className="font-serif text-[1.125rem] font-medium leading-snug text-ink transition-colors duration-500 group-hover:text-paper">
          {title}
        </p>
        <p className="mt-2 max-w-[240px] text-[0.875rem] leading-[1.55] text-ink-soft transition-colors duration-500 group-hover:text-paper/90">
          {caption}
        </p>
      </div>
    </article>
  );
}

export function ArtisticCharts() {
  return (
    <section
      id="patterns"
      aria-labelledby="patterns-heading"
      className="relative bg-paper px-6 py-20 text-ink sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="ims-paper-aura pointer-events-none absolute inset-0 -z-10"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="text-center font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500">
            Quiet patterns
          </p>
          <h2
            id="patterns-heading"
            className="mt-4 text-center font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.2] tracking-[-0.01em] text-ink"
          >
            What removing manual work looks like.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6">
            <MiniChart
              title="Many tasks, one system"
              caption="Six daily jobs become one quiet pipeline."
            >
              <ConsolidationChart />
            </MiniChart>
            <MiniChart
              title="Bumpy handoffs, smooth flow"
              caption="Your tools and inboxes finally talk to each other."
            >
              <SmoothingChart />
            </MiniChart>
            <MiniChart
              title="One engagement, lasting returns"
              caption="What we build keeps paying back after we leave."
            >
              <CompoundingChart />
            </MiniChart>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
