"use client";

import { motion } from "framer-motion";
import Sparkle from "@/components/Sparkle";
import { COPY, EDUCATION } from "@/content/resume";
import { bannerEntrance } from "@/lib/motion";

export default function EducationCard() {
  return (
    <motion.div {...bannerEntrance}>
      <section data-testid="education-card" className="editorial-card bg-mustard">
        <span className="font-script text-3xl text-rose">{COPY.educationLabel}</span>
        <ul className="mt-4 space-y-2 font-body text-lg">
          {EDUCATION.map((item) => (
            <li key={item.line} data-testid="education-entry">
              <Sparkle size={16} className="inline-block mr-2" />
              {item.line}
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}
