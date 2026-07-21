"use client";

import { useEffect, useRef } from "react";

import { track } from "@/lib/analytics";
import { DEMO_SECTION_ID } from "@/lib/industries/config";
import { scrollToSection } from "@/lib/industries/scroll";
import type { Tool } from "@/lib/industries/types";

import { useDemoArm } from "./demo/DemoContext";

interface ToolCardProps {
  industry: string;
  tool: Tool;
}

export function ToolCard({ industry, tool }: ToolCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
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
      { threshold: 0.5 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [industry, tool.id]);

  function handleSeeItRun() {
    armTool(tool.id);
    scrollToSection(DEMO_SECTION_ID);
  }

  return (
    <div
      ref={ref}
      id={tool.id}
      className="flex flex-col gap-3 bg-paper p-6"
      style={{ scrollMarginTop: "var(--industry-nav-offset, 5rem)" }}
    >
      <h3 className="font-industry-display text-lg font-medium text-ink">
        {tool.name}
      </h3>
      <p className="text-sm text-ink-soft">{tool.problem}</p>
      <p className="text-sm font-medium text-ink">{tool.outcome}</p>
      <button
        type="button"
        onClick={handleSeeItRun}
        className="mt-2 self-start text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-ink-soft"
      >
        See it run →
      </button>
    </div>
  );
}
