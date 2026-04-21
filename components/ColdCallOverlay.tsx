"use client";

import { useEffect, useRef, useCallback } from "react";

interface ColdCallOverlayProps {
  onComplete: () => void;
  onShatter: () => void;
}

export default function ColdCallOverlay({ onComplete, onShatter }: ColdCallOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const acceptBtnRef = useRef<HTMLButtonElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const triggerShatter = useCallback(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    const rect = card.getBoundingClientRect();
    const cols = 4;
    const rows = 3;
    const fragW = rect.width / cols;
    const fragH = rect.height / rows;
    const frags: HTMLDivElement[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const frag = document.createElement("div");
        frag.className = "cold-call-fragment";
        frag.style.cssText = `
          width: ${fragW}px;
          height: ${fragH}px;
          left: ${rect.left + c * fragW}px;
          top: ${rect.top + r * fragH}px;
        `;
        document.body.appendChild(frag);
        frags.push(frag);
      }
    }

    card.style.opacity = "0";

    frags.forEach((frag) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 150 + Math.random() * 280;
      const rot = (Math.random() - 0.5) * 90;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const dur = 420 + Math.random() * 180;

      frag.style.transition = `transform ${dur}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${dur}ms ease`;
      frag.getBoundingClientRect();
      frag.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
      frag.style.opacity = "0";

      setTimeout(() => frag.remove(), dur + 50);
    });

    onShatter();

    setTimeout(() => {
      overlay.classList.add("cold-call-fade-out");
      setTimeout(() => onComplete(), 500);
    }, 250);
  }, [onComplete, onShatter]);

  useEffect(() => {
    const waveform = waveformRef.current;
    const acceptBtn = acceptBtnRef.current;
    if (!waveform || !acceptBtn) return;

    const bars = waveform.querySelectorAll(".cold-call-wave-bar");
    const peaks = [8, 16, 24, 20, 28, 12, 26, 18, 24, 14, 20, 10];
    bars.forEach((bar, i) => {
      (bar as HTMLElement).style.setProperty("--peak", peaks[i] + "px");
      (bar as HTMLElement).style.setProperty("--duration", (0.4 + Math.random() * 0.3) + "s");
      (bar as HTMLElement).style.setProperty("--delay", (i * 0.04) + "s");
    });

    const t1 = setTimeout(() => waveform.classList.add("cold-call-animating"), 260);

    const t2 = setTimeout(() => {
      acceptBtn.classList.add("cold-call-flash");
      waveform.classList.remove("cold-call-animating");
      bars.forEach((b) => ((b as HTMLElement).style.height = "4px"));
      setTimeout(triggerShatter, 200);
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [triggerShatter]);

  const clockRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = clockRef.current;
    if (!el) return;
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      el.textContent = `${h}:${m}`;
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={overlayRef} className="cold-call-overlay">
      <div ref={cardRef} className="cold-call-card">
        {/* Top bar */}
        <div className="cold-call-top-bar">
          <span className="cold-call-signal">
            <span className="cold-call-signal-bar" />
            <span className="cold-call-signal-bar" />
            <span className="cold-call-signal-bar" />
            <span className="cold-call-signal-bar" />
          </span>
          <span ref={clockRef} className="cold-call-time" />
          <span className="cold-call-battery">
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
              <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.6" />
              <rect x="2" y="2" width="13" height="8" rx="1.5" fill="currentColor" opacity="0.8" />
              <path d="M20 4v4a2 2 0 000-4z" fill="currentColor" opacity="0.4" />
            </svg>
          </span>
        </div>

        {/* Caller info */}
        <div className="cold-call-caller-info">
          <div className="cold-call-caller-avatar">
            <span className="cold-call-caller-initials">AK</span>
            <span className="cold-call-live-dot" />
          </div>
          <p className="cold-call-calling-label">Incoming call</p>
          <h2 className="cold-call-caller-name">AMAN KUMAR</h2>
          <p className="cold-call-caller-subtitle">B2B SaaS &middot; Toronto</p>
        </div>

        {/* Waveform */}
        <div ref={waveformRef} className="cold-call-waveform">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="cold-call-wave-bar" />
          ))}
        </div>

        {/* Action buttons */}
        <div className="cold-call-actions">
          <button className="cold-call-btn-decline" aria-label="Decline">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23.47 17.17c-.21-2.27-1.7-4.28-3.81-5.14l-.61-.25c-.6-.25-1.3-.08-1.72.42l-1.1 1.34c-.34.41-.88.57-1.38.4C12.52 13.2 10.8 11.48 10.06 9.15c-.17-.5-.01-1.04.4-1.38L11.8 6.67c.5-.42.67-1.12.42-1.72l-.25-.61C11.11 2.23 9.1.74 6.83.53 5.42.4 4.07.88 3.05 1.9L1.9 3.05C.08 4.87-.43 7.52.37 9.93c2.44 7.33 9.37 14.26 16.7 16.7 2.41.8 5.06.29 6.88-1.53l1.15-1.15c1.02-1.02 1.5-2.37 1.37-3.78z" fill="white" />
              <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button ref={acceptBtnRef} className="cold-call-btn-accept" aria-label="Accept">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23.47 17.17c-.21-2.27-1.7-4.28-3.81-5.14l-.61-.25c-.6-.25-1.3-.08-1.72.42l-1.1 1.34c-.34.41-.88.57-1.38.4C12.52 13.2 10.8 11.48 10.06 9.15c-.17-.5-.01-1.04.4-1.38L11.8 6.67c.5-.42.67-1.12.42-1.72l-.25-.61C11.11 2.23 9.1.74 6.83.53 5.42.4 4.07.88 3.05 1.9L1.9 3.05C.08 4.87-.43 7.52.37 9.93c2.44 7.33 9.37 14.26 16.7 16.7 2.41.8 5.06.29 6.88-1.53l1.15-1.15c1.02-1.02 1.5-2.37 1.37-3.78z" fill="white" />
            </svg>
          </button>
        </div>

        <p className="cold-call-swipe-hint">slide to answer</p>
      </div>
    </div>
  );
}
