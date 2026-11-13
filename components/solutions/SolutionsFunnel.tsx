"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

import { track } from "@/lib/analytics";
import { sectorFigures, workName, type SolutionSector } from "@/lib/industries/solutions";

import { LeakBars } from "./LeakBars";
import { MotionCue } from "./MotionCue";
import { ToolItem } from "./ToolItem";
import { useReducedMotion } from "./useReducedMotion";

interface SolutionsFunnelProps {
  sectors: SolutionSector[];
}

// Sole traders have no industry photograph of their own, so they borrow the site's brass-gear plate.
function imageFor(slug: string): string {
  return slug === "sole-trader" ? "/img/tools-gears-1000.webp" : `/images/industries/${slug}.jpg`;
}

// Stage 1 (tools) opens when an industry is chosen. Stages 2 to 4 open only when the customer
// presses the button at the end of the stage before. Nothing opens itself.
type Stage = 1 | 2 | 3 | 4;

const NEXT_LABEL: Record<1 | 2 | 3, string> = {
  1: "Next: what it recovers",
  2: "Next: run it under your name",
  3: "Next: get your free scan",
};

function parseHash(sectors: SolutionSector[]): { sector: string | null; tool: string | null } {
  if (typeof window === "undefined") return { sector: null, tool: null };
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("sector");
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  const byQuery = sectors.find((s) => s.slug === fromQuery);
  if (byQuery) return { sector: byQuery.slug, tool: null };
  // Longest slug first so "b2b-saas" is not mistaken for a shorter prefix.
  const ordered = [...sectors].sort((a, b) => b.slug.length - a.slug.length);
  const match = ordered.find((s) => hash === s.slug || hash.startsWith(`${s.slug}-`));
  if (!match) return { sector: null, tool: null };
  const toolId = hash === match.slug ? null : hash.slice(match.slug.length + 1);
  const tool = match.tools.find((t) => t.id === toolId);
  return { sector: match.slug, tool: tool ? tool.id : null };
}

