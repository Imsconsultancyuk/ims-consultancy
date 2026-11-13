"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { track } from "@/lib/analytics";
import type { Tool } from "@/lib/industries/types";

import { useReducedMotion } from "./useReducedMotion";

interface ToolDemoProps {
  tool: Tool;
  sectorSlug: string;
}

const RAIL_WORDS = ["Read", "Detect", "Score", "Draft"] as const;
const COMPRESSION = 0.5;

// Scripted run of one tool on its own synthetic sample file. It reuses the
// stage timings and result copy already written for the industry pages.
export function ToolDemo({ tool, sectorSlug }: ToolDemoProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const [runKey, setRunKey] = useState(1);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);
  const { sampleFile, stages, result } = tool.demo;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    setDone(false);
    setStage(0);
    if (reduced) {
      setStage(stages.length - 1);
      setDone(true);
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set("[data-fill]", { scaleX: 0 });
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          track("demo_completed", { industry: sectorSlug, tool: tool.id });
        },
      });
      tl.fromTo("[data-chip]", { x: -36, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" });
      stages.forEach((s, i) => {
        tl.call(() => setStage(i));
        tl.to(`[data-fill="${i}"]`, { scaleX: 1, duration: (s.durationMs * COMPRESSION) / 1000, ease: "none" });
      });
    }, root);
    return () => ctx.revert();
  }, [runKey, reduced, stages, sectorSlug, tool.id]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !done || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-res]",
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.09 },
      );
    }, root);
    return () => ctx.revert();
  }, [done, reduced]);

  const current = stages[stage];

  return (
    <div ref={rootRef} className="rounded-[14px] border border-paper-ink/20 bg-deep p-5 text-paper-ink md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-cobalt-300/40 bg-cobalt-300/10 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-cobalt-300">
          Live example · synthetic data
        </span>
        <button
          type="button"
          onClick={() => setRunKey((k) => k + 1)}
          className="min-h-11 rounded-full border border-paper-ink/30 px-4 text-sm font-medium text-paper-ink transition-colors hover:border-accent-400 hover:text-accent-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
        >
          Run it again
        </button>
      </div>

      <div
        data-chip
        className="mt-5 inline-flex items-center gap-3 rounded-[10px] border border-dashed border-paper-ink/40 px-4 py-3"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-mauve-200" fill="none" aria-hidden="true">
          <path d="M6 2h9l3 3v17H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M14 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="num text-sm">{sampleFile.label}</span>
        <span className="text-xs text-mauve-200">{sampleFile.meta}</span>
      </div>

      <ol className="mt-6 grid grid-cols-4 gap-2 sm:gap-3" aria-label="Pipeline stages">
        {RAIL_WORDS.map((word, i) => (
          <li key={word}>
            <div className="h-1.5 overflow-hidden rounded-full bg-deep-veil">
              <div
                data-fill={i}
                className="h-full origin-left rounded-full bg-accent-400"
                style={reduced ? undefined : { transform: "scaleX(0)" }}
              />
            </div>
            <span
              className={`mt-2 block text-[11px] uppercase tracking-[0.14em] ${
                i <= stage ? "text-paper-ink" : "text-mauve-300"
              }`}
            >
              {word}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-4 min-h-[2.75rem] text-sm text-mauve-200" aria-live="polite">
        {done ? "Finished. Nothing left your environment untokenised." : `${current.label}. ${current.detail}.`}
      </p>

      <div className="mt-4 min-h-[170px] border-t border-paper-ink/15 pt-5">
        {done ? (
          <>
            <p data-res className="font-industry-display text-xl font-semibold leading-snug md:text-2xl">
              {result.headline}
            </p>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {result.metrics.map((m) => (
                <div key={m.label} data-res className="border-t border-paper-ink/20 pt-3">
                  <dd className={`num text-2xl font-semibold ${m.emphasis ? "text-accent-300" : "text-paper-ink"}`}>
                    {m.value}
                  </dd>
                  <dt className="mt-1 text-xs text-mauve-200">{m.label}</dt>
                </div>
              ))}
            </dl>
            <p data-res className="mt-4 text-sm text-mauve-200">
              {result.solution}
            </p>
          </>
        ) : (
          <div aria-hidden="true" className="flex flex-col gap-4">
            <div className="h-6 w-3/4 rounded-full bg-paper-ink/10" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[0, 1, 2].map((n) => (
                <div key={n} className="border-t border-paper-ink/20 pt-3">
                  <div className="h-7 w-24 rounded-full bg-paper-ink/10" />
                  <div className="mt-2 h-3 w-32 rounded-full bg-paper-ink/[0.07]" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
