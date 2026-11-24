"use client";

import { useId, useMemo, useState } from "react";

import { lockup, parseMoney, round1 } from "@/lib/calculators/lockup";

// Starts on the worked example in the lock-up guide, so the first numbers a reader sees
// match the guide line for line: 45.6 WIP days, 60.2 debtor days, 105.9 lock-up days.
const START = { fees: "2,000,000", wip: "250,000", debtors: "330,000", cut: "15" };

const gbp0 = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const days1 = (n: number) => round1(n).toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function MoneyField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block font-display text-[1rem] font-semibold">
        {label}
      </label>
      <p id={`${id}-hint`} className="mt-1 text-[0.875rem] leading-[1.55] text-ink-soft">
        {hint}
      </p>
      <div className="relative mt-2.5">
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-ink-soft">
          £
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          aria-describedby={`${id}-hint`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-[14px] border border-ink/20 bg-paper py-3 pr-4 pl-9 text-[1.0625rem] tabular-nums text-ink focus:border-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-700/40"
        />
      </div>
    </div>
  );
}

export function LockupCalculator() {
  const [fees, setFees] = useState(START.fees);
  const [wip, setWip] = useState(START.wip);
  const [debtors, setDebtors] = useState(START.debtors);
  const [cut, setCut] = useState(START.cut);
  const cutId = useId();

  const r = useMemo(
    () => lockup(parseMoney(fees), parseMoney(wip), parseMoney(debtors), parseMoney(cut)),
    [fees, wip, debtors, cut],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
      <form className="space-y-7" onSubmit={(e) => e.preventDefault()} aria-label="Your figures">
        <MoneyField
          label="Annual fee income"
          hint="Fees billed in the last twelve months, net of VAT."
          value={fees}
          onChange={setFees}
        />
        <MoneyField
          label="Unbilled WIP"
          hint="Work done and recorded but not yet invoiced, on the same basis."
          value={wip}
          onChange={setWip}
        />
        <MoneyField
          label="Unpaid billed fees (debtors)"
          hint="Invoices sent and not yet paid. Use net if your fee income is net."
          value={debtors}
          onChange={setDebtors}
        />
        <div>
          <label htmlFor={cutId} className="block font-display text-[1rem] font-semibold">
            Days you would like to cut
          </label>
          <p id={`${cutId}-hint`} className="mt-1 text-[0.875rem] leading-[1.55] text-ink-soft">
            Used to show the cash a shorter cycle would release.
          </p>
          <input
            id={cutId}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            aria-describedby={`${cutId}-hint`}
            value={cut}
            onChange={(e) => setCut(e.target.value)}
            className="mt-2.5 w-full rounded-[14px] border border-ink/20 bg-paper px-4 py-3 text-[1.0625rem] tabular-nums text-ink focus:border-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-700/40 sm:w-40"
          />
        </div>
        <p className="text-[0.8125rem] leading-[1.6] text-ink-soft">
          The sums run in your browser. Nothing you type here is sent to us or stored.
        </p>
      </form>

      <div className="rounded-[14px] border border-ink/12 bg-paper-soft/80 p-6 sm:p-8" aria-live="polite">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-700">Your result</h2>
        {r.ok ? (
          <>
            <p className="mt-4 font-display text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-none tracking-[-0.02em] tabular-nums">
              {days1(r.lockupDays)} <span className="text-[0.45em] font-semibold tracking-normal">lock-up days</span>
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/12 pt-6 text-[0.9375rem]">
              <div>
                <dt className="text-ink-soft">WIP days</dt>
                <dd className="mt-1 font-display text-[1.5rem] font-semibold tabular-nums">{days1(r.wipDays)}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Debtor days</dt>
                <dd className="mt-1 font-display text-[1.5rem] font-semibold tabular-nums">{days1(r.debtorDays)}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Daily fee income</dt>
                <dd className="mt-1 font-display text-[1.5rem] font-semibold tabular-nums">{gbp0(r.daily)}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Cash tied up</dt>
                <dd className="mt-1 font-display text-[1.5rem] font-semibold tabular-nums">{gbp0(r.tiedUp)}</dd>
              </div>
            </dl>
            <p className="mt-7 border-t border-ink/12 pt-6 text-[1rem] leading-[1.65]">
              Every day you take off releases about <strong className="font-semibold">{gbp0(r.daily)}</strong>.
              {r.cutDays > 0 ? (
                <>
                  {" "}
                  Cutting {r.cutDays.toLocaleString("en-GB")} {r.cutDays === 1 ? "day" : "days"} releases about{" "}
                  <strong className="font-semibold">{gbp0(r.released)}</strong>.
                </>
              ) : null}
            </p>
            <p className="mt-4 text-[1rem] leading-[1.65]">
              {r.biggerHalf === "debtors"
                ? "Debtor days are the larger half, so a weekly chasing routine will usually release more cash than a faster billing run."
                : r.biggerHalf === "wip"
                  ? "WIP days are the larger half, so billing sooner, at agreed milestones, will usually release more cash than chasing harder."
                  : "The two halves are about level, so work on billing and chasing together."}
            </p>
            <a
              href="/contact?intent=leak-scan&from=lockup-calculator"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-on-amber transition-all duration-300 hover:bg-accent-600"
            >
              Find where it is stuck: free Leak Scan
            </a>
          </>
        ) : (
          <p className="mt-4 text-[1rem] leading-[1.65] text-ink-soft">{r.message}</p>
        )}
      </div>
    </div>
  );
}
