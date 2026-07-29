import type { Metadata } from "next";

import { PostRow } from "@/components/writing/PostRow";
import { getCollectionMeta } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description: `Essays on agentic AI, retrieval, and decision infrastructure by ${siteConfig.name}.`,
};

export default function WritingPage() {
  const posts = getCollectionMeta("writing");

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        Writing
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
        Thinking in public
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Essays on context engineering, agentic systems, and the product frontier
        beyond content generation. Written for engineers and founders who read
        the footnotes.
      </p>

      <div className="mt-14">
        {posts.map((post) => (
          <PostRow key={post.slug} {...post} basePath="writing" />
        ))}
      </div>
    </div>
  );
}
