import { existsSync } from "node:fs";
import { join } from "node:path";

describe("Delete source index file", () => {
  const filePath = join(process.cwd(), "src", "index.ts");

  it("src/index.ts should not exist on disk", () => {
    expect(existsSync(filePath)).toBe(false);
  });

  it("no file imports src/index.ts", () => {
    const { execSync } = require("node:child_process");
    const result = execSync(
      'grep -r --include="*.ts" --include="*.tsx" "src/index" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist --exclude-dir=tests || true',
      { encoding: "utf-8" },
    );
    expect(result.trim()).toBe("");
  });
});
