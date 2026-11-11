"use client";

import { useEffect } from "react";

/**
 * Scroll entrance for [data-rise] elements on the bảng giá pages. Content is visible by
 * default: only elements still below the fold when this runs are lowered and faded, then
 * raised once as they enter, staggered 75ms among siblings. No JS, reduced motion or no
 * IntersectionObserver → nothing is hidden at all.
 */
export function Rise() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.removeAttribute("data-rise-hidden");
          io.unobserve(e.target);
        }
      },
      // Start a little before the element enters, so a fast scroll never lands on blank space.
      { rootMargin: "0px 0px 12% 0px", threshold: 0 }
    );

    const fold = window.innerHeight;
    const seen = new Map<Element, number>();
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("[data-rise]"))) {
      if (el.getBoundingClientRect().top < fold) continue;
      const parent = el.parentElement ?? document.body;
      const n = seen.get(parent) ?? 0;
      seen.set(parent, n + 1);
      el.style.setProperty("--rise-delay", `${Math.min(n, 4) * 70}ms`);
      el.setAttribute("data-rise-hidden", "");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return null;
}
