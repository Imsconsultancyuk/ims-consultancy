import type { Metadata } from "next";

// Placeholder. "/faq" is served by public/flagship/faq.html (see app/page.tsx).
export const metadata: Metadata = {
  title: { absolute: "Revenue Leakage and Lock-up FAQ | Intel Made Simple" },
  description:
    "Thirty answers on revenue leakage, lock-up and WIP, AI and data safety, and how Intel Made Simple works with UK professional firms. Sources linked.",
  alternates: { canonical: "https://intelmadesimple.com/faq", languages: { "en-GB": "https://intelmadesimple.com/faq" } },
};

export default function FaqPage() {
  return null;
}
