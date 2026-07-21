"use client";

import { useEffect, useMemo, useRef } from "react";

import { track } from "@/lib/analytics";
import { BOOK_CALL_URL } from "@/lib/industries/config";
import type { Tool } from "@/lib/industries/types";

import { useDemoMachineContext } from "./useDemoMachine";

interface ResultsPanelProps {
  tools: readonly Tool[];
  industry: string;
}

export function ResultsPanel({ tools, industry }: ResultsPanelProps) {
  const { state, reset } = useDemoMachineContext();
  const tool = tools.find((candidate) => candidate.id === state.toolId);
  const isComplete = state.status === "complete" && !!tool;

  const headlineRef = useRef<HTMLParagraphElement | null>(null);
  const announceRef = useRef<HTMLParagraphElement | null>(null);
  const hasAnnounced = useRef(false);

  // AC: "Focus moves to headline on reveal." Also owns resetting the
  // one-shot announce guard below whenever the panel leaves the complete
  // state, so the next completion announces again.
  useEffect(() => {
    if (isComplete) {
      headlineRef.current?.focus();
    } else {
      hasAnnounced.current = false;
    }
  }, [isComplete]);

  // AC: "aria-live announces headline + metrics once" — a single combined
  // string built once per completion, separate from the per-metric
  // count-up spans (which stay aria-hidden, same split used by
  // ResultsBlock's CountUpMetric) so mid-count values never reach
  // assistive tech and the region never re-announces on every tick.
  useEffect(() => {
    if (!isComplete || !tool || hasAnnounced.current || !announceRef.current) return;
    hasAnnounced.current = true;
    const { result } = tool.demo;
    announceRef.current.textContent = [
      result.headline,
      ...result.metrics.map((metric) => `${metric.label}: ${metric.value}`),
    ].join(". ");
  }, [isComplete, tool]);

  function handleRunAnother() {
    reset();
    // Chips never unmount (SampleFileChip renders regardless of machine
    // status), so the DOM node is already present the instant this fires.
    document.querySelector<HTMLButtonElement>("[data-sample-chip]")?.focus();
  }

  if (!isComplete || !tool) return null;

  const { result } = tool.demo;

  return (
    <div className="ims-results-panel relative flex flex-col gap-6 rounded-lg bg-ink p-6 text-paper-ink md:p-8">
      <span className="absolute right-4 top-4 whitespace-nowrap rounded-full border border-paper-ink-soft px-2 py-0.5 text-[11px] uppercase tracking-wide text-paper-ink-soft">
        Synthetic demonstration data
      </span>
      <p
        ref={headlineRef}
        tabIndex={-1}
        className="font-industry-display max-w-xl text-2xl font-medium md:text-3xl"
      >
        {result.headline}
      </p>
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {result.metrics.map((metric) => (
          <div key={metric.label} className="border-l-2 border-paper-ink-soft pl-4">
            <dd
              className={`num text-3xl font-semibold md:text-4xl ${
                metric.emphasis ? "text-positive" : "text-paper-ink"
              }`}
            >
              <CountUpMetric value={metric.value} />
            </dd>
            <dt className="mt-1 text-sm text-paper-ink-soft">{metric.label}</dt>
          </div>
        ))}
      </dl>
      <p className="text-sm text-paper-ink-soft">{result.solution}</p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href={BOOK_CALL_URL}
          onClick={() => track("book_call_clicked", { industry, tool: tool.id })}
          className="inline-flex items-center justify-center rounded-md bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          Book 20 minutes — run it on your book
        </a>
        <button
          type="button"
          onClick={handleRunAnother}
          className="inline-flex min-h-[44px] items-center text-sm font-medium text-paper-ink underline-offset-4 hover:underline"
        >
          Run another tool
        </button>
      </div>
      <p ref={announceRef} aria-live="polite" className="sr-only" />
    </div>
  );
}

// Duplicated from ResultsBlock.tsx rather than extracted: that file sits
// outside IMS-043's file map/deps, and the logic is small enough that
// duplicating it is simpler than introducing a shared module (hard rule 6 —
// touch only mapped files; simplicity first).
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
