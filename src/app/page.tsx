import Link from "next/link";

import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { DecisionMatrixDemo } from "@/components/home/DecisionMatrixDemo";
import { KineticHeadline } from "@/components/home/KineticHeadline";
import { ProofStrip } from "@/components/home/ProofStrip";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getCollectionMeta } from "@/lib/content";

export default function HomePage() {
  const featuredWork = getCollectionMeta("work")
    .filter((item) => item.featured)
    .slice(0, 4);

  return (
    <>
      <section className="hero-gradient">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-20 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-16 md:pb-24 md:pt-28">
          <div>
            <KineticHeadline />
            <Link
              href="/work"
              className="mt-10 inline-block font-mono text-xs uppercase tracking-[0.18em] text-accent-cta transition hover:text-foreground"
            >
              See what shipped →
            </Link>
          </div>
          <DecisionMatrixDemo />
        </div>
      </section>

      <CredibilityStrip />

      <ProofStrip />

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="mb-4 flex items-end justify-between gap-4">
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
            className="hidden font-mono text-xs uppercase tracking-[0.16em] text-muted transition hover:text-accent-cta md:inline"
          >
            Full archive →
          </Link>
        </div>
        <WorkGrid items={featuredWork} featuredFirst variant="editorial" />
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Why Neural Next exists
          </p>
          <blockquote className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1.05] tracking-tight">
            LLMs write text.
            <br />
            <span className="text-accent-cta">We build decisions.</span>
          </blockquote>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            A car buyer weighs twenty-three times more variables than someone
            picking up groceries. ThisVersus turns existing catalogs into
            constraint-aware decision engines — integrated in under two weeks,
            without migrating your schema.
          </p>
          <Link
            href="/work/neural-next-thisversus"
            className="mt-10 inline-block font-mono text-xs uppercase tracking-[0.18em] text-accent-cta transition hover:text-foreground"
          >
            How we built the decision layer →
          </Link>
        </div>
      </section>
    </>
  );
}
