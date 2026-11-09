import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });

export const metadata: Metadata = {
  title: "ATF Media House | Against the Frame",
  description: "A media and digital solutions partner for brands that want thoughtful content and technology that works.",
};

// Runs before paint: marks the page as "pre-intro" unless the visitor prefers reduced motion.
const preScript = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('pre')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
