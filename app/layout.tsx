import type { Metadata } from "next";
import {
  Sora,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { SmoothScroll } from "./_components/SmoothScroll";
import { SiteCursor } from "./_components/SiteCursor";
import { NoiseField } from "./_components/NoiseField";
import "./globals.css";

// Type system v3 (2026-07-25) — third pass through design-taste for the light
// theme. Display: Sora, a clean geometric-humanist grotesk (premium, calm,
// modern — distinct from both the retired serif and the condensed Bricolage).
// Body: Instrument Sans, a neutral humanist sans. Both drive every
// headline/body slot via the --font-* remap in globals.css, so component class
// names (font-display / font-serif / font-sans) are unchanged.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      className={`${sora.variable} ${instrument.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
