"use client";
import type { MouseEvent } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/hooks";

export default function Cta() {
  const move = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  };
  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <h2><span>Step outside</span><span>the frame.</span></h2>
        {/* TODO: replace href with the client's email / WhatsApp link */}
        <a className="btn" href="#top" onMouseMove={move} onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>
          Start a project
        </a>
      </div>
    </section>
  );
}
