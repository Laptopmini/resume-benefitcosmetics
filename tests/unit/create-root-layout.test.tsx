import { render } from "@testing-library/react";

jest.mock("next/font/google", () => ({
  Playfair_Display: () => ({ variable: "--font-display", className: "mock-playfair" }),
  Caveat: () => ({ variable: "--font-caveat", className: "mock-caveat" }),
  Inter: () => ({ variable: "--font-inter", className: "mock-inter" }),
  Space_Mono: () => ({ variable: "--font-space-mono", className: "mock-space-mono" }),
}));

import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("renders children inside the layout", () => {
    render(
      <RootLayout>
        <div data-testid="child">Hello</div>
      </RootLayout>,
    );
    const child = document.querySelector('[data-testid="child"]');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Hello");
  });

  it("sets lang=en on html element", () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );
    expect(document.documentElement).toHaveAttribute("lang", "en");
  });

  it("applies font variables to html className", () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );
    const htmlClass = document.documentElement.className;
    expect(htmlClass).toContain("--font-display");
    expect(htmlClass).toContain("--font-body");
    expect(htmlClass).toContain("--font-mono");
  });

  it("applies font-body and paper-grain classes to body", () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );
    expect(document.body.className).toContain("font-body");
    expect(document.body.className).toContain("paper-grain");
    expect(document.body.className).toContain("min-h-screen");
  });

  describe("metadata", () => {
    it("has correct title", () => {
      expect(metadata.title).toBe("Paul-Valentin Mini — Lead Frontend Engineer");
    });

    it("has description matching heroTagline", () => {
      expect(metadata.description).toBe(
        "Lead Frontend Engineer — Garnishes UIs With Wit Since 2015",
      );
    });
  });
});
