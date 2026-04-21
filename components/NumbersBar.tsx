"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { METRICS } from "@/lib/constants";

function scrambleNumber(
  el: HTMLElement,
  finalValue: string
) {
  const chars = "0123456789";
  let iterations = 0;
  const interval = setInterval(() => {
    el.textContent = el.textContent
      ?.split("")
      .map((char, i) => {
        if (i < iterations) return finalValue[i];
        if (/[0-9]/.test(char)) {
          return chars[Math.floor(Math.random() * chars.length)];
        }
        return char;
      })
      .join("") ?? finalValue;
    iterations += 1 / 3;
    if (iterations >= finalValue.length) {
      clearInterval(interval);
      el.textContent = finalValue;
    }
  }, 30);
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof METRICS)[number];
  index: number;
}) {
  const numberRef = useRef<HTMLDivElement>(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animate progress bar on scroll
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgressWidth(metric.progress);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [metric.progress]);

  // Number scramble on hover
  const handleMouseEnter = useCallback(() => {
    if (numberRef.current) {
      scrambleNumber(numberRef.current, metric.displayValue);
    }
  }, [metric.displayValue]);

  return (
    <div
      ref={cardRef}
      className="glow-card metric-card reveal"
      style={{ "--i": index } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
    >
      {/* LIVE indicator — green dot only */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1.5"
        aria-label="Live data"
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--green)",
            display: "inline-block",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Label */}
      <div className="metric-label">{metric.label}</div>

      {/* Number — scramble target */}
      <div ref={numberRef} className="metric-number tabular-nums">
        {metric.displayValue}
      </div>

      {/* Progress bar */}
      <div className="metric-progress">
        <div
          className="metric-progress-bar"
          style={{
            width: `${progressWidth}%`,
            transitionDelay: `${index * 0.1}s`,
          }}
        />
      </div>

      {/* Subtext */}
      <div className="metric-sub">{metric.progressLabel}</div>
    </div>
  );
}

export default function NumbersBar() {
  return (
    <section
      id="numbers"
      style={{
        background: "var(--bg-base)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-faint)",
      }}
    >
      <div style={{ maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
        {/* Section number + label */}
        <div className="section-header reveal">
          <span className="section-number">01</span>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              marginTop: "var(--space-2)",
            }}
          >
            KEY METRICS
          </p>
        </div>

        {/* 3+2 grid */}
        <div className="reveal-children" style={{ "--i-base": 0 } as React.CSSProperties}>
          {/* Row 1: 3 cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-4)",
              marginBottom: "var(--space-4)",
            }}
            className="metrics-row-1"
          >
            {METRICS.slice(0, 3).map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </div>

          {/* Row 2: 2 cards centered */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "var(--space-4)",
              maxWidth: "calc(66.666% - var(--space-4) / 3)",
              margin: "0 auto",
            }}
            className="metrics-row-2"
          >
            {METRICS.slice(3, 5).map((metric, index) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                index={index + 3}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .metrics-row-1 {
            grid-template-columns: 1fr !important;
            margin-bottom: var(--space-4) !important;
          }
          .metrics-row-2 {
            grid-template-columns: 1fr !important;
            max-width: 100% !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .metrics-row-1 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .metrics-row-2 {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
