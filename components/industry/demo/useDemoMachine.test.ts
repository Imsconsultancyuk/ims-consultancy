import { describe, expect, it, vi } from "vitest";

import {
  demoReducer,
  initialDemoState,
  runStageTimers,
  type DemoAction,
  type DemoState,
} from "./useDemoMachine";
import type { DemoStage } from "@/lib/industries/types";

const STAGES: [DemoStage, DemoStage, DemoStage, DemoStage] = [
  { key: "ingest", label: "Ingest", detail: "Reading sample file", durationMs: 1200 },
  { key: "detect", label: "Detect", detail: "Matching records", durationMs: 1400 },
  { key: "score", label: "Score", detail: "Scoring risk", durationMs: 1600 },
  { key: "draft", label: "Draft", detail: "Building report", durationMs: 1200 },
];

function armed(toolId = "tool-1"): DemoState {
  return demoReducer(initialDemoState, { type: "ARM", toolId });
}

describe("demoReducer", () => {
  it("happy path: idle -> armed -> processing -> complete", () => {
    let state = initialDemoState;
    expect(state.status).toBe("idle");

    state = demoReducer(state, { type: "ARM", toolId: "tool-1" });
    expect(state).toEqual({ status: "armed", toolId: "tool-1", stageIndex: 0, stageProgress: 0 });

    state = demoReducer(state, { type: "RUN", reducedMotion: false });
    expect(state.status).toBe("processing");
    expect(state.toolId).toBe("tool-1");

    state = demoReducer(state, { type: "STAGE_ADVANCE" });
    expect(state.stageIndex).toBe(1);

    state = demoReducer(state, { type: "COMPLETE" });
    expect(state).toEqual({ status: "complete", toolId: "tool-1", stageIndex: 3, stageProgress: 1 });
  });

  it("ignores ARM and RUN (double-drop) while processing", () => {
    const processing = demoReducer(armed(), { type: "RUN", reducedMotion: false });
    expect(processing.status).toBe("processing");

    const armedAgain = demoReducer(processing, { type: "ARM", toolId: "tool-2" });
    expect(armedAgain).toBe(processing);

    const droppedAgain = demoReducer(processing, { type: "RUN", reducedMotion: false });
    expect(droppedAgain).toBe(processing);
  });

  it("resets from complete back to armed, preserving the same tool", () => {
    let state = demoReducer(armed("tool-1"), { type: "RUN", reducedMotion: false });
    state = demoReducer(state, { type: "COMPLETE" });
    expect(state.status).toBe("complete");

    state = demoReducer(state, { type: "RESET" });
    expect(state).toEqual({ status: "armed", toolId: "tool-1", stageIndex: 0, stageProgress: 0 });
  });

  it("reduced-motion RUN jumps straight from armed to complete with no processing stage", () => {
    const state = demoReducer(armed("tool-1"), { type: "RUN", reducedMotion: true });
    expect(state).toEqual({ status: "complete", toolId: "tool-1", stageIndex: 3, stageProgress: 1 });
  });

  it("DISARM returns to idle only from armed", () => {
    const backToIdle = demoReducer(armed(), { type: "DISARM" });
    expect(backToIdle).toEqual(initialDemoState);

    expect(demoReducer(initialDemoState, { type: "DISARM" })).toBe(initialDemoState);
  });
});

describe("runStageTimers", () => {
  it("advances through all stages and dispatches COMPLETE on the last one", () => {
    vi.useFakeTimers();
    const dispatch = vi.fn<(action: DemoAction) => void>();

    const cleanup = runStageTimers(STAGES, dispatch);

    const totalMs = STAGES.reduce((sum, stage) => sum + stage.durationMs, 0);
    vi.advanceTimersByTime(totalMs);

    const dispatched = dispatch.mock.calls.map(([action]) => action.type);
    expect(dispatched).toContain("STAGE_ADVANCE");
    expect(dispatched).toContain("COMPLETE");
    expect(dispatched.filter((type) => type === "COMPLETE")).toHaveLength(1);

    cleanup();
    vi.useRealTimers();
  });

  it("cleanup clears all timers so no further dispatch occurs after unmount", () => {
    vi.useFakeTimers();
    const dispatch = vi.fn<(action: DemoAction) => void>();

    const cleanup = runStageTimers(STAGES, dispatch);
    vi.advanceTimersByTime(100);
    cleanup();
    dispatch.mockClear();

    const totalMs = STAGES.reduce((sum, stage) => sum + stage.durationMs, 0);
    vi.advanceTimersByTime(totalMs);

    expect(dispatch).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
