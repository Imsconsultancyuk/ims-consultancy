"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

/**
 * IMS Consultancy footer — editorial corporate composition.
 *
 *  Band 1 — Brand statement centred (the consultancy mark)
 *  Band 2 — Quiet newsletter strip
 *  Band 3 — Professional standards centrepiece (the trust signal)
 *  Band 4 — Editorial directory (Practice / Firm / Get in touch)
 *  Band 5 — Legal strip
 *
 * Intentionally distinct from agency/Drift-style 4-column footers. Reads
 * more like a private-bank or boutique-firm footer.
 */

const PRACTICE = [
  { label: "AI Automation", href: "/services/ai-automation" },
  { label: "SEO and Organic Growth", href: "/services/seo" },
  { label: "Custom Software", href: "/services/custom-software" },
  { label: "Strategic Advisory", href: "/services/strategic-advisory" },
];

const FIRM = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Reviews", href: "/reviews" },
  { label: "Pricing", href: "/pricing" },
];

const RESOURCES = [
  { label: "Insights", href: "/insights" },
  { label: "FAQ", href: "/faq" },
  { label: "AI Policy", href: "/ai-policy" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
];

const STANDARDS = [
  { name: "ISO/IEC 27001", note: "Information security" },
  { name: "ISO/IEC 42001", note: "AI management" },
  { name: "NIST AI RMF", note: "AI risk framework" },
  { name: "Cyber Essentials", note: "UK baseline controls" },
  { name: "OWASP LLM Top 10", note: "Reviewed each release" },
  { name: "UK GDPR · DPA 2018", note: "Data protection" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "GitHub", href: "https://github.com/Imsconsultancyuk" },
];

const CRAWLER_LINKS = [
  { label: "llms.txt", href: "/llms.txt" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Robots", href: "/robots.txt" },
];

export function TrophyFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("err");
      return;
    }
    setStatus("ok");
    setEmail("");
  }

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-deep text-paper-ink"
    >
      {/* Animated background — drifting mauve orbs + faint grid */}
      <div
        aria-hidden="true"
        className="ims-footer-orb pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,100,120,0.40), rgba(120,100,120,0.10) 40%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />
      <div
        aria-hidden="true"
        className="ims-footer-orb ims-footer-orb--alt pointer-events-none absolute -bottom-40 -right-32 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,176,212,0.32), rgba(120,100,120,0.08) 45%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />
      <div
        aria-hidden="true"
        className="ims-footer-grid pointer-events-none absolute inset-0 opacity-[0.035]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* ───────── Band 1 — Brand statement ───────── */}
        <section className="pt-24 pb-16 text-center sm:pt-32 sm:pb-20">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.34em] text-mauve-200">
            IMS Consultancy
          </p>
          <p className="mx-auto mt-7 max-w-3xl font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] font-medium leading-[1.25] tracking-[-0.012em] text-paper-ink">
            A small private consultancy from London.
            <br className="hidden sm:block" />
            We help senior operators decide, build, and compound.
          </p>
          <div className="mt-10 inline-flex items-center gap-4">
            <span aria-hidden className="h-px w-12 bg-mauve-200/40" />
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-300">
              Est. London · Working worldwide
            </span>
            <span aria-hidden className="h-px w-12 bg-mauve-200/40" />
          </div>
        </section>

        {/* ───────── Band 2 — Newsletter strip ───────── */}
        <section
          id="newsletter"
          aria-labelledby="footer-newsletter-heading"
          className="border-y border-mauve-300/12 py-12 sm:py-14"
        >
          <div className="mx-auto grid w-full max-w-4xl items-center gap-8 sm:grid-cols-[1fr_auto] sm:gap-12">
            <div>
              <p
                id="footer-newsletter-heading"
                className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-200"
              >
                The IMS letter
              </p>
              <p className="mt-3 font-serif text-[1.125rem] leading-[1.5] text-paper-ink/95">
                One short field report from inside live engagements. Once a
                month. No filler.
              </p>
            </div>
            <form
              onSubmit={onSubmit}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <label htmlFor="ims-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="ims-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                placeholder="you@yourbusiness.com"
                className="w-full rounded-md border border-mauve-300/20 bg-deep-soft/60 px-4 py-3 text-[0.9375rem] text-paper-ink placeholder:text-mauve-300/60 backdrop-blur transition-colors focus:border-mauve-200/50 focus:outline-none sm:w-72"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-md bg-mauve-300 px-7 text-[11px] font-medium uppercase tracking-[0.22em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_6px_24px_-8px_rgba(212,176,212,0.6)]"
              >
                Subscribe
              </button>
            </form>
          </div>
          <p
            aria-live="polite"
            className={`mt-3 text-center text-[12px] tracking-[0.05em] sm:text-right ${
              status === "ok"
                ? "text-mauve-200"
                : status === "err"
                  ? "text-[color:#d4998c]"
                  : "text-transparent"
            }`}
          >
            {status === "ok"
              ? "Confirmed. The next letter will land in your inbox."
              : status === "err"
                ? "That does not look like a valid email."
                : "placeholder"}
          </p>
        </section>

        {/* ───────── Band 3 — Professional standards centrepiece ───────── */}
        <section
          aria-labelledby="footer-standards-heading"
          className="py-16 sm:py-20"
        >
          <div className="text-center">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.34em] text-mauve-200">
              Professional standards
            </p>
            <h3
              id="footer-standards-heading"
              className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium leading-[1.2] tracking-[-0.01em] text-paper-ink"
            >
              We hold our practice to recognised standards.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-mauve-300">
              Alignment, not certification, except where stated. Built so we
              can work cleanly alongside clients who carry their own
              accreditations.
            </p>
          </div>

          <ul
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
            role="list"
            aria-label="Standards and frameworks we align with"
          >
            {STANDARDS.map((s) => (
              <li
                key={s.name}
                className="group flex flex-col items-start rounded-md border border-mauve-300/15 bg-deep-soft/35 px-4 py-3.5 backdrop-blur transition-all duration-500 hover:border-mauve-300/40 hover:bg-deep-soft/65 hover:shadow-[0_10px_28px_-16px_rgba(212,176,212,0.45)]"
              >
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.20em] text-paper-ink">
                  {s.name}
                </span>
                <span className="mt-1 text-[11px] tracking-[0.04em] text-mauve-300">
                  {s.note}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────── Band 4 — Editorial directory ───────── */}
        <section
          aria-labelledby="footer-directory-heading"
          className="border-t border-mauve-300/12 pt-14 pb-14 sm:pt-16 sm:pb-16"
        >
          <h3 id="footer-directory-heading" className="sr-only">
            Site directory
          </h3>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.1fr] lg:gap-12">
            {/* Practice */}
            <nav aria-label="Practice areas">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-200">
                Practice
              </p>
              <ul className="mt-6 space-y-3.5" role="list">
                {PRACTICE.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center text-[0.9375rem] text-paper-ink/85 transition-colors hover:text-paper-ink"
                    >
                      <span className="relative font-serif text-[1.0625rem] leading-[1.4]">
                        {l.label}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Firm */}
            <nav aria-label="About the firm">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-200">
                Firm
              </p>
              <ul className="mt-6 space-y-3.5" role="list">
                {FIRM.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center text-[0.9375rem] text-paper-ink/85 transition-colors hover:text-paper-ink"
                    >
                      <span className="relative font-serif text-[1.0625rem] leading-[1.4]">
                        {l.label}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Resources + legal */}
            <nav aria-label="Resources">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-200">
                Resources
              </p>
              <ul className="mt-6 space-y-3.5" role="list">
                {RESOURCES.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center text-[0.9375rem] text-paper-ink/85 transition-colors hover:text-paper-ink"
                    >
                      <span className="relative font-serif text-[1.0625rem] leading-[1.4]">
                        {l.label}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Get in touch */}
            <div>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-200">
                Get in touch
              </p>
              <div className="mt-6 space-y-5">
                <a
                  href="mailto:info@intelmadesimple.com"
                  className="group block font-serif text-[1.25rem] leading-tight text-paper-ink"
                >
                  <span className="relative">
                    info@intelmadesimple.com
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </a>
                <p className="text-[0.9375rem] leading-[1.7] text-mauve-300">
                  London, United Kingdom
                  <br />
                  Working with clients across the UK, Europe, and North
                  America.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href="/contact"
                    data-cursor="link"
                    className="group inline-flex w-fit items-center gap-2 font-sans text-[12px] uppercase tracking-[0.22em] text-mauve-200 transition-colors hover:text-paper-ink"
                  >
                    <span>Open the contact page</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    data-cursor="link"
                    className="group inline-flex w-fit items-center gap-2 font-sans text-[12px] uppercase tracking-[0.22em] text-mauve-200 transition-colors hover:text-paper-ink"
                  >
                    <span>Book a 20-minute call</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
                <ul
                  className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
                  role="list"
                  aria-label="Social"
                >
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 font-sans text-[12px] uppercase tracking-[0.20em] text-mauve-300 transition-colors hover:text-paper-ink"
                      >
                        <span className="relative">
                          {s.label}
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-500 ease-out group-hover:scale-x-100"
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Band 5 — Legal strip ───────── */}
        <section className="flex flex-col items-start justify-between gap-4 border-t border-mauve-300/12 py-8 sm:flex-row sm:items-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-mauve-300">
            © {new Date().getFullYear()} IMS Consultancy.
            Registered in England and Wales.
            All rights reserved.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-mauve-300/80">
            Intelligence made simple.
          </p>
        </section>

        {/* Crawler discovery surface — present in DOM for SEO and AI
            crawlers, visually hidden from sighted users. */}
        <nav aria-label="Discovery for search and AI crawlers" className="sr-only">
          <ul>
            {CRAWLER_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