export function SolutionsFunnel({ sectors }: SolutionsFunnelProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const [openTool, setOpenTool] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>(1);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const sector = sectors.find((s) => s.slug === slug) ?? null;

  const scrollTo = useCallback(
    (id: string, delay = 80) => {
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }, delay);
    },
    [reduced],
  );

  // Deep links: /solutions#law-firms, /solutions#law-firms-<tool>, /solutions?sector=<slug>.
  useEffect(() => {
    const apply = () => {
      const { sector: s, tool } = parseHash(sectors);
      if (!s) return;
      setSlug(s);
      setStage(1);
      setOpenTool(tool);
      scrollTo(tool ? `${s}-${tool}` : "solution-panel", 120);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [sectors, scrollTo]);

  // Tile entrance. Tiles are visible without JS; this only adds the reveal.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-tile]", {
        y: 26,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        clearProps: "transform,opacity,visibility",
      });
    }, grid);
    return () => ctx.revert();
  }, [reduced]);

  // Each stage rises in once, when it opens.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !sector || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `[data-stage="${stage}"] [data-rise]`,
        { y: 26, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out", stagger: 0.08, clearProps: "transform,opacity,visibility" },
      );
    }, panel);
    return () => ctx.revert();
  }, [sector, stage, reduced]);

  const choose = useCallback(
    (next: SolutionSector) => {
      setSlug(next.slug);
      setStage(1);
      setOpenTool(null);
      track("solutions_industry_selected", { industry: next.slug });
      window.history.replaceState(null, "", `#${next.slug}`);
      scrollTo("solution-panel", 60);
    },
    [scrollTo],
  );

  const advance = useCallback(
    (to: 2 | 3 | 4) => {
      setStage(to);
      track("solutions_stage_opened", { industry: slug ?? "", stage: to });
      scrollTo(`stage-${to}`, 60);
    },
    [slug, scrollTo],
  );

  const figures = sector ? sectorFigures(sector) : null;
  const contactBase = sector ? `sector=${sector.slug}` : "";

  return (
    <div id="funnel">
      <section id="pick" aria-labelledby="pick-heading" className="mx-auto w-full max-w-6xl scroll-mt-[calc(var(--fx-nav)+16px)] px-6 pt-14 sm:pt-20">
        <h2 id="pick-heading" className="max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">
          Which industry are you in?
        </h2>

        <div ref={gridRef} className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {sectors.map((s) => {
            const selected = s.slug === slug;
            const featured = s.slug === "sole-trader";
            return (
              <button
                key={s.slug}
                type="button"
                data-tile
                aria-pressed={selected}
                aria-controls="solution-panel"
                onClick={() => choose(s)}
                className={`group relative isolate flex min-h-[148px] flex-col justify-end overflow-hidden rounded-[14px] border text-left transition-[transform,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info active:scale-[0.98] motion-reduce:transition-none sm:min-h-[190px] ${
                  featured ? "col-span-2 lg:col-span-2" : ""
                } ${
                  selected
                    ? "border-accent-500 shadow-[0_0_0_2px_var(--color-accent-500)]"
                    : "border-line hover:-translate-y-0.5 hover:border-accent-500 focus-visible:-translate-y-0.5"
                }`}
              >
                <Image
                  src={imageFor(s.slug)}
                  alt=""
                  fill
                  aria-hidden
                  sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                  className={`-z-10 object-cover transition-[transform,opacity] duration-700 group-hover:scale-[1.07] motion-reduce:transition-none ${
                    selected ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                  }`}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  style={{ background: "linear-gradient(to top, color-mix(in oklab, var(--color-deep) 92%, transparent) 0%, color-mix(in oklab, var(--color-deep) 55%, transparent) 45%, transparent 100%)" }}
                />
                <span className="flex items-end justify-between gap-3 p-4 sm:p-5">
                  <span className="font-display text-base font-semibold leading-snug text-paper-ink sm:text-lg">{s.name}</span>
                  <span
                    aria-hidden
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      selected ? "bg-accent-500 text-on-amber" : "bg-paper-ink/15 text-paper-ink group-hover:bg-accent-500 group-hover:text-on-amber"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div id="solution-panel" ref={panelRef} aria-live="polite" className="scroll-mt-[calc(var(--fx-nav)+16px)]">
        {sector ? (
          <div className="mx-auto w-full max-w-6xl px-6 pb-8 pt-12 sm:pt-16">
            <div data-stage="1">
              <div data-rise className="relative isolate overflow-hidden rounded-[14px] bg-deep text-paper-ink">
                <Image
                  src={imageFor(sector.slug)}
                  alt=""
                  fill
                  aria-hidden
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  className="-z-10 object-cover opacity-55"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  style={{ background: "linear-gradient(to right, color-mix(in oklab, var(--color-deep) 92%, transparent) 0%, color-mix(in oklab, var(--color-deep) 45%, transparent) 100%)" }}
                />
                <div className="px-6 py-10 sm:px-10 sm:py-14">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    {sector.name} · {sector.regulator}
                  </p>
                  <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
                    {sector.promise}
                  </h2>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <a
                      href="#pick"
                      className="inline-flex min-h-11 items-center text-mauve-200 underline underline-offset-4 hover:text-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                    >
                      Change industry
                    </a>
                    {sector.deepHref ? (
                      <a
                        href={sector.deepHref}
                        className="inline-flex min-h-11 items-center text-mauve-200 underline underline-offset-4 hover:text-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                      >
                        Full {workName(sector.shortName)} page
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <section aria-labelledby="tools-heading" className="mt-10">
                <h3 id="tools-heading" data-rise className="font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
                  Three tools for {workName(sector.shortName)} work
                </h3>
                <div data-rise className="mt-6 flex flex-col gap-3">
                  {sector.tools.map((tool, i) => (
                    <ToolItem
                      key={`${sector.slug}-${tool.id}`}
                      sector={sector}
                      tool={tool}
                      index={i}
                      open={openTool === tool.id}
                      onToggle={() => {
                        const next = openTool === tool.id ? null : tool.id;
                        setOpenTool(next);
                        if (next) track("tool_card_view", { industry: sector.slug, tool: tool.id });
                      }}
                    />
                  ))}
                </div>
              </section>

              {stage === 1 ? (
                <div className="mt-10 flex justify-center">
                  <MotionCue onClick={() => advance(2)} controls="stage-2">
                    {NEXT_LABEL[1]}
                  </MotionCue>
                </div>
              ) : null}
            </div>

            {stage >= 2 ? (
              <section id="stage-2" data-stage="2" aria-labelledby="leak-heading" className="mt-12 scroll-mt-[calc(var(--fx-nav)+16px)] sm:mt-16">
                <h3 id="leak-heading" data-rise className="max-w-2xl font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
                  Where the money goes missing
                </h3>
                <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
                  <div data-rise>
                    {figures ? (
                      <LeakBars
                        key={sector.slug}
                        title={sector.results.heading}
                        names={sector.tools.map((t) => t.name)}
                        figures={figures}
                        total={sector.results.total}
                      />
                    ) : (
                      <div className="rounded-[14px] border border-line bg-paper-pure p-5 md:p-6">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">{sector.results.heading}</p>
                        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                          {sector.results.metrics.map((m) => (
                            <div key={m.label} className="border-t border-line pt-3">
                              <dd className="num text-3xl font-semibold text-ink">{m.value}</dd>
                              <dt className="mt-1 text-sm text-ink-soft">{m.label}</dt>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}
                    <p className="mt-3 text-xs text-ink-soft">Made-up sample records. It shows how the tools read, not what a client earned.</p>
                  </div>
                  <ul data-rise className="flex flex-col gap-3" aria-label={`Where money leaks in ${workName(sector.shortName)} work`}>
                    {sector.pains.map((p) => (
                      <li key={p.title} className="flex items-baseline justify-between gap-4 rounded-[14px] border border-line bg-paper-pure px-5 py-4">
                        <span className="font-display text-base font-semibold text-ink">{p.title}</span>
                        <span className="num text-xl font-semibold text-ink">{p.cost}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {stage === 2 ? (
                  <div className="mt-10 flex justify-center">
                    <MotionCue onClick={() => advance(3)} controls="stage-3">
                      {NEXT_LABEL[2]}
                    </MotionCue>
                  </div>
                ) : null}
              </section>
            ) : null}

            {stage >= 3 ? (
              <section
                id="stage-3"
                data-stage="3"
                aria-labelledby="wl-heading"
                className="mt-12 scroll-mt-[calc(var(--fx-nav)+16px)] sm:mt-16"
              >
                <div data-rise className="grid overflow-hidden rounded-[14px] bg-deep text-paper-ink md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[220px] md:min-h-[320px]">
                    <Image src="/img/privacy-lock-800.webp" alt="" fill aria-hidden sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
                  </div>
                  <div className="p-6 sm:p-10">
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">White label</p>
                    <h3 id="wl-heading" className="mt-3 font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                      Run these under your own name.
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-mauve-200">
                      {sector.slug === "sole-trader"
                        ? "Your name on the follow-ups, none of the software to learn."
                        : `Offer these three to your own clients, branded as yours. Priced per project, after a call.`}
                    </p>
                    <div className="mt-7">
                      <a
                        href={`/contact?intent=white-label&${contactBase}&from=solutions`}
                        className="inline-flex min-h-11 items-center rounded-full border border-paper-ink/40 px-6 text-sm font-semibold text-paper-ink transition-[transform,background-color,border-color] duration-200 hover:border-accent-400 hover:text-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 active:scale-[0.98] motion-reduce:transition-none"
                      >
                        Ask about white label
                      </a>
                    </div>
                  </div>
                </div>
                {stage === 3 ? (
                  <div className="mt-10 flex justify-center">
                    <MotionCue onClick={() => advance(4)} controls="stage-4">
                      {NEXT_LABEL[3]}
                    </MotionCue>
                  </div>
                ) : null}
              </section>
            ) : null}

            {stage >= 4 ? (
              <section
                id="stage-4"
                data-stage="4"
                aria-labelledby="next-heading"
                className="mt-12 scroll-mt-[calc(var(--fx-nav)+16px)] sm:mt-16"
              >
                <div data-rise className="relative isolate overflow-hidden rounded-[14px] bg-deep text-paper-ink">
                  <Image
                    src="/img/contact-phone-1400.webp"
                    alt=""
                    fill
                    aria-hidden
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="-z-10 object-cover object-right opacity-70"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{ background: "linear-gradient(to right, color-mix(in oklab, var(--color-deep) 94%, transparent) 0%, color-mix(in oklab, var(--color-deep) 60%, transparent) 55%, transparent 100%)" }}
                  />
                  <div className="px-6 py-12 sm:px-10 sm:py-16">
                    <h3 id="next-heading" className="max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
                      See it on your own records.
                    </h3>
                    <p className="mt-4 max-w-md text-base text-mauve-200">
                      <span className="num font-semibold text-paper-ink">£0</span> Leak Scan. 20 minutes. A written number.
                    </p>
                    <a
                      href={`/contact?intent=leak-scan&${contactBase}&from=solutions`}
                      className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent-500 px-7 text-[0.9375rem] font-semibold text-on-amber transition-[transform,background-color] duration-200 hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 active:scale-[0.97] motion-reduce:transition-none"
                    >
                      Book my free Leak Scan
                    </a>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
