// Lock-up arithmetic, the same convention the lock-up guide uses:
// daily fee income = annual fees / 365; WIP days = WIP / daily; debtor days = debtors / daily;
// lock-up = WIP days + debtor days. Pure functions so the page and the tests share one source.

export type LockupResult =
  | {
      ok: true;
      daily: number;
      wipDays: number;
      debtorDays: number;
      lockupDays: number;
      tiedUp: number;
      cutDays: number;
      released: number;
      biggerHalf: "wip" | "debtors" | "level";
    }
  | { ok: false; message: string };

/** Rounds half up to one decimal place, so 105.85 shows as 105.9 the way the guide states it. */
export function round1(n: number): number {
  return Math.round(n * 10 + 1e-9) / 10;
}

/** Reads "£1,250,000", "1250000" or "1.25m" style input. Returns NaN for anything else. */
export function parseMoney(raw: string): number {
  const s = raw.trim().toLowerCase().replace(/[£,\s]/g, "");
  if (s === "") return NaN;
  const m = /^(\d+(?:\.\d+)?)(k|m)?$/.exec(s);
  if (!m) return NaN;
  const n = Number(m[1]);
  return m[2] === "m" ? n * 1_000_000 : m[2] === "k" ? n * 1_000 : n;
}

export function lockup(fees: number, wip: number, debtors: number, cut: number): LockupResult {
  if (!Number.isFinite(fees) || fees <= 0) {
    return { ok: false, message: "Enter your annual fee income to see the result." };
  }
  if (!Number.isFinite(wip) || wip < 0 || !Number.isFinite(debtors) || debtors < 0) {
    return { ok: false, message: "Enter unbilled WIP and unpaid billed fees as pound amounts. Use 0 if there are none." };
  }
  const daily = fees / 365;
  const wipDays = (wip * 365) / fees;
  const debtorDays = (debtors * 365) / fees;
  const lockupDays = wipDays + debtorDays;
  const cutDays = Number.isFinite(cut) && cut > 0 ? Math.min(Math.round(cut), Math.floor(lockupDays)) : 0;
  const gap = Math.abs(wipDays - debtorDays);
  return {
    ok: true,
    daily,
    wipDays,
    debtorDays,
    lockupDays,
    tiedUp: wip + debtors,
    cutDays,
    released: cutDays * daily,
    biggerHalf: gap < 2 ? "level" : wipDays > debtorDays ? "wip" : "debtors",
  };
}
