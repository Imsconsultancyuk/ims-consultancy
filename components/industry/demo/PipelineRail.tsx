"use client";

import { useEffect, useRef } from "react";

import type { Tool } from "@/lib/industries/types";

import { useDemoMachineContext } from "./useDemoMachine";

interface PipelineRailProps {
  tools: readonly Tool[];
}

// No record-count field exists on the data model (lib/industries/types.ts) —
// AD-3/AD-4 forbid fabricating real data, so the counter target is parsed
// from the sample file's own meta line ("240 clients" -> 240), with a
// fallback constant for the no-digit case.
function parseRecordTarget(meta: string): number {
  const match = meta.match(/\d[\d,]*/);
  if (!match) return 240;
  return parseInt(match[0].replace(/,/g, ""), 10);
}

export function PipelineRail({ tools }: PipelineRailProps) {
  const { state } = useDemoMachineContext();
  const announceRef = useRef<HTMLParagraphElement | null>(null);
  const tool = tools.find((candidate) => candidate.id === state.toolId);
  const isRunning = state.status === "processing" || state.status === "complete";

  useEffect(() => {
    if (!tool || !announceRef.current || !isRunning) return;
    announceRef.current.textContent = tool.demo.stages[state.stageIndex].label;
  }, [tool, isRunning, state.stageIndex]);

  if (!tool || !isRunning) return null;

  const { stages, sampleFile } = tool.demo;
  const activeStage = stages[state.stageIndex];
  const target = parseRecordTarget(sampleFile.meta);
  const overallProgress =
    (state.stageIndex + (state.status === "complete" ? 1 : state.stageProgress)) / stages.length;
  const recordCount = Math.round(target * Math.min(1, overallProgress));

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-ink p-6 text-paper-ink md:p-8">
      <div className="flex items-center gap-2">
        {stages.map((stage, index) => {
          const fillScale =
            state.status === "complete" || index < state.stageIndex
              ? 1
              : index === state.stageIndex
                ? state.stageProgress
                : 0;
          const isActive = index === state.stageIndex && state.status === "processing";
          return (
            <div
              key={stage.key}
              className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-deep-veil"
            >
              <div
                className="absolute inset-0 origin-left rounded-full bg-paper-ink"
                style={{ transform: `scaleX(${fillScale})` }}
              />
              {isActive ? (
                <div
                  className="ims-rail-shimmer absolute inset-y-0 left-0 w-1/3"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(245,239,243,0.55), transparent)",
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-paper-ink">{activeStage.label}</p>
          <p className="text-xs text-paper-ink-soft">{activeStage.detail}</p>
        </div>
        <p className="num text-2xl font-semibold text-paper-ink">
          {recordCount.toLocaleString("en-GB")}
        </p>
      </div>
      <p ref={announceRef} aria-live="polite" className="sr-only" />
    </div>
  );
}
