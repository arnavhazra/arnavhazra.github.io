import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { credibilityOrgs } from "@/lib/timeline";

export function CredibilityStrip() {
  return (
    <section aria-label="Credibility" className="border-y border-border/60 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Currently building at
        </p>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {credibilityOrgs.map((org) => (
            <li key={org.name}>
              {"href" in org && org.href ? (
                <Link
                  href={org.href}
                  className="group inline-flex items-center gap-1 font-mono text-sm text-foreground/80 transition hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {org.name}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              ) : (
                <span className="font-mono text-sm text-muted">
                  {org.name}
                  {"note" in org && org.note ? (
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-muted/70">
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
