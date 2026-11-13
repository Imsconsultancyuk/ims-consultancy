"use client";

import { useState } from "react";

import { track } from "@/lib/analytics";
import { workName, type SolutionSector } from "@/lib/industries/solutions";
import type { Tool } from "@/lib/industries/types";

import { Disclosure } from "./Disclosure";
import { useReducedMotion } from "./useReducedMotion";
import { TokenGuard } from "./TokenGuard";
import { ToolDemo } from "./ToolDemo";

interface ToolItemProps {
  sector: SolutionSector;
  tool: Tool;
  index: number;
  open: boolean;
  onToggle: () => void;
}

const BTN =
  "min-h-11 rounded-full px-5 text-sm font-semibold transition-[transform,background-color,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] motion-reduce:transition-none";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToolItem({ sector, tool, index, open, onToggle }: ToolItemProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSession, setDemoSession] = useState(0);
  const [explainOpen, setExplainOpen] = useState(false);
  const reduced = useReducedMotion();

  const base = `${sector.slug}-${tool.id}`;
  const pain = sector.pains[index];

  function toggleDemo() {
    if (!demoOpen) {
      setDemoSession((n) => n + 1);
      track("demo_armed", { industry: sector.slug, tool: tool.id });
      // Bring the run into view once the disclosure has opened, so it is seen from the first stage.
      window.setTimeout(() => {
        document.getElementById(`${base}-demo`)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      }, 450);
    }
    setDemoOpen((v) => !v);
  }

  return (
    <article id={base} className="scroll-mt-[calc(var(--fx-nav)+84px)] rounded-[14px] border border-line bg-paper-pure">
      <h3>
        <button
          type="button"
          id={`${base}-hdr`}
          aria-expanded={open}
          aria-controls={`${base}-body`}
          onClick={onToggle}
          className="flex w-full items-start gap-4 rounded-[14px] p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info md:items-center md:gap-6 md:p-6"
        >
          <span className="num mt-1 text-sm text-ink-soft md:mt-0">0{index + 1}</span>
          <span className="flex-1">
            <span className="block font-display text-lg font-semibold leading-snug text-ink md:text-xl">{tool.name}</span>
            <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{tool.problem}</span>
          </span>
          <span className="mt-1 text-ink md:mt-0">
            <Chevron open={open} />
          </span>
        </button>
      </h3>

      <Disclosure open={open} id={`${base}-body`} labelledBy={`${base}-hdr`}>
        <div className="border-t border-line px-5 pb-6 pt-5 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">What it does</h4>
              <p className="mt-2 text-base leading-relaxed text-ink">{tool.outcome}</p>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">How it helps you</h4>
              <ol className="mt-2 flex flex-col gap-2.5">
                {tool.actions.map((a, i) => (
                  <li key={a} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                    <span className="num mt-0.5 text-xs text-info">{i + 1}</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              id={`${base}-demo-btn`}
              aria-expanded={demoOpen}
              aria-controls={`${base}-demo`}
              onClick={toggleDemo}
              className={`${BTN} bg-accent-500 text-on-amber hover:bg-accent-400 focus-visible:outline-accent-700`}
            >
              {demoOpen ? "Hide live example" : "Show live example"}
            </button>
            <button
              type="button"
              id={`${base}-explain-btn`}
              aria-expanded={explainOpen}
              aria-controls={`${base}-explain`}
              onClick={() => setExplainOpen((v) => !v)}
              className={`${BTN} border border-ink/30 text-ink hover:border-info hover:text-info focus-visible:outline-info`}
            >
              {explainOpen ? "Close explanation" : "Explain the tool"}
            </button>
          </div>

          <Disclosure open={demoOpen} id={`${base}-demo`} labelledBy={`${base}-demo-btn`}>
            <div className="pt-5">{demoSession > 0 ? <ToolDemo key={demoSession} tool={tool} sectorSlug={sector.slug} /> : null}</div>
          </Disclosure>

          <Disclosure open={explainOpen} id={`${base}-explain`} labelledBy={`${base}-explain-btn`}>
            <div className="mt-5 flex flex-col gap-8 rounded-[14px] bg-paper p-5 md:p-7">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                    The problem in {workName(sector.shortName)} work
                  </h4>
                  <p className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                    {pain.title}, about {pain.cost} in the sample.
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{pain.line}</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">Why it works</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink">{tool.demo.result.solution}</p>
                  <ol className="mt-3 flex flex-col gap-1.5 text-sm text-ink-soft">
                    {tool.demo.stages.map((s) => (
                      <li key={s.key}>
                        <span className="font-medium text-ink">{s.label}.</span> {s.detail}.
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="border-t border-line pt-7">
                <TokenGuard sectorSlug={sector.slug} toolId={tool.id} regulatorLine={sector.regulatorLine} />
              </div>
            </div>
          </Disclosure>
        </div>
      </Disclosure>
    </article>
  );
}
