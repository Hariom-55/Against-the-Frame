import Link from "next/link";
import { services, slugify } from "@/data/services";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>ATF Media House</span>
        <span>Against the Frame</span>
      </div>
      <div className="wrap flinks">
        {services.map(([t]) => <Link key={t} href={`/services/${slugify(t)}`}>{t}</Link>)}
        <Link href="/portfolio">Portfolio</Link>
      </div>
    </footer>
  );
}
