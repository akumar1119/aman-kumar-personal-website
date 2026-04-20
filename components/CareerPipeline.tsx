"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CAREER } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function DealCard({
  stage,
  stageColor,
  company,
  role,
  dates,
  win,
  metric,
  isCurrent,
  isTarget,
  index,
}: {
  stage: string;
  stageColor: string;
  company: string;
  role: string;
  dates: string;
  win: string;
  metric: string;
  isCurrent: boolean;
  isTarget: boolean;
  index: number;
}) {
  const cardStyle: React.CSSProperties = {
    background: "var(--color-surface)",
    border: isTarget
      ? "2px solid var(--color-primary)"
      : "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    boxShadow: isTarget ? "var(--shadow-glow)" : "var(--shadow-sm)",
    overflow: "hidden",
    ...(isTarget
      ? {
          background:
            "linear-gradient(135deg, var(--color-surface), rgba(37, 99, 235, 0.05))",
        }
      : {}),
  };

  // Split dates to highlight "Present"
  const renderDates = () => {
    if (!isCurrent || !dates.includes("Present")) {
      return <>{dates}</>;
    }
    const parts = dates.split("Present");
    return (
      <>
        {parts[0]}
        <span style={{ color: "var(--color-accent)" }}>Present</span>
      </>
    );
  };

  return (
    <motion.div
      variants={fadeInUp}
      style={{
        ...cardStyle,
        padding: "var(--space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        minHeight: 220,
        position: "relative",
      }}
    >
      {/* Step number badge — top right */}
      <span
        style={{
          position: "absolute",
          top: "var(--space-4)",
          right: "var(--space-4)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-faint)",
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Stage badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "0.08em",
          color: "var(--color-text-muted)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: stageColor,
            flexShrink: 0,
            ...(isCurrent
              ? {
                  animation: "pulse-glow 2s ease-in-out infinite",
                }
              : {}),
          }}
        />
        {stage}
        {isCurrent && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-1)",
              color: "var(--color-accent)",
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-success)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            ACTIVE
          </span>
        )}
      </div>

      {/* Company */}
      <h3
        style={{
          fontSize: "var(--text-lg)",
          fontWeight: 700,
          color: "var(--color-text)",
          lineHeight: 1.2,
        }}
      >
        {company}
      </h3>

      {/* Role */}
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          lineHeight: 1.5,
        }}
      >
        {role}
      </p>

      {/* Dates */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-faint)",
        }}
      >
        {renderDates()}
      </p>

      {/* Key win + metric — always visible */}
      {!isTarget && (
        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid var(--color-divider)",
            paddingTop: "var(--space-3)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text)",
              lineHeight: 1.6,
            }}
          >
            {win}
          </p>
          {metric && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
                color: "var(--color-accent)",
                fontWeight: 600,
              }}
            >
              {metric}
            </p>
          )}
        </div>
      )}

      {/* Target card special content */}
      {isTarget && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginTop: "auto",
          }}
        >
          {win}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1em",
              background: "var(--color-accent)",
              animation: "blink 1s step-end infinite",
            }}
          />
        </p>
      )}
    </motion.div>
  );
}

function PipelineConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        height: 2,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: "100%",
          background: "var(--color-primary)",
          opacity: 0.4,
          borderRadius: 1,
        }}
      />
    </div>
  );
}

export default function CareerPipeline({ className }: { className?: string }) {
  return (
    <section
      id="career"
      className={className}
      style={{
        padding: "var(--space-20) var(--space-4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
        {">"} // 03 — SELECT * FROM career_pipeline
      </motion.p>

      {/* Stage headers (desktop) */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "var(--space-4)",
          maxWidth: 1200,
          width: "100%",
          marginBottom: "var(--space-6)",
        }}
        className="career-stage-headers"
      >
        {CAREER.map((deal) => (
          <div
            key={deal.stage}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-faint)",
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >
            {deal.stage}
          </div>
        ))}
      </motion.div>

      {/* Pipeline connector (desktop) */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          position: "relative",
          maxWidth: 1200,
          width: "100%",
          marginBottom: "var(--space-4)",
        }}
        className="career-connector-desktop"
      >
        <PipelineConnector />
      </motion.div>

      {/* Deal cards grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "var(--space-4)",
          maxWidth: 1200,
          width: "100%",
        }}
        className="career-cards-grid"
      >
        {CAREER.map((deal, index) => (
          <DealCard
            key={deal.stage}
            stage={deal.stage}
            stageColor={deal.stageColor}
            company={deal.company}
            role={deal.role}
            dates={deal.dates}
            win={deal.win}
            metric={deal.metric}
            isCurrent={deal.isCurrent}
            isTarget={deal.isTarget}
            index={index}
          />
        ))}
      </motion.div>

      {/* Responsive styles */}
      <style jsx global>{`
        /* 3-column at 1024-1279px */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .career-stage-headers {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .career-cards-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        /* Below 1024px: single column with timeline */
        @media (max-width: 1023px) {
          .career-stage-headers {
            grid-template-columns: 1fr !important;
            gap: var(--space-2) !important;
            margin-bottom: var(--space-6) !important;
          }
          .career-stage-headers > div {
            text-align: left !important;
            padding-left: var(--space-2);
          }
          .career-connector-desktop {
            display: none !important;
          }
          .career-cards-grid {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
            position: relative !important;
          }
          /* Vertical timeline line */
          .career-cards-grid::before {
            content: "" !important;
            position: absolute !important;
            left: 16px !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 2px !important;
            background: var(--color-border) !important;
            z-index: 0 !important;
          }
          .career-cards-grid > div {
            position: relative !important;
            padding-left: 2.5rem !important;
          }
          /* Timeline dot on each card */
          .career-cards-grid > div::before {
            content: "" !important;
            position: absolute !important;
            left: 13px !important;
            top: 1.75rem !important;
            width: 8px !important;
            height: 8px !important;
            border-radius: 50% !important;
            background: var(--color-primary) !important;
            z-index: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
