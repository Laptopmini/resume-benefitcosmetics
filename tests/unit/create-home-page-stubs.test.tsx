import { render, screen } from "@testing-library/react";

describe("app/page.tsx", () => {
  it('renders main element with data-testid="home"', async () => {
    const PageModule = await import("@/app/page");
    const PageComponent = PageModule.default;
    render(<PageComponent />);
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  it("renders all section stubs with correct test IDs", async () => {
    const PageModule = await import("@/app/page");
    const PageComponent = PageModule.default;
    render(<PageComponent />);

    expect(screen.getByTestId("section-hero")).toBeInTheDocument();
    expect(screen.getByTestId("section-profile")).toBeInTheDocument();
    expect(screen.getByTestId("section-skills")).toBeInTheDocument();
    expect(screen.getByTestId("section-experience")).toBeInTheDocument();
    expect(screen.getByTestId("section-education")).toBeInTheDocument();
  });

  it("renders sections with correct IDs", async () => {
    const PageModule = await import("@/app/page");
    const PageComponent = PageModule.default;
    render(<PageComponent />);

    expect(screen.getByTestId("section-hero").id).toBe("hero");
    expect(screen.getByTestId("section-profile").id).toBe("profile");
    expect(screen.getByTestId("section-skills").id).toBe("skills");
    expect(screen.getByTestId("section-experience").id).toBe("experience");
    expect(screen.getByTestId("section-education").id).toBe("education");
  });
});
