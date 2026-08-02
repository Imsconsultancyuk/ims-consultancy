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
    // No card wrapper: this renders inside the page's dark closing band, so the
    // band is the surface. A second dark panel here would read as a dead edge.
    <div className="flex flex-col items-start gap-6">
      <p className="font-industry-display max-w-2xl text-2xl font-medium leading-snug md:text-3xl">
        This was synthetic data. Yours will be better.
      </p>
      <a
        href={BOOK_CALL_URL}
        onClick={() => track("book_call_clicked", { industry })}
        className="inline-flex items-center justify-center rounded-md bg-accent-500 px-6 py-3 text-sm font-medium text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_6px_24px_-6px_rgba(58,109,240,0.55)]"
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
