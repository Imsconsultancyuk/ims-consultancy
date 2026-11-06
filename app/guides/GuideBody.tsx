import Link from "next/link";
import type { ReactNode } from "react";

import type { Block } from "@/lib/guides/guides";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const LINK_CLASS =
  "underline decoration-accent-500 decoration-2 underline-offset-4 transition-colors hover:text-accent-700";

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const index = m.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    const label = m[1];
    const href = m[2];
    if (href.startsWith("/")) {
      out.push(
        <Link key={key++} href={href} data-cursor="link" className={LINK_CLASS}>
          {label}
        </Link>,
      );
    } else {
      out.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>,
      );
    }
    last = index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function GuideBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.t === "h2") {
          return (
            <h2
              key={i}
              className="pt-6 font-display text-[clamp(1.375rem,2.4vw,1.75rem)] font-semibold leading-[1.2] tracking-[-0.01em]"
            >
              {b.text}
            </h2>
          );
        }
        if (b.t === "p") {
          return (
            <p key={i} className="text-[1.0625rem] leading-[1.75] text-ink/85">
              {inline(b.text)}
            </p>
          );
        }
        if (b.t === "ul") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink/85">
              {b.items.map((it, j) => (
                <li key={j}>{inline(it)}</li>
              ))}
            </ul>
          );
        }
        if (b.t === "ol") {
          return (
            <ol key={i} className="list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink/85">
              {b.items.map((it, j) => (
                <li key={j}>{inline(it)}</li>
              ))}
            </ol>
          );
        }
        if (b.t === "table") {
          return (
            <div key={i} className="overflow-x-auto border border-ink/15">
              <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem] leading-[1.55] text-ink/85">
                <caption className="border-b border-ink/15 px-4 py-3 text-left font-display text-[1rem] font-semibold text-ink">
                  {b.caption}
                </caption>
                <thead>
                  <tr className="border-b border-ink/15">
                    {b.head.map((c, j) => (
                      <th key={j} scope="col" className="px-4 py-2 font-semibold text-ink">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, r) => (
                    <tr key={r} className="border-b border-ink/10 align-top last:border-b-0">
                      {row.map((c, j) =>
                        j === 0 ? (
                          <th key={j} scope="row" className="px-4 py-2 font-medium text-ink">
                            {inline(c)}
                          </th>
                        ) : (
                          <td key={j} className="px-4 py-2">
                            {inline(c)}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (b.t === "faq") {
          return (
            <dl key={i} className="space-y-5">
              {b.items.map((it, j) => (
                <div key={j} className="border-t border-ink/15 pt-4">
                  <dt className="font-display text-[1.125rem] font-semibold leading-[1.3] text-ink">{it.q}</dt>
                  <dd className="mt-2 text-[1.0625rem] leading-[1.7] text-ink/85">{inline(it.a)}</dd>
                </div>
              ))}
            </dl>
          );
        }
        return (
          <p key={i} className="border-y border-ink/15 py-3 text-[0.9375rem] leading-[1.6] text-ink/75">
            <span className="font-medium text-ink">Author: {b.name}</span>, {b.role}. Sources last checked {b.reviewed}.
          </p>
        );
      })}
    </div>
  );
}
