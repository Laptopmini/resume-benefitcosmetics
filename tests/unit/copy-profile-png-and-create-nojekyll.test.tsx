import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Copy profile.png and create .nojekyll", () => {
  const publicProfilePath = join(process.cwd(), "public", "profile.png");
  const rootProfilePath = join(process.cwd(), "profile.png");
  const nojekyllPath = join(process.cwd(), "public", ".nojekyll");

  it("public/profile.png should exist on disk", () => {
    expect(existsSync(publicProfilePath)).toBe(true);
  });

  it("public/.nojekyll should exist on disk", () => {
    expect(existsSync(nojekyllPath)).toBe(true);
  });

  it("profile.png should be a binary file (not UTF-8 text)", () => {
    const buffer = readFileSync(publicProfilePath);
    // PNG files start with a specific signature
    expect(buffer[0]).toBe(0x89); // PNG magic byte 1
    expect(buffer[1]).toBe(0x50); // 'P'
    expect(buffer[2]).toBe(0x4e); // 'N'
    expect(buffer[3]).toBe(0x47); // 'G'
  });

  it("public/profile.png should match the root profile.png", () => {
    const rootBuffer = readFileSync(rootProfilePath);
    const publicBuffer = readFileSync(publicProfilePath);
    expect(publicBuffer).toEqual(rootBuffer);
  });
});
