import { timeline } from "@/lib/timeline";

export function Timeline() {
  return (
    <ol className="relative space-y-0 border-l border-border pl-8">
      {timeline.map((entry) => (
        <li key={`${entry.year}-${entry.org}`} className="relative pb-12 last:pb-0">
          <span
            className="absolute -left-[calc(0.5rem+1px)] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-background"
            aria-hidden
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {entry.year}
          </p>
          <h3 className="mt-2 font-display text-xl tracking-tight">
            {entry.href ? (
              <a
                href={entry.href}
                className="transition hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                {entry.title} · {entry.org}
              </a>
            ) : (
              <>
                {entry.title} · {entry.org}
              </>
            )}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {entry.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
