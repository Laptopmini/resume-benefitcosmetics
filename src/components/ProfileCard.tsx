"use client";

import { motion } from "framer-motion";
import { COPY, PROFILE } from "@/content/resume";
import { bannerEntrance } from "@/lib/motion";

export default function ProfileCard() {
  return (
    <motion.div {...bannerEntrance}>
      <section data-testid="profile-card" className="editorial-card bg-blush">
        <span className="font-script text-3xl text-rose">{COPY.profileLabel}</span>
        <h2 className="font-display text-4xl mt-1">{COPY.profileHeading}</h2>
        <p data-testid="profile-summary" className="font-body mt-4 text-lg leading-relaxed">
          {PROFILE.summary}
        </p>
      </section>
    </motion.div>
  );
}
