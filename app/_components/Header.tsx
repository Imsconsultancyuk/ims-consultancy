"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-mauve-300/15 bg-deep/75 backdrop-blur-xl"
          : "bg-deep/25 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="IMS Consultancy home" className="flex items-center">
          <Image
            src="/logos/ims-vertical-transparent.png"
            alt="IMS"
            width={120}
            height={150}
            priority
            sizes="44px"
            style={{ height: "auto" }}
            className="w-[40px] sm:w-[44px]"
          />
        </Link>
        <ul className="flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-ink">
          <li>
            <Link href="#approach" className="transition-colors hover:text-mauve-200">
              Approach
            </Link>
          </li>
          <li className="hidden sm:list-item">
            <Link href="#work" className="transition-colors hover:text-mauve-200">
              Work
            </Link>
          </li>
          <li>
            <Link
              href="mailto:info@intelmadesimple.com"
              className="text-mauve-200 transition-colors hover:text-paper-ink"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
