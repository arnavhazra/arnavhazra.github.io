import type { Metadata } from "next";

import { WorkGrid } from "@/components/work/WorkGrid";
import { getCollectionMeta } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Case studies and technical projects by ${siteConfig.name}.`,
};

export default function WorkPage() {
  const items = getCollectionMeta("work");

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        Work
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
        Systems I&apos;ve designed, built, and shipped
      </h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
        Deep case studies from open-source repositories and founder work.
        Each one follows the same arc: a real constraint, a technical bet, and
        measurable proof.
      </p>

      <div className="mt-14">
        <WorkGrid items={items} />
      </div>
    </div>
  );
}
