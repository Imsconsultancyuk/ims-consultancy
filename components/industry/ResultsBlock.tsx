"use client";

import { useEffect, useMemo, useRef } from "react";

import type { DemoMetric } from "@/lib/industries/types";

interface ResultsBlockProps {
  results: {
    heading: string;
    before: string;
    after: string;
    metrics: [DemoMetric, DemoMetric, DemoMetric];
  };
}

export function ResultsBlock({ results }: ResultsBlockProps) {
  return (
    <div className="flex flex-col gap-10">
      <h3 className="font-industry-display text-lg font-medium text-ink">
        {results.heading}
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-paper p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Before
          </p>
          <p className="mt-2 text-base text-ink-soft">{results.before}</p>
        </div>
        <div className="rounded-lg border border-line bg-paper p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            After
          </p>
          <p className="mt-2 text-base text-ink">{results.after}</p>
        </div>
      </div>
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {results.metrics.map((metric) => (
          <div key={metric.label} className="border-l-2 border-line pl-4">
            <dd
              className={`num text-3xl font-semibold md:text-4xl ${
                metric.emphasis ? "text-ink" : "text-ink-soft"
              }`}
            >
              <CountUpMetric value={metric.value} />
            </dd>
            <dt className="mt-1 text-sm text-ink-soft">{metric.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface ParsedMetric {
  prefix: string;
  suffix: string;
  decimals: number;
  hasCommas: boolean;
  targetNum: number;
}

function parseMetricValue(value: string): ParsedMetric | null {
  const match = value.match(/-?[\d,]*\.?\d+/);
  if (!match || match.index === undefined) return null;

  const numStr = match[0];
  const targetNum = parseFloat(numStr.replace(/,/g, ""));
  if (Number.isNaN(targetNum)) return null;

  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + numStr.length),
    decimals: numStr.includes(".") ? numStr.split(".")[1].length : 0,
    hasCommas: numStr.includes(","),
    targetNum,
  };
}

function formatMetricNumber(n: number, decimals: number, hasCommas: boolean): string {
  const fixed = n.toFixed(decimals);
  if (!hasCommas) return fixed;

  const [intPart, decPart] = fixed.split(".");
  const grouped = Number(intPart).toLocaleString("en-GB");
  return decPart ? `${grouped}.${decPart}` : grouped;
}

// Drives the count-up by mutating the ref'd node's textContent directly
// (matching the imperative pattern in app/_components/Reveal.tsx) rather than
// React state, since the animation is a one-off DOM synchronization, not
// something the render tree needs to react to. Screen readers only ever get
// the final value (sr-only span below) — the animator span is aria-hidden,
// so mid-count intermediate values never reach assistive tech (IMS-025 AC).
function CountUpMetric({ value }: { value: string }) {
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !parsed) return;
    const p = parsed;
    const target = node;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      target.textContent = value;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        io.unobserve(entry.target);

        const duration = 600;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          target.textContent = `${p.prefix}${formatMetricNumber(p.targetNum * eased, p.decimals, p.hasCommas)}${p.suffix}`;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            target.textContent = value;
          }
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [parsed, value]);

  const initialDisplay = parsed
    ? `${parsed.prefix}${formatMetricNumber(0, parsed.decimals, parsed.hasCommas)}${parsed.suffix}`
    : value;

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {initialDisplay}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
