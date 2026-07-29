import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { DecisionMatrixDemo } from "@/components/home/DecisionMatrixDemo";
import { HeroChapter } from "@/components/home/HeroChapter";
import { ProofStrip } from "@/components/home/ProofStrip";
import { WorkFilmStrip } from "@/components/home/WorkFilmStrip";
import { DecisionBeam } from "@/components/craft/DecisionBeam";
import { Magnetic } from "@/components/craft/Magnetic";
import { getCollectionMeta } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  const featuredWork = getCollectionMeta("work")
    .filter((item) => item.featured)
    .slice(0, 4);

  return (
    <>
      <DecisionBeam />
      <HeroChapter />
      <DecisionMatrixDemo />
      <CredibilityStrip />
      <ProofStrip />
      <WorkFilmStrip items={featuredWork} />

      <section id="manifesto" className="border-t border-border/60">
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
          <div className="mt-10">
            <Magnetic>
              <Link
                href="/work/neural-next-thisversus"
                data-cursor="grow"
                className="inline-block font-mono text-xs uppercase tracking-[0.18em] text-accent-cta transition hover:text-foreground"
              >
                How we built the decision layer →
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
