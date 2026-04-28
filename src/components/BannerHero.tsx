"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Sparkle from "@/components/Sparkle";
import Starburst from "@/components/Starburst";
import { COPY, PROFILE } from "@/content/resume";
import { withBasePath } from "@/lib/basePath";
import { bannerEntrance, parallaxFloat, tiltOnHover } from "@/lib/motion";

export default function BannerHero() {
  const { scrollYProgress } = useScroll();

  return (
    <section
      data-testid="hero"
      className="bg-rose text-cream ink-rule shadow-hard rounded-lg p-10 relative overflow-hidden"
    >
      <Starburst className="absolute top-4 right-4" size={100}>
        <span className="font-script text-2xl text-ink">{COPY.heroEyebrow}</span>
      </Starburst>

      <motion.div {...bannerEntrance} className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            {...tiltOnHover}
            className="border-[6px] border-cream rounded-full shadow-hard"
          >
            <Image
              src={withBasePath("/profile.png")}
              width={180}
              height={180}
              alt={PROFILE.name}
              className="rounded-full"
            />
          </motion.div>

          <h1 data-testid="hero-name" className="font-display text-6xl mt-6">
            {PROFILE.name}
          </h1>

          <p data-testid="hero-tagline" className="font-mono text-lg mt-2">
            {COPY.heroTagline}
          </p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [parallaxFloat(0), parallaxFloat(1)]) }}
        className="absolute top-8 left-8"
      >
        <Sparkle size={32} />
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [parallaxFloat(0), parallaxFloat(1)]) }}
        className="absolute bottom-12 left-16"
      >
        <Sparkle size={20} />
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [parallaxFloat(0), parallaxFloat(1)]) }}
        className="absolute top-20 right-20"
      >
        <Sparkle size={28} />
      </motion.div>
    </section>
  );
}
