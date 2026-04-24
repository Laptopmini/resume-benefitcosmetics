import { render, screen } from "@testing-library/react";

const Home = require("../../app/page").default;

describe("app page stubs", () => {
  it('renders main with data-testid="home"', () => {
    render(<Home />);
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  it("renders all five section stubs", () => {
    render(<Home />);
    expect(screen.getByTestId("section-hero")).toBeInTheDocument();
    expect(screen.getByTestId("section-profile")).toBeInTheDocument();
    expect(screen.getByTestId("section-skills")).toBeInTheDocument();
    expect(screen.getByTestId("section-experience")).toBeInTheDocument();
    expect(screen.getByTestId("section-education")).toBeInTheDocument();
  });

  it("each section stub has correct id", () => {
    render(<Home />);
    expect(screen.getByTestId("section-hero")).toHaveAttribute("id", "hero");
    expect(screen.getByTestId("section-profile")).toHaveAttribute("id", "profile");
    expect(screen.getByTestId("section-skills")).toHaveAttribute("id", "skills");
    expect(screen.getByTestId("section-experience")).toHaveAttribute("id", "experience");
    expect(screen.getByTestId("section-education")).toHaveAttribute("id", "education");
  });
});
