import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { DecisionMatrixDemo } from "@/components/home/DecisionMatrixDemo";
import { KineticHeadline } from "@/components/home/KineticHeadline";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getCollectionMeta } from "@/lib/content";
import { homeTimeline } from "@/lib/site";

export default function HomePage() {
  const featuredWork = getCollectionMeta("work")
    .filter((item) => item.featured)
    .slice(0, 5);

  return (
    <>
      <section className="hero-gradient">
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-32 md:pt-32">
          <KineticHeadline />

          <div className="relative mt-12 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-accent-cta/50 bg-accent-cta/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-accent-cta transition hover:bg-accent-cta/20"
            >
              See what shipped
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition hover:border-foreground/30 hover:text-foreground"
            >
              Read the essays
            </Link>
          </div>
        </div>
      </section>

      <CredibilityStrip />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Recent proof
        </p>
        <ol className="mt-6 space-y-4 border-l border-border pl-6">
          {homeTimeline.map((entry) => (
            <li key={entry.label} className="relative">
              <span
                className="absolute -left-[calc(0.5rem+1px)] top-1.5 h-2 w-2 rounded-full border border-accent-cta bg-background"
                aria-hidden
              />
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent-cta">
                {entry.year}
              </p>
              <p className="mt-1 font-medium">{entry.label}</p>
              <p className="mt-1 text-sm text-muted">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Selected systems
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
              Built, measured, documented
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden font-mono text-xs uppercase tracking-widest text-muted transition hover:text-accent-cta md:inline"
          >
            Full archive →
          </Link>
        </div>
        <WorkGrid items={featuredWork} featuredFirst />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <DecisionMatrixDemo />
      </section>

      <section className="border-t border-border/60 bg-surface/50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Why Neural Next exists
          </p>
          <blockquote className="mt-4 max-w-3xl font-display text-3xl leading-snug tracking-tight md:text-4xl">
            LLMs write text.{" "}
            <span className="text-accent-cta">We build decisions.</span>
          </blockquote>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            A car buyer weighs twenty-three times more variables than someone
            picking up groceries. ThisVersus turns existing catalogs into
            constraint-aware decision engines — integrated in under two weeks,
            without migrating your schema.
          </p>
          <Link
            href="/work/neural-next-thisversus"
            className="mt-8 inline-block font-mono text-xs uppercase tracking-widest text-accent-cta transition hover:underline"
          >
            How we built the decision layer →
          </Link>
        </div>
      </section>
    </>
  );
}
