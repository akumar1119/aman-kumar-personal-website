"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Target, Link2 } from "lucide-react";
import { VALUE_PROPS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ICON_MAP = {
  "AI-Powered Prospecting": Brain,
  "Full-Cycle Selling": Target,
  "EDI & Supply Chain SaaS": Link2,
} as const;

function ValueCard({
  title,
  description,
  tools,
  size,
  index,
}: {
  title: string;
  description: string;
  tools: readonly string[];
  size: "medium" | "large";
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = ICON_MAP[title as keyof typeof ICON_MAP];

  return (
    <motion.div
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? "var(--color-surface-3)" : "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding:
          size === "large"
            ? "var(--space-8)"
            : "var(--space-6)",
        boxShadow: isHovered ? "var(--shadow-glow)" : "none",
        transition: "background var(--transition), box-shadow var(--transition)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        ...(size === "large"
          ? { justifyContent: "center", gridRow: "span 2" }
          : {}),
        cursor: "default",
      }}
    >
      {/* Title with icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
        }}
      >
        {Icon && (
          <Icon
            size={size === "large" ? 22 : 18}
            style={{
              color: "var(--color-accent)",
              flexShrink: 0,
            }}
          />
        )}
        <h3
          style={{
            fontSize: size === "large" ? "var(--text-xl)" : "var(--text-base)",
            fontWeight: 700,
            color: "var(--color-text)",
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          lineHeight: 1.7,
          ...(size === "large"
            ? { fontSize: "var(--text-base)" }
            : {}),
        }}
      >
        {description}
      </p>

      {/* Tagline for EDI card */}
      {title === "EDI & Supply Chain SaaS" && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-accent)",
            fontStyle: "italic",
            marginTop: "var(--space-2)",
          }}
        >
          &quot;The niche almost no AE candidate owns.&quot;
        </p>
      )}

      {/* Tool badges */}
      {tools.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-2)",
            marginTop: "auto",
          }}
        >
          {tools.map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border)",
                borderRadius: "9999px",
                padding: "var(--space-1) var(--space-3)",
                background: "var(--color-surface-2)",
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function ValueProps({ className }: { className?: string }) {
  return (
    <section
      id="work"
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
        {">"} // 04 — SELECT capabilities FROM skillset;
      </motion.p>

      {/* Asymmetric 2+1 grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "var(--space-6)",
          maxWidth: 960,
          width: "100%",
        }}
        className="value-props-grid"
      >
        {VALUE_PROPS.map((prop, index) => (
          <ValueCard
            key={prop.title}
            title={prop.title}
            description={prop.description}
            tools={prop.tools}
            size={prop.size}
            index={index}
          />
        ))}
      </motion.div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .value-props-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .value-props-grid > *:nth-child(1) {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          .value-props-grid > *:nth-child(2) {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          .value-props-grid > *:nth-child(3) {
            grid-column: 2 !important;
            grid-row: 1 / 3 !important;
          }
        }
        @media (max-width: 767px) {
          .value-props-grid > *:nth-child(3) {
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
