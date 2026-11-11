import Link from "next/link";

/** Shared top menu (home + portfolio). Hash links use "/#..." so they work from any page. */
export default function Nav() {
  return (
    <nav>
      <Link href="/#top">ATF / Media House</Link>
      <div className="links">
        <Link href="/#about">About</Link>
        <Link href="/portfolio" className="nav-portfolio">Portfolio</Link>
        <Link href="/#services">Services</Link>
        <Link href="/#process">Process</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </nav>
  );
}
