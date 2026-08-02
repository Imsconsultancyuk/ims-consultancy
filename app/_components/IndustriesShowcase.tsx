"use client";

import Link from "next/link";
import Image from "next/image";
import { industries } from "@/lib/industries";
import type { Industry } from "@/lib/industries/types";
import { Reveal } from "./Reveal";

/**
 * IndustriesShowcase — the flagship industries band. Every card carries a
 * sector-specific cinematic image behind it (cobalt-graded, generated for IMS),
 * dimmed so the text stays legible. Resting state shows the practice, its
 * regulator, and the revenue-leak line. On hover the whole face crossfades to a
 * dark tools panel — "what we deploy" — with three tools, each a problem ->
 * outcome line and a bar that fills to the recovery it captures. Because the
 * hover panel is a full-card overlay (not a partial slide-up), text can never
 * overlap or spill outside the card. Per-industry accent from the signal palette.
 */

function accentVar(a: Industry["accent"]): string {
  return `var(--color-signal-${a})`;
}

// Escalating fill targets so the three bars read as a rising recovery.
const BAR_TARGETS = ["62%", "80%", "94%"];

function IndustryCard({ industry }: { industry: Industry }) {
  const accent = accentVar(industry.accent);
  return (
    <Link
      href={`/industries/${industry.slug}`}
      data-cursor="link"
      className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-paper-ink/10 bg-deep transition-all duration-500 hover:border-paper-ink/25 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)]"
    >
      {/* Sector image behind the card */}
      <Image
        src={`/images/industries/${industry.slug}.jpg`}
        alt=""
        fill
        aria-hidden
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 24vw"
        className="object-cover opacity-45 transition-all duration-700 group-hover:scale-[1.06] group-hover:opacity-25"
      />
      {/* Legibility gradient — always on, deeper toward the bottom */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(12,14,20,0.96) 0%, rgba(12,14,20,0.72) 42%, rgba(12,14,20,0.42) 100%)",
        }}
      />
      {/* Accent glow that blooms on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: accent }}
      />

      {/* Resting face */}
      <div className="relative z-10 flex h-full flex-col p-6 transition-opacity duration-400 group-hover:opacity-0">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-ink/70">
            {industry.regulator} · {industry.shortName}
          </span>
        </div>
        <h3 className="mt-4 font-display text-[1.5rem] font-semibold leading-tight text-paper-ink">
          {industry.name}
        </h3>
        <p className="mt-3 max-w-[26ch] text-[0.9rem] leading-relaxed text-paper-ink/75">
          {industry.leakLine}.
        </p>
        <div className="mt-auto flex items-center gap-2 pt-6 text-[0.82rem] font-medium text-paper-ink/85">
          <span>See the tools</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M3 7h8M8 3l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Hover face — full-card tools panel (crossfade, no overlap possible) */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center bg-[#0b0d14]/92 p-6 opacity-0 backdrop-blur-md transition-opacity duration-400 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}22` }}
      >
        <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
          What we deploy
        </p>
        <ul className="flex flex-col gap-4">
          {industry.tools.map((tool, i) => (
            <li key={tool.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-[0.98rem] font-medium leading-snug text-paper-ink">
                  {tool.name}
                </span>
                <span className="shrink-0 font-mono text-[0.8rem] font-medium tabular-nums" style={{ color: accent }}>
                  {tool.demo.result.metrics[0].value}
                </span>
              </div>
              {/* Moving graphic: bar fills from 0 to target on hover */}
              <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-paper-ink/12">
                <span
                  aria-hidden
                  className="block h-full w-0 rounded-full transition-[width] duration-[900ms] ease-out group-hover:w-[var(--target)]"
                  style={{
                    // @ts-expect-error CSS custom property
                    "--target": BAR_TARGETS[i],
                    background: `linear-gradient(90deg, ${accent}66, ${accent})`,
                    transitionDelay: `${180 + i * 160}ms`,
                  }}
                />
              </div>
              <p className="mt-1.5 text-[0.78rem] leading-snug text-paper-ink/70">
                {tool.problem} <span className="text-paper-ink/95">{tool.outcome}</span>
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-2 text-[0.8rem] font-medium text-paper-ink">
          <span>Open {industry.shortName}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 7h8M8 3l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function IndustriesShowcase() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative isolate overflow-hidden ims-band-light px-6 py-24 text-ink sm:py-28 lg:py-32"
    >
      <div aria-hidden className="ims-footer-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="relative mx-auto w-full max-w-[1400px]">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-600">
            Industries
          </p>
          <h2
            id="industries-heading"
            className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em]"
          >
            Built for firms with a book worth protecting.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink/70">
            Ten practices, one pattern: revenue you already earned, leaking
            quietly. Hover a practice to see the tools we deploy, then open its
            page to run them on sample data.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={60 + (i % 4) * 70}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
