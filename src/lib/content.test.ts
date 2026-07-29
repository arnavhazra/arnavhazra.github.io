import { describe, expect, it } from "vitest";

import {
  getCollectionMeta,
  getSlugs,
  validateAllContent,
} from "./content";

describe("content collections", () => {
  it("loads all work and writing slugs", () => {
    const work = getSlugs("work");
    const writing = getSlugs("writing");

    expect(work).toHaveLength(5);
    expect(writing).toHaveLength(3);
    expect(work).toContain("neural-next-thisversus");
    expect(writing).toContain("decision-infrastructure");
  });

  it("parses valid frontmatter for every MDX file", () => {
    const { count, slugs } = validateAllContent();
    expect(count).toBe(8);
    expect(new Set(slugs).size).toBe(8);
  });

  it("includes required fields and parseable dates", () => {
    for (const collection of ["work", "writing"] as const) {
      for (const item of getCollectionMeta(collection)) {
        expect(item.title.length).toBeGreaterThan(0);
        expect(item.description.length).toBeGreaterThan(0);
        expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(new Date(item.date).toString()).not.toBe("Invalid Date");
      }
    }
  });

  it("includes proof metrics on work case studies", () => {
    const work = getCollectionMeta("work");
    for (const item of work) {
      expect(item.metric).toBeTruthy();
      expect(item.role).toMatch(/^(founder|builder)$/);
    }
  });
});
