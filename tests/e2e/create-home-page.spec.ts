import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("main element with data-testid home exists", async ({ page }) => {
    const main = page.locator('[data-testid="home"]');
    await expect(main).toBeVisible();
    const tagName = await main.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe("main");
  });

  test("all five section stubs are rendered", async ({ page }) => {
    const expectedSections = [
      "section-hero",
      "section-profile",
      "section-skills",
      "section-experience",
      "section-education",
    ];
    for (const testId of expectedSections) {
      const section = page.locator(`[data-testid="${testId}"]`);
      await expect(section).toBeVisible();
    }
  });

  test("sections are siblings inside main", async ({ page }) => {
    const sectionCount = await page.locator('[data-testid="home"] > section').count();
    expect(sectionCount).toBeGreaterThanOrEqual(5);
  });
});
