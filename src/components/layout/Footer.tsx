import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Decision infrastructure, agentic systems, and the engineering to make
            both production-grade. Pune → San Francisco → everywhere.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href={siteConfig.links.github}
            className="font-mono text-xs text-muted transition hover:text-accent-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            className="font-mono text-xs text-muted transition hover:text-accent-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${siteConfig.email}`}
            className="font-mono text-xs text-muted transition hover:text-accent-cta"
          >
            {siteConfig.email}
          </Link>
        </div>
      </div>
    </footer>
  );
}
