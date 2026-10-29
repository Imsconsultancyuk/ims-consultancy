import Link from "next/link";
import type { RelatedItem } from "@/lib/seo/links";

export function RelatedReading({ items }: { items: RelatedItem[] }): React.JSX.Element | null {
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-x-8 gap-y-3 text-[0.9375rem] sm:grid-cols-2" role="list">
      {items.map((item) => (
        <li key={item.href}>
          <span className="opacity-70">{item.kind}: </span>
          <Link href={item.href} className="ims-link">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
