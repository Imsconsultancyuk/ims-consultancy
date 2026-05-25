import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import { SmoothScroll } from "./_components/SmoothScroll";
import { SiteCursor } from "./_components/SiteCursor";
import { NoiseField } from "./_components/NoiseField";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
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
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
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
