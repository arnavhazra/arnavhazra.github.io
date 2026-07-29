"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";

import type { ContentMeta } from "@/lib/site";

type Item = ContentMeta & { slug: string };

export function WorkFilmStrip({ items }: { items: Item[] }) {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-label="Selected systems" className="pb-20 md:pb-28">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Selected systems
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
            Built, measured, documented
          </h2>
        </div>
        <Link
          href="/work"
          data-cursor="grow"
          className="hidden font-mono text-xs uppercase tracking-[0.16em] text-muted transition hover:text-accent-cta md:inline"
        >
          Full archive →
        </Link>
      </div>

      <div
        className={`mt-10 flex gap-0 overflow-x-auto px-6 pb-4 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] ${
          prefersReduced ? "" : "snap-x snap-mandatory"
        }`}
        style={{ scrollbarWidth: "thin" }}
      >
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            data-cursor="grow"
            className="group relative flex w-[min(85vw,28rem)] shrink-0 snap-center flex-col justify-between border border-border/60 bg-background/40 p-8 transition hover:border-accent-cta/40 md:w-[min(70vw,34rem)] md:p-10"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {item.role ?? "system"}
              </p>
              {item.metric ? (
                <p className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-accent-cta">
                  {item.metric.split("·")[0]?.trim() ?? item.metric}
                </p>
              ) : null}
              <p className="mt-2 font-mono text-xs text-muted">
                {item.metric?.includes("·")
                  ? item.metric.split("·").slice(1).join("·").trim()
                  : ""}
              </p>
            </div>
            <div className="mt-16">
              <h3 className="font-display text-2xl tracking-tight transition group-hover:text-accent md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
