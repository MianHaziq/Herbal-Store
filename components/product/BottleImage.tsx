import { site } from "@/lib/site";

interface BottleImageProps {
  productName: string;
  /** Accent label shown on the bottle, e.g. the selected size. */
  size?: string;
  className?: string;
}

/**
 * Vector illustration of the product (a dropper medicine bottle).
 * Pure SVG — no external image assets, so it always loads instantly and
 * stays crisp at any resolution. The product name is rendered on the label.
 */
export default function BottleImage({ productName, size, className }: BottleImageProps) {
  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      role="img"
      aria-label={`${productName} bottle`}
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#e6fffb" />
          <stop offset="100%" stopColor="#bdeee6" />
        </linearGradient>
        <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="label" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0fdfa" />
        </linearGradient>
      </defs>

      {/* Dropper cap */}
      <rect x="90" y="14" width="40" height="40" rx="8" fill="url(#cap)" />
      <rect x="98" y="6" width="24" height="14" rx="5" fill="#0b5e57" />

      {/* Neck */}
      <rect x="96" y="50" width="28" height="22" fill="#cdeee8" />

      {/* Bottle body */}
      <rect x="52" y="68" width="116" height="210" rx="26" fill="url(#glass)" stroke="#a7e3d8" strokeWidth="2" />
      {/* Glass highlight */}
      <rect x="64" y="84" width="14" height="172" rx="7" fill="#ffffff" opacity="0.55" />

      {/* Label */}
      <rect x="68" y="112" width="84" height="128" rx="14" fill="url(#label)" stroke="#cdeee8" strokeWidth="1.5" />

      {/* Leaf mark on label */}
      <g transform="translate(110 140)" fill="none" stroke="#0d9488" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-9 9A8 8 0 0 1 -16 1c0-5 4-9 11-10 0 0 1 10-2 15Z" />
      </g>

      {/* Brand + product text on label */}
      <text x="110" y="178" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a" fontFamily="var(--font-jakarta), sans-serif" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {site.brand}
      </text>
      <text x="110" y="196" textAnchor="middle" fontSize="8" fill="#475569" fontFamily="var(--font-jakarta), sans-serif">
        Natural Relief
      </text>
      {size ? (
        <text x="110" y="224" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0d9488" fontFamily="var(--font-jakarta), sans-serif">
          {size}
        </text>
      ) : null}
    </svg>
  );
}
