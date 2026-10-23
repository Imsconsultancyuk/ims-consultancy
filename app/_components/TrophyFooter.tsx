import Link from "next/link";

import { industries } from "@/lib/industries";

// Flagship routes ("/", "/tools", "/faq", "/contact") are served by Netlify
// redirects, so those links are plain anchors. Next pages use Link.
const COMPANY = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Reviews", href: "/reviews" },
];

const LOGO_PATH = "M14 14c2.4-3.5 7.2-3.7 7.2 0s-4.8 3.5-7.2 0c-2.4-3.5-7.2-3.7-7.2 0s4.8 3.5 7.2 0z";

export function TrophyFooter() {
  return (
    <footer className="fx-foot" aria-labelledby="foot-title">
      <div className="fx-foot-in">
        <div className="fx-foot-brand">
          <a className="fx-logo" href="/" aria-label="IntelMadeSimple, home">
            <svg className="fx-mark" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
              <circle cx="14" cy="14" r="14" />
              <path d={LOGO_PATH} />
            </svg>
            <span id="foot-title">IntelMadeSimple</span>
          </a>
          <p>
            Revenue recovery for UK professional firms. We find the fees and renewals a firm already earned, recover
            them, and hand over the tools that stop the leak coming back.
          </p>
          <p className="fx-place">Based in London. Working with firms across the United Kingdom.</p>
          <a className="fx-btn" href="/contact">
            Book a free Leak Scan
          </a>
        </div>
        <nav className="fx-foot-col" aria-label="Sectors">
          <h2>Sectors</h2>
          <ul>
            {industries.map((i) => (
              <li key={i.slug}>
                <a href={`/tools#${i.slug}`}>{i.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="fx-foot-col" aria-label="Explore">
          <h2>Explore</h2>
          <ul>
            <li><a href="/tools">Recovery tools</a></li>
            <li><a href="/#leaks">Where firms leak</a></li>
            <li><a href="/#calc">Leak calculator</a></li>
            <li><a href="/#how">How it works</a></li>
            <li><a href="/#pricing">Pricing</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <nav className="fx-foot-col" aria-label="Company">
          <h2>Company</h2>
          <ul>
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="fx-foot-col" aria-label="Trust and legal">
          <h2>Trust</h2>
          <ul>
            <li><a href="/#privacy">Privacy by design</a></li>
            <li><Link href="/ai-policy">AI policy</Link></li>
            <li><Link href="/privacy">Privacy notice</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
          <p className="fx-fine">
            Aligned with ISO/IEC 27001 and 42001, the NIST AI RMF, Cyber Essentials and UK GDPR. Alignment, not
            certification.
          </p>
        </nav>
      </div>
      <div className="fx-foot-bar">
        <span>&copy; {new Date().getFullYear()} IntelMadeSimple. Figures marked Example are illustrations, not client results.</span>
        <a href="#top" className="fx-foot-top">
          Back to top
        </a>
      </div>
    </footer>
  );
}
