"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import type { ContentMeta } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

type WorkCardProps = ContentMeta & {
  slug: string;
  featuredLayout?: boolean;
  variant?: "bento" | "editorial";
};

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
  variant = "bento",
}: WorkCardProps) {
  const prefersReduced = useReducedMotion();
  const isFeatured = featuredLayout || span === "2";

  if (variant === "editorial") {
    return (
      <motion.article
        initial={prefersReduced ? false : { opacity: 0, y: 18 }}
        whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="group border-t border-border/60"
      >
        <Link
          href={`/work/${slug}`}
          className="grid gap-4 py-8 transition md:grid-cols-[1fr_auto] md:items-end md:gap-10 md:py-10"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {formatDate(date)}
              {role ? <span className="ml-3 text-accent-cta">· {role}</span> : null}
            </p>
            <h2
              className={cn(
                "mt-3 font-display tracking-tight transition group-hover:text-accent",
                isFeatured
                  ? "text-3xl md:text-5xl"
                  : "text-2xl md:text-4xl",
              )}
            >
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-end">
            {metric ? (
              <p className="font-mono text-xs text-accent-cta md:text-right">
                {metric}
              </p>
            ) : null}
            <ArrowUpRight
              size={18}
              className="text-muted transition group-hover:text-accent-cta"
            />
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={prefersReduced ? undefined : { y: -3 }}
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
  variant = "bento",
}: {
  items: (ContentMeta & { slug: string })[];
  featuredFirst?: boolean;
  variant?: "bento" | "editorial";
}) {
  const sorted = featuredFirst
    ? [...items].sort((a, b) => {
        if (a.span === "2" && b.span !== "2") return -1;
        if (b.span === "2" && a.span !== "2") return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    : items;

  if (variant === "editorial") {
    return (
      <div className="border-b border-border/60">
        {sorted.map((item, index) => (
          <WorkCard
            key={item.slug}
            {...item}
            variant="editorial"
            featuredLayout={featuredFirst && index === 0}
          />
        ))}
      </div>
    );
  }

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
