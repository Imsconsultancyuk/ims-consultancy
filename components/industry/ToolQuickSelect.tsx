"use client";

import type { MouseEvent } from "react";

import { track } from "@/lib/analytics";
import { scrollToSection } from "@/lib/industries/scroll";
import type { Accent, Tool } from "@/lib/industries/types";

interface ToolQuickSelectProps {
  industry: string;
  tools: [Tool, Tool, Tool];
  accent: Accent;
}

export function ToolQuickSelect({ industry, tools, accent }: ToolQuickSelectProps) {
  const accentVar = `var(--color-signal-${accent})`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>, tool: Tool) {
    event.preventDefault();
    track("tool_quick_select", { industry, tool: tool.id });
    scrollToSection(tool.id);
  }

  return (
    <nav aria-label="Jump to a tool" className="mt-12">
      <p className="text-sm font-medium uppercase tracking-wide text-ink-soft">
        Three tools on this page
      </p>
      <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {tools.map((tool, index) => (
          <li key={tool.id}>
            <a
              href={`#${tool.id}`}
              onClick={(event) => handleClick(event, tool)}
              className="group flex h-full flex-col gap-2 bg-paper p-5 transition-colors hover:bg-paper-soft"
            >
              <span className="flex items-center gap-3">
                <span className="num text-xs font-medium" style={{ color: accentVar }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="h-px w-8 transition-all duration-300 group-hover:w-12"
                  style={{ backgroundColor: accentVar }}
                />
              </span>
              <span className="font-industry-display text-base font-medium text-ink">
                {tool.name}
              </span>
              <span className="text-sm leading-relaxed text-ink-soft">{tool.outcome}</span>
              <span className="mt-auto pt-2 text-sm font-medium text-accent-500">
                Jump to it
                <span aria-hidden className="ml-1 inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
