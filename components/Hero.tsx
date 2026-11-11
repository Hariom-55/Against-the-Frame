"use client";
import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/hooks";

function Logo() {
  return (
    <h1 className="mark">
      <span className="sr-only">ATF Media House: creative production and digital services</span>
      <svg id="logo" viewBox="70 255 780 290" aria-hidden="true">
        <path fill="#e0301e" fillRule="evenodd" d="M122 268H322Q362 268 362 308V490Q362 530 322 530H240V466H190V530H122Q82 530 82 490V308Q82 268 122 268ZM170 361H248V386H170Z" />
        <path fill="#e0301e" d="M365 268H559Q581 268 581 290V348Q581 370 559 370H527V508Q527 530 505 530H417Q395 530 395 508V370H365Q343 370 343 348V290Q343 268 365 268Z" />
        <path fill="#f2efe9" d="M628 268H800Q840 268 840 308V361H710V386H840V426Q840 466 800 466H710V490Q710 530 670 530H628Q588 530 588 490V308Q588 268 628 268Z" />
        <text
          transform="translate(118 492) rotate(-90)"
          fill="#f2efe9"
          fontWeight={800}
          fontSize={19}
          textLength={195}
          lengthAdjust="spacingAndGlyphs"
          style={{ fontFamily: "var(--font-bricolage), Arial, sans-serif" }}
        >
          AGAINST THE FRAME
        </text>
      </svg>
    </h1>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.style.setProperty("--px", `${(e.clientX / innerWidth - 0.5) * -26}px`);
      el.style.setProperty("--py", `${(e.clientY / innerHeight - 0.5) * -16}px`);
    };
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, []);

  return (
    <header className="hero" id="top" ref={ref}>
      <div className="wrap">
        <Logo />
        <p className="sub">Media House</p>
        <div className="lines">
          <span><em>Creative thinking.</em></span>
          <span><em>Digital capability.</em></span>
        </div>
        <p className="tag">A media and digital solutions partner for brands that want thoughtful content and technology that works.</p>
      </div>
    </header>
  );
}
