"use client";

import { motion } from "framer-motion";
import { resume } from "@/content/resume";

export default function Experience() {
  return (
    <ol data-testid="experience-timeline" className="flex flex-col gap-8">
      {resume.experience.map((exp, i) => (
        <motion.li
          key={exp.company}
          data-testid={`experience-item-${i}`}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex gap-6"
        >
          <div className="flex flex-col items-center" aria-hidden>
            <span className="w-3 h-3 rounded-full bg-[var(--color-accent)]" />
            <span className="w-0.5 flex-1 bg-[var(--color-border)] mt-2" />
          </div>
          <div className="flex flex-col gap-3 pb-8">
            <div className="flex flex-col gap-1">
              <h3 data-testid={`experience-company-${i}`} className="text-lg font-semibold">
                {exp.company}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p data-testid={`experience-role-${i}`} className="text-base font-medium">
                  {exp.role}
                </p>
                <p
                  data-testid={`experience-period-${i}`}
                  className="text-sm text-[var(--color-muted)]"
                >
                  {exp.period}
                </p>
              </div>
            </div>
            <ul
              data-testid={`experience-bullets-${i}`}
              className="flex flex-col gap-2 list-disc list-inside"
            >
              {exp.bullets.map((bullet, j) => (
                <li
                  key={bullet.label}
                  data-testid={`experience-bullet-${i}-${j}`}
                  className="text-sm leading-relaxed"
                >
                  <strong>{bullet.label}</strong> {bullet.body}
                </li>
              ))}
            </ul>
            <div data-testid={`experience-stack-${i}`} className="flex flex-wrap gap-2 mt-2">
              {exp.stack.map((tech, k) => (
                <span
                  key={tech}
                  data-testid={`experience-stack-chip-${i}-${k}`}
                  className="px-3 py-1 text-xs rounded-full bg-[var(--color-subtle)] border border-[var(--color-border)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
