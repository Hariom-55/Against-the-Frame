"use client";
import { useState } from "react";
import { partners, type Partner } from "@/data/partners";

// Section text. Edit freely.
const HEADING = "Brands and organisations we’ve worked with"; // <- PLACEHOLDER heading, confirm wording with the client

function Logo({ p, hidden }: { p: Partner; hidden?: boolean }) {
  const [broken, setBroken] = useState(false);
  if (broken) return <span className="plogo txt">{p.name}</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="plogo" src={`/partners/${p.file}`} alt={hidden ? "" : p.name} height={40} loading="lazy" onError={() => setBroken(true)} />
  );
}

export default function Partners() {
  const n = partners.length;
  if (n === 0) return null;
  // Repeat the list so the strip is always wide enough to loop seamlessly.
  const base = Array.from({ length: Math.ceil(16 / n) }, () => partners).flat();

  return (
    <section className="partners" id="partners">
      <div className="wrap"><h2>{HEADING}</h2></div>
      <div className="pmarq">
        <div className="ptrack">
          {[0, 1].map((k) => (
            <div className="pset" key={k} aria-hidden={k === 1}>
              {base.map((p, i) => <Logo key={i} p={p} hidden={k === 1} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
