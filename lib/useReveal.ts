"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe all reveal elements
    const revealElements = document.querySelectorAll(".reveal, .reveal-children, .section-number");
    for (const el of revealElements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}
