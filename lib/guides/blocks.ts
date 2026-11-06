// Block model and builders shared by the guide files. Kept apart from guides.ts so the
// guide data files can import it without an import cycle.

export interface FaqItem {
  q: string;
  a: string;
}

export type Block =
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; caption: string; head: string[]; rows: string[][] }
  | { t: "faq"; items: FaqItem[] }
  | { t: "byline"; name: string; role: string; reviewed: string };

export const h = (text: string): Block => ({ t: "h2", text });
export const p = (text: string): Block => ({ t: "p", text });
export const ul = (...items: string[]): Block => ({ t: "ul", items });
export const ol = (...items: string[]): Block => ({ t: "ol", items });
export const table = (caption: string, head: string[], ...rows: string[][]): Block => ({
  t: "table",
  caption,
  head,
  rows,
});
export const faq = (...items: FaqItem[]): Block => ({ t: "faq", items });
export const qa = (q: string, a: string): FaqItem => ({ q, a });

export const stripLinks = (s: string): string => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
