"use client";

import { useEffect } from "react";

export function useMagneticButtons() {
  useEffect(() => {
    const buttons = document.querySelectorAll(".btn-magnetic");

    const handleMouseMove = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transition = "none";
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.transition = "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)";
      btn.style.transform = "translate(0, 0)";
    };

    for (const btn of buttons) {
      btn.addEventListener("mousemove", handleMouseMove as EventListener);
      btn.addEventListener("mouseleave", handleMouseLeave as EventListener);
    }

    return () => {
      for (const btn of buttons) {
        btn.removeEventListener("mousemove", handleMouseMove as EventListener);
        btn.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      }
    };
  }, []);
}
