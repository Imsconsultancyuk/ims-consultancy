import type { Metadata } from "next";

// Placeholder. "/" is served by public/flagship/index.html (Netlify forced redirect; beforeFiles rewrite in next.config.ts elsewhere).
// The previous Next home page is archived in ims-consultancy-archive/old-site-2026-10.
export const metadata: Metadata = {
  title: { absolute: "UK Professional Firm Revenue Recovery | Intel Made Simple" },
  description:
    "Intel Made Simple finds the fees UK professional firms leave unbilled and unchased, then recovers them. Live within 14 days of data access.",
  alternates: { canonical: "https://intelmadesimple.com/", languages: { "en-GB": "https://intelmadesimple.com/" } },
};

export default function Home() {
  return null;
}
