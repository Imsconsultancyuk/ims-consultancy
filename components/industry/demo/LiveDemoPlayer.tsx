"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import type { Tool } from "@/lib/industries/types";

import { useDemoMachineContext } from "./useDemoMachine";

interface LiveDemoPlayerProps {
  tools: readonly Tool[];
}

const GLIDE_MS = 500;
const RESULTS_MS = 2500;
const STAGE_COMPRESSION = 0.6;

type Phase = "glide" | "processing" | "results";

interface CycleStep {
  phase: Phase;
  stageIndex: number;
  durationMs: number;
}

// "chip glides into the zone, pipeline runs (compressed 0.6x durations),
// results flash 2.5s" — one step per phase, stage durations compressed from
// the same DemoStage data the real, user-driven machine uses.
function buildCycle(tool: Tool): CycleStep[] {
  const steps: CycleStep[] = [{ phase: "glide", stageIndex: 0, durationMs: GLIDE_MS }];
  tool.demo.stages.forEach((stage, index) => {
    steps.push({
      phase: "processing",
      stageIndex: index,
      durationMs: stage.durationMs * STAGE_COMPRESSION,
    });
  });
  steps.push({ phase: "results", stageIndex: 0, durationMs: RESULTS_MS });
  return steps;
}

const CAPTION =
  "Live demonstration — synthetic data. Drag a file below to drive it yourself.";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function LiveDemoPlayer({ tools }: LiveDemoPlayerProps) {
  const [toolIndex, setToolIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPausedByInteraction, setIsPausedByInteraction] = useState(false);
  const [reducedMotionTabIndex, setReducedMotionTabIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  // Read-only subscription to the real, user-driven machine — used only to
  // detect that the user has started the manual zone, never dispatched into.
  // Combined with this component's own local step/tool state (never touching
  // that reducer), this is what keeps the two fully separate instances.
  const { state: userMachineState } = useDemoMachineContext();
  const userIsActive = userMachineState.status !== "idle";

  // AC: "Never runs off-screen (battery)."
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const tool = tools[toolIndex];
  const steps = useMemo(() => buildCycle(tool), [tool]);
  const step = steps[stepIndex] ?? steps[0];

  // AC: "User interaction with the manual zone pauses the player" (userIsActive)
  // plus off-screen + hover/focus pausing described in the ticket body.
  const isRunning = isVisible && !isPausedByInteraction && !userIsActive && !reducedMotion;

  useEffect(() => {
    if (!isRunning) return;
    const timeout = setTimeout(() => {
      if (stepIndex + 1 < steps.length) {
        setStepIndex(stepIndex + 1);
      } else {
        setStepIndex(0);
        setToolIndex((prev) => (prev + 1) % tools.length);
      }
    }, step.durationMs);
    return () => clearTimeout(timeout);
  }, [isRunning, stepIndex, steps.length, step.durationMs, tools.length]);

  if (reducedMotion) {
    const activeTool = tools[reducedMotionTabIndex];
    const { result } = activeTool.demo;
    return (
      <div className="relative flex flex-col gap-5 rounded-lg bg-ink p-6 text-paper-ink md:p-8">
        <span className="absolute right-4 top-4 whitespace-nowrap rounded-full border border-paper-ink-soft px-2 py-0.5 text-[11px] uppercase tracking-wide text-paper-ink-soft">
          Synthetic demonstration data
        </span>
        <p className="max-w-md text-xs text-paper-ink-soft">{CAPTION}</p>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tool results">
          {tools.map((toolOption, index) => (
            <button
              key={toolOption.id}
              type="button"
              role="tab"
              aria-selected={index === reducedMotionTabIndex}
              onClick={() => setReducedMotionTabIndex(index)}
              className={`min-h-[44px] rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                index === reducedMotionTabIndex
                  ? "border-paper-ink bg-paper text-ink"
                  : "border-paper-ink-soft text-paper-ink-soft"
              }`}
            >
              {toolOption.name}
            </button>
          ))}
        </div>
        <p className="font-industry-display text-xl font-medium md:text-2xl">{result.headline}</p>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {result.metrics.map((metric) => (
            <div key={metric.label} className="border-l-2 border-paper-ink-soft pl-4">
              <dd
                className={`num text-2xl font-semibold ${
                  metric.emphasis ? "text-positive" : "text-paper-ink"
                }`}
              >
                {metric.value}
              </dd>
              <dt className="mt-1 text-xs text-paper-ink-soft">{metric.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPausedByInteraction(true)}
      onMouseLeave={() => setIsPausedByInteraction(false)}
      onFocus={() => setIsPausedByInteraction(true)}
      onBlur={() => setIsPausedByInteraction(false)}
      className="relative flex min-h-[220px] flex-col gap-5 rounded-lg bg-ink p-6 text-paper-ink md:p-8"
    >
      <span className="absolute right-4 top-4 whitespace-nowrap rounded-full border border-paper-ink-soft px-2 py-0.5 text-[11px] uppercase tracking-wide text-paper-ink-soft">
        Synthetic demonstration data
      </span>
      <p className="max-w-md text-xs text-paper-ink-soft">{CAPTION}</p>

      {step.phase === "glide" ? (
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 text-paper-ink-soft"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 2h9l3 3v17H6z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M14 2v4h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm text-paper-ink-soft">{tool.demo.sampleFile.label}</span>
        </div>
      ) : null}

      {step.phase === "processing" ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {tool.demo.stages.map((stage, index) => (
              <div
                key={stage.key}
                className={`h-1.5 flex-1 rounded-full ${
                  index <= step.stageIndex ? "bg-paper-ink" : "bg-deep-veil"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-paper-ink-soft">{tool.demo.stages[step.stageIndex].label}</p>
        </div>
      ) : null}

      {step.phase === "results" ? (
        <div className="flex flex-col gap-3">
          <p className="font-industry-display text-lg font-medium md:text-xl">
            {tool.demo.result.headline}
          </p>
          <p
            className={`num text-2xl font-semibold ${
              tool.demo.result.metrics[0].emphasis ? "text-positive" : "text-paper-ink"
            }`}
          >
            {tool.demo.result.metrics[0].value}
          </p>
        </div>
      ) : null}
    </div>
  );
}
