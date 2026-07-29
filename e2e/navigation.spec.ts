import { expect, test } from "@playwright/test";

const staticRoutes = [
  "/",
  "/about",
  "/work",
  "/writing",
  "/resume",
  "/contact",
  "/robots.txt",
  "/sitemap.xml",
];

const workSlugs = [
  "autonomous-swe-langgraph",
  "edge-quantized-bitnet",
  "graph-rag-multi-hop",
  "mcp-enterprise-agent",
  "neural-next-thisversus",
];

const writingSlugs = [
  "compilation-stage-knowledge",
  "context-engineering",
  "decision-infrastructure",
];

test.describe("navigation", () => {
  for (const route of staticRoutes) {
    test(`loads ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
    });
  }

  for (const slug of workSlugs) {
    test(`loads /work/${slug}`, async ({ page }) => {
      const response = await page.goto(`/work/${slug}`);
      expect(response?.ok()).toBeTruthy();
    });
  }

  for (const slug of writingSlugs) {
    test(`loads /writing/${slug}`, async ({ page }) => {
      const response = await page.goto(`/writing/${slug}`);
      expect(response?.ok()).toBeTruthy();
    });
  }

  test("header nav links reach main pages", async ({ page }) => {
    await page.goto("/");
    for (const label of ["About", "Work", "Writing", "Resume", "Contact"]) {
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: label }).click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.goto("/");
    }
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  });

  test("theme toggle switches light and dark", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /Switch to (light|dark) mode/i });
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/light/);
    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/light/);
  });
});
