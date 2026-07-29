import type { Metadata } from "next";
import Image from "next/image";

import { Timeline } from "@/components/about/Timeline";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.geoDescription,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        About
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
        I build systems that turn ambiguous choices into verifiable outcomes.
      </h1>

      <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-start">
        <Image
          src="/images/me.jpg"
          alt="Arnav Hazra, AI startup CTO and applied AI engineer"
          width={160}
          height={160}
          className="h-40 w-40 shrink-0 rounded-2xl border border-border object-cover"
          priority
        />
        <div className="prose-site max-w-2xl">
          <p>
            I am Arnav Hazra — two-time startup CTO and applied AI engineer.
            At Neural Next I co-founded ThisVersus, decision infrastructure for
            purchases where getting it wrong is expensive. At Data Pixel I build
            enterprise data literacy for teams that need to ship AI, not slide
            decks about it.
          </p>
          <p>
            Before founding, I shipped where the constraints were real: CNN
            inference on iOS in Tokyo, LangGraph loops with pytest sandboxes,
            hybrid GraphRAG at 3.4ms two-hop latency, bare-metal BitNet at
            0.88ms on Jetson. The through-line is not a technology stack — it
            is a refusal to ship demos that cannot be measured.
          </p>
          <p>
            Originally from Pune. Studied at Minerva University across San
            Francisco, Hyderabad, London, and Berlin. Engineering experience from
            SoftBank, BNY Mellon, and IIM Bangalore shapes how I think about
            enterprise-grade delivery.
          </p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl tracking-tight">Timeline</h2>
        <div className="mt-10">
          <Timeline />
        </div>
      </section>
    </div>
  );
}
