import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Create postcss.config.mjs", () => {
  const configPath = join(process.cwd(), "postcss.config.mjs");

  it("postcss.config.mjs should exist on disk", () => {
    expect(existsSync(configPath)).toBe(true);
  });

  it("should export plugins with @tailwindcss/postcss", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("@tailwindcss/postcss");
  });

  it("should be a valid ES module (uses export default)", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("export default");
  });

  it("should define plugins as an object with @tailwindcss/postcss: {}", () => {
    const content = readFileSync(configPath, "utf-8");
    // Should contain plugins object with @tailwindcss/postcss key
    expect(content).toMatch(/plugins\s*:\s*\{[^}]*['"]@tailwindcss\/postcss['"]/);
  });
});
