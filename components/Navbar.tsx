"use client"; // needs useState for the mobile menu toggle

import { useState } from "react";
import Link from "next/link";

import { site } from "@/lib/site";
import { IconLeaf, IconTruck } from "@/components/icons";

const LINKS = [
  { label: "Benefits", href: "#benefits" },
  { label: "How to use", href: "#usage" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar — light trust/urgency cue */}
      <div className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-sm">
          <IconTruck size={16} />
          Free delivery & Cash on Delivery available across the country
        </div>
      </div>

      <nav className="border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-brand">
              <IconLeaf size={20} />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-ink">
              {site.brand}
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-body transition-colors hover:text-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#order"
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark sm:inline-block"
            >
              Order Now
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-line bg-paper px-4 py-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-body hover:bg-mint hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#order"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Order Now
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
