"use client";

import { motion } from "framer-motion";
import { resume } from "@/content/resume";

export default function Profile() {
  return (
    <motion.p
      data-testid="profile-summary"
      className="text-2xl md:text-3xl leading-relaxed max-w-4xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {resume.profile.summary}
    </motion.p>
  );
}
