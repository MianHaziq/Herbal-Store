/**
 * Lightweight inline SVG icon set.
 * All icons use `currentColor` so color is controlled via Tailwind text-* classes,
 * and are marked aria-hidden (decorative). Import as: import { IconLeaf } from "@/components/icons".
 */
import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function Base({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconLeaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 0 0 1 9-2 13Z" />
    <path d="M6 18c2-3 5-5 9-6" />
  </Base>
);

export const IconShieldCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 6v5c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const IconDroplet = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3s6 5.7 6 10a6 6 0 0 1-12 0c0-4.3 6-10 6-10Z" />
  </Base>
);

export const IconSparkles = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8c.6 2.4 1.6 3.4 4 4-2.4.6-3.4 1.6-4 4-.6-2.4-1.6-3.4-4-4 2.4-.6 3.4-1.6 4-4Z" />
  </Base>
);

export const IconTruck = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
    <circle cx="7" cy="17" r="1.6" />
    <circle cx="17" cy="17" r="1.6" />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12 4.5 4.5L19 7" />
  </Base>
);

export const IconStar = ({ size = 18, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="m12 2 2.9 6 6.6.6-5 4.3 1.5 6.5L12 16l-6 3.4 1.5-6.5-5-4.3 6.6-.6L12 2Z" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L19 12l4 1.5V17a2 2 0 0 1-2 2A16 16 0 0 1 5 6 2 2 0 0 1 5 4Z" />
  </Base>
);

export const IconMapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const IconUser = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </Base>
);

export const IconChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const IconMinus = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
);

export const IconBag = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </Base>
);

export const IconReceipt = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 3h12v18l-3-1.6L12 21l-3-1.6L6 21V3Z" />
    <path d="M9 8h6M9 12h6" />
  </Base>
);

/** WhatsApp glyph (filled). */
export const IconWhatsApp = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm5.84 14.24c-.25.7-1.44 1.32-1.98 1.36-.54.04-1.04.24-3.52-.74-2.98-1.18-4.86-4.22-5-4.42-.14-.2-1.2-1.6-1.2-3.04 0-1.44.76-2.14 1.02-2.44.26-.3.58-.36.78-.36l.56.01c.18 0 .42-.07.66.5.25.6.84 2.06.92 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.32.4-.46.53-.15.15-.3.31-.13.6.18.3.78 1.28 1.66 2.06 1.14 1.02 2.1 1.34 2.4 1.48.3.15.47.13.64-.08.18-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.72.8 2.02.96.3.15.5.22.57.34.07.13.07.72-.18 1.42Z" />
  </svg>
);
