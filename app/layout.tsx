import type { Metadata } from "next";
import {
  Geist,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import { SmoothScroll } from "./_components/SmoothScroll";
import { SiteCursor } from "./_components/SiteCursor";
import { NoiseField } from "./_components/NoiseField";
import "./globals.css";

// Type system v4 (2026-08-02) — letterforms only. Sizes, weights, tracking and
// spacing are untouched from v3; this changes which typefaces fill the same
// slots. Display: Geist, a Swiss-derived neo-grotesque — engineered and
// institutional where Sora's geometric bowls read startup-generic at large
// sizes. Body: IBM Plex Sans, a humanist sans, so the pairing has a real
// grotesque-vs-humanist contrast instead of two interchangeable neutrals
// (ui-ux-pro-max's professional-services typography set ranks Plex first for
// trust registers). Mono: IBM Plex Mono, for family coherence with the body —
// JetBrains Mono alongside Plex was an orphan. All three drive every
// headline/body slot via the --font-* remap in globals.css, so component class
// names (font-display / font-serif / font-sans / font-mono) are unchanged.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.intelmadesimple.com"),
  title: {
    default: "IMS Consultancy · Intelligence Made Simple",
    template: "%s · IMS Consultancy",
  },
  description:
    "Strategic consultancy for business decisions, development, and AI workflows. Considered work for ambitious operators.",
  keywords: [
    "strategy consultancy",
    "AI workflows",
    "business decisions",
    "development consulting",
    "IMS",
  ],
  authors: [{ name: "IMS Consultancy" }],
  openGraph: {
    title: "IMS Consultancy · Intelligence Made Simple",
    description:
      "Strategic consultancy for business decisions, development, and AI workflows.",
    url: "https://www.intelmadesimple.com",
    siteName: "IMS Consultancy",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMS Consultancy · Intelligence Made Simple",
    description:
      "Strategic consultancy for business decisions, development, and AI workflows.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-paper text-ink font-sans"
        suppressHydrationWarning
      >
        <SmoothScroll />
        <NoiseField />
        <SiteCursor />
        {children}
      </body>
    </html>
  );
}
