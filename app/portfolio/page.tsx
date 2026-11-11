import type { Metadata } from "next";
import Viewfinder from "@/components/Viewfinder";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PortfolioImage from "@/components/PortfolioImage";
import { Reveal } from "@/lib/hooks";
import { events } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio | ATF Media House",
  description: "Selected events covered by ATF Media House, with what we contributed to each.",
};

// Page text. Edit freely.
const HEADING = "Portfolio"; // <- PLACEHOLDER
const INTRO = "Selected events and what we contributed to each."; // <- PLACEHOLDER
const CONTRIB_LABEL = "Our contribution"; // <- PLACEHOLDER

export default function PortfolioPage() {
  return (
    <>
      <Viewfinder />
      <Cursor />
      <Nav />
      <main className="pf">
        <div className="wrap">
          <header className="pf-head">
            <h1>{HEADING}</h1>
            <p>{INTRO}</p>
          </header>
          {events.map((ev, i) => (
            <Reveal key={`${ev.title}-${i}`}>
              <article className={`pf-event${i % 2 ? " flip" : ""}`}>
                <div className="pf-imgs">
                  {ev.images.map((f, j) => <PortfolioImage key={`${f}-${j}`} file={f} alt={`${ev.title}, photo ${j + 1}`} lead={j === 0} />)}
                </div>
                <div className="pf-text">
                  <h2>{ev.title}</h2>
                  <p>{ev.description}</p>
                  <h3>{CONTRIB_LABEL}</h3>
                  <ul>{ev.contributions.map((c, k) => <li key={k}>{c}</li>)}</ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
