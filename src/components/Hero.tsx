"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { resume } from "@/content/resume";
import { withBasePath } from "@/lib/basePath";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section
      data-testid="hero"
      className="min-h-[90vh] relative flex items-center justify-center overflow-hidden"
    >
      <motion.div
        data-testid="hero-bg"
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-secondary)]"
        style={{ y }}
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <Image
          data-testid="hero-avatar"
          src={withBasePath("/profile.png")}
          width={240}
          height={240}
          priority
          alt="Profile"
          className="rounded-full"
        />
        <motion.h1
          data-testid="hero-name"
          className="text-5xl md:text-7xl font-semibold tracking-tight mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {resume.profile.name}
        </motion.h1>
        <motion.p
          data-testid="hero-title"
          className="text-xl md:text-2xl text-[var(--color-muted)] mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Senior Software Developer
        </motion.p>
        <motion.p
          data-testid="hero-tagline"
          className="mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {resume.profile.tagline}
        </motion.p>
      </div>
    </section>
  );
}
