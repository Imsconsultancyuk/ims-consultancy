"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import { NAV_SECTIONS } from "@/lib/industries/config";
import { scrollToSection } from "@/lib/industries/scroll";

// Sits below the site's fixed header pill (top-3/4 + h-14), not at top-0.
// `--industry-nav-offset` is set on the page wrapper to clear pill + this bar
// together, so anchor jumps land below both (IMS-030 AC: doesn't overlap anchors).
export function IndustryNav() {
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0].id);

  useEffect(() => {
    const targets = NAV_SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (current) setActiveId(current.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    scrollToSection(id);
  }

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-[76px] z-40 hidden h-16 items-center border-y border-line bg-paper/90 backdrop-blur md:flex"
    >
      <ul className="mx-auto flex max-w-6xl items-center gap-8 px-6 text-sm">
        {NAV_SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(event) => handleClick(event, section.id)}
              aria-current={activeId === section.id ? "location" : undefined}
              className={
                activeId === section.id
                  ? "font-medium text-ink"
                  : "text-ink-soft transition-colors hover:text-ink"
              }
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
