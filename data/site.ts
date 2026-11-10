const env = (v?: string) => (v && v.trim() ? v.trim() : undefined);

/** Client contact details. Set in .env.local / Vercel env vars. Anything unset is simply hidden. */
export const site = {
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP)?.replace(/\D/g, ""), // digits only, with country code
  instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM),
  youtube: env(process.env.NEXT_PUBLIC_YOUTUBE),
  linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN),
};

export const whatsappLink = site.whatsapp
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi ATF Media House, I'd like to discuss a project.")}`
  : undefined;
