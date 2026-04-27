"use client";

import { motion } from "framer-motion";
import { resume } from "@/content/resume";

export default function Education() {
  return (
    <ul data-testid="education-list" className="grid md:grid-cols-3 gap-6">
      {resume.education.map((edu, i) => (
        <motion.li
          key={edu.title}
          data-testid={`education-item-${i}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2"
        >
          <h3 data-testid={`education-title-${i}`}>{edu.title}</h3>
          <p data-testid={`education-detail-${i}`}>{edu.detail}</p>
          {edu.status && <span data-testid={`education-status-${i}`}>{edu.status}</span>}
        </motion.li>
      ))}
    </ul>
  );
}
