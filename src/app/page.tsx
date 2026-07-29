import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { KineticHeadline } from "@/components/home/KineticHeadline";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getCollectionMeta } from "@/lib/content";

export default function HomePage() {
  const featuredWork = getCollectionMeta("work")
    .filter((item) => item.featured)
    .slice(0, 4);

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-32 md:pt-32">
          <KineticHeadline />

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-accent transition hover:bg-accent/20"
            >
              View work
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition hover:border-foreground/30 hover:text-foreground"
            >
              Read writing
            </Link>
          </div>
        </div>
      </section>

      <CredibilityStrip />

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Selected work
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
              Proof, not pitch
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden font-mono text-xs uppercase tracking-widest text-muted transition hover:text-accent md:inline"
          >
            All projects →
          </Link>
        </div>
        <WorkGrid items={featuredWork} />
      </section>

      <section className="border-t border-border/60 bg-surface/50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            The thesis
          </p>
          <blockquote className="mt-4 max-w-3xl font-display text-3xl leading-snug tracking-tight md:text-4xl">
            LLMs write text.{" "}
            <span className="text-accent">We build decisions.</span>
          </blockquote>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            High-consideration purchases have 23× more decision points than
            simple buys. Neural Next&apos;s ThisVersus turns catalogs into
            decision engines — vectorized, explainable, integrated in under two
            weeks with zero schema migration.
          </p>
          <Link
            href="/work/neural-next-thisversus"
            className="mt-8 inline-block font-mono text-xs uppercase tracking-widest text-accent transition hover:underline"
          >
            Read the Neural Next case study →
          </Link>
        </div>
      </section>
    </>
  );
}
