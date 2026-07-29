import type { Metadata } from "next";
import Image from "next/image";

import { Timeline } from "@/components/about/Timeline";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Founder narrative and timeline for ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        About
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
        Two startups, one through-line: turn research into systems people can
        trust.
      </h1>

      <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-start">
        <Image
          src="/images/me.jpg"
          alt="Arnav Hazra"
          width={160}
          height={160}
          className="h-40 w-40 shrink-0 rounded-2xl border border-border object-cover"
          priority
        />
        <div className="prose-site max-w-2xl">
        <p>
          I&apos;m an applied AI engineer and two-time startup CTO. At Neural
          Next, I co-founded ThisVersus — decision infrastructure for
          high-consideration purchases. At Data Pixel, I build enterprise data
          literacy programs for teams navigating the gap between AI hype and
          operational reality.
        </p>
        <p>
          Before founding, I shipped across the stack: CNN-powered iOS apps in
          Tokyo, LangGraph agent pipelines, hybrid GraphRAG engines, and
          bare-metal CUDA inference for sub-bit quantized models. The common
          thread isn&apos;t a technology — it&apos;s a bias toward verifiable
          systems over demo-grade prototypes.
        </p>
        <p>
          Originally from Pune, India. Studied at Minerva University across San
          Francisco, Hyderabad, London, and Berlin. Engineering DNA from teams
          at SoftBank, BNY Mellon, and IIM Bangalore informs how I think about
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
