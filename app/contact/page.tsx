import type { Metadata } from "next";

// Placeholder. "/contact" is served by public/flagship/contact.html (see app/page.tsx).
export const metadata: Metadata = {
  title: { absolute: "Contact Intel Made Simple | Book a free Leak Scan" },
  description:
    "Tell us about your firm and book a free Leak Scan with Intel Made Simple, a London revenue recovery consultancy for UK professional firms.",
  alternates: { canonical: "https://intelmadesimple.com/contact", languages: { "en-GB": "https://intelmadesimple.com/contact" } },
};

export default function ContactPage() {
  return null;
}
