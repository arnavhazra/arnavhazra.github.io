import type { Metadata } from "next";

import { WorkGrid } from "@/components/work/WorkGrid";
import { getCollectionMeta } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Systems built and shipped by ${siteConfig.name} — decision infrastructure, agents, retrieval, and edge inference.`,
};

export default function WorkPage() {
  const items = getCollectionMeta("work");

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        Work
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl tracking-tight md:text-5xl">
        Systems with numbers attached
      </h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
        Five case studies from founder work and open source. Each one names a
        real constraint, the technical bet, and the measurement that made it
        real.
      </p>

      <div className="mt-14">
        <WorkGrid items={items} featuredFirst />
      </div>
    </div>
  );
}
