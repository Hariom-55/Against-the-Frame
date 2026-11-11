import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "./contact.css";
import "./portfolio.css";
import "./partners.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });

export const metadata: Metadata = {
  title: "ATF Media House | Against the Frame",
  description: "A media and digital solutions partner for brands that want thoughtful content and technology that works.",
};

// Runs before paint: plays the lens intro only on a visitor's first view this session,
// and never for reduced-motion users. LensIntro sets the "atf-intro" flag when it finishes.
const preScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('atf-intro'))document.documentElement.classList.add('pre')}catch(e){}`;

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
