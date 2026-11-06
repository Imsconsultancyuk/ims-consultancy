import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getInsight, isInsightIndexable } from "@/lib/insights/posts";

// Summaries under the word threshold stay readable and linked, but ask search engines
// not to index them. The page's own generateMetadata sets the rest.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post || isInsightIndexable(post)) return {};
  return { robots: { index: false, follow: true } };
}

export default function InsightLayout({ children }: { children: ReactNode }) {
  return children;
}
