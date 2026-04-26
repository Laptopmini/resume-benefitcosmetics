import { render } from "@testing-library/react";
import type React from "react";
import "@testing-library/jest-dom";

jest.mock(
  "../../src/components/Section",
  () => ({
    __esModule: true,
    default: ({
      id,
      testId,
      children,
    }: {
      id: string;
      testId: string;
      title?: string;
      children?: React.ReactNode;
    }) => (
      <section id={id} data-testid={testId}>
        {children}
      </section>
    ),
  }),
  { virtual: true },
);

import HomePage from "@/app/page";

describe("app/page.tsx", () => {
  test("renders main with data-testid=home", () => {
    const { getByTestId } = render(<HomePage />);
    const main = getByTestId("home");
    expect(main).toBeInTheDocument();
    expect(main.tagName.toLowerCase()).toBe("main");
  });

  const sectionIds = [
    "section-hero",
    "section-profile",
    "section-skills",
    "section-experience",
    "section-education",
  ];

  test.each(sectionIds)("renders %s section stub", (testId) => {
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId(testId)).toBeInTheDocument();
  });

  test("all five sections are present as siblings under main", () => {
    const { getByTestId } = render(<HomePage />);
    const main = getByTestId("home");
    const sections = main.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});
