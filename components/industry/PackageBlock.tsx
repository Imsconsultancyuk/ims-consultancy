"use client";

import { useState, type FormEvent } from "react";

import { track } from "@/lib/analytics";
import { BOOK_CALL_URL } from "@/lib/industries/config";

interface PackageBlockProps {
  industry: string;
  package: {
    heading: string;
    includes: string[];
    timeline: string;
    anchor: string;
  };
}

type RequestState = "idle" | "sending" | "sent" | "error";

export function PackageBlock({ industry, package: pkg }: PackageBlockProps) {
  const [showEmailField, setShowEmailField] = useState(false);
  const [state, setState] = useState<RequestState>("idle");

  function handlePrimaryCta() {
    track("package_cta_clicked", { industry });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const website = String(formData.get("company_website") ?? "");

    setState("sending");

    try {
      const response = await fetch("/api/sample-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, industry, company_website: website }),
      });

      if (!response.ok) throw new Error("Request failed");

      track("sample_report_requested", { industry });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-line bg-paper p-8">
      <h3 className="font-industry-display text-lg font-medium text-ink">
        {pkg.heading}
      </h3>
      <ul className="flex flex-col gap-2">
        {pkg.includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-ink-soft"
          >
            <span aria-hidden="true" className="mt-1 text-ink-soft">
              ·
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-ink-soft">{pkg.timeline}</p>
      <p className="num text-base font-medium text-ink">{pkg.anchor}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={BOOK_CALL_URL}
          onClick={handlePrimaryCta}
          className="inline-flex items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper-ink transition-opacity hover:opacity-90"
        >
          Book a call
        </a>
        {!showEmailField ? (
          <button
            type="button"
            onClick={() => setShowEmailField(true)}
            className="text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-ink-soft"
          >
            Email me the sample report
          </button>
        ) : null}
      </div>
      {showEmailField ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:flex-row sm:items-start"
        >
          <div className="flex-1">
            <label htmlFor="sample-report-email" className="sr-only">
              Email address
            </label>
            <input
              id="sample-report-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              disabled={state === "sending" || state === "sent"}
              className="w-full rounded-md border border-line bg-paper px-4 py-3 text-sm text-ink disabled:opacity-60"
            />
          </div>
          {/* Honeypot: visually collapsed to 0x0 and pulled out of tab order.
              A genuine label (not aria-hidden) keeps it legible to screen
              readers rather than hiding a focusable field from assistive tech,
              which is the accessible-honeypot pattern. Bots that fill every
              field trip this; the API route rejects silently. */}
          <div className="h-0 w-0 overflow-hidden">
            <label htmlFor="company_website">Leave this field blank</label>
            <input
              id="company_website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={state === "sending" || state === "sent"}
            className="rounded-md border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper-ink disabled:opacity-60"
          >
            {state === "sent" ? "Sent" : state === "sending" ? "Sending…" : "Send"}
          </button>
        </form>
      ) : null}
      {state === "sent" ? (
        <p role="status" className="text-sm text-positive">
          Request received. We&apos;ll email the sample report over.
        </p>
      ) : null}
      {state === "error" ? (
        <p role="alert" className="text-sm text-ink">
          Something went wrong. Try again, or book a call instead.
        </p>
      ) : null}
    </div>
  );
}
