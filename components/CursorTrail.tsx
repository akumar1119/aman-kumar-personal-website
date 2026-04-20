"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface DotPosition {
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [pos1, setPos1] = useState<DotPosition>({ x: -100, y: -100 });
  const [pos2, setPos2] = useState<DotPosition>({ x: -100, y: -100 });
  const [pos3, setPos3] = useState<DotPosition>({ x: -100, y: -100 });
  const [isHoverDevice, setIsHoverDevice] = useState(true);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<DotPosition>({ x: -100, y: -100 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsHoverDevice(!mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHoverDevice(!e.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isHoverDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHoverDevice]);

  // Smooth follow animation loop
  useEffect(() => {
    if (!isHoverDevice) return;

    const ease = 0.25;
    let last2 = { x: -100, y: -100 };
    let last3 = { x: -100, y: -100 };

    const animate = () => {
      const target = targetRef.current;

      // Dot 1 follows target directly
      setPos1({ x: target.x, y: target.y });

      // Dot 2 follows dot 1 with delay
      last2.x += (target.x - last2.x) * ease * 0.6;
      last2.y += (target.y - last2.y) * ease * 0.6;
      setPos2({ x: last2.x, y: last2.y });

      // Dot 3 follows dot 2 with more delay
      last3.x += (last2.x - last3.x) * ease * 0.5;
      last3.y += (last2.y - last3.y) * ease * 0.5;
      setPos3({ x: last3.x, y: last3.y });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHoverDevice]);

  if (!isHoverDevice) return null;

  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      {/* Primary dot */}
      <div
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(37, 99, 235, 0.7)",
          transform: `translate(${pos1.x - 4}px, ${pos1.y - 4}px)`,
        }}
      />
      {/* Trail dot 2 */}
      <div
        style={{
          position: "absolute",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "rgba(37, 99, 235, 0.4)",
          transform: `translate(${pos2.x - 2.5}px, ${pos2.y - 2.5}px)`,
        }}
      />
      {/* Trail dot 3 */}
      <div
        style={{
          position: "absolute",
          width: "3px",
          height: "3px",
          borderRadius: "50%",
          background: "rgba(37, 99, 235, 0.2)",
          transform: `translate(${pos3.x - 1.5}px, ${pos3.y - 1.5}px)`,
        }}
      />
    </div>
  );
}
