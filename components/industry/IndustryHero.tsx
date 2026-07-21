"use client";

import type { MouseEvent } from "react";

import { track } from "@/lib/analytics";
import { BOOK_CALL_URL, DEMO_SECTION_ID } from "@/lib/industries/config";
import { scrollToSection } from "@/lib/industries/scroll";
import type { Stat } from "@/lib/industries/types";

import { StatChips } from "./StatChips";

interface IndustryHeroProps {
  industry: string;
  h1: string;
  sub: string;
  stats: [Stat, Stat, Stat];
}

export function IndustryHero({ industry, h1, sub, stats }: IndustryHeroProps) {
  function handleDemoClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    scrollToSection(DEMO_SECTION_ID);
  }

  function handleBookClick() {
    track("book_call_clicked", { industry, source: "hero" });
  }

  return (
    <section className="bg-paper pb-16 pt-24 text-ink md:pb-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="font-industry-display max-w-3xl text-4xl font-semibold leading-[1.1] md:text-6xl">
          {h1}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft">{sub}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`#${DEMO_SECTION_ID}`}
            onClick={handleDemoClick}
            className="rounded-lg bg-ink px-6 py-3 text-sm font-medium text-paper-ink transition-colors hover:bg-deep-soft"
          >
            See it run on sample data
          </a>
          <a
            href={BOOK_CALL_URL}
            onClick={handleBookClick}
            className="rounded-lg border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper-soft"
          >
            Book 20 minutes
          </a>
        </div>
        <StatChips stats={stats} />
      </div>
    </section>
  );
}
