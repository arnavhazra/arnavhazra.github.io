import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const orgs = [
  { name: "Neural Next", href: "https://neuralnext.co", abbr: "NN" },
  { name: "Data Pixel", href: "https://datapixel.co", abbr: "DP" },
  { name: "Minerva", href: "https://minerva.edu", abbr: "MU" },
  { name: "GitHub", href: "https://github.com/arnavhazra", abbr: "GH" },
  { name: "SoftBank", abbr: "SB", note: "DNA" },
  { name: "BNY Mellon", abbr: "BNY", note: "DNA" },
];

export function CredibilityStrip() {
  return (
    <section aria-label="Credibility" className="border-y border-border/60 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Building & shipping with
        </p>
        <ul className="flex flex-wrap gap-3 md:gap-4">
          {orgs.map((org) => (
            <li key={org.name}>
              {"href" in org && org.href ? (
                <Link
                  href={org.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-foreground/85 transition hover:border-accent-cta/40 hover:text-accent-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-elevated text-[10px] font-semibold text-accent-cta">
                    {org.abbr}
                  </span>
                  {org.name}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3 py-1.5 font-mono text-xs text-muted">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-elevated text-[10px] font-semibold">
                    {org.abbr}
                  </span>
                  {org.name}
                  {"note" in org && org.note ? (
                    <span className="text-[10px] uppercase tracking-wider text-muted">
                      {org.note}
                    </span>
                  ) : null}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
