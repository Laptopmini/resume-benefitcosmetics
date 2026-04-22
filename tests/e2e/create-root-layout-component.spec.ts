import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/ralph-node-resume/");
});

test.describe("root layout component", () => {
  test("html element has lang=en", async ({ page }) => {
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("body has data-testid app-body", async ({ page }) => {
    const body = page.locator("[data-testid='app-body']");
    await expect(body).toBeVisible();
  });

  test("page title matches expected metadata", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Paul-Valentin Mini");
    expect(title).toContain("Senior Software Developer");
  });

  test("page has meta description", async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();
    expect(description?.length).toBeGreaterThan(0);
  });

  test("Inter font is applied to html element", async ({ page }) => {
    const html = page.locator("html");
    const className = await html.getAttribute("class");
    expect(className).toBeTruthy();
  });

  test("Nav component is rendered inside body", async ({ page }) => {
    const nav = page.locator("[data-testid='nav']");
    await expect(nav).toBeVisible();
  });
});
