import type { Metadata } from "next";
import { Caveat, Inter, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import { COPY } from "@/content/resume";

const playfair = Playfair_Display({ weight: ["900"], variable: "--font-display" });
const caveat = Caveat({ weight: ["700"], variable: "--font-script" });
const inter = Inter({ weight: ["400", "600"], variable: "--font-body" });
const spaceMono = Space_Mono({ weight: ["700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Paul-Valentin Mini — Lead Frontend Engineer",
  description: COPY.heroTagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[playfair.variable, caveat.variable, inter.variable, spaceMono.variable].join(" ")}
    >
      <body className="font-body paper-grain min-h-screen">{children}</body>
    </html>
  );
}
