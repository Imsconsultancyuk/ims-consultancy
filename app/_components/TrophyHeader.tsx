"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

/**
 * Floating glass pill navigation that sits over the hero. Hairline mauve
 * scroll-progress bar runs across the very top of the page. Hover
 * underlines slide in from the left on each nav link. Pattern inspired by
 * Terminal Industries and the Drift and Forge motion primitives.
 */
export function TrophyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${pct / 100})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Hairline scroll-progress bar across the very top */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{
          background:
            "linear-gradient(to right, rgba(58,109,240,0.0), rgba(58,109,240,0.95), rgba(58,109,240,0.0))",
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
        ref={progressRef}
      />

      {/* Floating glass pill */}
      <header
        className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "top-3 sm:top-4" : "top-4 sm:top-6"
        }`}
        style={{ width: "min(960px, calc(100vw - 24px))" }}
      >
        <nav
          className={`flex h-14 w-full items-center justify-between rounded-full border px-3 sm:px-4 transition-all duration-500 ${
            scrolled
              ? "border-ink/10 bg-paper/80 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(10,12,18,0.6)]"
              : "border-ink/8 bg-paper/40 backdrop-blur-xl shadow-[0_4px_24px_-12px_rgba(10,12,18,0.45)]"
          }`}
        >
          <Link
            href="/"
            aria-label="IMS Consultancy home"
            className="group flex items-center pl-2 pr-3"
          >
            <Image
              src="/logos/ims-mark.png"
              alt="IMS · Intelligence Made Simple"
              width={1400}
              height={424}
              priority
              sizes="150px"
              style={{ height: "auto" }}
              className="w-[96px] transition-transform duration-500 group-hover:scale-[1.04] sm:w-[112px]"
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className="group relative inline-flex h-9 items-center rounded-full px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/75 transition-colors hover:text-ink"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-accent-400 transition-transform duration-400 ease-out group-hover:scale-x-100"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link
              href="/contact"
              className="group hidden h-9 items-center gap-2 rounded-full bg-accent-500 px-4 text-[11px] font-medium uppercase tracking-[0.16em] text-paper-pure transition-all duration-400 hover:bg-accent-400 hover:shadow-[0_6px_24px_-6px_rgba(58,109,240,0.55)] md:inline-flex"
              data-cursor="cta"
            >
              <span>Book a call</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-400 group-hover:translate-x-0.5"
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

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/10 md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                ) : (
                  <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        <div
          className={`mt-2 overflow-hidden rounded-3xl border border-ink/10 bg-paper/95 backdrop-blur-2xl transition-all duration-400 md:hidden ${
            menuOpen ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 p-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[13px] font-medium uppercase tracking-[0.16em] text-ink/75 transition-colors hover:bg-ink/8 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 px-1">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-accent-500 text-[12px] font-medium uppercase tracking-[0.16em] text-paper-pure transition-colors hover:bg-accent-400"
                data-cursor="cta"
              >
                <span>Book a call</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
