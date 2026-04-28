import { render } from "@testing-library/react";
import React from "react";

jest.mock(
  "next/font/google",
  () => ({
    Playfair_Display: (cfg: { variable: string }) => ({
      variable: cfg.variable,
      className: "mock-playfair",
    }),
    Caveat: (cfg: { variable: string }) => ({ variable: cfg.variable, className: "mock-caveat" }),
    Inter: (cfg: { variable: string }) => ({ variable: cfg.variable, className: "mock-inter" }),
    Space_Mono: (cfg: { variable: string }) => ({
      variable: cfg.variable,
      className: "mock-space-mono",
    }),
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
    const { container } = render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    const html = container.querySelector("html");
    expect(html).toHaveAttribute("lang", "en");
  });

  test("html element has font CSS variables in className", () => {
    const { container } = render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    const html = container.querySelector("html");
    const className = html?.className ?? "";
    expect(className).toContain("--font-display");
    expect(className).toContain("--font-body");
    expect(className).toContain("--font-mono");
  });

  test("body has font-body, paper-grain, and min-h-screen classes", () => {
    const { container } = render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    const body = container.querySelector("body");
    const className = body?.className ?? "";
    expect(className).toContain("font-body");
    expect(className).toContain("paper-grain");
    expect(className).toContain("min-h-screen");
  });

  test("metadata has correct title", () => {
    expect(metadata.title).toBe("Paul-Valentin Mini — Lead Frontend Engineer");
  });

  test("metadata has heroTagline as description", () => {
    expect(metadata.description).toBe("Lead Frontend Engineer — Garnishes UIs With Wit Since 2015");
  });
});
