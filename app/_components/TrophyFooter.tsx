"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { industries } from "@/lib/industries";

import {
  IsoSecurityIcon,
  IsoAiIcon,
  NistIcon,
  CyberEssentialsIcon,
  OwaspIcon,
  GdprIcon,
} from "./StandardIcons";

/**
 * IMS Consultancy footer — editorial corporate composition with a Framer
 * Motion ambient background.
 *
 *  Band 1 — Brand statement
 *  Band 2 — Professional standards centrepiece (with real-style icons)
 *  Band 3 — Editorial directory (Practice / Firm / Resources / Get in touch)
 *  Band 4 — Legal strip
 *
 * Background layers driven by motion: three drifting mauve blobs running on
 * independent loops + a subtle motion-driven horizontal sheen across the
 * top edge. CSS-driven grid overlay sits behind the blobs for depth.
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
  { name: "ISO/IEC 27001", note: "Information security", Icon: IsoSecurityIcon },
  { name: "ISO/IEC 42001", note: "AI management", Icon: IsoAiIcon },
  { name: "NIST AI RMF", note: "AI risk framework", Icon: NistIcon },
  { name: "Cyber Essentials", note: "UK baseline controls", Icon: CyberEssentialsIcon },
  { name: "OWASP LLM Top 10", note: "Reviewed each release", Icon: OwaspIcon },
  { name: "UK GDPR · DPA 2018", note: "Data protection", Icon: GdprIcon },
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
  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-deep text-paper-ink"
    >
      {/* ───────── FRAMER MOTION BACKGROUND ─────────
          Three large drifting blobs (high opacity so they're obviously
          alive), an animated radial pulse behind the brand statement, and
          two horizontal sheen bars sweeping across at different rates. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,100,120,0.95), rgba(120,100,120,0.22) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 140, -80, 0],
          y: [0, -60, 70, 0],
          scale: [1, 1.25, 0.85, 1],
          opacity: [0.55, 0.85, 0.5, 0.55],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,176,212,0.85), rgba(120,100,120,0.18) 45%, transparent 70%)",
          filter: "blur(44px)",
        }}
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 70, -40, 0],
          scale: [1, 0.85, 1.20, 1],
          opacity: [0.6, 0.9, 0.55, 0.6],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-32 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,176,212,0.55), rgba(120,100,120,0.14) 50%, transparent 70%)",
          filter: "blur(46px)",
        }}
        animate={{
          x: [0, 90, 30, 0],
          y: [0, -50, 80, 0],
          scale: [1, 1.15, 0.85, 1],
          opacity: [0.5, 0.8, 0.45, 0.5],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Fourth ambient blob — runs much slower, big and soft */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(180,160,180,0.55), rgba(120,100,120,0.10) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -120, 40, 0],
          y: [0, 60, -90, 0],
          scale: [1, 1.10, 0.92, 1],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Two horizontal sheen bars sweeping across at different rates */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-[1px] w-[50%]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,176,212,0.95), transparent)",
        }}
        animate={{ x: ["-40%", "260%"] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.8,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-12 left-0 h-[1px] w-[35%]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,176,212,0.7), transparent)",
        }}
        animate={{ x: ["260%", "-40%"] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.2,
        }}
      />

      {/* Persistent grid overlay */}
      <div
        aria-hidden
        className="ims-footer-grid pointer-events-none absolute inset-0 opacity-[0.06]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* ───────── Band 1 — Brand statement (promoted to top, bigger) ───────── */}
        <motion.section
          className="pt-16 pb-14 text-center sm:pt-20 sm:pb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.36em] text-mauve-200"
            initial={{ opacity: 0, letterSpacing: "0.20em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.36em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            IMS Consultancy
          </motion.p>

          <h2 className="mx-auto mt-7 max-w-4xl font-serif text-[clamp(2.25rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-paper-ink">
            Intelligence
            <span className="mx-3 inline-block align-middle">
              <span aria-hidden className="inline-block h-[2px] w-12 bg-mauve-200 align-middle sm:w-20" />
            </span>
            made simple.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-200/95">
            A small private consultancy from London. We help senior operators
            decide, build, and compound — quietly and with discipline.
          </p>

          <div className="mt-9 inline-flex items-center gap-4">
            <span aria-hidden className="h-px w-12 bg-mauve-200/50" />
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-200">
              Est. London · Working worldwide
            </span>
            <span aria-hidden className="h-px w-12 bg-mauve-200/50" />
          </div>
        </motion.section>

        {/* ───────── Band 2 — Professional standards centrepiece ───────── */}
        <section
          aria-labelledby="footer-standards-heading"
          className="border-t border-mauve-300/12 py-16 sm:py-20"
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
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3"
            role="list"
            aria-label="Standards and frameworks we align with"
          >
            {STANDARDS.map(({ name, note, Icon }) => (
              <li
                key={name}
                className="group flex items-start gap-3 rounded-md border border-mauve-300/15 bg-deep-soft/35 px-4 py-4 backdrop-blur transition-all duration-500 hover:border-mauve-300/40 hover:bg-deep-soft/65 hover:shadow-[0_10px_28px_-16px_rgba(212,176,212,0.45)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-mauve-300/15 bg-deep/60 text-mauve-200 transition-colors duration-500 group-hover:border-mauve-200/40 group-hover:text-mauve-100">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="flex flex-col">
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[0.20em] text-paper-ink">
                    {name}
                  </span>
                  <span className="mt-1 text-[11px] tracking-[0.04em] text-mauve-300">
                    {note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────── Band 3 — Editorial directory ───────── */}
        <section
          aria-labelledby="footer-directory-heading"
          className="border-t border-mauve-300/12 pt-14 pb-14 sm:pt-16 sm:pb-16"
        >
          <h3 id="footer-directory-heading" className="sr-only">
            Site directory
          </h3>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1.1fr] lg:gap-12">
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

            <nav aria-label="Industries">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-mauve-200">
                Industries
              </p>
              <ul className="mt-6 space-y-3.5" role="list">
                {industries.map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={`/industries/${i.slug}`}
                      className="group inline-flex items-center text-[0.9375rem] text-paper-ink/85 transition-colors hover:text-paper-ink"
                    >
                      <span className="relative font-serif text-[1.0625rem] leading-[1.4]">
                        {i.name}
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

        {/* ───────── Band 4 — Legal strip ───────── */}
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

        {/* Crawler discovery surface */}
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
