import { homeTimeline } from "@/lib/site";

export function ProofStrip() {
  return (
    <section aria-label="Recent proof" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Recent proof
      </p>
      <ol className="mt-10 space-y-0">
        {homeTimeline.map((entry, index) => (
          <li
            key={entry.label}
            className="group grid gap-3 border-t border-border/60 py-8 md:grid-cols-[9rem_1fr] md:gap-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {entry.year}
            </p>
            <div>
              <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                <span className="mr-3 font-mono text-sm text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {entry.label}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {entry.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
