import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/ralph-node-resume/");
});

test.describe("navigation component", () => {
  test("nav is visible with correct testid", async ({ page }) => {
    const nav = page.locator("[data-testid='nav']");
    await expect(nav).toBeVisible();
  });

  test("nav is sticky positioned", async ({ page }) => {
    const nav = page.locator("[data-testid='nav']");
    const position = await nav.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe("sticky");
  });

  test("nav has backdrop blur styling", async ({ page }) => {
    const nav = page.locator("[data-testid='nav']");
    const backdrop = await nav.evaluate((el) => getComputedStyle(el).backdropFilter);
    expect(backdrop).toContain("blur");
  });

  test("brand name is visible", async ({ page }) => {
    const brand = page.locator("[data-testid='nav-brand']");
    await expect(brand).toBeVisible();
    await expect(brand).toHaveText("Paul-Valentin Mini");
  });

  test("navigation links are present on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const profileLink = page.locator("[data-testid='nav-link-profile']");
    const skillsLink = page.locator("[data-testid='nav-link-skills']");
    const experienceLink = page.locator("[data-testid='nav-link-experience']");
    const educationLink = page.locator("[data-testid='nav-link-education']");

    await expect(profileLink).toBeVisible();
    await expect(skillsLink).toBeVisible();
    await expect(experienceLink).toBeVisible();
    await expect(educationLink).toBeVisible();
  });

  test("links point to correct anchors", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const profileHref = await page.locator("[data-testid='nav-link-profile']").getAttribute("href");
    const skillsHref = await page.locator("[data-testid='nav-link-skills']").getAttribute("href");
    const experienceHref = await page
      .locator("[data-testid='nav-link-experience']")
      .getAttribute("href");
    const educationHref = await page
      .locator("[data-testid='nav-link-education']")
      .getAttribute("href");

    expect(profileHref).toBe("#profile");
    expect(skillsHref).toBe("#skills");
    expect(experienceHref).toBe("#experience");
    expect(educationHref).toBe("#education");
  });

  test("hamburger toggle is visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const toggle = page.locator("[data-testid='nav-toggle']");
    await expect(toggle).toBeVisible();
  });

  test("mobile menu toggles on hamburger click", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const toggle = page.locator("[data-testid='nav-toggle']");
    const menu = page.locator("[data-testid='nav-menu']");

    await toggle.click();
    await expect(menu).toBeVisible();

    await toggle.click();
    await expect(menu).not.toBeVisible();
  });

  test("nav links are hidden on mobile before toggle", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const profileLink = page.locator("[data-testid='nav-link-profile']");
    await expect(profileLink).not.toBeVisible();
  });
});
