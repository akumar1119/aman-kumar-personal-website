"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SKILLS, PROFILE } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function SkillBar({
  name,
  level,
  example,
}: {
  name: string;
  level: number;
  example: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-md)",
        background: isHovered ? "var(--color-surface-3)" : "transparent",
        transition: "background var(--transition)",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "var(--space-2)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span style={{ color: "var(--color-text)", fontSize: "var(--text-sm)" }}>
          {name}
        </span>
        <span
          style={{
            color: "var(--color-accent)",
            fontSize: "var(--text-sm)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {level}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 4,
          background: "var(--color-surface-3)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            height: "100%",
            background: "var(--color-primary)",
            borderRadius: 2,
          }}
        />
      </div>

      {/* Hover example text */}
      <motion.div
        initial={false}
        animate={{
          height: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          overflow: "hidden",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          marginTop: isHovered ? "var(--space-2)" : 0,
        }}
      >
        {example}
      </motion.div>
    </motion.div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: "var(--color-divider)",
        margin: "1.25rem 0",
      }}
    />
  );
}

export default function ProfileDossier({ className }: { className?: string }) {
  return (
    <section
      id="profile"
      className={className}
      style={{
        padding: "var(--space-20) var(--space-4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Radial gradient spotlight behind the card */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Terminal label */}
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-accent)",
          fontSize: "var(--text-sm)",
          marginBottom: "var(--space-8)",
          textAlign: "center",
        }}
      >
        {">"} // 02 — cat profile.json
      </motion.p>

      {/* Card — header + personal fields only */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          maxWidth: 720,
          width: "100%",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-glow)",
          padding: "var(--space-8)",
        }}
      >
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid var(--color-primary)",
                flexShrink: 0,
              }}
            >
              <Image
                src="/headshot.png"
                alt="Aman Kumar"
                width={72}
                height={72}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                color: "var(--color-text)",
                letterSpacing: "0.05em",
              }}
            >
              PROFILE: AMAN KUMAR
            </h2>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--color-success)",
                display: "inline-block",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span style={{ color: "var(--color-accent)" }}>ACTIVE</span>
          </span>
        </motion.div>

        <Divider />

        {/* Fields */}
        <motion.div
          variants={staggerContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <motion.div variants={fadeInUp} style={{ fontSize: "var(--text-sm)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Role: </span>
            <span style={{ color: "var(--color-text)" }}>{PROFILE.role}</span>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ fontSize: "var(--text-sm)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Company: </span>
            <span style={{ color: "var(--color-text)" }}>{PROFILE.company}</span>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ fontSize: "var(--text-sm)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Location: </span>
            <span style={{ color: "var(--color-text)" }}>
              {PROFILE.location} {PROFILE.flag}
            </span>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ fontSize: "var(--text-sm)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Target: </span>
            <span style={{ color: "var(--color-text)" }}>{PROFILE.target}</span>
          </motion.div>
        </motion.div>

        <Divider />

        {/* Info rows */}
        <motion.div
          variants={staggerContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <motion.div variants={fadeInUp} style={{ fontSize: "var(--text-sm)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Background: </span>
            <span style={{ color: "var(--color-text)" }}>{PROFILE.background}</span>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ fontSize: "var(--text-sm)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Education: </span>
            <span style={{ color: "var(--color-text)" }}>{PROFILE.education}</span>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ fontSize: "var(--text-sm)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Journey: </span>
            <span style={{ color: "var(--color-text)" }}>
              {PROFILE.journey} &#9992;&#65039;
            </span>
          </motion.div>
          <motion.div variants={fadeInUp} style={{ fontSize: "var(--text-sm)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Currently: </span>
            <span style={{ color: "var(--color-text)" }}>{PROFILE.currently}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Skills & Certifications — outside the card */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          maxWidth: 720,
          width: "100%",
          marginTop: "var(--space-10)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
        }}
      >
        {/* Core Competencies */}
        <div>
          <motion.h3
            variants={fadeInUp}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.1em",
              marginBottom: "var(--space-4)",
            }}
          >
            CORE COMPETENCIES
          </motion.h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            {SKILLS.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                example={skill.example}
              />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div variants={fadeInUp}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.1em",
              marginBottom: "var(--space-4)",
            }}
          >
            CERTIFICATIONS
          </h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
            }}
          >
            {PROFILE.certifications.map((cert) => (
              <li
                key={cert}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  color: "var(--color-text)",
                }}
              >
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  &#x2713;
                </span>
                {cert}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
