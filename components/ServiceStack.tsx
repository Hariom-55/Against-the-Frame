"use client";
import { useRef, type CSSProperties } from "react";
import { prefersReducedMotion, useOnScroll } from "@/lib/hooks";
import Link from "next/link";
import { services, slugify } from "@/data/services";

export default function ServiceStack() {
  const panels = useRef<(HTMLElement | null)[]>([]);

  // Each panel scales down slightly once the next one starts covering it.
  useOnScroll(() => {
    const reduce = prefersReducedMotion();
    panels.current.forEach((el, i) => {
      const next = panels.current[i + 1];
      if (!el) return;
      const covered = next && next.getBoundingClientRect().top < el.getBoundingClientRect().top + el.offsetHeight * 0.9;
      el.style.transform = covered && !reduce ? "scale(.96)" : "none";
    });
  });

  return (
    <section className="svc" id="services">
      <div className="wrap">
        <h2>What we do</h2>
        {services.map(([title, hint, items], i) => (
          <article
            key={title}
            className="panel"
            style={{ "--i": i } as CSSProperties}
            ref={(el) => { panels.current[i] = el; }}
          >
            <div>
              <p className="hint">{hint}</p>
              <h3>{title}</h3>
              <Link className="more" href={`/services/${slugify(title)}`}>Learn more</Link>
            </div>
            <div className="items">
              {items.map(([name, text]) => (
                <div key={name}>
                  <h4>{name}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
