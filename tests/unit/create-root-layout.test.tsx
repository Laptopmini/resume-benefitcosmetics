import { render } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

jest.mock("@/src/components/Nav", () => ({
  __esModule: true,
  default: () => <div data-testid="nav-mock">Nav</div>,
}));

describe("app/layout.tsx", () => {
  test("exports metadata with title and description", () => {
    expect(metadata).toBeDefined();
    expect(metadata.title).toMatch(/Paul-Valentin Mini/);
    expect(metadata.title).toMatch(/Senior Software Developer/);
    expect(typeof metadata.description).toBe("string");
    expect(metadata.description.length).toBeGreaterThan(0);
  });

  test("renders body with data-testid app-body", () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    );
    expect(document.body.getAttribute("data-testid")).toBe("app-body");
  });

  test("renders Nav component", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    );
    expect(getByTestId("nav-mock")).toBeTruthy();
  });

  test("renders children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>test-child-content</div>
      </RootLayout>,
    );
    expect(getByText("test-child-content")).toBeTruthy();
  });

  test("html element has lang=en", () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    );
    expect(document.documentElement.getAttribute("lang")).toBe("en");
  });
});
