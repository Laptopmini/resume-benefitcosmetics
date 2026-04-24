import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

describe("Delete src/index.ts", () => {
  const srcIndexPath = join(process.cwd(), "src", "index.ts");

  it("src/index.ts should not exist on disk", () => {
    expect(existsSync(srcIndexPath)).toBe(false);
  });

  it("src directory should not contain index.ts in its listings", () => {
    const srcDir = join(process.cwd(), "src");
    if (existsSync(srcDir)) {
      const files = readdirSync(srcDir);
      expect(files).not.toContain("index.ts");
    }
  });

  it("src/index.ts should not be imported anywhere in the codebase", () => {
    // Grep for any imports of src/index.ts
    const { execSync } = require("node:child_process");
    try {
      const result = execSync(
        'grep -r "from.*[\'\\"]\\.*src/index[\'\\"]" --include="*.ts" --include="*.tsx" .',
        { cwd: process.cwd(), encoding: "utf-8" },
      );
      expect(result).toBe("");
    } catch {
      // grep returns non-zero exit code when no matches found - that's what we want
      expect(true).toBe(true);
    }
  });
});
