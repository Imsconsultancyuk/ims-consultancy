"use client";

import Link from "next/link";
import Image from "next/image";
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
 * IMS Consultancy footer — reorganised for a calmer, balanced formation:
 *
 *  Band 1 — Brand (real logo + statement) | Contact (email, location, CTAs, social)
 *  Band 2 — Professional-standards marquee, full width
 *  Band 3 — Directory: four equal columns (Practice · Firm · Resources · Industries)
 *  Band 4 — Legal strip
 *
 * Industries lists in two internal columns so no single column towers over the
 * others — the previous five-uneven-column row was the source of the clutter.
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

const underline =
  "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-400 transition-transform duration-500 ease-out group-hover:scale-x-100";

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-accent-300">
      {children}
    </p>
  );
}

function FooterNav({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <ColHeading>{title}</ColHeading>
      <ul className="mt-4 space-y-2.5" role="list">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group inline-flex text-[0.95rem] text-paper-ink/70 transition-colors hover:text-paper-ink"
            >
              <span className="relative leading-[1.5]">
                {l.label}
                <span aria-hidden className={underline} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function TrophyFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative isolate overflow-hidden ims-band-dark text-paper-ink">
      <style>{`
        @keyframes footerMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      {/* Ambient */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[560px] w-[560px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(58,109,240,0.16), rgba(58,109,240,0.05) 45%, transparent 70%)", filter: "blur(56px)" }}
        animate={{ x: [0, 120, -60, 0], y: [0, -50, 60, 0], scale: [1, 1.2, 0.9, 1], opacity: [0.5, 0.85, 0.45, 0.5] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-px w-1/2"
        style={{ background: "linear-gradient(90deg, transparent, rgba(126,160,255,0.9), transparent)" }}
        animate={{ x: ["-40%", "260%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      />
      <div aria-hidden className="ims-footer-grid pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* ── Band 1 — Brand + contact ── */}
        <section className="grid gap-12 pt-16 pb-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Link href="/" aria-label="IMS Consultancy home" className="inline-flex items-center gap-3.5">
              <Image
                src="/logos/ims-mark.png"
                alt="IMS · Intelligence Made Simple"
                width={1400}
                height={424}
                sizes="64px"
                style={{ height: "auto" }}
                className="w-[64px]"
              />
              <span className="font-display text-[1.5rem] font-semibold leading-none tracking-[-0.01em] text-paper-ink">
                IMS Consultancy
              </span>
            </Link>
            <h2 className="mt-6 max-w-md font-display text-[clamp(1.75rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper-ink">
              Intelligence made simple.
            </h2>
            <p className="mt-4 max-w-md text-[1rem] leading-[1.65] text-paper-ink/60">
              A small private consultancy from London. We help senior operators
              decide, build, and compound, quietly and with discipline.
            </p>
            <p className="mt-5 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-paper-ink/40">
              Est. London · Working worldwide
            </p>
          </div>

          {/* Contact */}
          <div className="lg:pl-8">
            <ColHeading>Get in touch</ColHeading>
            <a
              href="mailto:info@intelmadesimple.com"
              className="group mt-4 block font-display text-[1.2rem] font-medium leading-tight text-paper-ink"
            >
              <span className="relative">
                info@intelmadesimple.com
                <span aria-hidden className={underline} />
              </span>
            </a>
            <p className="mt-3 max-w-xs text-[0.9rem] leading-[1.6] text-paper-ink/55">
              London, United Kingdom. Working with clients across the UK, Europe,
              and North America.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
              {[
                { label: "Contact", href: "/contact" },
                { label: "Book a 20-min call", href: "/contact" },
              ].map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  data-cursor="link"
                  className="group inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-paper-ink/65 transition-colors hover:text-paper-ink"
                >
                  <span>{c.label}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" role="list" aria-label="Social">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex font-sans text-[11px] uppercase tracking-[0.18em] text-paper-ink/45 transition-colors hover:text-paper-ink">
                    <span className="relative">
                      {s.label}
                      <span aria-hidden className={underline} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Band 2 — Standards marquee ── */}
        <section className="border-t border-paper-ink/10 py-8">
          <ColHeading>Professional standards</ColHeading>
          <div
            className="relative mt-4 overflow-hidden"
            style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
          >
            <ul
              className="flex w-max gap-3 [animation:footerMarquee_32s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
              aria-label="Standards and frameworks we align with"
            >
              {[...STANDARDS, ...STANDARDS].map(({ name, note, Icon }, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-lg border border-paper-ink/10 bg-deep-soft/40 px-3.5 py-2.5 backdrop-blur"
                  aria-hidden={i >= STANDARDS.length ? true : undefined}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-paper-ink/10 bg-deep/60 text-accent-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="whitespace-nowrap font-sans text-[10.5px] font-medium uppercase tracking-[0.16em] text-paper-ink">
                      {name}
                    </span>
                    <span className="whitespace-nowrap text-[10px] tracking-[0.03em] text-paper-ink/45">
                      {note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 max-w-2xl text-[0.82rem] leading-relaxed text-paper-ink/45">
            Alignment, not certification except where stated, so we work cleanly
            alongside clients who carry their own accreditations.
          </p>
        </section>

        {/* ── Band 3 — Directory (four balanced columns) ── */}
        <section
          aria-labelledby="footer-directory-heading"
          className="grid gap-x-8 gap-y-10 border-t border-paper-ink/10 pt-12 pb-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          <h3 id="footer-directory-heading" className="sr-only">Site directory</h3>
          <FooterNav title="Practice" links={PRACTICE} />
          <FooterNav title="Firm" links={FIRM} />
          <FooterNav title="Resources" links={RESOURCES} />
          <nav aria-label="Industries">
            <ColHeading>Industries</ColHeading>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2.5" role="list">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/industries/${i.slug}`}
                    className="group inline-flex text-[0.9rem] text-paper-ink/65 transition-colors hover:text-paper-ink"
                  >
                    <span className="relative leading-[1.5]">
                      {i.shortName}
                      <span aria-hidden className={underline} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* ── Band 4 — Legal ── */}
        <section className="flex flex-col items-start justify-between gap-3 border-t border-paper-ink/10 py-6 sm:flex-row sm:items-center">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-paper-ink/45">
            © {year} IMS Consultancy. Registered in England and Wales. All rights reserved.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-paper-ink/35">
            Intelligence made simple.
          </p>
        </section>

        <nav aria-label="Discovery for search and AI crawlers" className="sr-only">
          <ul>
            {CRAWLER_LINKS.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
