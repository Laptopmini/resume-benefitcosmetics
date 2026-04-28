import { render } from "@testing-library/react";
import React from "react";

jest.mock(
  "next/font/google",
  () => ({
    Playfair_Display: () => ({ variable: "--font-display", className: "mock-playfair" }),
    Caveat: () => ({ variable: "--font-caveat", className: "mock-caveat" }),
    Inter: () => ({ variable: "--font-inter", className: "mock-inter" }),
    Space_Mono: () => ({ variable: "--font-space-mono", className: "mock-space-mono" }),
  }),
  { virtual: true },
);

import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  test("renders children", () => {
    render(
      <RootLayout>
        <div data-testid="child">Hello</div>
      </RootLayout>,
    );
    const child = document.querySelector('[data-testid="child"]');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Hello");
  });

  test("html element has lang=en", () => {
    render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    expect(document.documentElement).toHaveAttribute("lang", "en");
  });

  test("html element has font CSS variables in className", () => {
    render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    const className = document.documentElement.className;
    expect(className).toContain("--font-display");
    expect(className).toContain("--font-body");
    expect(className).toContain("--font-mono");
  });

  test("body has font-body, paper-grain, and min-h-screen classes", () => {
    render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    expect(document.body.className).toContain("font-body");
    expect(document.body.className).toContain("paper-grain");
    expect(document.body.className).toContain("min-h-screen");
  });

  test("metadata has correct title", () => {
    expect(metadata.title).toBe("Paul-Valentin Mini — Lead Frontend Engineer");
  });

  test("metadata has heroTagline as description", () => {
    expect(metadata.description).toBe("Lead Frontend Engineer — Garnishes UIs With Wit Since 2015");
  });
});
