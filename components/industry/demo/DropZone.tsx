"use client";

import { useEffect, useRef, useState, type DragEvent } from "react";

import type { Accent, Tool } from "@/lib/industries/types";

import { SAMPLE_FILE_DRAG_TYPE } from "./SampleFileChip";
import { useDemoMachineContext } from "./useDemoMachine";

// Exact copy required by IMS-042 AC — never paraphrase.
const REJECTION_MESSAGE =
  "Use one of the sample files provided — we never take real data here";

interface DropZoneProps {
  tools: readonly Tool[];
  accent: Accent;
}

export function DropZone({ tools, accent }: DropZoneProps) {
  const { arm, run } = useDemoMachineContext();
  const [isDragOver, setIsDragOver] = useState(false);
  const [rejection, setRejection] = useState<string | null>(null);
  const rejectionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (rejectionTimeout.current) clearTimeout(rejectionTimeout.current);
    };
  }, []);

  function reject() {
    setRejection(REJECTION_MESSAGE);
    if (rejectionTimeout.current) clearTimeout(rejectionTimeout.current);
    rejectionTimeout.current = setTimeout(() => setRejection(null), 2400);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    // Prevents the browser's default action (opening/navigating to a real OS
    // file) and is required for onDrop to fire at all (HTML5 DnD spec).
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setIsDragOver(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragOver(false);

    // Real OS files carry a "Files" type. Bail out here — never touch
    // event.dataTransfer.files/.items, so a real file is never read.
    if (event.dataTransfer.types.includes("Files")) {
      reject();
      return;
    }

    const droppedId = event.dataTransfer.getData(SAMPLE_FILE_DRAG_TYPE);
    const tool = tools.find((candidate) => candidate.demo.sampleFile.id === droppedId);
    if (!tool) {
      reject();
      return;
    }

    arm(tool.id);
    run();
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-shaking={rejection ? "" : undefined}
        className="ims-dropzone flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-paper px-6 py-10 text-center transition-colors"
        style={
          isDragOver
            ? {
                borderColor: `var(--color-signal-${accent})`,
                boxShadow: `0 0 0 1px var(--color-signal-${accent})`,
              }
            : undefined
        }
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-ink-soft" fill="none" aria-hidden="true">
          <path
            d="M12 4v11m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm font-medium text-ink">
          Drop a sample file to watch the tool work
        </p>
      </div>
      {rejection ? (
        <p role="alert" className="text-sm font-medium text-signal-rose">
          {rejection}
        </p>
      ) : null}
    </div>
  );
}
