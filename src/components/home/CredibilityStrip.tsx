import Link from "next/link";

const orgs = [
  { name: "Neural Next", href: "https://neuralnext.co" },
  { name: "Data Pixel", href: "https://datapixel.co" },
  { name: "Minerva", href: "https://minerva.edu" },
  { name: "GitHub", href: "https://github.com/arnavhazra" },
  { name: "SoftBank" },
  { name: "BNY Mellon" },
];

export function CredibilityStrip() {
  return (
    <section
      aria-label="Credibility"
      className="border-y border-border/50 py-5"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 gap-y-2 px-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span className="mr-3 text-muted">With</span>
        {orgs.map((org, index) => (
          <span key={org.name} className="inline-flex items-center">
            {"href" in org && org.href ? (
              <Link
                href={org.href}
                className="transition hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {org.name}
              </Link>
            ) : (
              <span>{org.name}</span>
            )}
            {index < orgs.length - 1 ? (
              <span className="mx-2.5 text-border" aria-hidden>
                ·
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </section>
  );
}
