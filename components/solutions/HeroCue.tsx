"use client";

import { MotionCue } from "./MotionCue";
import { useReducedMotion } from "./useReducedMotion";

export function HeroCue() {
  const reduced = useReducedMotion();
  return (
    <MotionCue
      tone="dark"
      controls="pick"
      onClick={() => document.getElementById("pick")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })}
    >
      Choose your industry
    </MotionCue>
  );
}
