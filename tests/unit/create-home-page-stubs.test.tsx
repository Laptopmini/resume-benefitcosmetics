import { render, screen } from "@testing-library/react";
import type React from "react";
import Page from "@/app/page";

jest.mock("@/src/components/Section", () => ({
  __esModule: true,
  default: ({
    id,
    testId,
    title,
    children,
  }: {
    id: string;
    testId: string;
    title?: string;
    children: React.ReactNode;
  }) => (
    <section id={id} data-testid={testId}>
      {title && <h2 data-testid={`${testId}-title`}>{title}</h2>}
      {children}
    </section>
  ),
}));

describe("app/page.tsx", () => {
  beforeEach(() => {
    render(<Page />);
  });

  test("renders main with data-testid home", () => {
    const main = screen.getByTestId("home");
    expect(main.tagName.toLowerCase()).toBe("main");
  });

  test("renders hero section stub", () => {
    expect(screen.getByTestId("section-hero")).toBeTruthy();
  });

  test("renders profile section stub", () => {
    expect(screen.getByTestId("section-profile")).toBeTruthy();
  });

  test("renders skills section stub", () => {
    expect(screen.getByTestId("section-skills")).toBeTruthy();
  });

  test("renders experience section stub", () => {
    expect(screen.getByTestId("section-experience")).toBeTruthy();
  });

  test("renders education section stub", () => {
    expect(screen.getByTestId("section-education")).toBeTruthy();
  });

  test("all five sections are siblings inside main", () => {
    const main = screen.getByTestId("home");
    const sections = main.querySelectorAll(":scope > section");
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});
