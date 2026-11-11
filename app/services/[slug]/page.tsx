import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Viewfinder from "@/components/Viewfinder";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { services, slugify } from "@/data/services";
import { BRAND, CITY, SITE_URL, inCity } from "@/data/seo";

export const instant = false;
export const generateStaticParams = () => services.map(([t]) => ({ slug: slugify(t) }));

const find = (slug: string) => services.find(([t]) => slugify(t) === slug);
const trim = (s: string, n = 155) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n)).replace(/[,.;:]$/, "") + "...");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = find((await params).slug);
  if (!s) return {};
  const [title, hint, items] = s;
  return {
    title: `${title}${inCity}`,
    description: trim(`${hint} ${items[0][1]}`),
    alternates: { canonical: `/services/${slugify(title)}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = find(slug);
  if (!s) notFound();
  const [title, hint, items] = s;
  const url = `${SITE_URL}/services/${slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      description: `${hint} ${items.map(([n]) => n).join(", ")}.`,
      url,
      provider: { "@type": "Organization", name: BRAND, url: SITE_URL },
      ...(CITY ? { areaServed: CITY } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Viewfinder />
      <Cursor />
      <Nav />
      <main className="sv">
        <div className="wrap">
          <p className="crumb"><Link href="/">Home</Link> / <Link href="/#services">Services</Link> / {title}</p>
          <h1>{title}{inCity}</h1>
          <p className="lead">{hint}</p>
          <div className="sv-items">
            {items.map(([name, text]) => (
              <section key={name}>
                <h2>{name}</h2>
                <p>{text}</p>
              </section>
            ))}
          </div>
          <Link className="btn" href="/#contact">Start a project</Link>
          <h2 className="sv-more">Other services</h2>
          <ul className="sv-list">
            {services.filter(([t]) => t !== title).map(([t]) => (
              <li key={t}><Link href={`/services/${slugify(t)}`}>{t}</Link></li>
            ))}
            <li><Link href="/portfolio">Portfolio</Link></li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
