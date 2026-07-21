"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const NODES = ["Your book", "Tokenise", "AI engine", "Findings", "Revenue actions"];

export function FlowInfographic() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-flow-visible={visible ? "" : undefined}
      role="img"
      aria-label={`How it works: ${NODES.join(", ")}`}
      className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0"
    >
      {NODES.map((node, index) => (
        <Fragment key={node}>
          <div className="rounded-lg border border-line bg-paper px-4 py-3 text-center sm:flex-1">
            <span className="font-industry-display text-sm font-medium text-ink">
              {node}
            </span>
          </div>
          {index < NODES.length - 1 ? <FlowConnector /> : null}
        </Fragment>
      ))}
    </div>
  );
}

function FlowConnector() {
  return (
    <div
      aria-hidden="true"
      className="flex h-8 items-center justify-center sm:h-auto sm:w-8 sm:flex-none"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 rotate-90 text-ink-soft sm:rotate-0"
        fill="none"
      >
        <path
          d="M2 12h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          className="ims-flow-dash"
        />
        <path
          d="M14 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
