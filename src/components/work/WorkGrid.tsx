"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import type { ContentMeta } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

type WorkCardProps = ContentMeta & { slug: string };

export function WorkCard({
  slug,
  title,
  description,
  date,
  tags,
  span = "1",
}: WorkCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/40",
        span === "2" && "md:col-span-2",
      )}
    >
      <Link href={`/work/${slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read case study: {title}</span>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {formatDate(date)}
        </p>
        <ArrowUpRight
          size={16}
          className="text-muted transition group-hover:text-accent"
        />
      </div>

      <h2 className="mt-4 font-display text-2xl tracking-tight md:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>

      {tags && tags.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </motion.article>
  );
}

export function WorkGrid({ items }: { items: (ContentMeta & { slug: string })[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <WorkCard key={item.slug} {...item} />
      ))}
    </div>
  );
}
