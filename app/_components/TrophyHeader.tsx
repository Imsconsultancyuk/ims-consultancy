"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { industries } from "@/lib/industries";

// "/", "/tools", "/faq" and "/contact" are static flagship pages that Netlify
// serves through redirects, so they use plain anchors. Everything else is Next.
const COMPANY_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/reviews", label: "Reviews" },
];

export function TrophyHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"sectors" | "company" | null>(null);
  const [dark, setDark] = useState<boolean | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const read = () => setDark(root.dataset.theme ? root.dataset.theme === "dark" : mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  function toggleTheme() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ims-theme", next);
    } catch {
      // Storage blocked: the theme still applies for this view.
    }
    setDark(!dark);
  }

  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  return (
    <>
      <a className="fx-skip" href="#main">
        Skip to content
      </a>
      <header className="fx-nav" ref={navRef}>
        <div className="fx-nav-in">
          <a className="fx-logo" href="/" aria-label="IntelMadeSimple, home">
            <svg className="fx-mark" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
              <circle cx="14" cy="14" r="14" />
              <path d="M14 14c2.4-3.5 7.2-3.7 7.2 0s-4.8 3.5-7.2 0c-2.4-3.5-7.2-3.7-7.2 0s4.8 3.5 7.2 0z" />
            </svg>
            <span>IntelMadeSimple</span>
          </a>
          <nav className={`fx-main${menuOpen ? " fx-open" : ""}`} id="nav-main" aria-label="Main">
            <a href="/#leaks">Where firms leak</a>
            <div className="fx-sectors">
              <button
                className="fx-sectors-btn"
                type="button"
                aria-expanded={openMenu === "sectors"}
                aria-controls="sectors-panel"
                onClick={() => setOpenMenu((v) => (v === "sectors" ? null : "sectors"))}
              >
                Sectors
              </button>
              <div className="fx-panel" id="sectors-panel">
                <p className="fx-lead">Ten sectors, each with its own toolkit</p>
                <ul>
                  {industries.map((i) => (
                    <li key={i.slug}>
                      <a href={`/tools#${i.slug}`}>{i.name}</a>
                    </li>
                  ))}
                </ul>
                <a className="fx-all" href="/tools">
                  See every tool
                </a>
              </div>
            </div>
            <a href="/tools">Tools</a>
            <a href="/#calc">Calculator</a>
            <a href="/#how">How it works</a>
            <a href="/#pricing">Pricing</a>
            <a href="/faq">FAQ</a>
            <div className="fx-sectors">
              <button
                className="fx-sectors-btn"
                type="button"
                aria-expanded={openMenu === "company"}
                aria-controls="company-panel"
                data-active={COMPANY_LINKS.some((l) => current(l.href)) || undefined}
                onClick={() => setOpenMenu((v) => (v === "company" ? null : "company"))}
              >
                Company
              </button>
              <div className="fx-panel fx-panel-sm" id="company-panel">
                <ul>
                  {COMPANY_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} aria-current={current(l.href)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="fx-theme" type="button" aria-label="Switch colour theme" onClick={toggleTheme}>
              {dark === null ? "Theme" : dark ? "Light" : "Dark"}
            </button>
          </nav>
          <a className="fx-btn fx-cta" href="/contact">
            <span className="fx-long">Book a free Leak Scan</span>
            <span className="fx-short">Book a scan</span>
          </a>
          <button
            className="fx-menu"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-main"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>
    </>
  );
}
