import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="sv">
        <div className="wrap">
          <h1>Page not found</h1>
          <p className="lead">That page doesn’t exist or has moved.</p>
          <Link className="btn" href="/">Back to home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
