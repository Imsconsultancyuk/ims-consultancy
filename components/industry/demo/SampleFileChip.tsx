"use client";

import type { DragEvent } from "react";

import type { Accent, Tool } from "@/lib/industries/types";

import { useDemoMachineContext } from "./useDemoMachine";

// Read by DropZone (IMS-042) on drop to identify which sample file was
// dragged in. text/plain for broadest desktop browser drag-and-drop support.
export const SAMPLE_FILE_DRAG_TYPE = "text/plain";

interface SampleFileChipProps {
  tool: Tool;
  accent: Accent;
}

export function SampleFileChip({ tool, accent }: SampleFileChipProps) {
  const { state, arm, run } = useDemoMachineContext();
  const { sampleFile } = tool.demo;
  const isArmed = state.status === "armed" && state.toolId === tool.id;

  function handleDragStart(event: DragEvent<HTMLButtonElement>) {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData(SAMPLE_FILE_DRAG_TYPE, sampleFile.id);
  }

  function handleActivate() {
    // Mobile/touch + keyboard path (native button semantics also cover
    // Enter/Space): ARM then RUN in one step, no separate drop target needed.
    arm(tool.id);
    run();
  }

  return (
    <button
      type="button"
      draggable
      onDragStart={handleDragStart}
      onClick={handleActivate}
      aria-pressed={isArmed}
      className="flex items-center gap-3 border border-line bg-paper px-4 py-3 text-left transition-shadow"
      style={isArmed ? { boxShadow: `0 0 0 2px var(--color-signal-${accent})` } : undefined}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-ink-soft" fill="none" aria-hidden="true">
        <path d="M6 2h9l3 3v17H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M14 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-ink">{sampleFile.label}</span>
        <span className="text-xs text-ink-soft">{sampleFile.meta}</span>
      </span>
      <span className="whitespace-nowrap rounded-full border border-line px-2 py-0.5 text-[11px] uppercase tracking-wide text-ink-soft">
        Synthetic sample
      </span>
    </button>
  );
}
