"use client";

import { motion } from "framer-motion";
import Starburst from "@/components/Starburst";
import { COPY, EXPERIENCE } from "@/content/resume";
import { bannerEntrance } from "@/lib/motion";

export default function ExperienceTimeline() {
  return (
    <section data-testid="experience-timeline">
      <span className="font-script text-3xl text-rose">{COPY.experienceLabel}</span>
      <h2 className="font-display text-4xl">{COPY.experienceHeading}</h2>

      {EXPERIENCE.map((item) => (
        <motion.article
          key={item.company}
          className="editorial-card mt-10 relative"
          {...bannerEntrance}
          data-testid="experience-entry"
        >
          <Starburst size={90} fill="var(--mustard)">
            <span className="font-mono text-xs text-ink">{item.period}</span>
          </Starburst>
          <h3 className="font-display text-3xl">
            {item.role} · {item.company}
          </h3>
          <p className="font-mono text-sm text-rose">{item.location}</p>
          <ul className="mt-4 space-y-3">
            {item.bullets.map((bullet) => (
              <li key={bullet.heading}>
                <strong className="font-display">{bullet.heading}</strong>
                <span className="font-body">{bullet.body}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="ink-rule bg-blush rounded-full px-3 py-1 font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </section>
  );
}
