import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { getAllContentPaths,
  getCompiledMdx,
  getSlugs,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllContentPaths("work");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getSlugs("work");
  if (!slugs.includes(slug)) return {};

  const { meta } = await getCompiledMdx("work", slug);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const slugs = getSlugs("work");
  if (!slugs.includes(slug)) notFound();

  const { content, meta } = await getCompiledMdx("work", slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition hover:text-accent-cta"
      >
        <ArrowLeft size={14} />
        All work
      </Link>

      <header className="mt-10 border-b border-border/60 pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Case study · {formatDate(meta.date)}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-muted">{meta.description}</p>

        <div className="mt-6 flex flex-wrap gap-4">
          {meta.repo ? (
            <a
              href={meta.repo}
              className="inline-flex items-center gap-1 font-mono text-xs text-accent-cta transition hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View repository
              <ExternalLink size={12} />
            </a>
          ) : null}
          {meta.company ? (
            <span className="font-mono text-xs text-muted">{meta.company}</span>
          ) : null}
        </div>

        {meta.tags && meta.tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="prose-site mt-10">{content}</div>
    </article>
  );
}
