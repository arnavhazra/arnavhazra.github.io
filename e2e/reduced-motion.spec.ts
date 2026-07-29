import { expect, test } from "@playwright/test";

test.describe("reduced motion", () => {
  test.use({
    reducedMotion: "reduce",
  });

  test("home renders without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("region", { name: /decision matrix/i })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("decision matrix remains usable", async ({ page }) => {
    await page.goto("/");
    const region = page.getByRole("region", { name: /decision matrix/i });
    await expect(region).toBeVisible();

    const firstOption = region.getByRole("button", { name: /Under ₹15L|Standard|City/i }).first();
    await firstOption.click();
    await expect(region.getByText(/\/3/).first()).toBeVisible();
  });
});
