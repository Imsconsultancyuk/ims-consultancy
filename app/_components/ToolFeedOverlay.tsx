"use client";

/**
 * Floating business-tool icons that orbit the cinematic frame and feed
 * signal lines into the centre. Each icon is a stylised inline SVG —
 * recognisable but generic enough to imply category, not brand impersonation.
 *
 * Tools represented:
 *   Gmail · Outlook · Google Sheets · Slack · HubSpot CRM · Notion
 *
 * Each icon sits in a glass-frosted disc. A thin animated dashed line
 * connects it to the implied centre. The lines pulse on a loop so the
 * composition reads as "these tools constantly feed the engagement".
 */

interface Tool {
  id: string;
  label: string;
  /** Position as percentage of overlay box */
  x: number;
  y: number;
  /** Animation delay seconds */
  delay: number;
  icon: React.ReactNode;
  /** Tint colour for the disc accent ring */
  tint: string;
}

const TOOLS: Tool[] = [
  {
    id: "gmail",
    label: "Gmail",
    x: 12,
    y: 28,
    delay: 0.0,
    tint: "#ea4335",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" opacity="0.12" />
        <path
          d="M3 7l9 6 9-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="2.4"
          y="5.4"
          width="19.2"
          height="13.2"
          rx="1.8"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    id: "sheets",
    label: "Google Sheets",
    x: 18,
    y: 70,
    delay: 0.4,
    tint: "#0f9d58",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="4"
          y="3"
          width="16"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M8 9h8M8 13h8M8 17h8M11 6v15"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "outlook",
    label: "Outlook",
    x: 88,
    y: 22,
    delay: 0.8,
    tint: "#0078d4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="9" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M15 9h3M15 12h3M15 15h2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "slack",
    label: "Slack",
    x: 84,
    y: 74,
    delay: 1.2,
    tint: "#ecb22e",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="6" y="3" width="3" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="15" y="11" width="3" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="3" y="15" width="10" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11" y="6" width="10" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "hubspot",
    label: "HubSpot",
    x: 6,
    y: 50,
    delay: 0.2,
    tint: "#ff7a59",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="17" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="6" cy="18" r="3.6" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M17 9.5v4.5M8.6 16l5.5-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "notion",
    label: "Notion",
    x: 92,
    y: 50,
    delay: 1.6,
    tint: "#f5eff3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M8 7v10l8-10v10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function ToolFeedOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[11]"
    >
      {/* Feeder lines — SVG layer covering full box */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="feed-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4b0d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#d4b0d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4b0d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {TOOLS.map((t) => (
          <g key={`line-${t.id}`}>
            <line
              x1={t.x}
              y1={t.y}
              x2={50}
              y2={50}
              stroke="rgba(212, 176, 212, 0.18)"
              strokeWidth="0.18"
              strokeDasharray="0.6 0.8"
              vectorEffect="non-scaling-stroke"
            />
            {/* Travelling packet down each line */}
            <circle r="0.6" fill="#d4b0d4">
              <animateMotion
                dur="4.5s"
                begin={`${t.delay}s`}
                repeatCount="indefinite"
                path={`M ${t.x} ${t.y} L 50 50`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur="4.5s"
                begin={`${t.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
        {/* Central node */}
        <g>
          <circle
            cx="50"
            cy="50"
            r="2.2"
            fill="#d4b0d4"
            opacity="0.85"
          >
            <animate
              attributeName="r"
              values="2.2;3;2.2"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.85;1;0.85"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="50"
            cy="50"
            r="3.5"
            fill="none"
            stroke="#d4b0d4"
            strokeWidth="0.2"
            vectorEffect="non-scaling-stroke"
          >
            <animate attributeName="r" values="3.5;8;3.5" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="3.6s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      {/* Tool icon discs — absolutely positioned on top of the lines */}
      {TOOLS.map((t) => (
        <div
          key={t.id}
          className="ims-tool-disc absolute"
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
            transform: "translate(-50%, -50%)",
            animationDelay: `${t.delay}s`,
          }}
        >
          <div
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-mauve-200/40 bg-deep/70 backdrop-blur-md sm:h-14 sm:w-14"
            style={{
              boxShadow: `0 0 24px -4px ${t.tint}55, inset 0 0 0 1px rgba(245, 239, 243, 0.08)`,
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${t.tint}25 0%, transparent 70%)`,
              }}
            />
            <span
              className="relative h-6 w-6 text-paper-ink/90 sm:h-7 sm:w-7"
              style={{ color: t.tint }}
            >
              {t.icon}
            </span>
          </div>
          {/* Label badge — visible on hover, also good for accessibility */}
          <span className="sr-only">{t.label}</span>
        </div>
      ))}
    </div>
  );
}
