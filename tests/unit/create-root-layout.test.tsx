import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock(
  "next/font/google",
  () => ({
    Inter: () => ({
      className: "inter-mock",
      style: { fontFamily: "Inter" },
    }),
  }),
  { virtual: true },
);

jest.mock(
  "../../src/components/Nav",
  () => ({
    __esModule: true,
    default: () => <div data-testid="nav">Nav Mock</div>,
  }),
  { virtual: true },
);

jest.mock("../../app/globals.css", () => ({}), { virtual: true });

import RootLayout, { metadata } from "@/app/layout";

describe("app/layout.tsx", () => {
  test("renders html element with lang=en", () => {
    render(<RootLayout>child content</RootLayout>);
    expect(document.documentElement).toHaveAttribute("lang", "en");
  });

  test("renders body with data-testid=app-body", () => {
    render(<RootLayout>child content</RootLayout>);
    expect(document.body).toHaveAttribute("data-testid", "app-body");
  });

  test("renders Nav component", () => {
    const { getByTestId } = render(<RootLayout>child content</RootLayout>);
    expect(getByTestId("nav")).toBeInTheDocument();
  });

  test("renders children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>test child</div>
      </RootLayout>,
    );
    expect(getByText("test child")).toBeInTheDocument();
  });

  test("exports metadata with correct title", () => {
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("Paul-Valentin Mini — Senior Software Developer");
  });

  test("exports metadata with description", () => {
    expect(metadata).toBeDefined();
    expect(typeof metadata.description).toBe("string");
    expect(metadata.description.length).toBeGreaterThan(0);
  });
});
