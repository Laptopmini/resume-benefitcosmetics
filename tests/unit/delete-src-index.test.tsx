import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");

describe("delete src/index", () => {
  it("src/index.ts should not exist", () => {
    expect(existsSync(join(ROOT, "src", "index.ts"))).toBe(false);
  });

  it("no file should import src/index", () => {
    const { execSync } = require("node:child_process");
    let grepResult = "";
    try {
      grepResult = execSync(
        'grep -r "from.*[\'\\"].*src/index" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.mjs" . || true',
        { cwd: ROOT, encoding: "utf-8" },
      );
    } catch {
      // grep returns non-zero when no matches
    }
    const filtered = grepResult
      .split("\n")
      .filter(
        (line) =>
          line.trim() && !line.includes("node_modules") && !line.includes("delete-src-index.test"),
      );
    expect(filtered).toHaveLength(0);
  });
});
