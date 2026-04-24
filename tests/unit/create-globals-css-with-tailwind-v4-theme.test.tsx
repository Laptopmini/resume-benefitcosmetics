import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Create globals.css with Tailwind v4 theme", () => {
  const cssFile = join(process.cwd(), "app", "globals.css");

  it("app/globals.css should exist on disk", () => {
    expect(existsSync(cssFile)).toBe(true);
  });

  it("should import tailwindcss", () => {
    const content = readFileSync(cssFile, "utf-8");
    expect(content).toContain('@import "tailwindcss"');
  });

  it("should define @theme block with --font-sans using Inter", () => {
    const content = readFileSync(cssFile, "utf-8");
    expect(content).toContain("@theme");
    expect(content).toContain("--font-sans");
    expect(content).toContain("Inter");
  });

  it("should define neutral palette tokens", () => {
    const content = readFileSync(cssFile, "utf-8");
    expect(content).toContain("--color-bg");
    expect(content).toContain("--color-fg");
    expect(content).toContain("--color-muted");
    expect(content).toContain("--color-subtle");
    expect(content).toContain("--color-border");
    // Check specific color values from PRD
    expect(content).toContain("#ffffff");
    expect(content).toContain("#0a0a0a");
    expect(content).toContain("#6b7280");
    expect(content).toContain("#f5f5f7");
    expect(content).toContain("#e5e5ea");
  });

  it("should include base element resets for html/body", () => {
    const content = readFileSync(cssFile, "utf-8");
    // Should reference --font-sans for font-family
    expect(content).toContain("--font-sans");
    // Should use bg-[var(--color-bg)]
    expect(content).toContain("bg-[var(--color-bg)]");
    // Should use text-[var(--color-fg)]
    expect(content).toContain("text-[var(--color-fg)]");
  });

  it("should define html scroll-behavior: smooth", () => {
    const content = readFileSync(cssFile, "utf-8");
    expect(content).toContain("scroll-behavior: smooth");
  });

  it("should define .section-pad utility class", () => {
    const content = readFileSync(cssFile, "utf-8");
    expect(content).toContain(".section-pad");
    // py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto
    expect(content).toContain("py-24");
    expect(content).toContain("md:py-32");
    expect(content).toContain("px-6");
    expect(content).toContain("md:px-12");
    expect(content).toContain("max-w-6xl");
    expect(content).toContain("mx-auto");
  });
});
