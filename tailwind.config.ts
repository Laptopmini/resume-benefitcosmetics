import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: "var(--rose)",
        cream: "var(--cream)",
        ink: "var(--ink)",
        mustard: "var(--mustard)",
        mint: "var(--mint)",
        blush: "var(--blush)",
        gold: "var(--gold-foil)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        script: ["var(--font-script)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        hard: "6px 6px 0 var(--ink)",
        pin: "2px 4px 0 rgba(26,20,16,0.45)",
      },
      maxWidth: {
        editorial: "1100px",
      },
    },
  },
} satisfies Config;
