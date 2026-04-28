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

      {EXPERIENCE.map((item, index) => (
        <motion.article
          key={item.company}
          className="editorial-card mt-10 relative"
          data-testid="experience-entry"
          {...bannerEntrance}
        >
          <div className="absolute top-0 left-0">
            <Starburst size={90} fill="var(--mustard)">
              <span className="font-mono text-xs text-ink">{item.period}</span>
            </Starburst>
          </div>
          <h3 className="font-display text-3xl">
            {item.role} · {item.company}
          </h3>
          <p data-testid={`location-${index}`} className="font-mono text-sm text-rose">
            {item.location}
          </p>
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
                data-testid="tech-chip"
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
