"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

import { track } from "@/lib/analytics";
import { GDPR_COPY } from "@/lib/industries/config";

import { useReducedMotion } from "./useReducedMotion";

interface TokenGuardProps {
  sectorSlug: string;
  toolId: string;
  regulatorLine: string;
}

type View = "raw" | "tokenised";

const FIELDS = [
  { label: "Name", raw: "Jane Exampleton", tokenised: "CLIENT_0047" },
  { label: "Email", raw: "jane@sample.demo", tokenised: "EMAIL_0047" },
  { label: "Phone", raw: "07700 900123", tokenised: "PHONE_0047" },
  { label: "Reference", raw: "REF-88213", tokenised: "REF_0047" },
] as const;

// The data-protection block that appears under every tool. The record is
// fictional. The switch flips the same four fields between what you see and
// what the AI is given.
export function TokenGuard({ sectorSlug, toolId, regulatorLine }: TokenGuardProps) {
  const [view, setView] = useState<View>("raw");
  const listRef = useRef<HTMLDListElement | null>(null);
  const reduced = useReducedMotion();
  const tokenised = view === "tokenised";

  function flip(next: View) {
    setView(next);
    track("privacy_toggle_used", { industry: sectorSlug, tool: toolId, view: next });
    const rows = listRef.current?.querySelectorAll("dd");
    if (rows && !reduced) {
      gsap.fromTo(rows, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out", stagger: 0.06 });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
          {GDPR_COPY.eyebrow} · PII tokenisation
        </p>
        <h4 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">{GDPR_COPY.heading}</h4>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{GDPR_COPY.body}</p>
        <p className="mt-3 text-sm font-medium text-ink">{regulatorLine}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {GDPR_COPY.trustChips.map((chip) => (
            <li key={chip} className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft">
              {chip}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-soft">{GDPR_COPY.footnote}</p>
      </div>

      <div className="rounded-[14px] border border-line bg-paper-pure p-4">
        <div
          role="group"
          aria-label="Choose a view of the sample record"
          className="inline-flex rounded-full border border-line p-1"
        >
          {(["raw", "tokenised"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => flip(v)}
              className={`min-h-11 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info ${
                view === v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {GDPR_COPY.toggleLabels[v]}
            </button>
          ))}
        </div>
        <dl ref={listRef} className="mt-4 divide-y divide-line text-sm" aria-live="polite">
          {FIELDS.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-ink-soft">{f.label}</dt>
              <dd className={`num ${tokenised ? "text-info" : "text-ink"}`}>{tokenised ? f.tokenised : f.raw}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-ink-soft">Fictional record. The real names stay in the encrypted vault.</p>
      </div>
    </div>
  );
}
