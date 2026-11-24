import { describe, expect, it } from "vitest";

import { lockup, parseMoney, round1 } from "./lockup";

describe("lockup", () => {
  it("matches the worked example in the lock-up guide", () => {
    const r = lockup(2_000_000, 250_000, 330_000, 15);
    if (!r.ok) throw new Error("expected a result");
    expect(Math.round(r.daily)).toBe(5479);
    expect(round1(r.wipDays)).toBe(45.6);
    expect(round1(r.debtorDays)).toBe(60.2);
    expect(round1(r.lockupDays)).toBe(105.9);
    expect(Math.round(r.released)).toBe(82192);
    expect(r.biggerHalf).toBe("debtors");
  });

  it("matches the ILFM example quoted in the guide", () => {
    const r = lockup(10_000_000, 0, 0, 30);
    if (!r.ok) throw new Error("expected a result");
    expect(Math.round(r.daily)).toBe(27397);
  });

  it("never claims more days released than the firm has", () => {
    const r = lockup(365_000, 10_000, 0, 50);
    if (!r.ok) throw new Error("expected a result");
    expect(r.cutDays).toBe(10);
  });

  it("asks for fee income when it is missing", () => {
    expect(lockup(NaN, 1, 1, 0).ok).toBe(false);
    expect(lockup(0, 1, 1, 0).ok).toBe(false);
  });
});

describe("parseMoney", () => {
  it("reads common ways of typing money", () => {
    expect(parseMoney("£2,000,000")).toBe(2_000_000);
    expect(parseMoney("250000")).toBe(250_000);
    expect(parseMoney("1.5m")).toBe(1_500_000);
    expect(parseMoney("330k")).toBe(330_000);
    expect(Number.isNaN(parseMoney("abc"))).toBe(true);
    expect(Number.isNaN(parseMoney(""))).toBe(true);
  });
});
