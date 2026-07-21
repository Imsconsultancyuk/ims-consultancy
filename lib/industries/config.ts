// Site-wide constants for the Industry Pages feature. Single source of
// truth so every CTA points at the same target (Doc 1 IMS-028 AC).

// Matches the book-call target used sitewide (TrophyHeader, TrophyFooter,
// /contact, /services/*) — see docs/industry-pages-audit.md.
export const BOOK_CALL_URL = "/contact";

// Anchor id for the live demo zone (IMS-044 LiveDemoPlayer mounts here).
export const DEMO_SECTION_ID = "live-demo";

// GDPR section master copy — Doc 2 §3, verbatim. Shared by CTASection
// (IMS-028, footnote only) and PrivacyShield (IMS-029, full block) so the
// compliance wording exists in exactly one place. Do not edit ad hoc — any
// change must trace back to a Doc 2 revision (hard rule 4).
// IndustryNav (IMS-030) section list — order matches the ticket's bar order
// exactly. Also the single source IMS-050's page template must use for each
// SectionShell's `id` prop, so the nav's anchors always resolve.
export const NAV_SECTIONS = [
  { id: "tools", label: "Tools" },
  { id: DEMO_SECTION_ID, label: "Live demo" },
  { id: "data-protection", label: "Data protection" },
  { id: "results", label: "Results" },
  { id: "package", label: "Package" },
  { id: "faq", label: "FAQ" },
] as const;

export const GDPR_COPY = {
  eyebrow: "Data protection",
  heading: "Your client data never reaches the AI",
  body: "Every engagement runs through our tokenisation layer. Names, contact details and account identifiers are swapped for tokens before AI processing — the AI finds the revenue, the encrypted vault holds the identities, and the two only meet back inside your environment.",
  toggleLabels: { raw: "Your view", tokenised: "What the AI sees" },
  trustChips: [
    "UK data residency",
    "Encrypted in transit and at rest",
    "Never used to train AI models",
    "DPA with every engagement",
  ],
  footnote:
    "Pseudonymisation under UK GDPR Art. 4(5). DPIA and DPA available on request.",
} as const;
