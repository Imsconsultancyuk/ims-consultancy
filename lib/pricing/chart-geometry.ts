import { FEE_MONTHS } from "./recovery";

export const W = 640;
export const H = 260;
export const PAD = { top: 18, right: 16, bottom: 10, left: 16 };

export interface Frame {
  client: number[];
  ours: number[];
  lo: number;
  hi: number;
}

export function frameFor(client: number[], ours: number[]): Frame {
  const lo = Math.min(0, ...client, ...ours);
  const hi = Math.max(1, ...client, ...ours);
  const pad = (hi - lo) * 0.08;
  return { client, ours, lo: lo - pad, hi: hi + pad };
}

export const x = (m: number) => PAD.left + (m / FEE_MONTHS) * (W - PAD.left - PAD.right);
export const yFor = (f: Frame) => (v: number) => PAD.top + ((f.hi - v) / (f.hi - f.lo)) * (H - PAD.top - PAD.bottom);

export function line(values: number[], f: Frame): string {
  const y = yFor(f);
  return values.map((v, m) => `${m ? "L" : "M"}${x(m).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
}

/**
 * Fill between the line and the zero baseline, only where the line is at or
 * above zero. Closing the raw polyline against the baseline would also fill the
 * underwater stretch (a loss shaded as a gain) and self-intersect at the
 * crossing, so each above-zero run is cut at its exact zero crossing instead.
 */
export function area(values: number[], f: Frame): string {
  const y = yFor(f);
  const base = y(0).toFixed(1);
  const runs: [number, number][][] = [];
  let run: [number, number][] = [];
  const close = () => {
    if (run.length > 1) runs.push(run);
    run = [];
  };
  if (values[0] >= 0) run.push([0, values[0]]);
  for (let m = 0; m < values.length - 1; m++) {
    const a = values[m];
    const b = values[m + 1];
    if (a >= 0 && b >= 0) {
      run.push([m + 1, b]);
    } else if (a >= 0) {
      run.push([m + a / (a - b), 0]);
      close();
    } else if (b >= 0) {
      run = [[m - a / (b - a), 0], [m + 1, b]];
    }
  }
  close();
  return runs
    .map((r) => {
      const first = r[0];
      const last = r[r.length - 1];
      const points = r.map(([m, v]) => `L${x(m).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
      return `M${x(first[0]).toFixed(1)},${base} ${points} L${x(last[0]).toFixed(1)},${base} Z`;
    })
    .join(" ");
}

/**
 * Month at which the cumulative line climbs back to zero, interpolated between
 * the two months either side of the crossing. Null when there is no build to
 * pay back, or the line is still underwater at the end.
 */
export function paybackMonth(values: number[]): number | null {
  if (!(values[0] < 0)) return null;
  for (let m = 1; m < values.length; m++) {
    if (values[m] >= 0) return m - 1 + -values[m - 1] / (values[m] - values[m - 1]);
  }
  return null;
}

export function mix(a: Frame, b: Frame, t: number): Frame {
  const lerp = (p: number, q: number) => p + (q - p) * t;
  return {
    client: a.client.map((v, i) => lerp(v, b.client[i] ?? v)),
    ours: a.ours.map((v, i) => lerp(v, b.ours[i] ?? v)),
    lo: lerp(a.lo, b.lo),
    hi: lerp(a.hi, b.hi),
  };
}
