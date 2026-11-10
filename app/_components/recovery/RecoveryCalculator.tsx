"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ElasticSlider from "@/components/react-bits/ElasticSlider";
import Counter from "@/components/react-bits/Counter";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import {
  FEE_BANDS,
  FEE_MONTHS,
  FULL_SYSTEM_PRICE,
  JOB_VALUE,
  PARTNER_CODE,
  PARTNER_PRICE,
  STAGES,
  STAGE_PRICE,
  WIN_BACK,
  gbp,
  project,
  stageLeak,
  type StageId,
} from "@/lib/pricing/recovery";
import { RecoveryChart } from "./RecoveryChart";

const INITIAL_VALUES = Object.fromEntries(STAGES.map((s) => [s.id, s.initial])) as Record<StageId, number>;
const ALL_STAGES = STAGES.map((s) => s.id);

function Money({ value, className }: { value: number; className?: string }) {
  return (
    <Counter
      value={Math.round(value)}
      prefix={value < 0 ? "-£" : "£"}
      locale="en-GB"
      format={{ maximumFractionDigits: 0, signDisplay: "never" }}
      tabular={false}
      intro={false}
      duration={0.6}
      fontSize="1em"
      className={className}
    />
  );
}

function bandLabel(from: number, to: number): string {
  if (!Number.isFinite(to)) return `Above ${gbp(from)}`;
  return from === 0 ? `First ${gbp(to)}` : `${gbp(from)} to ${gbp(to)}`;
}

