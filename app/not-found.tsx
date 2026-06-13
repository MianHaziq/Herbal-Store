import type { Metadata } from "next";
import Link from "next/link";

import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center">
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <p className="text-6xl font-extrabold text-brand">404</p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-3 text-body">
          The page you were looking for moved or never existed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Back to store
          <IconArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
