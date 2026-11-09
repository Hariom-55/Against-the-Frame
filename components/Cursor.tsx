"use client";
import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/hooks";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const over = (e: MouseEvent) => el.classList.toggle("big", !!(e.target as Element).closest("a,.panel"));
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px,${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    loop();
    return () => {
      removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div id="cur" ref={ref} />;
}
