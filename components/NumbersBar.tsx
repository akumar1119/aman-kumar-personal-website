"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { METRICS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function useCountUp(
  end: number,
  duration: number,
  isActive: boolean,
  format: (val: number) => string
) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = easedProgress * end;

      setDisplay(format(currentValue));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    };
  }, [end, duration, isActive, format]);

  return display;
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof METRICS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  // Format function for the counter
  const formatValue = useCallback(
    (val: number) => {
      if (metric.label === "PIPELINE BUILT") {
        return `$${Math.round(val).toLocaleString("en-US")}`;
      }
      if (metric.label === "SQL ATTAINMENT") {
        return `${val.toFixed(1)}%`;
      }
      if (metric.label === "FULL-CYCLE CLOSED") {
        return `₹${Math.round(val)}M`;
      }
      if (metric.label === "PROSPECTING TIME") {
        return `${Math.round(val)}% Less`;
      }
      if (metric.label === "REVENUE EXPERIENCE") {
        return `${Math.round(val)}+ Years`;
      }
      return String(Math.round(val));
    },
    [metric.label]
  );

  const countDisplay = useCountUp(
    metric.value,
    1200,
    isInView,
    formatValue
  );

  // 3D tilt on hover
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      setTiltStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
        boxShadow: "var(--shadow-glow)",
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)",
      boxShadow: "var(--shadow-sm)",
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex-1 min-w-[220px]"
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        padding: "var(--space-6)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        cursor: "default",
        boxShadow: "var(--shadow-sm)",
        ...tiltStyle,
      }}
    >
      {/* LIVE indicator */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1.5"
        aria-label="Live data"
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--color-success)",
            display: "inline-block",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            color: "var(--color-success)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          Live
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--color-text-faint)",
          marginBottom: "var(--space-2)",
        }}
      >
        {metric.label}
      </div>

      {/* Number */}
      <div
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.75rem)",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "var(--space-3)",
          lineHeight: 1.2,
        }}
      >
        {countDisplay}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "4px",
          background: "var(--color-surface-3)",
          borderRadius: "2px",
          marginBottom: "var(--space-2)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${metric.progress}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.1,
          }}
          style={{
            height: "100%",
            background: "var(--color-primary)",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Subtext */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
        }}
      >
        {metric.progressLabel}
      </div>
    </motion.div>
  );
}

export default function NumbersBar() {
  return (
    <section
      id="numbers"
      className="w-full"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <div
        className="mx-auto px-6 py-12 md:py-16"
        style={{ maxWidth: "1200px" }}
      >
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-accent)",
            fontSize: "var(--text-sm)",
            marginBottom: "var(--space-6)",
            textAlign: "center",
          }}
        >
          {">"} // 01 — KEY METRICS
        </motion.p>
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-4)",
          }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {METRICS.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
