"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { H, PAD, W, area, frameFor, line, mix, paybackMonth, x, yFor, type Frame } from "@/lib/pricing/chart-geometry";
import { FEE_MONTHS, gbp } from "@/lib/pricing/recovery";

interface RecoveryChartProps {
  clientByMonth: number[];
  oursByMonth: number[];
}

const AXIS_MONTHS = [0, 3, 6, 9, 12];

const pct = (fraction: number) => `${(fraction * 100).toFixed(3)}%`;

/** Marker position as a share of the chart box, or null while the line is still underwater. */
function markerPlace(f: Frame): { left: string; top: string } | null {
  const month = paybackMonth(f.client);
  return month === null ? null : { left: pct(x(month) / W), top: pct(yFor(f)(0) / H) };
}

/**
 * Twelve months of cumulative money: what the firm keeps after paying for the
 * build, against what we earn. Server-rendered at the opening numbers, then
 * GSAP morphs between frames as the sliders move. The payback marker and axis
 * labels are HTML over the SVG so they keep a fixed pixel size at any width,
 * and the marker is read off the drawn frame so it rides the line mid-morph.
 */
export function RecoveryChart({ clientByMonth, oursByMonth }: RecoveryChartProps) {
  const initial = useRef(frameFor(clientByMonth, oursByMonth));
  const drawn = useRef(initial.current);
  const clientLine = useRef<SVGPathElement>(null);
  const clientArea = useRef<SVGPathElement>(null);
  const oursLine = useRef<SVGPathElement>(null);
  const zero = useRef<SVGLineElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = frameFor(clientByMonth, oursByMonth);
    const from = drawn.current;
    const paint = (f: Frame) => {
      drawn.current = f;
      clientLine.current?.setAttribute("d", line(f.client, f));
      clientArea.current?.setAttribute("d", area(f.client, f));
      oursLine.current?.setAttribute("d", line(f.ours, f));
      const z = yFor(f)(0).toFixed(1);
      zero.current?.setAttribute("y1", z);
      zero.current?.setAttribute("y2", z);
      const dot = marker.current;
      if (dot) {
        const place = markerPlace(f);
        dot.style.display = place ? "" : "none";
        if (place) {
          dot.style.left = place.left;
          dot.style.top = place.top;
        }
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(target);
      return;
    }
    const progress = { t: 0 };
    const tween = gsap.to(progress, {
      t: 1,
      duration: 0.7,
      ease: "power3.out",
      onUpdate: () => paint(mix(from, target, progress.t)),
    });
    return () => {
      tween.kill();
    };
  }, [clientByMonth, oursByMonth]);

  const f = initial.current;
  const z = yFor(f)(0);
  const place = markerPlace(f);
  const paysBack = paybackMonth(clientByMonth) !== null;
  const net = clientByMonth[FEE_MONTHS] ?? 0;
  const kept = net >= 0 ? `you keep ${gbp(net)} after the build` : `you are ${gbp(-net)} behind after the build`;

  return (
    <figure className="m-0">
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label={`Over ${FEE_MONTHS} months ${kept}, and we earn ${gbp(oursByMonth[FEE_MONTHS] ?? 0)}.`}
        >
          <defs>
            <linearGradient id="recovery-keep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-accent-400)" stopOpacity="0.32" />
              <stop offset="1" stopColor="var(--color-accent-400)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: FEE_MONTHS + 1 }, (_, m) => (
            <line
              key={m}
              x1={x(m)}
              x2={x(m)}
              y1={PAD.top}
              y2={H - PAD.bottom}
              stroke="var(--color-mauve-300)"
              strokeOpacity={m % 3 === 0 ? 0.18 : 0.07}
            />
          ))}
          <line ref={zero} x1={PAD.left} x2={W - PAD.right} y1={z} y2={z} stroke="var(--color-mauve-200)" strokeOpacity="0.5" strokeDasharray="3 5" />
          <path ref={clientArea} d={area(f.client, f)} fill="url(#recovery-keep)" />
          <path ref={oursLine} d={line(f.ours, f)} fill="none" stroke="var(--color-mauve-200)" strokeWidth="2" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
          <path ref={clientLine} d={line(f.client, f)} fill="none" stroke="var(--color-accent-400)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span
          ref={marker}
          aria-hidden
          className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-400 bg-deep"
          style={{ left: place?.left, top: place?.top, display: place ? undefined : "none" }}
        />
      </div>
      <div aria-hidden className="relative mt-1.5 h-4 text-[0.6875rem] leading-4 text-mauve-300">
        {AXIS_MONTHS.map((m) => (
          <span
            key={m}
            className={`absolute top-0 whitespace-nowrap ${m === 0 ? "" : m === FEE_MONTHS ? "-translate-x-full" : "-translate-x-1/2"}`}
            style={{ left: pct(x(m) / W) }}
          >
            {m === 0 ? "Go-live" : `Month ${m}`}
          </span>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-mauve-300">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="inline-block h-[3px] w-5 rounded-full bg-accent-400" />
          What you keep, after paying for the build
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="inline-block w-5 border-t-2 border-dashed border-mauve-200" />
          What we earn, build included
        </span>
        <span className={`inline-flex items-center gap-2 ${paysBack ? "" : "opacity-40"}`}>
          <span aria-hidden className="inline-block size-3 rounded-full border-2 border-accent-400" />
          Build paid back
        </span>
      </figcaption>
    </figure>
  );
}
