"use client";

import Link from "next/link";

import { track } from "@/lib/analytics";
import { getIndustry } from "@/lib/industries";
import { BOOK_CALL_URL, GDPR_COPY } from "@/lib/industries/config";

interface CTASectionProps {
  industry: string;
  related: [string, string];
}

export function CTASection({ industry, related }: CTASectionProps) {
  const relatedIndustries = related
    .map((slug) => getIndustry(slug))
    .filter((found) => found !== undefined);

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
      {relatedIndustries.length > 0 ? (
        <p className="text-sm text-paper-ink-soft">
          Also see:{" "}
          {relatedIndustries.map((related, index) => (
            <span key={related.slug}>
              {index > 0 ? ", " : ""}
              <Link
                href={`/industries/${related.slug}`}
                className="underline decoration-paper-ink-soft underline-offset-4 transition-colors hover:text-paper-ink"
              >
                {related.name}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}
