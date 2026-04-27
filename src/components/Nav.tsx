"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      data-testid="nav"
      className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-[var(--color-border)]"
    >
      <div className="section-pad flex items-center justify-between">
        <span data-testid="nav-brand">Paul-Valentin Mini</span>
        <div className="hidden md:flex gap-6">
          <a data-testid="nav-link-profile" href="#profile">
            Profile
          </a>
          <a data-testid="nav-link-skills" href="#skills">
            Skills
          </a>
          <a data-testid="nav-link-experience" href="#experience">
            Experience
          </a>
          <a data-testid="nav-link-education" href="#education">
            Education
          </a>
        </div>
        <button
          type="button"
          data-testid="nav-toggle"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      </div>
      {open && (
        <div data-testid="nav-menu" className="md:hidden section-pad pt-4 flex flex-col gap-4">
          <a href="#profile">Profile</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
        </div>
      )}
    </nav>
  );
}
