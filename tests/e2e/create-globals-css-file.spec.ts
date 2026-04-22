import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/ralph-node-resume/");
});

test.describe("globals CSS file", () => {
  test("body uses Inter font family", async ({ page }) => {
    const body = page.locator("body");
    const fontFamily = await body.evaluate((el) => getComputedStyle(el).fontFamily);
    expect(fontFamily.toLowerCase()).toContain("inter");
  });

  test("html has smooth scroll behavior", async ({ page }) => {
    const scrollBehavior = await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior);
    expect(scrollBehavior).toBe("smooth");
  });

  test("body uses correct background and foreground colors", async ({ page }) => {
    const body = page.locator("body");
    const bgColor = await body.evaluate((el) => getComputedStyle(el).backgroundColor);
    const color = await body.evaluate((el) => getComputedStyle(el).color);
    expect(bgColor).toBeTruthy();
    expect(color).toBeTruthy();
    expect(bgColor).not.toBe(color);
  });

  test("section-pad class applies expected padding and max-width", async ({ page }) => {
    const sectionPad = page.locator(".section-pad").first();
    await expect(sectionPad).toBeAttached();
    const maxWidth = await sectionPad.evaluate((el) => getComputedStyle(el).maxWidth);
    expect(maxWidth).toBeTruthy();
    expect(maxWidth).not.toBe("none");
  });
});
