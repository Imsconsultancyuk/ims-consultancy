"use client";

import { useState } from "react";
import Link from "next/link";

import { INSIGHT_TOPICS, type InsightPost, type InsightTopic } from "@/lib/insights/posts";

type Filter = InsightTopic | "All";

export function InsightsGrid({ posts }: { posts: InsightPost[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? posts : posts.filter((p) => p.topic === filter);
  const filters: Filter[] = ["All", ...INSIGHT_TOPICS];

  return (
    <>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "All" ? posts.length : posts.filter((p) => p.topic === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-200 ${
                active
                  ? "border-accent-500 bg-accent-500 text-on-amber"
                  : "border-ink/20 text-ink/75 hover:border-ink/45 hover:text-ink"
              }`}
            >
              {f} <span className="tabular-nums font-semibold">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-[0.875rem] text-ink/70" aria-live="polite">
        Showing {shown.length} of {posts.length} summaries.
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug}>
            <article className="flex h-full flex-col rounded-[14px] border border-ink/12 bg-paper-soft p-7 transition-colors duration-300 hover:border-ink/30">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] text-ink/70">
                <span className="font-semibold uppercase tracking-[0.18em] text-accent-700">{p.topic}</span>
                <span aria-hidden>·</span>
                <span>{p.published}</span>
                <span
                  className={`ml-auto rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium ${
                    p.access === "read"
                      ? "border-ink/25 text-ink/80"
                      : "border-accent-700/50 text-accent-700"
                  }`}
                >
                  {p.access === "read" ? "Source read" : "Via report"}
                </span>
              </div>

              <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">
                <Link
                  href={`/insights/${p.slug}`}
                  data-cursor="link"
                  className="hover:text-accent-700 focus-visible:text-accent-700"
                >
                  {p.title}
                </Link>
              </h3>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-ink/10 py-4">
                {p.points.map((pt) => (
                  <div key={pt.value + pt.label}>
                    <dt className="font-display text-[1.125rem] font-semibold leading-tight tabular-nums text-ink">
                      {pt.value}
                    </dt>
                    <dd className="mt-1 text-[0.6875rem] leading-snug text-ink/70">{pt.label}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 text-[0.9rem] leading-[1.65] text-ink/75">{p.imsTake}</p>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-[0.8125rem]">
                <Link
                  href={`/insights/${p.slug}`}
                  data-cursor="link"
                  className="font-medium text-ink underline decoration-accent-500 decoration-2 underline-offset-4"
                >
                  Read our summary
                </Link>
                <a
                  href={p.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/75 hover:text-ink"
                >
                  Find out more at {p.publisher.split(" (")[0]}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <span aria-hidden> ↗</span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
