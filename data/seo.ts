import { site } from "@/data/site";

/** Live domain. Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://theirdomain.com). Falls back to the Vercel production URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const BRAND = "ATF Media House";

/** Add the client's city / service area once confirmed. It is appended to titles, headings and descriptions. */
export const CITY = ""; // <- REPLACE, e.g. "Mumbai"
export const inCity = CITY ? ` in ${CITY}` : "";

export const DEFAULT_TITLE = `${BRAND} | Video, Branding and Digital Marketing${inCity}`;
export const DEFAULT_DESC = `${BRAND} brings creative production and digital services together: video production, brand design, social media, digital marketing and websites${inCity}.`;

const real = (u?: string) => (u && !u.includes("REPLACE") ? u : undefined);

/** Organization structured data. Only real links go in sameAs (placeholders are skipped). */
export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND,
  alternateName: "Against the Frame",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: DEFAULT_DESC,
  founder: { "@type": "Person", name: "Prashant Tiwari" },
  sameAs: [real(site.instagram), real(site.youtube), real(site.linkedin)].filter(Boolean),
};
