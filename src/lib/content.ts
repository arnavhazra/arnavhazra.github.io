import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

import { contentMetaSchema } from "./content-schema";
import type { ContentMeta } from "./site";

const contentRoot = path.join(process.cwd(), "content");

function readMdxDirectory(dir: string) {
  const fullPath = path.join(contentRoot, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getSlugs(collection: "work" | "writing"): string[] {
  return readMdxDirectory(collection);
}

export function getCollectionMeta(collection: "work" | "writing") {
  return getSlugs(collection)
    .map((slug) => {
      const raw = fs.readFileSync(
        path.join(contentRoot, collection, `${slug}.mdx`),
        "utf8",
      );
      const { data } = matter(raw);
      const parsed = contentMetaSchema.parse(data);
      return { slug, ...parsed };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export async function getCompiledMdx(collection: "work" | "writing", slug: string) {
  const raw = fs.readFileSync(
    path.join(contentRoot, collection, `${slug}.mdx`),
    "utf8",
  );

  const { content, frontmatter } = await compileMDX<ContentMeta>({
    source: raw,
    options: { parseFrontmatter: true },
  });

  contentMetaSchema.parse(frontmatter);

  return { content, meta: frontmatter };
}

export function getAllContentPaths(collection: "work" | "writing") {
  return getSlugs(collection).map((slug) => ({ slug }));
}

export function validateAllContent() {
  const collections = ["work", "writing"] as const;
  const slugs: string[] = [];

  for (const collection of collections) {
    for (const slug of getSlugs(collection)) {
      if (slugs.includes(slug)) {
        throw new Error(`Duplicate slug: ${slug}`);
      }
      slugs.push(slug);

      const raw = fs.readFileSync(
        path.join(contentRoot, collection, `${slug}.mdx`),
        "utf8",
      );
      const { data } = matter(raw);
      contentMetaSchema.parse(data);
    }
  }

  return { count: slugs.length, slugs };
}
