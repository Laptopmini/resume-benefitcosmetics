import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const HELPER_PATH = join(ROOT, "src", "lib", "basePath.ts");

describe("basePath helper", () => {
  let BASE_PATH: string;
  let withBasePath: (path: string) => string;

  beforeEach(async () => {
    const mod = await import(HELPER_PATH);
    BASE_PATH = mod.BASE_PATH;
    withBasePath = mod.withBasePath;
  });

  it("exports BASE_PATH as /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  it("withBasePath prepends base path to absolute path", () => {
    expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  it("withBasePath handles relative path by adding leading slash", () => {
    expect(withBasePath("images/photo.jpg")).toBe("/ralph-node-resume/images/photo.jpg");
  });
});
