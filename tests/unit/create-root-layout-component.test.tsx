/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

describe("Root layout component", () => {
  let RootLayout: (props: { children: React.ReactNode }) => React.JSX.Element;
  let metadata: { title: string; description: string };

  beforeEach(async () => {
    jest.resetModules();
    const mod = await import("@/app/layout");
    RootLayout = mod.default;
    metadata = mod.metadata;
  });

  it("renders body with data-testid=app-body", () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    );
    expect(screen.getByTestId("app-body")).toBeInTheDocument();
  });

  it("renders children inside body", () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Hello</div>
      </RootLayout>,
    );
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("renders Nav component", () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    );
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });

  it("exports metadata with correct title", () => {
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("Paul-Valentin Mini — Senior Software Developer");
  });

  it("exports metadata with a description", () => {
    expect(typeof metadata.description).toBe("string");
    expect(metadata.description.length).toBeGreaterThan(0);
  });
});
