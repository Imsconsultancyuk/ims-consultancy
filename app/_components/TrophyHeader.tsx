"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "#approach", label: "Approach" },
  { href: "#work", label: "Work" },
  { href: "#voices", label: "Voices" },
  { href: "#contact", label: "Contact" },
];

/**
 * Floating glass pill navigation that sits over the hero. Hairline mauve
 * scroll-progress bar runs across the very top of the page. Hover
 * underlines slide in from the left on each nav link. Pattern inspired by
 * Terminal Industries and the Drift and Forge motion primitives.
 */
export function TrophyHeader() {
  const [scrolled, setScrolled] = useState(false);
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
            "linear-gradient(to right, rgba(180,160,180,0.0), rgba(212,176,212,0.95), rgba(180,160,180,0.0))",
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
              ? "border-mauve-300/15 bg-deep/80 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(26,22,32,0.6)]"
              : "border-mauve-300/12 bg-deep/40 backdrop-blur-xl shadow-[0_4px_24px_-12px_rgba(26,22,32,0.45)]"
          }`}
        >
          <Link
            href="/"
            aria-label="IMS Consultancy home"
            className="group flex items-center gap-2 pl-2 pr-3"
          >
            <Image
              src="/logos/ims-vertical-transparent.png"
              alt=""
              width={80}
              height={100}
              priority
              sizes="32px"
              style={{ height: "auto" }}
              className="w-[28px] transition-transform duration-500 group-hover:scale-105 sm:w-[30px]"
            />
            <span className="font-serif text-[15px] font-medium tracking-[0.04em] text-paper-ink">
              IMS
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className="group relative inline-flex h-9 items-center rounded-full px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-ink/85 transition-colors hover:text-paper-ink"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-mauve-200 transition-transform duration-400 ease-out group-hover:scale-x-100"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="mailto:hello@intelmadesimple.com"
            className="group inline-flex h-9 items-center gap-2 rounded-full bg-mauve-300 px-4 text-[11px] font-medium uppercase tracking-[0.16em] text-deep transition-all duration-400 hover:bg-mauve-200 hover:shadow-[0_6px_24px_-6px_rgba(212,176,212,0.55)]"
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
        </nav>
      </header>
    </>
  );
}
