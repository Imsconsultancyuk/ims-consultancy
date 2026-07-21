"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";

import { track } from "@/lib/analytics";
import type { DemoStage, Tool } from "@/lib/industries/types";
import { useDemoArm } from "./DemoContext";

export type DemoStatus = "idle" | "armed" | "processing" | "complete";

export interface DemoState {
  status: DemoStatus;
  toolId: string | null;
  stageIndex: number;
  stageProgress: number;
}

export type DemoAction =
  | { type: "ARM"; toolId: string }
  | { type: "DISARM" }
  | { type: "RUN"; reducedMotion: boolean }
  | { type: "STAGE_PROGRESS"; stageIndex: number; stageProgress: number }
  | { type: "STAGE_ADVANCE" }
  | { type: "COMPLETE" }
  | { type: "RESET" };

export const initialDemoState: DemoState = {
  status: "idle",
  toolId: null,
  stageIndex: 0,
  stageProgress: 0,
};

const LAST_STAGE_INDEX = 3; // stages[0..3] — 4 stages total (IMS-040 spec)

// Pure reducer — exported so IMS-040's AC ("unit-tested reducer: happy path,
// double-drop ignored, reset, reduced-motion path") can be verified directly
// with vitest, no React rendering required.
export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "ARM":
      // "ignore ARM/DROP while processing"
      if (state.status === "processing") return state;
      return { status: "armed", toolId: action.toolId, stageIndex: 0, stageProgress: 0 };

    case "DISARM":
      if (state.status !== "armed") return state;
      return { ...initialDemoState };

    case "RUN":
      // RUN === the DropZone's DROP event. Ignore double-drops (already
      // processing) and drops with nothing armed.
      if (state.status !== "armed") return state;
      if (action.reducedMotion) {
        // "reducedMotion flag collapses all durations to 0 and jumps to
        // complete" — no timers are ever scheduled for this path.
        return { status: "complete", toolId: state.toolId, stageIndex: LAST_STAGE_INDEX, stageProgress: 1 };
      }
      return { status: "processing", toolId: state.toolId, stageIndex: 0, stageProgress: 0 };

    case "STAGE_PROGRESS":
      if (state.status !== "processing") return state;
      return { ...state, stageIndex: action.stageIndex, stageProgress: action.stageProgress };

    case "STAGE_ADVANCE":
      if (state.status !== "processing") return state;
      if (state.stageIndex >= LAST_STAGE_INDEX) return state;
      return { ...state, stageIndex: state.stageIndex + 1, stageProgress: 0 };

    case "COMPLETE":
      if (state.status !== "processing") return state;
      return { status: "complete", toolId: state.toolId, stageIndex: LAST_STAGE_INDEX, stageProgress: 1 };

    case "RESET":
      if (state.status !== "complete") return state;
      return { status: "armed", toolId: state.toolId, stageIndex: 0, stageProgress: 0 };

    default:
      return state;
  }
}

// Schedules the 4-stage timer sequence for one processing run: a timeout per
// stage boundary (dispatching STAGE_ADVANCE, then COMPLETE on the last), plus
// one interval ticking STAGE_PROGRESS off wall-clock elapsed time. Exported
// standalone (no React) so "no timer leaks — assert with fake timers" can be
// verified by calling the returned cleanup and asserting no further dispatch.
export function runStageTimers(
  stages: readonly [DemoStage, DemoStage, DemoStage, DemoStage],
  dispatch: (action: DemoAction) => void,
): () => void {
  const PROGRESS_TICK_MS = 50;
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  let stageStartAt = 0;
  stages.forEach((stage, index) => {
    const isLast = index === stages.length - 1;
    const fireAt = stageStartAt + stage.durationMs;
    timeouts.push(
      setTimeout(() => {
        dispatch(isLast ? { type: "COMPLETE" } : { type: "STAGE_ADVANCE" });
      }, fireAt),
    );
    stageStartAt += stage.durationMs;
  });

  const runStart = Date.now();
  const interval = setInterval(() => {
    const elapsed = Date.now() - runStart;
    let cumulative = 0;
    let stageIndex = 0;
    while (stageIndex < stages.length - 1 && elapsed >= cumulative + stages[stageIndex].durationMs) {
      cumulative += stages[stageIndex].durationMs;
      stageIndex += 1;
    }
    const stageProgress = Math.min(1, (elapsed - cumulative) / stages[stageIndex].durationMs);
    dispatch({ type: "STAGE_PROGRESS", stageIndex, stageProgress });
  }, PROGRESS_TICK_MS);

  return () => {
    timeouts.forEach(clearTimeout);
    clearInterval(interval);
  };
}

export interface UseDemoMachineResult {
  state: DemoState;
  arm: (toolId: string) => void;
  disarm: () => void;
  run: () => void;
  reset: () => void;
}

// One instance per page (mounted by IMS-050's page template around the demo
// zone). ToolCards elsewhere on the page pre-arm it indirectly via the
// existing DemoArmContext (IMS-023): they call armTool(id), and whichever
// component mounts this hook is expected to watch that value and call
// arm(id) in response — kept as two separate concerns so this hook has no
// dependency on that lighter-weight context.
export function useDemoMachine(industry: string, tools: readonly Tool[]): UseDemoMachineResult {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const prevStatusRef = useRef<DemoStatus>(state.status);

  useEffect(() => {
    if (state.status !== "processing") return;
    const tool = tools.find((candidate) => candidate.id === state.toolId);
    if (!tool) return;
    return runStageTimers(tool.demo.stages, dispatch);
  }, [state.status, state.toolId, tools]);

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    prevStatusRef.current = state.status;
    if (prevStatus === state.status) return;

    const toolId = state.toolId ?? undefined;
    if (state.status === "armed" && prevStatus === "idle") {
      track("demo_armed", { industry, tool: toolId });
    } else if (state.status === "processing") {
      track("demo_file_dropped", { industry, tool: toolId });
    } else if (state.status === "complete") {
      track("demo_completed", { industry, tool: toolId });
    }
  }, [state.status, state.toolId, industry]);

  const arm = useCallback((toolId: string) => dispatch({ type: "ARM", toolId }), []);
  const disarm = useCallback(() => dispatch({ type: "DISARM" }), []);
  const run = useCallback(() => {
    const reducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dispatch({ type: "RUN", reducedMotion });
  }, []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return { state, arm, disarm, run, reset };
}

const DemoMachineContext = createContext<UseDemoMachineResult | null>(null);

export interface DemoMachineProviderProps {
  industry: string;
  tools: readonly Tool[];
  children: ReactNode;
}

// Mounted once around the demo zone (IMS-050). Bridges the existing
// DemoArmContext (IMS-023, ToolCard's "See it run" button) into this
// machine: a change in armedToolId auto-dispatches ARM here, so ToolCard
// never needs to know this machine exists.
export function DemoMachineProvider({ industry, tools, children }: DemoMachineProviderProps): ReactElement {
  const machine = useDemoMachine(industry, tools);
  const { armedToolId } = useDemoArm();

  useEffect(() => {
    if (armedToolId) machine.arm(armedToolId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armedToolId]);

  return createElement(DemoMachineContext.Provider, { value: machine }, children);
}

export function useDemoMachineContext(): UseDemoMachineResult {
  const context = useContext(DemoMachineContext);
  if (!context) {
    throw new Error("useDemoMachineContext must be used within a DemoMachineProvider");
  }
  return context;
}
