import { render, screen } from "@testing-library/react";
import Profile from "@/src/components/Profile";
import { resume } from "@/src/content/resume";

describe("Profile component", () => {
  beforeEach(() => {
    render(<Profile />);
  });

  it("renders the profile summary with data-testid", () => {
    const summary = screen.getByTestId("profile-summary");
    expect(summary).toBeInTheDocument();
  });

  it("displays the resume summary text", () => {
    const summary = screen.getByTestId("profile-summary");
    expect(summary).toHaveTextContent(resume.profile.summary);
  });

  it("renders as a paragraph element", () => {
    const summary = screen.getByTestId("profile-summary");
    expect(summary.tagName.toLowerCase()).toBe("p");
  });

  it("applies the expected typography classes", () => {
    const summary = screen.getByTestId("profile-summary");
    expect(summary.className).toMatch(/text-2xl/);
    expect(summary.className).toMatch(/max-w-4xl/);
  });
});
