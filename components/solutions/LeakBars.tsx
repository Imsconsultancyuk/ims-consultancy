"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { ToolFigure } from "@/lib/industries/solutions";

import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface LeakBarsProps {
  title: string;
  names: string[];
  figures: ToolFigure[];
  total: string;
}

// Amber is reserved for actions, so the data series use mauve, cobalt (informational) and ink.
const STACK_COLOURS = ["bg-mauve-500", "bg-info", "bg-ink"];

// Horizontal bars, one per tool, scaled to the largest. The bars are decoration:
// the figures are also printed as text and in the aria-label, and the
// section carries a screen-reader table (chart text alternative).
export function LeakBars({ title, names, figures, total }: LeakBarsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const max = Math.max(...figures.map((f) => f.amount));
  const sum = figures.reduce((n, f) => n + f.amount, 0);
  const shares = figures.map((f) => Math.round((f.amount / sum) * 100));
  const summary = figures.map((f, i) => `${names[i]} ${f.display}`).join(", ");

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    const bars = node.querySelectorAll<HTMLElement>("[data-bar]");
    const stack = node.querySelector<HTMLElement>("[data-stack]");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: node, start: "top 85%", once: true } });
      tl.fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.out", stagger: 0.12 });
      if (stack) tl.fromTo(stack, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" }, 0.5);
    }, node);
    return () => ctx.revert();
  }, [reduced, title]);

  return (
    <figure ref={ref} className="rounded-[14px] border border-line bg-paper-pure p-5 md:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">{title}</span>
        <span className="rounded-full border border-cobalt-600/30 px-2.5 py-0.5 text-[11px] text-info">
          Example figures
        </span>
      </figcaption>
      <div role="img" aria-label={`Bar chart. ${summary}. Total ${total}.`} className="mt-5 flex flex-col gap-4">
        {figures.map((f, i) => (
          <div key={names[i]} aria-hidden="true">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-ink">{names[i]}</span>
              <span className="num font-semibold text-ink">{f.display}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-paper-soft">
              <div
                data-bar
                className="h-full origin-left rounded-full bg-mauve-500"
                style={{ width: `${Math.max(6, (f.amount / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="mt-6 border-t border-line pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">Share of the total</p>
        <div data-stack className="mt-2.5 flex h-3 origin-left gap-0.5 overflow-hidden rounded-full">
          {figures.map((f, i) => (
            <div key={names[i]} className={STACK_COLOURS[i % STACK_COLOURS.length]} style={{ width: `${shares[i]}%` }} />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-soft">
          {figures.map((f, i) => (
            <li key={names[i]} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${STACK_COLOURS[i % STACK_COLOURS.length]}`} />
              {names[i]} <span className="num font-semibold text-ink">{shares[i]}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sr-only">
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Tool</th>
            <th scope="col">Sample result</th>
            <th scope="col">Share of total</th>
          </tr>
        </thead>
        <tbody>
          {figures.map((f, i) => (
            <tr key={names[i]}>
              <th scope="row">{names[i]}</th>
              <td>{f.display}</td>
              <td>{shares[i]}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <p className="mt-5 border-t border-line pt-3 text-sm text-ink-soft">{total}</p>
    </figure>
  );
}
