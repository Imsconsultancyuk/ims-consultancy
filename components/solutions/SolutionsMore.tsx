"use client";

import { useState } from "react";
import Link from "next/link";

import { workName, type SolutionSector } from "@/lib/industries/solutions";

import { Disclosure } from "./Disclosure";

interface SolutionsMoreProps {
  faq: readonly { q: string; a: string }[];
  sectors: SolutionSector[];
}

function Row({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line">
      <h2>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
        >
          {label}
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
            fill="none"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h2>
      <Disclosure open={open} id={id} labelledBy={`${id}-btn`}>
        <div className="pb-6">{children}</div>
      </Disclosure>
    </div>
  );
}

// Reference material, closed until the customer asks for it. The copy stays in the HTML for crawlers.
export function SolutionsMore({ faq, sectors }: SolutionsMoreProps) {
  const [open, setOpen] = useState<"faq" | "all" | null>(null);

  return (
    <section aria-label="More about the solutions" className="mx-auto mt-10 w-full max-w-4xl px-6 pb-20 sm:mt-14">
      <Row id="more-faq" label="Common questions" open={open === "faq"} onToggle={() => setOpen(open === "faq" ? null : "faq")}>
        <dl className="divide-y divide-line">
          {faq.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Row>
      <Row id="more-all" label="Every industry and its tools" open={open === "all"} onToggle={() => setOpen(open === "all" ? null : "all")}>
        <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
          {sectors.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="font-display text-base font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
              >
                {s.name}
              </a>
              <p className="mt-0.5 text-sm text-ink-soft">{s.tools.map((t) => t.name).join(" · ")}</p>
              {s.deepHref ? (
                <Link href={s.deepHref} className="mt-1 inline-block text-sm font-medium text-info underline underline-offset-4">
                  Full {workName(s.shortName)} page
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </Row>
      <div className="border-t border-line" />
    </section>
  );
}
