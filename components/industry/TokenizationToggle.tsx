"use client";

import { GDPR_COPY } from "@/lib/industries/config";

export type TokenizationView = "raw" | "tokenised";

interface TokenizationToggleProps {
  value: TokenizationView;
  onChange: (value: TokenizationView) => void;
}

// A native <button> carries keyboard operability (Enter/Space, Tab focus)
// for free — no extra key handling needed (IMS-029 AC). role="switch" +
// aria-checked follow the ARIA APG two-state switch pattern.
export function TokenizationToggle({ value, onChange }: TokenizationToggleProps) {
  const isTokenised = value === "tokenised";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isTokenised}
      onClick={() => onChange(isTokenised ? "raw" : "tokenised")}
      className="inline-flex w-fit items-center gap-3 rounded-full border border-line bg-paper px-3 py-2 text-sm font-medium"
    >
      <span className={isTokenised ? "text-ink-soft" : "text-ink"}>
        {GDPR_COPY.toggleLabels.raw}
      </span>
      <span
        aria-hidden="true"
        className="relative h-5 w-9 shrink-0 rounded-full bg-ink transition-colors"
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-paper transition-transform ${
            isTokenised ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className={isTokenised ? "text-ink" : "text-ink-soft"}>
        {GDPR_COPY.toggleLabels.tokenised}
      </span>
    </button>
  );
}
