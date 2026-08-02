"use client";

import type { MouseEvent } from "react";

import { track } from "@/lib/analytics";
import { BOOK_CALL_URL, DEMO_SECTION_ID } from "@/lib/industries/config";
import { scrollToSection } from "@/lib/industries/scroll";
import type { Accent, Stat, Tool } from "@/lib/industries/types";

import { StatChips } from "./StatChips";
import { ToolQuickSelect } from "./ToolQuickSelect";

interface IndustryHeroProps {
  industry: string;
  name: string;
  h1: string;
  sub: string;
  stats: [Stat, Stat, Stat];
  tools: [Tool, Tool, Tool];
  accent: Accent;
}

export function IndustryHero({
  industry,
  name,
  h1,
  sub,
  stats,
  tools,
  accent,
}: IndustryHeroProps) {
  function handleDemoClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    scrollToSection(DEMO_SECTION_ID);
  }

  function handleBookClick() {
    track("book_call_clicked", { industry, source: "hero" });
  }

  return (
    <section className="ims-band-light pb-16 pt-32 text-ink md:pb-24 md:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <p
          className="text-sm font-medium uppercase tracking-wide"
          style={{ color: `var(--color-signal-${accent})` }}
        >
          {name}
        </p>

        <h1 className="font-industry-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] md:text-6xl">
          {h1}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{sub}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`#${DEMO_SECTION_ID}`}
            onClick={handleDemoClick}
            className="rounded-md bg-accent-500 px-6 py-3 text-sm font-medium text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_6px_24px_-6px_rgba(58,109,240,0.55)]"
          >
            See it run on sample data
          </a>
          <a
            href={BOOK_CALL_URL}
            onClick={handleBookClick}
            className="rounded-md border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper-soft"
          >
            Book 20 minutes
          </a>
        </div>

        <StatChips stats={stats} />

        <ToolQuickSelect industry={industry} tools={tools} accent={accent} />
      </div>
    </section>
  );
}
