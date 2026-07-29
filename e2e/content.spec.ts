import { expect, test } from "@playwright/test";

const workTitles = [
  "Self-Correcting Multi-Agent SWE",
  "Edge 1.58-Bit Inference",
  "Graph-Backed Multi-Hop Retrieval",
  "Enterprise MCP Security Surface",
  "ThisVersus — Decision Infrastructure",
];

const writingTitles = [
  "Beyond Retrieve-Then-Generate",
  "Context Engineering as the New Prompt Engineering",
  "Decision Infrastructure vs. Content Generation",
];

test.describe("content", () => {
  test("work index lists all case studies", async ({ page }) => {
    await page.goto("/work");
    for (const title of workTitles) {
      await expect(page.getByRole("link", { name: new RegExp(title, "i") }).first()).toBeVisible();
    }
  });

  test("writing index lists all essays", async ({ page }) => {
    await page.goto("/writing");
    for (const title of writingTitles) {
      await expect(page.getByRole("link", { name: new RegExp(title, "i") }).first()).toBeVisible();
    }
  });

  test("work detail H1 matches frontmatter title", async ({ page }) => {
    await page.goto("/work/neural-next-thisversus");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("ThisVersus");
  });

  test("writing detail H1 matches frontmatter title", async ({ page }) => {
    await page.goto("/writing/decision-infrastructure");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Decision Infrastructure",
    );
  });

  test("home includes interactive proof demo", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("region", { name: /decision matrix/i })).toBeVisible();
  });

  test("sitemap includes canonical routes", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const body = await response!.text();
    expect(body).toContain("https://arnavhazra.github.io");
    expect(body).toContain("/work/neural-next-thisversus");
    expect(body).toContain("/writing/decision-infrastructure");
  });

  test("robots.txt allows indexing", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    const body = await response!.text();
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap:");
  });

  test("home includes Person JSON-LD", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const content = await jsonLd.textContent();
    expect(content).toContain('"@type":"Person"');
    expect(content).toContain("Arnav Hazra");
  });
});
