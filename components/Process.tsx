"use client";
import { useRef, useState } from "react";
import { useOnScroll } from "@/lib/hooks";

const STEPS = [
  ["01 Discovery & scope", "We discuss your business, audience, current challenges and desired deliverables. A written scope sets out the services, responsibilities, timelines, revision rounds and commercials."],
  ["02 Direction & execution", "We agree the creative or technical direction before detailed production. Scheduled reviews let you assess content, designs or functionality and share consolidated feedback."],
  ["03 Handover & ongoing support", "We prepare the agreed final assets, formats or website handover and explain the next steps. Advertising spend, third-party costs and ongoing support are agreed separately where applicable."],
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useOnScroll(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--p", String(Math.min(Math.max((innerHeight * 0.6 - r.top) / r.height, 0), 1)));
    setActive(stepRefs.current.filter((s) => s && s.getBoundingClientRect().top < innerHeight * 0.62).length);
  });

  return (
    <section className="proc" id="process">
      <div className="wrap">
        <h2>A clear process for every project</h2>
        <div className="steps" ref={ref}>
          <div className="rail"><i /></div>
          {STEPS.map(([title, text], i) => (
            <div key={title} className={`step${i < active ? " on" : ""}`} ref={(el) => { stepRefs.current[i] = el; }}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
