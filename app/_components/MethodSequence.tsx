"use client";

import { useEffect, useRef, useState } from "react";

export interface MethodStep {
  n: string;
  name: string;
  /** Index into `phases`. */
  phase: number;
  duration: string;
  body: string;
  outcome: string;
}

export interface MethodPhase {
  name: string;
  line: string;
}

interface MethodSequenceProps {
  steps: MethodStep[];
  phases: MethodPhase[];
}

const NODE = 40;

// All seven steps stay in the document and readable with JS off. Scroll only
// adds the filled rail, the active step and the sticky phase panel.
export function MethodSequence({ steps, phases }: MethodSequenceProps): React.JSX.Element {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;

    const update = (): void => {
      frame = 0;
      const list = listRef.current;
      const first = itemRefs.current[0];
      const last = itemRefs.current[steps.length - 1];
      if (!list || !first || !last) return;

      const probe = window.innerHeight * 0.45;
      let current = 0;
      itemRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= probe) current = i;
      });
      setActive(current);

      const listTop = list.getBoundingClientRect().top;
      const startY = first.offsetTop + NODE / 2;
      const span = last.offsetTop + NODE / 2 - startY;
      const progress = Math.min(1, Math.max(0, (probe - listTop - startY) / span));
      list.style.setProperty("--span", `${span}px`);
      list.style.setProperty("--p", progress.toFixed(4));
    };

    const schedule = (): void => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [steps.length]);

  const current = steps[active];
  const phaseStart = phases.map((_, p) => steps.findIndex((s) => s.phase === p));

  return (
    <div className="mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-[17rem_1fr] lg:gap-16">
      <aside aria-hidden className="hidden lg:block">
        <div className="sticky top-32">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
            Where you are
          </p>
          <p className="mt-4 font-display text-[6rem] font-bold leading-none tracking-[-0.04em] text-accent-400 tabular-nums">
            {current.n}
          </p>
          <p className="mt-2 text-[0.8125rem] text-mauve-300">of {String(steps.length).padStart(2, "0")}</p>
          <p className="mt-6 font-display text-[1.5rem] font-semibold leading-tight text-paper-ink">
            {current.name}
          </p>
          <p className="mt-1 text-[0.875rem] text-mauve-300">{current.duration}</p>

          <ul className="mt-10 space-y-3" role="list">
            {phases.map((ph, p) => {
              const on = current.phase === p;
              return (
                <li
                  key={ph.name}
                  className={`rounded-[14px] border px-4 py-3 transition-colors duration-300 motion-reduce:transition-none ${
                    on ? "border-accent-400/70 bg-deep/60" : "border-mauve-300/15"
                  }`}
                >
                  <p className={`text-[0.9375rem] font-medium ${on ? "text-paper-ink" : "text-mauve-300"}`}>
                    {ph.name}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] text-mauve-300">
                    Steps {steps[phaseStart[p]].n} to{" "}
                    {steps.filter((s) => s.phase === p).slice(-1)[0].n}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <ol
        ref={listRef}
        role="list"
        className="relative"
        style={{ paddingLeft: NODE + 24 }}
      >
        <span
          aria-hidden
          className="absolute w-px bg-mauve-300/20"
          style={{ left: NODE / 2, top: NODE / 2, height: "var(--span, calc(100% - 40px))" }}
        />
        <span
          aria-hidden
          className="absolute w-px origin-top bg-accent-400"
          style={{
            left: NODE / 2,
            top: NODE / 2,
            height: "var(--span, 0px)",
            transform: "scaleY(var(--p, 0))",
          }}
        />

        {steps.map((s, i) => {
          const isActive = i === active;
          const isDone = i < active;
          const startsPhase = phaseStart[s.phase] === i;
          return (
            <li
              key={s.n}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              id={`step-${s.n}`}
              className="relative pb-14 last:pb-0"
              aria-current={isActive ? "step" : undefined}
            >
              <span
                aria-hidden
                className={`absolute left-[-64px] top-0 flex items-center justify-center rounded-full border font-display text-[0.9375rem] font-semibold tabular-nums transition-colors duration-300 motion-reduce:transition-none ${
                  isActive
                    ? "border-accent-500 bg-accent-500 text-on-amber"
                    : isDone
                      ? "border-accent-400 bg-deep text-accent-400"
                      : "border-mauve-300/40 bg-deep text-mauve-300"
                }`}
                style={{ width: NODE, height: NODE }}
              >
                {s.n}
              </span>

              {startsPhase ? (
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                  Phase {s.phase + 1} · {phases[s.phase].name}
                  <span className="ml-2 normal-case tracking-normal text-mauve-300">{phases[s.phase].line}</span>
                </p>
              ) : null}

              <h3
                className={`font-display text-[1.75rem] font-semibold leading-tight transition-colors duration-300 motion-reduce:transition-none ${
                  startsPhase ? "mt-3" : ""
                } ${isActive ? "text-paper-ink" : "text-paper-ink/80"}`}
              >
                {s.name}
              </h3>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.22em] text-mauve-300">{s.duration}</p>
              <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-mauve-300">{s.body}</p>

              <div
                className={`mt-5 max-w-[62ch] rounded-[14px] border px-5 py-4 transition-colors duration-300 motion-reduce:transition-none ${
                  isActive ? "border-accent-400/70 bg-deep/60" : "border-mauve-300/15"
                }`}
              >
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-accent-200">
                  You get
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-[1.6] text-paper-ink">{s.outcome}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
