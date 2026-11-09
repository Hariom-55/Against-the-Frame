"use client";
import { useEffect, useRef } from "react";
import { useOnScroll } from "@/lib/hooks";

/** Scroll progress bar + fixed camera viewfinder frame with a running timecode. */
export default function Viewfinder() {
  const bar = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);

  useOnScroll(() => {
    const max = document.documentElement.scrollHeight - innerHeight || 1;
    if (bar.current) bar.current.style.transform = `scaleX(${scrollY / max})`;
  });

  useEffect(() => {
    const t0 = performance.now();
    const p = (n: number) => String(n).padStart(2, "0");
    const id = setInterval(() => {
      const e = (performance.now() - t0) / 1000;
      const s = Math.floor(e);
      const f = Math.floor(e * 24) % 24;
      if (tc.current) tc.current.textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(f)}`;
    }, 41);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div id="bar" ref={bar} />
      <div className="vf" aria-hidden="true">
        <i /><i /><i /><i />
        <div className="rec"><b /><span ref={tc}>00:00:00:00</span></div>
      </div>
    </>
  );
}
