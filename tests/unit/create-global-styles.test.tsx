import "./setup-jest";
import * as fs from "node:fs";
import * as path from "node:path";

describe("globals.css", () => {
  it("should have app/globals.css importable", () => {
    // This test verifies that globals.css exists in app/
    // The file will be created by the implementation
    const globalsPath = path.join(process.cwd(), "app", "globals.css");
    expect(fs.existsSync(globalsPath)).toBe(true);
  });
});
