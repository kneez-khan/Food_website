import { useEffect, useRef, useState } from "react";

/** Adds `is-in` to every `.reveal` element when it scrolls into view. */
export function useRevealAll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    const scan = () => document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => (io.disconnect(), mo.disconnect());
  }, []);
}

/** Returns a ref whose element translates on scroll by `speed` × distance from viewport centre. */
export function useParallax<T extends HTMLElement>(speed = 0.1) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const r = el.parentElement!.getBoundingClientRect();
      const off = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    };
    const on = () => (cancelAnimationFrame(raf), (raf = requestAnimationFrame(tick)));
    tick();
    window.addEventListener("scroll", on, { passive: true });
    return () => (window.removeEventListener("scroll", on), cancelAnimationFrame(raf));
  }, [speed]);
  return ref;
}

/** Subtle perspective tilt following the pointer. */
export function useTilt<T extends HTMLElement>(max = 5) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
    };
    const leave = () => (el.style.transform = "perspective(1200px) rotateY(0) rotateX(0)");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => (el.removeEventListener("pointermove", move), el.removeEventListener("pointerleave", leave));
  }, [max]);
  return ref;
}

export function useScrolled(y = 24) {
  const [s, set] = useState(false);
  useEffect(() => {
    const on = () => set(window.scrollY > y);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [y]);
  return s;
}
