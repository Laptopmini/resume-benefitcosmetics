import { expect, test } from "@playwright/test";

test.describe("globals.css", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("html has smooth scroll behavior", async ({ page }) => {
    const scrollBehavior = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("scroll-behavior"),
    );
    expect(scrollBehavior).toBe("smooth");
  });

  test("body uses the sans-serif font family", async ({ page }) => {
    const fontFamily = await page.evaluate(() =>
      getComputedStyle(document.body).getPropertyValue("font-family"),
    );
    expect(fontFamily.toLowerCase()).toContain("inter");
  });
});
