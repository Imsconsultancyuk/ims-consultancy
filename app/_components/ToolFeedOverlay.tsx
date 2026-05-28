"use client";

import {
  GmailIcon,
  OutlookIcon,
  GoogleSheetsIcon,
  SlackIcon,
  NotionIcon,
  HubspotIcon,
} from "./BrandIcons";

/**
 * Floating business-tool icons that orbit the cinematic frame and feed
 * signal lines into the centre. Each icon uses the authentic Simple Icons
 * SVG path with the brand's signature colour.
 *
 * Tools represented:
 *   Gmail · Outlook · Google Sheets · Slack · HubSpot · Notion
 */

interface Tool {
  id: string;
  label: string;
  x: number;
  y: number;
  delay: number;
  icon: React.ReactNode;
  /** Authentic brand colour used for the icon fill */
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
    icon: <GmailIcon className="h-full w-full" />,
  },
  {
    id: "sheets",
    label: "Google Sheets",
    x: 18,
    y: 72,
    delay: 0.4,
    tint: "#0f9d58",
    icon: <GoogleSheetsIcon className="h-full w-full" />,
  },
  {
    id: "outlook",
    label: "Outlook",
    x: 88,
    y: 22,
    delay: 0.8,
    tint: "#0078d4",
    icon: <OutlookIcon className="h-full w-full" />,
  },
  {
    id: "slack",
    label: "Slack",
    x: 84,
    y: 74,
    delay: 1.2,
    tint: "#ecb22e",
    icon: <SlackIcon className="h-full w-full" />,
  },
  {
    id: "hubspot",
    label: "HubSpot",
    x: 6,
    y: 50,
    delay: 0.2,
    tint: "#ff7a59",
    icon: <HubspotIcon className="h-full w-full" />,
  },
  {
    id: "notion",
    label: "Notion",
    x: 92,
    y: 50,
    delay: 1.6,
    tint: "#f5eff3",
    icon: <NotionIcon className="h-full w-full" />,
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
