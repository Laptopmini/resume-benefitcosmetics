import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/ralph-node-resume/");
});

test.describe("homepage with section stubs", () => {
  test("main element has data-testid home", async ({ page }) => {
    const main = page.locator("[data-testid='home']");
    await expect(main).toBeVisible();
    const tagName = await main.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe("main");
  });

  test("all five section stubs are present", async ({ page }) => {
    const hero = page.locator("[data-testid='section-hero']");
    const profile = page.locator("[data-testid='section-profile']");
    const skills = page.locator("[data-testid='section-skills']");
    const experience = page.locator("[data-testid='section-experience']");
    const education = page.locator("[data-testid='section-education']");

    await expect(hero).toBeAttached();
    await expect(profile).toBeAttached();
    await expect(skills).toBeAttached();
    await expect(experience).toBeAttached();
    await expect(education).toBeAttached();
  });

  test("sections are rendered as siblings inside main", async ({ page }) => {
    const main = page.locator("[data-testid='home']");
    const sections = main.locator(":scope > section");
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("each section stub has correct id for anchor navigation", async ({ page }) => {
    const expectedIds = ["hero", "profile", "skills", "experience", "education"];
    for (const id of expectedIds) {
      const section = page.locator(`[data-testid='section-${id}']`);
      const sectionId = await section.getAttribute("id");
      expect(sectionId).toBe(id);
    }
  });

  test("sections appear in correct order", async ({ page }) => {
    const main = page.locator("[data-testid='home']");
    const sections = main.locator(":scope > section");
    const testIds: string[] = [];
    const count = await sections.count();
    for (let i = 0; i < count; i++) {
      const testId = await sections.nth(i).getAttribute("data-testid");
      if (testId) testIds.push(testId);
    }
    expect(testIds).toEqual([
      "section-hero",
      "section-profile",
      "section-skills",
      "section-experience",
      "section-education",
    ]);
  });
});
