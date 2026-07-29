import { expect, test } from "@playwright/test";

test.describe("visual regression", () => {
  test("home desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-desktop.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test("home mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-mobile.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test("work desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/work");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("work-desktop.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});
