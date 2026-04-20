"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const TRIGGER_WORD = "pipeline";
const MAX_BUFFER = 20;

export default function EasterEgg() {
  const bufferRef = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier-only keys and special keys
      if (e.key.length !== 1) return;

      bufferRef.current += e.key.toLowerCase();

      // Reset if buffer exceeds max length
      if (bufferRef.current.length > MAX_BUFFER) {
        bufferRef.current = bufferRef.current.slice(-TRIGGER_WORD.length);
      }

      // Check if the trigger word is in the buffer
      if (bufferRef.current.includes(TRIGGER_WORD)) {
        bufferRef.current = "";
        fireConfetti();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}

function fireConfetti() {
  const colors = ["#2563eb", "#ffffff", "#60a5fa", "#93c5fd", "#1d4ed8"];

  // Center burst
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { x: 0.5, y: 0.5 },
    colors,
    startVelocity: 35,
    gravity: 0.8,
    ticks: 200,
  });

  // Left-side burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.2, y: 0.6 },
      colors,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 180,
    });
  }, 150);

  // Right-side burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.8, y: 0.6 },
      colors,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 180,
    });
  }, 300);

  // Final shower
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 160,
      origin: { x: 0.5, y: 0.4 },
      colors,
      startVelocity: 25,
      gravity: 1,
      ticks: 200,
      shapes: ["circle"],
    });
  }, 500);
}
