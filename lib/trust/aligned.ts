// Frameworks our working practices are aligned with. Alignment, not
// certification: never word these as "certified" or "accredited".
// The flagship footers (public/flagship/*.html) carry the same list as static
// markup; change both together.
export interface AlignedFramework {
  readonly short: string;
  readonly area: string;
  readonly name: string;
  readonly href: string;
}

export const ALIGNED: readonly AlignedFramework[] = [
  { short: "ISO/IEC 27001", area: "Information security", name: "ISO/IEC 27001 information security management", href: "https://www.iso.org/standard/27001" },
  { short: "ISO/IEC 42001", area: "AI management", name: "ISO/IEC 42001 AI management systems", href: "https://www.iso.org/standard/42001" },
  { short: "NIST AI RMF", area: "AI risk", name: "NIST AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
  { short: "Cyber Essentials", area: "NCSC scheme", name: "Cyber Essentials, from the NCSC", href: "https://www.ncsc.gov.uk/cyberessentials/overview" },
  { short: "UK GDPR", area: "Data protection", name: "UK GDPR", href: "https://www.legislation.gov.uk/eur/2016/679/contents" },
  { short: "DPA 2018", area: "Data Protection Act", name: "Data Protection Act 2018", href: "https://www.legislation.gov.uk/ukpga/2018/12/contents" },
  { short: "EU AI Act", area: "Regulation 2024/1689", name: "EU Artificial Intelligence Act", href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
  { short: "OWASP LLM Top 10", area: "AI app security", name: "OWASP Top 10 for LLM Applications", href: "https://genai.owasp.org/llm-top-10/" },
];
