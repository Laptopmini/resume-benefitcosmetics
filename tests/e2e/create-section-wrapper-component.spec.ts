import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/ralph-node-resume/");
});

test.describe("Section wrapper component", () => {
  test("sections render with correct data-testid", async ({ page }) => {
    const section = page.locator("[data-testid='section-profile']");
    await expect(section).toBeAttached();
  });

  test("sections have the section-pad class", async ({ page }) => {
    const section = page.locator("[data-testid='section-profile']");
    await expect(section).toHaveClass(/section-pad/);
  });

  test("sections with titles render h2 with title testid", async ({ page }) => {
    const title = page.locator("[data-testid='section-profile-title']");
    await expect(title).toBeAttached();
    const tagName = await title.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe("h2");
  });

  test("section has correct id attribute for anchor linking", async ({ page }) => {
    const section = page.locator("[data-testid='section-profile']");
    const id = await section.getAttribute("id");
    expect(id).toBe("profile");
  });

  test("section title uses large typography", async ({ page }) => {
    const title = page.locator("[data-testid='section-profile-title']");
    const fontSize = await title.evaluate((el) => {
      return Number.parseFloat(getComputedStyle(el).fontSize);
    });
    expect(fontSize).toBeGreaterThanOrEqual(36);
  });
});
