import { readFileSync } from "fs";
import { join } from "path";

describe("root layout", () => {
  const layoutPath = join(process.cwd(), "app", "layout.tsx");
  let code: string;

  beforeEach(() => {
    code = readFileSync(layoutPath, "utf8");
  });

  it("app/layout.tsx exists", () => {
    expect(() => readFileSync(layoutPath, "utf8")).not.toThrow();
  });

  it("uses next/font/google Inter", () => {
    expect(code).toMatch(/from\s+["']next\/font\/google["']/);
    expect(code).toMatch(/Inter\s*\}/);
  });

  it("applies Inter className to html", () => {
    expect(code).toMatch(/<html[^>]*className=\{/);
  });

  it('renders body with data-testid="app-body"', () => {
    expect(code).toMatch(/data-testid=["']app-body["']/);
  });

  it("renders Nav component", () => {
    expect(code).toMatch(/<Nav\s*\/>/);
  });

  it("renders {children}", () => {
    expect(code).toMatch(/\{children\}/);
  });

  it("imports globals.css", () => {
    expect(code).toMatch(/from\s+["']\.\/globals\.css["']/);
  });

  it("exports metadata with title and description", () => {
    expect(code).toMatch(/export\s+const\s+metadata\s*=/);
    expect(code).toMatch(/title:\s*["']Paul-Valentin Mini/);
    expect(code).toMatch(/description:\s*["'][^"']+["']/);
  });
});
