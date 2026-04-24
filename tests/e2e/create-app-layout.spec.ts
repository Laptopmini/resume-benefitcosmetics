import { expect, test } from "@playwright/test";

test.describe("app layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("html element has lang=en", async ({ page }) => {
    const lang = await page.getAttribute("html", "lang");
    expect(lang).toBe("en");
  });

  test("body has data-testid app-body", async ({ page }) => {
    const body = page.locator('[data-testid="app-body"]');
    await expect(body).toBeVisible();
  });

  test("page title matches expected metadata", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Paul-Valentin Mini");
    expect(title).toContain("Senior Software Developer");
  });

  test("nav component is rendered", async ({ page }) => {
    const nav = page.locator('[data-testid="nav"]');
    await expect(nav).toBeVisible();
  });
});
