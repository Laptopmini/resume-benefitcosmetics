import { BASE_PATH, stripBasePath, withBasePath } from "@/lib/basePath";

describe("basePath helpers", () => {
  test("BASE_PATH is /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  test("withBasePath prepends base path to absolute path", () => {
    expect(withBasePath("/images/photo.png")).toBe("/ralph-node-resume/images/photo.png");
  });

  test("withBasePath prepends base path to relative path", () => {
    expect(withBasePath("images/photo.png")).toBe("/ralph-node-resume/images/photo.png");
  });

  test("withBasePath handles root path", () => {
    expect(withBasePath("/")).toBe("/ralph-node-resume/");
  });

  test("stripBasePath removes leading base path", () => {
    expect(stripBasePath("/ralph-node-resume/foo")).toBe("/foo");
  });

  test("stripBasePath returns input unchanged when no base path prefix", () => {
    expect(stripBasePath("/other/path")).toBe("/other/path");
  });

  test("stripBasePath handles exact base path", () => {
    expect(stripBasePath("/ralph-node-resume")).toBe("");
  });
});
