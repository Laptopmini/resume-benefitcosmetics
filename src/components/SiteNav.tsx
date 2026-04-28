"use client";

import { motion } from "framer-motion";
import { tiltOnHover } from "@/lib/motion";

export default function SiteNav() {
  return (
    <nav
      data-testid="site-nav"
      className="sticky top-0 z-40 bg-cream/95 backdrop-blur ink-rule border-t-0 border-x-0"
    >
      <div className="max-w-editorial mx-auto flex items-center justify-between px-6 py-3">
        <span className="font-display text-xl">P-V Mini</span>
        <ul className="flex gap-6 font-mono text-xs uppercase">
          <li>
            <motion.span {...tiltOnHover}>
              <a href="#profile" className="hover:text-rose transition-colors">
                Profile
              </a>
            </motion.span>
          </li>
          <li>
            <motion.span {...tiltOnHover}>
              <a href="#skills" className="hover:text-rose transition-colors">
                Skills
              </a>
            </motion.span>
          </li>
          <li>
            <motion.span {...tiltOnHover}>
              <a href="#experience" className="hover:text-rose transition-colors">
                Experience
              </a>
            </motion.span>
          </li>
          <li>
            <motion.span {...tiltOnHover}>
              <a href="#education" className="hover:text-rose transition-colors">
                Education
              </a>
            </motion.span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
