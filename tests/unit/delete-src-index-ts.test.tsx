import * as fs from "node:fs";
import * as path from "node:path";

describe("delete src/index.ts", () => {
  const filePath = path.resolve(__dirname, "../../src/index.ts");

  it("src/index.ts no longer exists on disk", () => {
    expect(fs.existsSync(filePath)).toBe(false);
  });

  it("no file in the project imports src/index.ts", () => {
    const srcDir = path.resolve(__dirname, "../../src");
    if (!fs.existsSync(srcDir)) {
      return;
    }

    const findImports = (dir: string): string[] => {
      const results: string[] = [];
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && entry.name !== "node_modules") {
          results.push(...findImports(fullPath));
        } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
          const content = fs.readFileSync(fullPath, "utf-8");
          if (/from\s+['"].*src\/index['"]/.test(content)) {
            results.push(fullPath);
          }
        }
      }
      return results;
    };

    const importingFiles = findImports(srcDir);
    expect(importingFiles).toEqual([]);
  });
});
