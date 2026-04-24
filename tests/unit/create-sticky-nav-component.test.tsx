import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Create sticky Nav component", () => {
  const navFile = join(process.cwd(), "src", "components", "Nav.tsx");

  it("src/components/Nav.tsx should exist on disk", () => {
    expect(existsSync(navFile)).toBe(true);
  });

  it('should have "use client" directive', () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain("'use client'");
  });

  it('should have data-testid="nav"', () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain('data-testid="nav"');
  });

  it("should have position sticky, top-0, z-50 styles", () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain("sticky");
    expect(content).toContain("top-0");
    expect(content).toContain("z-50");
  });

  it("should have white/blurred background with backdrop-blur", () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain("backdrop-blur");
    expect(content).toMatch(/bg-white|white/);
  });

  it("should have border-b and border-[var(--color-border)]", () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain("border-b");
    expect(content).toContain("border-[");
    expect(content).toContain("--color-border");
  });

  it('should render nav-brand with name "Paul-Valentin Mini"', () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain('data-testid="nav-brand"');
    expect(content).toContain("Paul-Valentin Mini");
  });

  it("should render nav links with correct testIds and hrefs", () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain('data-testid="nav-link-profile"');
    expect(content).toContain('data-testid="nav-link-skills"');
    expect(content).toContain('data-testid="nav-link-experience"');
    expect(content).toContain('data-testid="nav-link-education"');
    expect(content).toContain('href="#profile"');
    expect(content).toContain('href="#skills"');
    expect(content).toContain('href="#experience"');
    expect(content).toContain('href="#education"');
  });

  it('should have hamburger toggle button with data-testid="nav-toggle"', () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain('data-testid="nav-toggle"');
    expect(content).toContain("md"); // mobile-first breakpoint
  });

  it('should have dropdown panel with data-testid="nav-menu"', () => {
    const content = readFileSync(navFile, "utf-8");
    expect(content).toContain('data-testid="nav-menu"');
  });
});
