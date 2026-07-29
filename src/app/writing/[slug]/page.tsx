import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  getAllContentPaths,
  getCompiledMdx,
  getSlugs,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllContentPaths("writing");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getSlugs("writing");
  if (!slugs.includes(slug)) return {};

  const { meta } = await getCompiledMdx("writing", slug);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function WritingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const slugs = getSlugs("writing");
  if (!slugs.includes(slug)) notFound();

  const { content, meta } = await getCompiledMdx("writing", slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition hover:text-accent"
      >
        <ArrowLeft size={14} />
        All writing
      </Link>

      <header className="mt-10 border-b border-border/60 pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Essay · {formatDate(meta.date)}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-muted">{meta.description}</p>
      </header>

      <div className="prose-site mt-10">{content}</div>
    </article>
  );
}
