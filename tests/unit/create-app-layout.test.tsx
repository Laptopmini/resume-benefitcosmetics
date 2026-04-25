/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

jest.mock(
  "@/src/components/Nav",
  () => ({
    __esModule: true,
    default: () => <nav data-testid="nav">Nav</nav>,
  }),
  { virtual: true },
);

jest.mock("@/app/globals.css", () => ({}), { virtual: true });

import RootLayout, { metadata } from "@/app/layout";

describe("app layout", () => {
  it("renders html element with lang=en", () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">Hello</div>
      </RootLayout>,
    );
    const html = container.querySelector("html");
    expect(html).not.toBeNull();
    expect(html?.getAttribute("lang")).toBe("en");
  });

  it("renders body with data-testid=app-body", () => {
    render(
      <RootLayout>
        <div>Hello</div>
      </RootLayout>,
    );
    expect(screen.getByTestId("app-body")).toBeDefined();
  });

  it("renders Nav component", () => {
    render(
      <RootLayout>
        <div>Hello</div>
      </RootLayout>,
    );
    expect(screen.getByTestId("nav")).toBeDefined();
  });

  it("renders children", () => {
    render(
      <RootLayout>
        <div data-testid="child">Child content</div>
      </RootLayout>,
    );
    expect(screen.getByTestId("child")).toBeDefined();
  });

  it("exports metadata with correct title", () => {
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("Paul-Valentin Mini — Senior Software Developer");
  });

  it("exports metadata with description", () => {
    expect(metadata).toBeDefined();
    expect(typeof metadata.description).toBe("string");
    expect(metadata.description.length).toBeGreaterThan(0);
  });
});
