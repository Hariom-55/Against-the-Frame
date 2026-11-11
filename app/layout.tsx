import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "./contact.css";
import "./portfolio.css";
import "./partners.css";
import "./service.css";
import { DEFAULT_DESC, DEFAULT_TITLE, SITE_URL } from "@/data/seo";
import { Analytics } from "@vercel/analytics/next";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | ATF Media House" },
  description: DEFAULT_DESC,
  openGraph: { type: "website", siteName: "ATF Media House" },
  twitter: { card: "summary_large_image" },
};

// Runs before paint: plays the lens intro only on a visitor's first view this session,
// and never for reduced-motion users. LensIntro sets the "atf-intro" flag when it finishes.
const preScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('atf-intro'))document.documentElement.classList.add('pre')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${anton.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
