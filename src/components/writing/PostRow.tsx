import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ContentMeta } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type PostRowProps = ContentMeta & { slug: string; basePath: "work" | "writing" };

export function PostRow({ slug, title, description, date, basePath }: PostRowProps) {
  return (
    <article className="group border-b border-border/60 py-8 first:pt-0 last:border-b-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {formatDate(date)}
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-tight">
            <Link
              href={`/${basePath}/${slug}`}
              className="transition hover:text-accent"
            >
              {title}
            </Link>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        </div>
        <Link
          href={`/${basePath}/${slug}`}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted transition group-hover:text-accent"
          aria-label={`Read ${title}`}
        >
          Read
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}
