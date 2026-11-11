"use client";
import { useRef, useState } from "react";
import { CountUp, Reveal, useOnScroll } from "@/lib/hooks";

const STATEMENT =
  "We bring creative production and digital services together, so businesses communicate clearly, build a consistent presence and connect with customers in better ways.";

function WordFill({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [k, setK] = useState(0);
  const words = text.split(" ");
  useOnScroll(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(Math.max((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35), 0), 1);
    setK(Math.round(p * words.length));
  });
  return (
    <p className="words" ref={ref}>
      {words.map((w, i) => (
        <span key={i} className={i < k ? "on" : ""}>{w}{" "}</span>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <WordFill text={STATEMENT} />
        <div className="cols">
          <Reveal>
            <h3>Our perspective</h3>
            <p>Our name reflects a willingness to look beyond familiar ideas. The work begins with understanding the brand and its audience, then choosing the right format, channel and technology for the job.</p>
            <p>Support for a single project or a continuing brand partnership.</p>
          </Reveal>
          <Reveal>
            <h3>What drives the work</h3>
            <p>ATF is built around a multidisciplinary approach to creative and digital work. Our experience spans video editing, content creation, cinematography, website development and digital operations — bringing creative execution and technical thinking together under one roof.</p>
          </Reveal>
        </div>
        <div className="stats">
          <div className="stat"><CountUp to={6} /><span>service lines under one roof</span></div>
          <div className="stat"><CountUp to={15} /><span>specific ways we can help</span></div>
          <div className="stat"><CountUp to={3} /><span>steps from first call to handover</span></div>
        </div>
      </div>
    </section>
  );
}
