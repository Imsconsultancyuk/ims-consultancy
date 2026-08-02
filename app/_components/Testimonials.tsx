"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { CharSplit } from "./CharSplit";

type Tier = "quiet" | "revamp" | "partnership";

interface Voice {
  tier: Tier;
  tierLabel: string;
  attribution: string;
  problem: string;
  solution: string;
  before: number;
  after: number;
  unit: string;
  headline: string;
  /** true when a lower number is the win (time cut); false when higher wins (throughput). */
  lowerIsBetter: boolean;
}

const VOICES: Voice[] = [
  {
    tier: "quiet",
    tierLabel: "Quiet workflow",
    attribution: "A UK strategy consultancy",
    problem: "90 minutes a day triaging client email by hand.",
    solution: "A quiet auto-sort that learns the team's behaviour.",
    before: 90,
    after: 8,
    unit: "min/day",
    headline: "−91%",
    lowerIsBetter: true,
  },
  {
    tier: "quiet",
    tierLabel: "Quiet workflow",
    attribution: "A regional property firm",
    problem: "200 invoices a month, read line by line.",
    solution: "A PDF-to-spreadsheet pipeline that flags anomalies.",
    before: 20,
    after: 1.5,
    unit: "hrs/week",
    headline: "−92%",
    lowerIsBetter: true,
  },
  {
    tier: "revamp",
    tierLabel: "Operations revamp",
    attribution: "A UK freight forwarder",
    problem: "Six spreadsheets and three inboxes per shipment.",
    solution: "One event-driven dashboard. Evenings back.",
    before: 100,
    after: 40,
    unit: "% ops time",
    headline: "−60%",
    lowerIsBetter: true,
  },
  {
    tier: "revamp",
    tierLabel: "Technical revamp",
    attribution: "A B2B SaaS team",
    problem: "A brittle deploy chain shipping twice a week.",
    solution: "Rebuilt CI, observability and the on-call rota.",
    before: 2,
    after: 14,
    unit: "deploys/week",
    headline: "7×",
    lowerIsBetter: false,
  },
  {
    tier: "partnership",
    tierLabel: "Embedded partnership",
    attribution: "A UK property consultancy",
    problem: "Brought us in for one strategy engagement.",
    solution: "Now embedded across strategy, build and AI.",
    before: 1,
    after: 3,
    unit: "functions",
    headline: "1 → 3",
    lowerIsBetter: false,
  },
];

interface Stat {
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

const AGGREGATE: Stat[] = [
  { value: 5, label: "engagements, no names attached" },
  { value: 82, suffix: " min", label: "per person per day, returned" },
  { prefix: "−", value: 91, suffix: "%", label: "manual time at its sharpest" },
  { value: 7, suffix: "×", label: "faster shipping, rebuilt from brittle" },
];

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

/** Counts a number up from 0 the first time it scrolls into view. SSR and
 *  reduced-motion render the final value, so text is never gated behind motion. */
function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(value * eased);
          if (p < 1) raf = requestAnimationFrame(step);
          else setDisplay(value);
        };
        setDisplay(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const shown = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();
  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

function TallyBar({ label, value, pct, win }: { label: string; value: string; pct: number; win: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-ink/45">
        {label}
      </span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
        <motion.span
          aria-hidden
          className="block h-full rounded-full"
          style={{
            background: win
              ? "linear-gradient(90deg, rgba(58,109,240,0.55), #5f86f7)"
              : "linear-gradient(90deg, rgba(120,128,145,0.35), rgba(120,128,145,0.6))",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(4, pct)}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span
        className={`w-24 shrink-0 text-right font-mono text-[0.8rem] tabular-nums ${
          win ? "text-accent-600" : "text-ink/55"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function VoiceCard({ v }: { v: Voice }) {
  const max = Math.max(v.before, v.after);
  const beforePct = (v.before / max) * 100;
  const afterPct = (v.after / max) * 100;
  return (
    <motion.figure
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-paper-pure/80 p-6 shadow-[0_12px_34px_-20px_rgba(20,22,29,0.35)] backdrop-blur transition-all duration-500 hover:border-accent-500/30 hover:shadow-[0_20px_44px_-22px_rgba(58,109,240,0.35)] sm:p-7"
    >
      {/* Living accent glow — drifts continuously so the card feels alive */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-500/25 blur-3xl"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <motion.span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${v.tier === "partnership" ? "bg-accent-300" : "bg-accent-400"}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
            {v.tierLabel}
          </p>
        </div>
        <p className="font-display text-[1.9rem] font-semibold leading-none text-ink">
          {v.headline}
        </p>
      </div>

      <figcaption className="relative mt-4 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/45">
        {v.attribution}
      </figcaption>

      {/* Problem -> solution tally */}
      <div className="relative mt-5 space-y-2">
        <p className="flex gap-2 text-[0.9rem] leading-snug text-ink/55">
          <span aria-hidden className="mt-[3px] text-ink/40">✕</span>
          {v.problem}
        </p>
        <p className="flex gap-2 text-[0.9rem] leading-snug text-ink">
          <span aria-hidden className="mt-[3px] text-accent-600">→</span>
          {v.solution}
        </p>
      </div>

      {/* Before / after graph */}
      <div className="relative mt-auto space-y-2.5 pt-6">
        <TallyBar label="Before" value={`${fmt(v.before)} ${v.unit}`} pct={beforePct} win={!v.lowerIsBetter} />
        <TallyBar label="After" value={`${fmt(v.after)} ${v.unit}`} pct={afterPct} win={v.lowerIsBetter ? true : afterPct >= beforePct} />
      </div>
    </motion.figure>
  );
}

export function Testimonials() {
  return (
    <section
      id="voices"
      className="relative isolate overflow-hidden ims-band-light px-6 py-20 text-ink sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 -translate-y-1/3 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(58,109,240,0.28), rgba(58,109,240,0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent-600">
            Voices · Five engagements
          </p>
          <h2 id="voices-heading" className="sr-only">
            Five real engagements, measured
          </h2>
          <CharSplit
            text={"The work, measured.\nNo names attached."}
            className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.012em]"
            stagger={0.018}
          />
        </Reveal>

        {/* Aggregate stat strip — numbers count up on view */}
        <Reveal delay={80}>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-ink/10 py-8 lg:grid-cols-4">
            {AGGREGATE.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none text-ink">
                  <CountUp prefix={s.prefix} value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </dt>
                <dd className="mt-2 max-w-[22ch] text-[0.85rem] leading-snug text-ink/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Voice cards — alive with motion */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VOICES.map((v, i) => (
            <Reveal key={v.attribution} delay={60 + (i % 3) * 70}>
              <VoiceCard v={v} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
