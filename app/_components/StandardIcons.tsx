/**
 * Stylised accreditation marks. Custom-drawn SVGs that imply category
 * (security, AI governance, privacy) without impersonating official badges.
 * Each one renders inside a fixed 28x28 viewport so they line up cleanly.
 */

interface IconProps {
  className?: string;
}

export function IsoSecurityIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M14 3l9 3v7c0 5.4-3.8 10-9 12-5.2-2-9-6.6-9-12V6l9-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10 14l3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="14"
        y="24"
        textAnchor="middle"
        fontSize="3.2"
        fill="currentColor"
        fontFamily="sans-serif"
        fontWeight="600"
        letterSpacing="0.5"
      >
        27001
      </text>
    </svg>
  );
}

export function IsoAiIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M14 3l9 3v7c0 5.4-3.8 10-9 12-5.2-2-9-6.6-9-12V6l9-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="11" r="1.5" fill="currentColor" />
      <circle cx="18" cy="11" r="1.5" fill="currentColor" />
      <circle cx="14" cy="16" r="1.5" fill="currentColor" />
      <path
        d="M10 11l4 5M18 11l-4 5M10 11l8 0"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <text
        x="14"
        y="24"
        textAnchor="middle"
        fontSize="3.2"
        fill="currentColor"
        fontFamily="sans-serif"
        fontWeight="600"
        letterSpacing="0.5"
      >
        42001
      </text>
    </svg>
  );
}

export function NistIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Diamond / risk symbol */}
      <path
        d="M14 3l11 11-11 11L3 14 14 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Inner risk balance */}
      <path
        d="M9 14h10M14 9v10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

export function CyberEssentialsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Hexagon shield */}
      <path
        d="M14 2.5l9.5 5.5v11L14 24.5 4.5 19V8L14 2.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Padlock */}
      <rect
        x="10.5"
        y="13"
        width="7"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M12 13v-1.5a2 2 0 014 0V13"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="14" cy="16" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function OwaspIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Spider-like silhouette */}
      <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M14 10V4M14 18v6M10 14H4M18 14h6M10.5 10.5L6 6M17.5 10.5L22 6M10.5 17.5L6 22M17.5 17.5L22 22"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="12.6" cy="13" r="0.6" fill="currentColor" />
      <circle cx="15.4" cy="13" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function GdprIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* Outer shield */}
      <path
        d="M14 3l9 3v7c0 5.4-3.8 10-9 12-5.2-2-9-6.6-9-12V6l9-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* EU-style stars circle */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const cx = 14 + Math.cos(angle) * 4.2;
        const cy = 13 + Math.sin(angle) * 4.2;
        return <circle key={i} cx={cx} cy={cy} r="0.6" fill="currentColor" />;
      })}
      <text
        x="14"
        y="14.6"
        textAnchor="middle"
        fontSize="3.6"
        fill="currentColor"
        fontFamily="sans-serif"
        fontWeight="700"
      >
        UK
      </text>
    </svg>
  );
}
