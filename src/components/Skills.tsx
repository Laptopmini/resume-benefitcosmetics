"use client";

import { motion } from "framer-motion";
import { resume } from "@/content/resume";

function slugify(category: string): string {
  return category.toLowerCase();
}

export default function Skills() {
  return (
    <div className="flex flex-col gap-12">
      {resume.skills.map((skillCategory, categoryIndex) => {
        const slug = slugify(skillCategory.category);
        return (
          <motion.div
            key={skillCategory.category}
            data-testid={`skills-group-${slug}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3
              data-testid={`skills-group-${slug}-label`}
              className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]"
            >
              {skillCategory.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillCategory.items.map((skill, index) => (
                <motion.span
                  key={skill}
                  data-testid={`skill-chip-${slug}-${index}`}
                  className="px-4 py-2 rounded-full bg-[var(--color-subtle)] text-sm border border-[var(--color-border)]"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
