import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/src/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Paul-Valentin Mini — Senior Software Developer",
  description: "Paul-Valentin Mini — Senior Software Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body data-testid="app-body">
        <Nav />
        {children}
      </body>
    </html>
  );
}
