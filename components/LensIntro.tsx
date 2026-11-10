"use client";
import { useEffect, useState } from "react";

const ez = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const cl = (x: number) => Math.min(Math.max(x, 0), 1);
const OFFSETS = [[-300, -110], [260, 140], [-90, 230]];

/**
 * Cinematic intro: three lens rings merge, the aperture opens, then the camera
 * zooms through the lens while the logo pulls into focus. Click skips it.
 * Timing: 0-1.3s merge, 0.5-1.6s aperture opens, 1.7-3.2s zoom, 3.4s done.
 */
export default function LensIntro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const de = document.documentElement;
    if (!de.classList.contains("pre")) {
      setDone(true);
      return;
    }
    const lens = document.getElementById("lens");
    const ap = document.getElementById("ap");
    const rg = document.getElementById("rg");
    const logo = document.getElementById("logo") as HTMLElement | null;
    if (!lens || !ap || !rg) return;
    const rings = Array.from(rg.querySelectorAll("circle"));
    const Z = (Math.hypot(innerWidth, innerHeight) / 2 / 120) * 1.1;
    const T0 = performance.now();
    let raf = 0;
    let over = false;
    scrollTo(0, 0);

    const end = () => {
      if (over) return;
      over = true;
      cancelAnimationFrame(raf);
      de.classList.add("go");
      de.classList.remove("pre");
      try { sessionStorage.setItem("atf-intro", "1"); } catch {}
      if (logo) { logo.style.transform = ""; logo.style.filter = ""; }
      setDone(true);
    };
    lens.addEventListener("click", end);

    const frame = (now: number) => {
      if (over) return;
      const t = (now - T0) / 1000;
      const cx = innerWidth / 2, cy = innerHeight / 2;
      const m = ez(cl(t / 1.3));
      const open = ez(cl((t - 0.5) / 1.1));
      const z = Math.exp(Math.log(Z) * ez(cl((t - 1.7) / 1.5)));
      const r = (6 + 114 * open) * z;
      const a = t * 0.7;
      let pts = "";
      for (let i = 0; i < 6; i++) {
        const th = a + (i * Math.PI) / 3;
        pts += `${cx + r * Math.cos(th)},${cy + r * Math.sin(th)} `;
      }
      ap.setAttribute("points", pts);
      rg.setAttribute("transform", `translate(${cx} ${cy}) scale(${z})`);
      rings.forEach((c, i) => {
        const [dx, dy] = OFFSETS[i];
        c.setAttribute("transform", `translate(${dx * (1 - m)} ${dy * (1 - m)}) rotate(${(i % 2 ? 1 : -1) * (1 - m) * 140})`);
      });
      if (logo) {
        logo.style.transform = `scale(${1.5 - 0.5 * ez(cl(t / 3.2))})`;
        logo.style.filter = `blur(${16 * (1 - ez(cl((t - 0.3) / 2)))}px)`;
      }
      if (t > 2.7) de.classList.add("go");
      if (t > 3.4) return end();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      over = true;
      cancelAnimationFrame(raf);
      lens.removeEventListener("click", end);
    };
  }, []);

  if (done) return null;
  return (
    <div id="lens" aria-hidden="true">
      <svg>
        <defs>
          <mask id="hm" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#fff" />
            <polygon id="ap" fill="#000" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#000" mask="url(#hm)" />
        <g id="rg">
          <circle r="150" fill="none" stroke="#e0301e" strokeWidth="3" />
          <circle r="172" fill="none" stroke="#f2efe9" strokeWidth="12" strokeDasharray="2 10" opacity=".55" />
          <circle r="205" fill="none" stroke="#f2efe9" strokeWidth="2" opacity=".7" />
        </g>
      </svg>
    </div>
  );
}
