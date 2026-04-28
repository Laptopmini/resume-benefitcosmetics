export const tiltOnHover = {
  whileHover: { rotate: 2, scale: 1.03 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
} as const;

export const sparklePulse = {
  animate: { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] },
  transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
};

export const bannerEntrance = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
} as const;

export const marqueeDrift = {
  animate: { x: ["0%", "-50%"] },
  transition: { duration: 22, ease: "linear", repeat: Infinity },
} as const;

export function parallaxFloat(progress: number): number {
  return -40 + progress * 80;
}
