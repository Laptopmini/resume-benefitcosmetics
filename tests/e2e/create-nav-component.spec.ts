import { expect, test } from "@playwright/test";

test.describe("nav component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("nav is visible and sticky", async ({ page }) => {
    const nav = page.locator('[data-testid="nav"]');
    await expect(nav).toBeVisible();
    const position = await nav.evaluate((el) => getComputedStyle(el).getPropertyValue("position"));
    expect(position).toBe("sticky");
  });

  test("brand name is displayed", async ({ page }) => {
    const brand = page.locator('[data-testid="nav-brand"]');
    await expect(brand).toBeVisible();
    await expect(brand).toHaveText("Paul-Valentin Mini");
  });

  test("anchor links are present on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    const links = [
      { testId: "nav-link-profile", href: "#profile" },
      { testId: "nav-link-skills", href: "#skills" },
      { testId: "nav-link-experience", href: "#experience" },
      { testId: "nav-link-education", href: "#education" },
    ];
    for (const link of links) {
      const el = page.locator(`[data-testid="${link.testId}"]`);
      await expect(el).toBeVisible();
      const href = await el.getAttribute("href");
      expect(href).toBe(link.href);
    }
  });

  test("mobile hamburger toggles menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const toggle = page.locator('[data-testid="nav-toggle"]');
    await expect(toggle).toBeVisible();

    const menu = page.locator('[data-testid="nav-menu"]');
    await expect(menu).not.toBeVisible();

    await toggle.click();
    await expect(menu).toBeVisible();
  });
});
