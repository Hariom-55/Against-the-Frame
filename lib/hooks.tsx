"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const hasFinePointer = () => matchMedia("(hover:hover) and (pointer:fine)").matches;

/** Runs fn on mount, scroll and resize. Always calls the latest fn. */
export function useOnScroll(fn: () => void) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    const h = () => ref.current();
    h();
    addEventListener("scroll", h, { passive: true });
    addEventListener("resize", h);
    return () => {
      removeEventListener("scroll", h);
      removeEventListener("resize", h);
    };
  }, []);
}

export function useInView<T extends Element>(opts: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, seen] as const;
}

export function Reveal({ children }: { children: ReactNode }) {
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div ref={ref} className={`rv${seen ? " in" : ""}`}>
      {children}
    </div>
  );
}

export function CountUp({ to }: { to: number }) {
  const [ref, seen] = useInView<HTMLElement>({ threshold: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion()) {
      setN(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const f = (now: number) => {
      const p = Math.min((now - t0) / 1400, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <b ref={ref}>{n}</b>;
}
