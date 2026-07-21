import type { Tool } from "@/lib/industries/types";

import { ToolCard } from "./ToolCard";

interface ToolGridProps {
  industry: string;
  tools: [Tool, Tool, Tool];
}

export function ToolGrid({ industry, tools }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} industry={industry} tool={tool} />
      ))}
    </div>
  );
}
