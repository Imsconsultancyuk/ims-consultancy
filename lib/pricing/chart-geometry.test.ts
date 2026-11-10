import { describe, expect, it } from "vitest";

import { area, frameFor, mix, paybackMonth, x, yFor } from "./chart-geometry";

const MONTHS = 12;
const series = (f: (m: number) => number) => Array.from({ length: MONTHS + 1 }, (_, m) => f(m));

// Cumulative "what you keep": starts at minus the build, crosses zero at month 6.
const crossing = series((m) => 500 * m - 3000);
const ours = series((m) => 100 * m + 3000);
const never = series(() => -3000);
const alwaysUp = series((m) => 200 * m + 100);

function vertices(d: string): [number, number][] {
  return [...d.matchAll(/[ML](-?[\d.]+),(-?[\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
}

describe("area: only the gain above zero is filled", () => {
  it("never draws below the zero baseline when the line starts underwater", () => {
    const f = frameFor(crossing, ours);
    const baseline = yFor(f)(0);
    for (const [, y] of vertices(area(crossing, f))) expect(y).toBeLessThanOrEqual(baseline + 0.05);
  });

  it("starts at the zero crossing, not at go-live", () => {
    const f = frameFor(crossing, ours);
    const [first] = vertices(area(crossing, f));
    expect(first[0]).toBeCloseTo(x(6), 0);
  });

  it("fills nothing when the line never reaches zero", () => {
    const f = frameFor(never, ours);
    expect(vertices(area(never, f))).toHaveLength(0);
  });

  it("keeps the full-width fill when the line is above zero throughout", () => {
    const f = frameFor(alwaysUp, ours);
    const xs = vertices(area(alwaysUp, f)).map(([px]) => px);
    expect(Math.min(...xs)).toBeCloseTo(x(0), 0);
    expect(Math.max(...xs)).toBeCloseTo(x(MONTHS), 0);
  });
});

describe("paybackMonth: where the marker sits", () => {
  it("interpolates the zero crossing between months", () => {
    expect(paybackMonth(crossing)).toBeCloseTo(6, 6);
    // -60 at month 1, +40 at month 2: crosses 60 / 100 of the way along.
    expect(paybackMonth(series((m) => (m === 0 ? -100 : m === 1 ? -60 : 20 * m)))).toBeCloseTo(1.6, 6);
  });

  it("is null when the line never reaches zero, or there is no build to pay back", () => {
    expect(paybackMonth(never)).toBeNull();
    expect(paybackMonth(alwaysUp)).toBeNull();
  });

  it("stays on the drawn line at every point of the morph", () => {
    const from = frameFor(series((m) => 800 * m - 3000), ours);
    const to = frameFor(series((m) => 150 * m - 1500), ours);
    for (const t of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
      const f = mix(from, to, t);
      const month = paybackMonth(f.client);
      expect(month).not.toBeNull();
      const lower = Math.floor(month as number);
      const frac = (month as number) - lower;
      const at = f.client[lower] + (f.client[Math.min(lower + 1, MONTHS)] - f.client[lower]) * frac;
      expect(Math.abs(yFor(f)(at) - yFor(f)(0))).toBeLessThan(0.01);
    }
  });
});
