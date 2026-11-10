import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { SmoothScroll } from "./_components/SmoothScroll";
import { OG_IMAGES } from "@/lib/og";
import "./globals.css";
import "./chrome.css";

// One family, contrast by weight and scale, same as the flagship pages. The
// variable axis covers 400 to 900 plus italic, so no per-weight list is needed.
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Applies the saved theme before first paint so there is no light flash. The
// key matches the flagship pages, so the choice carries across both.
const THEME_INIT = 'try{var t=localStorage.getItem("ims-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}';

export const metadata: Metadata = {
  metadataBase: new URL("https://intelmadesimple.com"),
  title: {
    default: "UK Professional Firm Revenue Recovery | Intel Made Simple",
    template: "%s | Intel Made Simple",
  },
  description:
    "We work with UK professional firms to find unbilled and unchased revenue, Free Leak Scan first, then a published price and a fee only on what we recover.",
  keywords: [
    "revenue leakage",
    "lock-up days",
    "WIP recovery",
    "professional firms UK",
    "AI readiness audit",
  ],
  authors: [{ name: "Intel Made Simple" }],
  openGraph: {
    title: "UK Professional Firm Revenue Recovery | Intel Made Simple",
    description:
      "We find unbilled and unchased revenue in UK professional firms, Free Leak Scan first, then a published price and a fee only on what we recover.",
    url: "https://intelmadesimple.com",
    images: OG_IMAGES,
    siteName: "Intel Made Simple",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Professional Firm Revenue Recovery | Intel Made Simple",
    description:
      "We find unbilled and unchased revenue in UK professional firms, Free Leak Scan first, then a published price and a fee only on what we recover.",
    images: OG_IMAGES.map((i) => i.url),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2f5" },
    { media: "(prefers-color-scheme: dark)", color: "#19141a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${schibsted.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script
          defer
          data-domain="intelmadesimple.com"
          src="https://plausible.io/js/script.tagged-events.outbound-links.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}",
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-paper text-ink font-sans"
        suppressHydrationWarning
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
