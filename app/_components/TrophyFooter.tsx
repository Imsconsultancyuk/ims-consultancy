"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const NAV_COLS = [
  {
    title: "Services",
    links: [
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "SEO and Organic Growth", href: "/services/seo" },
      { label: "Custom Software", href: "/services/custom-software" },
      { label: "Strategic Advisory", href: "/services/strategic-advisory" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Reviews", href: "/reviews" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Discovery surface — present in the DOM so search and AI crawlers can
// follow these URLs, but visually hidden so the human-facing footer stays
// quiet. Crawlers parse the DOM, not the rendered viewport, so the links
// remain fully indexable.
const CRAWLER_LINKS = [
  { label: "llms.txt", href: "/llms.txt" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Robots", href: "/robots.txt" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "GitHub", href: "https://github.com/Imsconsultancyuk" },
];

const STANDARDS = [
  { name: "ISO/IEC 27001", note: "Aligned" },
  { name: "ISO/IEC 42001", note: "Aligned" },
  { name: "NIST AI RMF", note: "Aligned" },
  { name: "Cyber Essentials", note: "Aligned" },
  { name: "OWASP LLM Top 10", note: "Reviewed every release" },
  { name: "UK GDPR · DPA 2018", note: "Compliant" },
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
      className="relative isolate overflow-hidden bg-deep px-6 pt-20 pb-10 text-paper-ink sm:pt-24 sm:pb-12 lg:pt-28"
    >
      {/* Animated mauve blobs drifting behind the footer for depth */}
      <div
        aria-hidden="true"
        className="ims-footer-orb pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,100,120,0.42), rgba(120,100,120,0.10) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden="true"
        className="ims-footer-orb ims-footer-orb--alt pointer-events-none absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,176,212,0.32), rgba(120,100,120,0.08) 45%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />
      <div
        aria-hidden="true"
        className="ims-footer-grid pointer-events-none absolute inset-0 opacity-[0.04]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Top band: brand + ethos + newsletter */}
        <div className="grid gap-12 border-b border-mauve-300/12 pb-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="flex items-start gap-6 sm:gap-8">
            <Image
              src="/logos/ims-vertical-transparent.png"
              alt="IMS Consultancy"
              width={180}
              height={220}
              sizes="(min-width: 640px) 140px, 100px"
              style={{ height: "auto" }}
              className="w-[100px] shrink-0 sm:w-[140px]"
            />
            <div className="pt-2">
              <p className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.01em] text-paper-ink">
                Intelligence made simple.
              </p>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-[1.7] text-mauve-300">
                IMS is a small strategic consultancy. We work with a handful
                of operators at a time. We help them think clearly, build
                deliberately, and compound the value of every engagement
                long after the invoice clears.
              </p>
            </div>
          </div>

          <div id="newsletter" className="flex flex-col">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
              The IMS letter
            </p>
            <p className="mt-4 font-serif text-[1.25rem] leading-[1.4] text-paper-ink">
              One short note per month. Field reports from inside real
              engagements, no fluff.
            </p>
            <form
              onSubmit={onSubmit}
              className="mt-6 flex w-full flex-col gap-3 sm:flex-row"
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
                className="flex-1 rounded-md border border-mauve-300/20 bg-deep-soft/60 px-4 py-3 text-[0.9375rem] text-paper-ink placeholder:text-mauve-300/60 backdrop-blur transition-colors focus:border-mauve-200/50 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-md bg-mauve-300 px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_6px_24px_-8px_rgba(212,176,212,0.55)]"
              >
                Subscribe
              </button>
            </form>
            <p
              aria-live="polite"
              className={`mt-3 text-[12px] tracking-[0.05em] ${
                status === "ok"
                  ? "text-mauve-200"
                  : status === "err"
                    ? "text-[color:#d4998c]"
                    : "text-transparent"
              }`}
            >
              {status === "ok"
                ? "Got it. We will send the next one when it lands."
                : status === "err"
                  ? "That does not look like an email. Try again."
                  : "placeholder"}
            </p>
          </div>
        </div>

        {/* Middle: 3 nav columns + contact column */}
        <div className="grid gap-12 border-b border-mauve-300/12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3" role="list">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center text-[0.9375rem] text-paper-ink/85 transition-colors hover:text-paper-ink"
                    >
                      <span className="relative">
                        {l.label}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-400 ease-out group-hover:scale-x-100"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-[0.9375rem] text-paper-ink/85" role="list">
              <li>
                <a
                  href="mailto:hello@intelmadesimple.com"
                  className="group inline-flex items-center transition-colors hover:text-paper-ink"
                >
                  <span className="relative">
                    hello@intelmadesimple.com
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-400 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center transition-colors hover:text-paper-ink"
                >
                  <span className="relative">
                    Contact page
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-400 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center transition-colors hover:text-paper-ink"
                >
                  <span className="relative">
                    Book a 20-min call
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-400 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </Link>
              </li>
              <li className="pt-2 text-mauve-300">London, United Kingdom</li>
            </ul>
            <p className="mt-6 rounded-md border border-mauve-200/30 bg-mauve-200/5 px-4 py-3 text-[12px] leading-[1.5] text-mauve-200">
              Response within 4 hours, guaranteed.
            </p>
          </div>
        </div>

        {/* Standards strip */}
        <div className="border-b border-mauve-300/12 py-10">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
            Standards we hold to
          </p>
          <p className="mt-3 max-w-2xl text-[13px] leading-[1.6] text-mauve-300">
            Built so we can work cleanly alongside clients with their own
            accreditations. Alignment by default, certification where stated.
          </p>
          <ul
            className="mt-6 flex flex-wrap items-stretch gap-3"
            role="list"
            aria-label="Standards and frameworks we align with"
          >
            {STANDARDS.map((s) => (
              <li
                key={s.name}
                className="flex flex-col rounded-md border border-mauve-300/15 bg-deep-soft/40 px-4 py-3 backdrop-blur"
              >
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-paper-ink">
                  {s.name}
                </span>
                <span className="mt-1 text-[11px] tracking-[0.04em] text-mauve-300">
                  {s.note}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials + tagline */}
        <div className="flex flex-col gap-6 border-b border-mauve-300/12 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
              Find us
            </p>
            <ul className="mt-4 flex flex-wrap gap-4" role="list">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-paper-ink/85 transition-colors hover:text-paper-ink"
                  >
                    <span className="relative">
                      {s.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-mauve-200 transition-transform duration-400 ease-out group-hover:scale-x-100"
                      />
                    </span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                      className="opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    >
                      <path
                        d="M2 8L8 2M8 2H3.5M8 2v4.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[12px] leading-[1.6] text-mauve-300 sm:text-right">
            Based in the UK. Working with founders and operators worldwide.
          </p>
        </div>

        {/* Bottom band: legal */}
        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-300">
            © {new Date().getFullYear()} IMS Consultancy. All rights reserved.
          </p>
          <ul
            className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-[10px] uppercase tracking-[0.22em] text-mauve-300"
            role="list"
          >
            <li>
              <Link
                href="/privacy"
                className="transition-colors hover:text-paper-ink"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="transition-colors hover:text-paper-ink"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/ai-policy"
                className="transition-colors hover:text-paper-ink"
              >
                AI Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Crawler discovery surface — present in the DOM for SEO and AI
            crawlers, visually hidden from sighted users so the footer
            stays calm. sr-only keeps the links focusable for assistive
            tech and indexable by search and LLM bots. */}
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
