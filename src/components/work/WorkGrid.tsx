"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import type { ContentMeta } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

type WorkCardProps = ContentMeta & { slug: string; featuredLayout?: boolean };

export function WorkCard({
  slug,
  title,
  description,
  date,
  tags,
  metric,
  role,
  span = "1",
  featuredLayout = false,
}: WorkCardProps) {
  const isFeatured = featuredLayout || span === "2";

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 transition",
        "card-glass hover:border-accent/30",
        role === "founder" && "card-founder",
        role === "builder" && "card-systems",
        isFeatured && "bento-featured",
        span === "2" && !featuredLayout && "bento-wide",
      )}
    >
      <Link href={`/work/${slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read case study: {title}</span>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {formatDate(date)}
            {role ? (
              <span className="ml-3 text-accent-cta">· {role}</span>
            ) : null}
          </p>
          {metric ? (
            <p className="mt-2 font-mono text-xs text-accent">{metric}</p>
          ) : null}
        </div>
        <ArrowUpRight
          size={16}
          className="text-muted transition group-hover:text-accent-cta"
        />
      </div>

      <h2
        className={cn(
          "mt-4 font-display tracking-tight",
          isFeatured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
        )}
      >
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

export function WorkGrid({
  items,
  featuredFirst = false,
}: {
  items: (ContentMeta & { slug: string })[];
  featuredFirst?: boolean;
}) {
  const sorted = featuredFirst
    ? [...items].sort((a, b) => {
        if (a.span === "2" && b.span !== "2") return -1;
        if (b.span === "2" && a.span !== "2") return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    : items;

  return (
    <div className="bento-grid">
      {sorted.map((item, index) => (
        <WorkCard
          key={item.slug}
          {...item}
          featuredLayout={featuredFirst && index === 0}
        />
      ))}
    </div>
  );
}
