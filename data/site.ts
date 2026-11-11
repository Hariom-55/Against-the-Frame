const env = (v?: string) => (v && v.trim() ? v.trim() : undefined);

// REPLACE these two placeholders with the client's real details (or set the env vars in .env.local / Vercel).
const INSTAGRAM_URL = "https://instagram.com/atfmediahouse/"; // full profile URL
const WHATSAPP_NUMBER = "918108278184"; // digits only, with country code, no + or spaces

/** Client contact details. Email, YouTube and LinkedIn stay hidden when unset. */
export const site = {
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP)?.replace(/\D/g, "") ?? WHATSAPP_NUMBER,
  instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM) ?? INSTAGRAM_URL,
  youtube: env(process.env.NEXT_PUBLIC_YOUTUBE),
  linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN),
};

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi ATF Media House, I'd like to discuss a project.")}`;
