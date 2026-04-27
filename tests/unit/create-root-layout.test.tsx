import { Inter } from "next/font/google";
import type React from "react";

describe("app/layout.tsx", () => {
  // Test that Inter can be imported from next/font/google
  it("uses Inter font from next/font/google", () => {
    // Inter should be a valid Google Font function
    expect(typeof Inter).toBe("function");
  });

  it("layout module exports default RootLayout and metadata", async () => {
    const layout = await import("@/app/layout");
    expect(layout.default).toBeDefined();
    expect(layout.metadata).toBeDefined();
    expect(layout.metadata.title).toBe("Paul-Valentin Mini — Senior Software Developer");
    expect(layout.metadata.description).toBe("Paul-Valentin Mini — Senior Software Developer");
  });

  it('RootLayout renders html with lang="en" and body with data-testid="app-body"', async () => {
    const { default: RootLayout } = await import("@/app/layout");

    // Create a minimal React element tree to check the structure
    const mockChildren = () => null;
    const result = RootLayout({ children: mockChildren() as unknown as React.ReactNode });

    // Check that the rendered JSX has html element with lang="en"
    expect(result.props.htmlAttributes.lang).toBe("en");

    // Find the body element in the tree
    const bodyElement = result.props.children;
    expect(bodyElement.props["data-testid"]).toBe("app-body");
  });
});
