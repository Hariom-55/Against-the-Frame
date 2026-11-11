import { site } from "@/data/site";

/** Live domain. Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://theirdomain.com). Falls back to the Vercel production URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const BRAND = "ATF Media House";

/** Add the client's city / service area once confirmed. It is appended to titles, headings and descriptions. */
export const CITY = "Mumbai"; // <- REPLACE, e.g. "Mumbai"
export const inCity = CITY ? ` in ${CITY}` : "";

export const DEFAULT_TITLE = `${BRAND} | Video, Design, Web & SEO${inCity}`;
export const DEFAULT_DESC = `${BRAND} brings video production, graphic design, websites and SEO together for businesses${inCity}.`;

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
  ...(CITY ? {areaServed: CITY} : {}),
  founder: { "@type": "Person", name: "Prashant Tiwari" },
  sameAs: [real(site.instagram), real(site.youtube), real(site.linkedin)].filter(Boolean),
};
  