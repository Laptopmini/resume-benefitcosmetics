import { expect, test } from "@playwright/test";

test.describe("section component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("sections render with correct data-testid and id", async ({ page }) => {
    const sections = [
      { testId: "section-hero", id: "hero" },
      { testId: "section-profile", id: "profile" },
      { testId: "section-skills", id: "skills" },
      { testId: "section-experience", id: "experience" },
      { testId: "section-education", id: "education" },
    ];
    for (const section of sections) {
      const el = page.locator(`[data-testid="${section.testId}"]`);
      await expect(el).toBeVisible();
      const id = await el.getAttribute("id");
      expect(id).toBe(section.id);
    }
  });

  test("section with title renders h2 with title testid", async ({ page }) => {
    // At least one section should have a title h2
    const titledSection = page.locator('[data-testid$="-title"]').first();
    await expect(titledSection).toBeVisible();
    const tagName = await titledSection.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe("h2");
  });
});
