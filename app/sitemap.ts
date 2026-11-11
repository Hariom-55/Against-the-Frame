import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";
import { services, slugify } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/portfolio`, priority: 0.8 },
    ...services.map(([title]) => ({ url: `${SITE_URL}/services/${slugify(title)}`, priority: 0.8 })),
  ];
}
