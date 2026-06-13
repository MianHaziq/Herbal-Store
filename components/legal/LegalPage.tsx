import { IconArrowRight } from "@/components/icons";
import Link from "next/link";

export interface LegalSection {
  heading: string;
  /** Paragraphs of body text. */
  paragraphs?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

interface LegalPageProps {
  title: string;
  /** Human-readable date, e.g. "June 12, 2026". */
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}

/**
 * Reusable layout for legal/policy pages (Privacy, Terms, etc.).
 * Pages stay thin shells: they pass in their content and this renders it
 * with consistent typography. Add a new policy page by reusing this component.
 */
export default function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <header className="border-b border-line pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: {lastUpdated}</p>
        {intro ? <p className="mt-4 text-body">{intro}</p> : null}
      </header>

      <div className="mt-8 space-y-10">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="mt-3 leading-relaxed text-body">
                {p}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-3 space-y-2">
                {section.bullets.map((b, k) => (
                  <li key={k} className="flex gap-2.5 text-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <footer className="mt-12 border-t border-line pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark"
        >
          Back to store
          <IconArrowRight size={16} />
        </Link>
      </footer>
    </article>
  );
}
