"use client";

import { motion } from "framer-motion";
import { COPY, SKILL_GROUPS } from "@/content/resume";
import { marqueeDrift, tiltOnHover } from "@/lib/motion";

export default function SkillsCard() {
  return (
    <section data-testid="skills-card" className="editorial-card bg-mint">
      <span className="font-script text-3xl text-rose">{COPY.skillsLabel}</span>
      <div className="mt-6 overflow-hidden">
        <motion.div className="flex gap-6" {...marqueeDrift}>
          {[...SKILL_GROUPS, ...SKILL_GROUPS].map((group, i) => (
            <motion.div
              key={`${group.label}-${i < SKILL_GROUPS.length ? "first" : "second"}`}
              {...tiltOnHover}
            >
              <div
                data-testid="skill-group"
                className="ink-rule shadow-pin bg-cream rounded-md p-4 min-w-[280px]"
              >
                <h3 className="font-mono text-sm uppercase">{group.label}</h3>
                <ul className="mt-2 font-body text-sm">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
