import { render, screen } from "@testing-library/react";
import HomePage from "../../../app/page";

describe("HomePage", () => {
  it('renders main element with data-testid="home"', () => {
    render(<HomePage />);
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  it("renders all section stubs with correct testIds", () => {
    render(<HomePage />);
    expect(screen.getByTestId("section-hero")).toBeInTheDocument();
    expect(screen.getByTestId("section-profile")).toBeInTheDocument();
    expect(screen.getByTestId("section-skills")).toBeInTheDocument();
    expect(screen.getByTestId("section-experience")).toBeInTheDocument();
    expect(screen.getByTestId("section-education")).toBeInTheDocument();
  });

  it("renders section stubs with correct ids", () => {
    render(<HomePage />);
    expect(document.getElementById("hero")).toBeInTheDocument();
    expect(document.getElementById("profile")).toBeInTheDocument();
    expect(document.getElementById("skills")).toBeInTheDocument();
    expect(document.getElementById("experience")).toBeInTheDocument();
    expect(document.getElementById("education")).toBeInTheDocument();
  });
});
