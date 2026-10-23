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
    url: "https://intelmadesimple.com",
    images: OG_IMAGES,
    siteName: "IMS Consultancy",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMS Consultancy · Intelligence Made Simple",
    description:
      "Strategic consultancy for business decisions, development, and AI workflows.",
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
