"use client";

import { track } from "@/lib/analytics";
import { BOOK_CALL_URL, GDPR_COPY } from "@/lib/industries/config";

interface CTASectionProps {
  industry: string;
}

export function CTASection({ industry }: CTASectionProps) {
  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-ink p-10 text-paper-ink md:p-14">
      <p className="font-industry-display text-2xl font-medium md:text-3xl">
        This was synthetic data. Yours will be better.
      </p>
      <a
        href={BOOK_CALL_URL}
        onClick={() => track("book_call_clicked", { industry })}
        className="inline-flex items-center justify-center rounded-md bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
      >
        Book a call
      </a>
      <p className="text-sm text-paper-ink-soft">{GDPR_COPY.footnote}</p>
    </div>
  );
}
