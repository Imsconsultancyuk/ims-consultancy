"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const NAV_COLS = [
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Decide", href: "/services#decide" },
      { label: "Build", href: "/services#build" },
      { label: "Compound", href: "/services#compound" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Method", href: "/#method" },
      { label: "Voices", href: "/#voices" },
      { label: "Contact", href: "mailto:hello@intelmadesimple.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Newsletter", href: "#newsletter" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "AI overview (llms.txt)", href: "/llms.txt" },
      { label: "Robots", href: "/robots.txt" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "GitHub", href: "https://github.com/Imsconsultancyuk" },
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
    // Real submission wires to Resend in a later phase. For now, mark as queued
    // so the form behaves and we can verify analytics events end-to-end.
    setStatus("ok");
    setEmail("");
  }

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-deep px-6 pt-20 pb-10 text-paper-ink sm:pt-24 sm:pb-12 lg:pt-28"
    >
      {/* Subtle mauve glow blob top-left of footer for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,100,120,0.35), rgba(120,100,120,0.10) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Top band: brand + ethos */}
        <div className="grid gap-12 border-b border-mauve-300/12 pb-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
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
                IMS is a small strategic consultancy. We work with a handful of
                operators at a time. We help them think clearly, build deliberately,
                and compound the value of every engagement long after the invoice
                clears.
              </p>
            </div>
          </div>

          {/* Newsletter */}
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
                ? "Got it. We'll send the next one when it lands."
                : status === "err"
                  ? "That does not look like an email. Try again."
                  : "placeholder"}
            </p>
          </div>
        </div>

        {/* Middle: 3 nav columns + socials */}
        <div className="grid gap-12 border-b border-mauve-300/12 py-14 sm:grid-cols-3 lg:grid-cols-4">
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
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
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
              Find us
            </p>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.9375rem] text-paper-ink/85 transition-colors hover:text-paper-ink"
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
            <p className="mt-8 text-[12px] leading-[1.6] text-mauve-300">
              Based in the UK. We work with founders and operators worldwide.
            </p>
          </div>
        </div>

        {/* Bottom band: legal */}
        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-mauve-300">
            © {new Date().getFullYear()} IMS Consultancy. All rights reserved.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-mauve-300/70">
            Built in minutes, not days.
          </p>
        </div>
      </div>
    </footer>
  );
}
