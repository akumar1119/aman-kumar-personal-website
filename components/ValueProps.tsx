"use client";

import { VALUE_PROPS } from "@/lib/constants";

function ValueCard({
  title,
  description,
  tools,
  size,
  index,
  isSpotlight,
}: {
  title: string;
  description: string;
  tools: readonly string[];
  size: "medium" | "large";
  index: number;
  isSpotlight: boolean;
}) {
  return (
    <div
      className={`reveal${isSpotlight ? " card--spotlight" : ""}`}
      style={{
        "--i": index,
        background: isSpotlight ? undefined : "var(--bg-surface)",
        border: isSpotlight ? undefined : "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: size === "large" ? "var(--space-8)" : "var(--space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        cursor: "default",
        transition: "border-color 200ms, box-shadow 200ms",
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (!isSpotlight) {
          e.currentTarget.style.borderColor = "var(--border-accent)";
          e.currentTarget.style.boxShadow = "0 0 20px var(--blue-glow)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSpotlight) {
          e.currentTarget.style.borderColor = "var(--border-subtle)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {/* Title — no icon (RULE 4) */}
      <h3
        style={{
          fontSize: size === "large" ? "var(--text-xl)" : "var(--text-base)",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.3,
          position: "relative",
          zIndex: 1,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: size === "large" ? "var(--text-base)" : "var(--text-sm)",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          position: "relative",
          zIndex: 1,
        }}
      >
        {description}
      </p>

      {/* Tagline for spotlight card */}
      {isSpotlight && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--blue-bright)",
            fontStyle: "italic",
            marginTop: "var(--space-2)",
            position: "relative",
            zIndex: 1,
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
            position: "relative",
            zIndex: 1,
          }}
        >
          {tools.map((tool) => (
            <span key={tool} className="badge">
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ValueProps() {
  return (
    <section id="work">
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Section number + label */}
        <div className="section-header reveal">
          <span className="section-number">04</span>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              marginTop: "var(--space-2)",
            }}
          >
            WHAT I DO
          </p>
        </div>

        {/* Asymmetric bento grid: 2+1 */}
        <div className="reveal-children">
          {/* Row 1: Prospecting (left) | EDI spotlight (right, spans 2 rows) */}
          <div
            className="value-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--space-6)",
            }}
          >
            {VALUE_PROPS.map((prop, index) => (
              <div
                key={prop.title}
                className="value-grid-item"
                style={{
                  gridRow: prop.size === "large" ? "span 2" : undefined,
                }}
              >
                <ValueCard
                  title={prop.title}
                  description={prop.description}
                  tools={prop.tools}
                  size={prop.size}
                  index={index}
                  isSpotlight={prop.size === "large"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive bento grid */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .value-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .value-grid-item:nth-child(1) {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          .value-grid-item:nth-child(2) {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          .value-grid-item:nth-child(3) {
            grid-column: 2 !important;
            grid-row: 1 / 3 !important;
          }
        }
        @media (max-width: 767px) {
          .value-grid-item:nth-child(3) {
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
