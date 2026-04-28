"use client";

import { motion } from "framer-motion";
import { sparklePulse } from "@/lib/motion";

export default function Sparkle({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      data-testid="sparkle"
      className={className}
      animate={sparklePulse.animate}
      transition={sparklePulse.transition}
    >
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="var(--gold-foil)" />
    </motion.svg>
  );
}
