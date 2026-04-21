"use client";

import { useRef, useState, useEffect } from "react";
import { SKILLS, PROFILE } from "@/lib/constants";

function SkillBar({
  name,
  level,
  example,
  index,
}: {
  name: string;
  level: number;
  example: string;
  index: number;
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
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="reveal"
      style={{
        "--i": index,
        padding: "var(--space-2) var(--space-3)",
        borderRadius: "var(--radius-md)",
        background: isHovered ? "var(--bg-highlight)" : "transparent",
        transition: "background var(--transition)",
        cursor: "default",
      } as React.CSSProperties}
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
        <span style={{ color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>
          {name}
        </span>
      </div>

      {/* Progress bar — no percentage */}
      <div
        style={{
          width: "100%",
          height: "3px",
          background: "var(--bg-highlight)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "var(--blue-core)",
            borderRadius: "2px",
            width: isVisible ? `${level}%` : "0%",
            transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        />
      </div>

      {/* Hover example text — replaces percentage */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-xs)",
          fontStyle: "italic",
          color: "var(--text-muted)",
          marginTop: isHovered ? "var(--space-2)" : 0,
          opacity: isHovered ? 1 : 0,
          height: isHovered ? "auto" : 0,
          overflow: "hidden",
          transition: "opacity 200ms ease, margin 200ms ease",
        }}
      >
        {example}
      </div>
    </div>
  );
}

export default function ProfileDossier() {
  return (
    <section id="profile">
      <div style={{ maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
        {/* Section number + label */}
        <div className="section-header reveal">
          <span className="section-number">02</span>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              marginTop: "var(--space-2)",
            }}
          >
            cat profile.json
          </p>
        </div>

        {/* Unified dossier card */}
        <div
          className="reveal"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "16px",
            padding: "var(--space-8)",
            boxShadow: "0 0 0 1px var(--border-faint), 0 -1px 0 0 rgba(37, 99, 235, 0.3), 0 32px 64px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              marginBottom: "var(--space-6)",
              paddingBottom: "var(--space-6)",
              borderBottom: "1px solid var(--border-faint)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "0.05em",
              }}
            >
              PROFILE: AMAN KUMAR
            </h2>
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
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span style={{ color: "var(--blue-bright)" }}>ACTIVE</span>
            </span>
          </div>

          {/* Two-column layout: info left, skills+certs right */}
          <div className="profile-grid">
            {/* Left column — Profile fields */}
            <div>
              {/* Fields */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  marginBottom: "var(--space-6)",
                  paddingBottom: "var(--space-6)",
                  borderBottom: "1px solid var(--border-faint)",
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Role: </span>
                  <span style={{ color: "var(--text-primary)" }}>{PROFILE.role}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Company: </span>
                  <span style={{ color: "var(--text-primary)" }}>{PROFILE.company}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Location: </span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {PROFILE.location} {PROFILE.flag}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Target: </span>
                  <span style={{ color: "var(--text-primary)" }}>{PROFILE.target}</span>
                </div>
              </div>

              {/* Info rows */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Background: </span>
                  <span style={{ color: "var(--text-primary)" }}>{PROFILE.background}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Education: </span>
                  <span style={{ color: "var(--text-primary)" }}>{PROFILE.education}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Journey: </span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {PROFILE.journey}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Currently: </span>
                  <span style={{ color: "var(--text-primary)" }}>{PROFILE.currently}</span>
                </div>
              </div>
            </div>

            {/* Right column — Skills + Certifications */}
            <div
              style={{
                borderLeft: "1px solid var(--border-faint)",
                paddingLeft: "var(--space-8)",
              }}
              className="profile-right-col"
            >
              {/* Skills */}
              <div style={{ marginBottom: "var(--space-6)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  CORE COMPETENCIES
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                  {SKILLS.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      example={skill.example}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--text-muted)",
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
                        color: "var(--text-primary)",
                      }}
                    >
                      <span style={{ color: "var(--blue-core)", fontSize: "var(--text-xs)" }}>
                        &#x2713;
                      </span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: stack columns on mobile */}
      <style jsx global>{`
        .profile-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: var(--space-8);
        }
        @media (max-width: 767px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
          .profile-right-col {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--border-faint);
            padding-top: var(--space-6);
          }
        }
      `}</style>
    </section>
  );
}
