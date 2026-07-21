"use client";

import { useEffect, useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { GDPR_COPY } from "@/lib/industries/config";

import { TokenizationToggle, type TokenizationView } from "./TokenizationToggle";

interface PrivacyShieldProps {
  industry: string;
  regulatorLine: string;
}

interface RecordField {
  label: string;
  raw: string;
  tokenised: string;
}

// Obviously-fictional record, verbatim from the ticket (Doc 1 IMS-029).
const RECORD_FIELDS: RecordField[] = [
  { label: "Name", raw: "Jane Exampleton", tokenised: "CLIENT_0047" },
  { label: "Email", raw: "jane@sample.demo", tokenised: "EMAIL_0047" },
  { label: "DOB", raw: "04/1981", tokenised: "DOB_0047" },
  { label: "Policy", raw: "POLICY-88213", tokenised: "POLICY_0047" },
];

export function PrivacyShield({ industry, regulatorLine }: PrivacyShieldProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [pinned, setPinned] = useState<TokenizationView | null>(null);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  function handleToggle(next: TokenizationView) {
    setPinned(next);
    track("privacy_toggle_used", { industry, view: next });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col gap-6">
        <p className="text-base text-ink-soft">{GDPR_COPY.body}</p>
        <p className="text-sm font-medium text-ink">{regulatorLine}</p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {GDPR_COPY.trustChips.map((chip) => (
            <li
              key={chip}
              className="rounded-md border border-line bg-paper px-4 py-3 text-sm text-ink-soft"
            >
              {chip}
            </li>
          ))}
        </ul>
        <p className="text-xs text-ink-soft">{GDPR_COPY.footnote}</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Ambient auto-loop, toggle included. Hidden entirely under reduced
            motion in favour of the always-both-visible static comparison
            below (IMS-029 AC). */}
        <div className="ims-vault-motion flex flex-col gap-4">
          <TokenizationToggle value={pinned ?? "raw"} onChange={handleToggle} />
          <div
            ref={trackRef}
            data-vault-visible={visible ? "" : undefined}
            data-pinned={pinned ?? undefined}
            className="relative h-64 overflow-hidden rounded-lg border border-line bg-paper"
          >
            <div className="absolute inset-x-0 top-4 flex items-center justify-between px-5 text-xs font-medium uppercase tracking-wide text-ink-soft">
              <span>Your book</span>
              <span className="flex items-center gap-1.5">
                <VaultIcon />
                Tokenisation vault
              </span>
              <span>AI engine</span>
            </div>
            <div className="ims-vault-card absolute top-16 h-32 w-52 rounded-md border border-line bg-ink">
              <RecordFace fields={RECORD_FIELDS} variant="raw" className="ims-vault-face-raw" />
              <RecordFace
                fields={RECORD_FIELDS}
                variant="tokenised"
                className="ims-vault-face-tokenised"
              />
            </div>
          </div>
        </div>

        {/* Reduced-motion fallback: both states shown at once, no animation. */}
        <div className="ims-vault-static grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-ink p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-paper-ink-soft">
              {GDPR_COPY.toggleLabels.raw}
            </p>
            <RecordFace fields={RECORD_FIELDS} variant="raw" />
          </div>
          <div className="rounded-md border border-line bg-ink p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-paper-ink-soft">
              {GDPR_COPY.toggleLabels.tokenised}
            </p>
            <RecordFace fields={RECORD_FIELDS} variant="tokenised" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RecordFace({
  fields,
  variant,
  className,
}: {
  fields: RecordField[];
  variant: "raw" | "tokenised";
  className?: string;
}) {
  return (
    <dl
      className={`flex flex-col justify-center gap-1.5 p-4 text-xs text-paper-ink-soft${
        className ? ` absolute inset-0 ${className}` : ""
      }`}
    >
      {fields.map((field) => (
        <div key={field.label} className="flex justify-between gap-3">
          <dt>{field.label}</dt>
          <dd className="num text-paper-ink">{variant === "raw" ? field.raw : field.tokenised}</dd>
        </div>
      ))}
    </dl>
  );
}

function VaultIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
