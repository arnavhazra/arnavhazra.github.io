import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/work", "/writing", "/resume", "/contact"];

test.describe("accessibility", () => {
  for (const route of routes) {
    test(`no critical axe violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const critical = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious",
      );

      expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
    });
  }
});
