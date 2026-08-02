"use client";

import { useEffect, useRef } from "react";

import { track } from "@/lib/analytics";
import { BOOK_CALL_URL, DEMO_SECTION_ID } from "@/lib/industries/config";
import { scrollToSection } from "@/lib/industries/scroll";
import type { Accent, Tool } from "@/lib/industries/types";

import { useDemoArm } from "./demo/DemoContext";

interface ToolSectionProps {
  industry: string;
  tool: Tool;
  index: number;
  accent: Accent;
  tone: "light" | "dark";
}

export function ToolSection({ industry, tool, index, accent, tone }: ToolSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { armTool } = useDemoArm();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            track("tool_card_view", { industry, tool: tool.id });
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [industry, tool.id]);

  function handleSeeItRun() {
    armTool(tool.id);
    scrollToSection(DEMO_SECTION_ID);
  }

  function handleBookClick() {
    track("book_call_clicked", { industry, source: `tool:${tool.id}` });
  }

  const isDark = tone === "dark";
  const accentVar = `var(--color-signal-${accent})`;

  const band = isDark ? "ims-band-dark text-paper-ink" : "ims-band-light text-ink";
  const muted = isDark ? "text-paper-ink/70" : "text-ink-soft";
  const rule = isDark ? "bg-paper-ink/20" : "bg-line";
  const panel = isDark
    ? "border-paper-ink/15 bg-paper-ink/[0.05]"
    : "border-line bg-paper";
  const ghostCta = isDark
    ? "border-paper-ink/25 text-paper-ink hover:bg-paper-ink/10"
    : "border-line text-ink hover:bg-paper-soft";

  return (
    <section
      ref={ref}
      id={tool.id}
      aria-labelledby={`${tool.id}-heading`}
      className={`${band} py-16 md:py-24`}
      style={{ scrollMarginTop: "var(--industry-nav-offset, 5rem)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        {/* Left rail: what it is, what it stops, what it returns */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="num text-sm font-medium" style={{ color: accentVar }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px flex-1" style={{ backgroundColor: accentVar }} />
          </div>

          <h3
            id={`${tool.id}-heading`}
            className="font-industry-display mt-6 text-3xl font-semibold leading-[1.15] md:text-4xl"
          >
            {tool.name}
          </h3>

          <p className={`mt-5 text-lg leading-relaxed ${muted}`}>{tool.problem}</p>

          <p
            className="mt-6 border-l-2 pl-5 text-base font-medium leading-relaxed"
            style={{ borderColor: accentVar }}
          >
            {tool.outcome}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSeeItRun}
              className="rounded-md bg-accent-500 px-6 py-3 text-sm font-medium text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_6px_24px_-6px_rgba(58,109,240,0.55)]"
            >
              Run {tool.name} on sample data
            </button>
            <a
              href={BOOK_CALL_URL}
              onClick={handleBookClick}
              className={`rounded-md border px-6 py-3 text-sm font-medium transition-colors ${ghostCta}`}
            >
              Book 20 minutes
            </a>
          </div>
        </div>

        {/* Right column: mechanism, action points, proof */}
        <div className="flex flex-col gap-12 lg:col-span-7">
          <div>
            <p className={`text-sm font-medium uppercase tracking-wide ${muted}`}>
              How it works
            </p>
            <ol className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tool.demo.stages.map((stage, stageIndex) => (
                <li key={stage.key} className="relative pt-4">
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-px ${stageIndex === 0 ? "" : rule}`}
                    style={stageIndex === 0 ? { backgroundColor: accentVar } : undefined}
                  />
                  <p className="text-sm font-medium">{stage.label}</p>
                  <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{stage.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className={`text-sm font-medium uppercase tracking-wide ${muted}`}>
              What your team does with it
            </p>
            <ul className="mt-5 flex flex-col">
              {tool.actions.map((action, actionIndex) => (
                <li
                  key={action}
                  className={`flex gap-4 py-4 ${actionIndex === 0 ? "" : isDark ? "border-t border-paper-ink/15" : "border-t border-line"}`}
                >
                  <span
                    aria-hidden
                    className="num mt-0.5 shrink-0 text-sm font-medium"
                    style={{ color: accentVar }}
                  >
                    {String(actionIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-relaxed">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-lg border p-6 md:p-8 ${panel}`}>
            <p className={`text-sm font-medium uppercase tracking-wide ${muted}`}>
              On sample data
            </p>
            <p className="mt-3 text-lg font-medium leading-snug">
              {tool.demo.result.headline}
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {tool.demo.result.metrics.map((metric) => (
                <div key={metric.label}>
                  <dd
                    className="num text-2xl font-semibold md:text-3xl"
                    style={metric.emphasis ? { color: accentVar } : undefined}
                  >
                    {metric.value}
                  </dd>
                  <dt className={`mt-1 text-sm ${muted}`}>{metric.label}</dt>
                </div>
              ))}
            </dl>
            <p className={`mt-6 text-sm leading-relaxed ${muted}`}>
              {tool.demo.result.solution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