export function RecoveryCalculator() {
  const [active, setActive] = useState<StageId[]>(ALL_STAGES);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [jobValue, setJobValue] = useState<number>(JOB_VALUE.initial);
  const [winBack, setWinBack] = useState<number>(WIN_BACK.initial);
  const [withCode, setWithCode] = useState(true);
  const finaleRef = useRef<HTMLDivElement>(null);
  const keepBarRef = useRef<HTMLSpanElement>(null);

  const leak = useMemo(
    () => STAGES.filter((s) => active.includes(s.id)).reduce((sum, s) => sum + stageLeak(s, values[s.id], jobValue), 0),
    [active, values, jobValue],
  );
  const p = useMemo(() => project(leak, winBack, active.length, withCode), [leak, winBack, active.length, withCode]);
  const keepShare = p.recovered > 0 ? p.keep / p.recovered : 1 - FEE_BANDS[0].rate;
  const yearKeep = p.clientByMonth[FEE_MONTHS] ?? 0;
  const yearOurs = p.oursByMonth[FEE_MONTHS] ?? 0;
  const listBuild = active.length >= 5 ? FULL_SYSTEM_PRICE : active.length * STAGE_PRICE;

  const contactHref = useMemo(() => {
    const q = new URLSearchParams({
      intent: "leak-scan",
      from: "pricing-calculator",
      stages: active.join(","),
      job: String(jobValue),
      leak: String(Math.round(p.leak)),
      recovered: String(Math.round(p.recovered)),
      fee: String(Math.round(p.fee)),
      build: String(p.build),
    });
    if (withCode) q.set("code", PARTNER_CODE);
    return `/contact?${q.toString()}`;
  }, [active, jobValue, p, withCode]);

  function toggle(id: StageId) {
    setActive((cur) => {
      if (cur.includes(id)) return cur.length === 1 ? cur : cur.filter((s) => s !== id);
      return ALL_STAGES.filter((s) => s === id || cur.includes(s));
    });
  }

  useEffect(() => {
    const bar = keepBarRef.current;
    if (!bar) return;
    const width = `${(keepShare * 100).toFixed(1)}%`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bar.style.width = width;
      return;
    }
    const tween = gsap.to(bar, { width, duration: 0.6, ease: "power3.out" });
    return () => {
      tween.kill();
    };
  }, [keepShare]);

  // The finale moves by transform only, so its words are readable with JS off or mid-animation.
  useEffect(() => {
    const root = finaleRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
      tl.fromTo("[data-finale-seal]", { scale: 0.6, rotate: -14 }, { scale: 1, rotate: -6, duration: 0.9, ease: "back.out(2.2)" })
        .fromTo("[data-finale-rule]", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "<0.1")
        .fromTo("[data-finale-stat]", { y: 18 }, { y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, "<0.2");
    }, root);
    return () => ctx.revert();
  }, []);

  const activeStages = STAGES.filter((s) => active.includes(s.id));

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <p className="text-[0.8125rem] font-semibold text-mauve-200">1. Pick the stages where money leaks</p>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Stages to include">
            {STAGES.map((s, i) => {
              const on = active.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s.id)}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-[0.875rem] font-medium transition-colors duration-200 ${
                    on
                      ? "border-accent-400 bg-accent-400 text-on-amber"
                      : "border-mauve-300/35 text-mauve-200 hover:border-mauve-200"
                  }`}
                >
                  <span aria-hidden className="text-[0.75rem] opacity-70">0{i + 1}</span>
                  {s.name}
                </button>
              );
            })}
          </div>

          <p className="mt-9 text-[0.8125rem] font-semibold text-mauve-200">2. Tell us roughly what happens now</p>
          <ul className="mt-2 divide-y divide-mauve-300/15" role="list">
            {activeStages.map((s) => (
              <li key={s.id} className="py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[0.9375rem] leading-snug text-paper-ink">
                    {s.question}
                  </span>
                  <span className="shrink-0 font-display text-[1.125rem] font-semibold text-paper-ink">
                    {s.unit === "pounds" ? gbp(values[s.id]) : values[s.id]}
                  </span>
                </div>
                <ElasticSlider
                  value={values[s.id]}
                  startingValue={s.min}
                  maxValue={s.max}
                  isStepped
                  stepSize={s.step}
                  valuePosition="none"
                  thumb
                  rangeColor="var(--color-accent-400)"
                  thumbColor="var(--color-paper-ink)"
                  ariaLabel={s.question}
                  formatValue={(v) => (s.unit === "pounds" ? gbp(v) : String(v))}
                  onChange={(v) => setValues((cur) => ({ ...cur, [s.id]: v }))}
                  className="mt-3 w-full text-mauve-200 [&_[data-es-thumb]]:shadow-[0_0_0_3px_var(--elastic-slider-range),0_2px_8px_rgba(0,0,0,0.45)]"
                />
                <p className="mt-2 text-[0.75rem] text-mauve-300">
                  Leaking about {gbp(stageLeak(s, values[s.id], jobValue))} a month. {s.assumption}
                </p>
              </li>
            ))}
            <li className="py-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[0.9375rem] text-paper-ink">Your average job or client value</span>
                <span className="font-display text-[1.125rem] font-semibold text-paper-ink">{gbp(jobValue)}</span>
              </div>
              <ElasticSlider
                value={jobValue}
                startingValue={JOB_VALUE.min}
                maxValue={JOB_VALUE.max}
                isStepped
                stepSize={JOB_VALUE.step}
                valuePosition="none"
                thumb
                rangeColor="var(--color-mauve-200)"
                thumbColor="var(--color-paper-ink)"
                ariaLabel="Average job or client value in pounds"
                formatValue={gbp}
                onChange={setJobValue}
                className="mt-3 w-full text-mauve-200 [&_[data-es-thumb]]:shadow-[0_0_0_3px_var(--elastic-slider-range),0_2px_8px_rgba(0,0,0,0.45)]"
              />
            </li>
            <li className="py-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[0.9375rem] text-paper-ink">Share of the leak we win back</span>
                <span className="font-display text-[1.125rem] font-semibold text-paper-ink">{winBack}%</span>
              </div>
              <ElasticSlider
                value={winBack}
                startingValue={WIN_BACK.min}
                maxValue={WIN_BACK.max}
                isStepped
                stepSize={WIN_BACK.step}
                valuePosition="none"
                thumb
                rangeColor="var(--color-mauve-200)"
                thumbColor="var(--color-paper-ink)"
                ariaLabel="Share of the leak won back, in percent"
                formatValue={(v) => `${v}%`}
                onChange={setWinBack}
                className="mt-3 w-full text-mauve-200 [&_[data-es-thumb]]:shadow-[0_0_0_3px_var(--elastic-slider-range),0_2px_8px_rgba(0,0,0,0.45)]"
              />
              <p className="mt-2 text-[0.75rem] text-mauve-300">
                A planning figure. Nobody wins back all of it, and the Leak Scan sets the real baseline.
              </p>
            </li>
          </ul>

          <label className="mt-4 flex min-h-[44px] cursor-pointer items-center gap-3 text-[0.9375rem] text-paper-ink">
            <input
              type="checkbox"
              checked={withCode}
              onChange={(e) => setWithCode(e.target.checked)}
              className="h-5 w-5 accent-[var(--color-accent-500)]"
            />
            <span>
              Apply {PARTNER_CODE}: first stage {gbp(PARTNER_PRICE)} instead of {gbp(STAGE_PRICE)}*
            </span>
          </label>
        </div>

        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <SpotlightCard
            theme="dark"
            spotlightColor="rgba(250, 204, 21, 0.14)"
            className="!rounded-[14px] !p-6 sm:!p-8"
            style={{
              ["--spotlight-card-surface" as string]: "color-mix(in oklch, var(--color-deep) 82%, black)",
            }}
          >
            <p className="text-[0.8125rem] font-semibold text-mauve-200">
              3. What it is worth, every month
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <dt className="text-[0.8125rem] text-mauve-300">Leaking now</dt>
                <dd className="mt-1 font-display text-[1.75rem] font-bold leading-none text-paper-ink">
                  <Money value={p.leak} />
                </dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] text-mauve-300">We win back</dt>
                <dd className="mt-1 font-display text-[1.75rem] font-bold leading-none text-paper-ink">
                  <Money value={p.recovered} />
                </dd>
              </div>
            </dl>

            <div className="mt-7">
              <div className="flex items-baseline justify-between gap-4 text-[0.875rem]">
                <span className="text-paper-ink">
                  You keep <strong className="font-display text-[1.125rem] text-accent-300"><Money value={p.keep} /></strong>
                </span>
                <span className="text-right text-mauve-200">
                  We earn <strong className="font-display text-[1.125rem] text-paper-ink"><Money value={p.fee} /></strong>
                </span>
              </div>
              <span aria-hidden className="mt-3 flex h-3 overflow-hidden rounded-full bg-mauve-200/80">
                <span
                  ref={keepBarRef}
                  className="block h-full rounded-full bg-accent-400"
                  style={{ width: `${(keepShare * 100).toFixed(1)}%` }}
                />
              </span>
              <p className="mt-2 text-[0.75rem] text-mauve-300">
                Our share works out at {(p.rate * 100).toFixed(1)}% of what comes back. Nothing comes back, nothing is due.
              </p>
            </div>

            <div className="mt-7 border-t border-mauve-300/15 pt-6">
              <RecoveryChart clientByMonth={p.clientByMonth} oursByMonth={p.oursByMonth} />
            </div>
          </SpotlightCard>
        </div>
      </div>

      <div className="mt-16 grid gap-6 border-t border-mauve-300/15 pt-12 md:grid-cols-3 md:gap-8">
        <div>
          <p className="font-display text-[0.875rem] font-semibold text-accent-300">01 · The build</p>
          <h3 className="mt-3 font-display text-[1.25rem] font-semibold text-paper-ink">One price per stage.</h3>
          <p className="mt-3 text-[0.9375rem] leading-[1.7] text-mauve-300">
            Each stage costs {gbp(STAGE_PRICE)} to build. All five are {gbp(FULL_SYSTEM_PRICE)}, so the fifth is free. That pays
            for our time. It is the only money we take before anything is recovered.
          </p>
        </div>
        <div>
          <p className="font-display text-[0.875rem] font-semibold text-accent-300">02 · The success fee</p>
          <h3 className="mt-3 font-display text-[1.25rem] font-semibold text-paper-ink">A share of what comes back.</h3>
          <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-mauve-300" role="list">
            {FEE_BANDS.map((b) => {
              const reached = p.recovered > b.from;
              return (
                <li
                  key={b.from}
                  className={`flex justify-between gap-4 rounded-md px-2 py-1 ${reached ? "bg-mauve-300/10 text-paper-ink" : ""}`}
                >
                  <span>{bandLabel(b.from, b.to)} a month</span>
                  <span className="font-semibold">{Math.round(b.rate * 100)}%</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[0.8125rem] leading-[1.6] text-mauve-300">
            Like income tax: each rate applies only to its slice. Your exact rate is set in writing after the Leak Scan.
          </p>
        </div>
        <div>
          <p className="font-display text-[0.875rem] font-semibold text-accent-300">03 · The stop</p>
          <h3 className="mt-3 font-display text-[1.25rem] font-semibold text-paper-ink">Month {FEE_MONTHS}, it ends.</h3>
          <p className="mt-3 text-[0.9375rem] leading-[1.7] text-mauve-300">
            The success fee runs for {FEE_MONTHS} months from go-live, then stops for good. Everything recovered after that is
            yours, and so is the system.
          </p>
        </div>
      </div>

      <div
        ref={finaleRef}
        className="relative mt-16 overflow-hidden rounded-[14px] border border-accent-400/60 bg-deep/70 p-7 sm:p-10 lg:p-12"
      >
        <span
          data-finale-seal
          aria-hidden
          className="absolute -right-6 -top-6 hidden h-36 w-36 -rotate-6 items-center justify-center rounded-full border-2 border-dashed border-accent-400/70 text-center font-display text-[0.8125rem] font-bold uppercase leading-tight tracking-[0.12em] text-accent-300 sm:flex lg:right-8 lg:top-8"
        >
          No recovery
          <br />
          no fee
        </span>
        <p className="text-[0.8125rem] font-semibold text-mauve-200">Our onboarding offer for any new business</p>
        <h3 className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] text-paper-ink">
          On your numbers, this is what year one looks like.
        </h3>
        <span data-finale-rule aria-hidden className="mt-6 block h-[3px] w-24 origin-left rounded-full bg-accent-400" />
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div data-finale-stat>
            <dt className="text-[0.8125rem] text-mauve-300">
              Build, {active.length} {active.length === 1 ? "stage" : "stages"}
            </dt>
            <dd className="mt-1 font-display text-[2rem] font-bold leading-none text-paper-ink">
              <Money value={p.build} />
              {withCode && <span className="text-accent-300">*</span>}
            </dd>
            {withCode && <dd className="mt-1 text-[0.75rem] text-mauve-300">{gbp(listBuild)} without {PARTNER_CODE}</dd>}
          </div>
          <div data-finale-stat>
            <dt className="text-[0.8125rem] text-mauve-300">Build paid back in</dt>
            <dd className="mt-1 font-display text-[2rem] font-bold leading-none text-paper-ink">
              {p.paybackDays === null ? "Never" : `${p.paybackDays} days`}
            </dd>
          </div>
          <div data-finale-stat>
            <dt className="text-[0.8125rem] text-mauve-300">You keep in year one, after the build</dt>
            <dd className="mt-1 font-display text-[2rem] font-bold leading-none text-accent-300">
              <Money value={yearKeep} />
            </dd>
          </div>
          <div data-finale-stat>
            <dt className="text-[0.8125rem] text-mauve-300">We earn in year one, build included</dt>
            <dd className="mt-1 font-display text-[2rem] font-bold leading-none text-paper-ink">
              <Money value={yearOurs} />
            </dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={contactHref}
            data-cursor="cta"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent-500 px-7 text-[15px] font-semibold text-on-amber transition-colors duration-300 hover:bg-accent-600"
          >
            Book a free Leak Scan with these numbers
          </a>
          <p className="max-w-md text-[0.8125rem] leading-[1.6] text-mauve-300">
            Your figures travel with the button, so the call starts from them. Illustration only, not a forecast. Terms at the foot
            of this page.
          </p>
        </div>
      </div>
    </div>
  );
}
