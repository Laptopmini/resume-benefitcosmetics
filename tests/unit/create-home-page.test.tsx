/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

jest.mock(
  "@/src/components/Section",
  () => ({
    __esModule: true,
    default: ({
      id,
      testId,
      children,
      title,
    }: {
      id: string;
      testId: string;
      children: React.ReactNode;
      title?: string;
    }) => (
      <section id={id} data-testid={testId}>
        {title && <h2 data-testid={`${testId}-title`}>{title}</h2>}
        {children}
      </section>
    ),
  }),
  { virtual: true },
);

import HomePage from "@/app/page";

describe("home page", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it("renders main with data-testid=home", () => {
    const main = screen.getByTestId("home");
    expect(main).toBeDefined();
    expect(main.tagName.toLowerCase()).toBe("main");
  });

  it("renders hero section stub", () => {
    expect(screen.getByTestId("section-hero")).toBeDefined();
  });

  it("renders profile section stub", () => {
    expect(screen.getByTestId("section-profile")).toBeDefined();
  });

  it("renders skills section stub", () => {
    expect(screen.getByTestId("section-skills")).toBeDefined();
  });

  it("renders experience section stub", () => {
    expect(screen.getByTestId("section-experience")).toBeDefined();
  });

  it("renders education section stub", () => {
    expect(screen.getByTestId("section-education")).toBeDefined();
  });

  it("all sections are siblings within main", () => {
    const main = screen.getByTestId("home");
    const sections = main.querySelectorAll(":scope > section");
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});
