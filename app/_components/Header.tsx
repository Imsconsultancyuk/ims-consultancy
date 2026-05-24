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
      className={`sticky top-0 z-50 w-full transition-colors duration-500 ${
        scrolled
          ? "border-b border-mauve-300/30 bg-paper/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="IMS Consultancy home" className="flex items-center">
          <Image
            src="/logos/ims-horizontal-light.png"
            alt="IMS"
            width={120}
            height={40}
            priority
            sizes="120px"
            style={{ height: "auto" }}
            className="w-[88px] sm:w-[108px]"
          />
        </Link>
        <ul className="flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
          <li>
            <Link href="#approach" className="transition-colors hover:text-mauve-500">
              Approach
            </Link>
          </li>
          <li className="hidden sm:list-item">
            <Link href="#work" className="transition-colors hover:text-mauve-500">
              Work
            </Link>
          </li>
          <li>
            <Link
              href="mailto:hello@intelmadesimple.com"
              className="text-mauve-500 transition-colors hover:text-ink"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
