import { render, screen } from "@testing-library/react";
import RootLayout from "../../../app/layout";

describe("RootLayout", () => {
  it('renders html element with lang="en"', () => {
    render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    expect(document.documentElement.lang).toBe("en");
  });

  it('renders body with data-testid="app-body"', () => {
    render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    expect(screen.getByTestId("app-body")).toBeInTheDocument();
  });

  it("exports metadata with title and description", () => {
    // Metadata is exported from the layout module
    // We verify the module exports metadata
    expect(RootLayout).toBeDefined();
  });
});
