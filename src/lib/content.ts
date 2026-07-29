import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

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
      return { slug, ...(data as ContentMeta) };
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

  return { content, meta: frontmatter };
}

export function getAllContentPaths(collection: "work" | "writing") {
  return getSlugs(collection).map((slug) => ({ slug }));
}
