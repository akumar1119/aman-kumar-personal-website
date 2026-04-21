"use client";

import { CAREER } from "@/lib/constants";

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
  const renderDates = () => {
    if (!isCurrent || !dates.includes("Present")) {
      return <>{dates}</>;
    }
    const parts = dates.split("Present");
    return (
      <>
        {parts[0]}
        <span style={{ color: "var(--blue-bright)" }}>Present</span>
      </>
    );
  };

  if (isTarget) {
    return (
      <div
        className="pipeline-card pipeline-card--target reveal"
        style={{ "--i": index } as React.CSSProperties}
      >
        <div className="pipeline-card-inner">
          <div className="pipeline-card-front" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            {/* Step number */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--text-ghost)",
                marginBottom: "var(--space-4)",
                display: "block",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                marginBottom: "var(--space-4)",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--blue-core)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.08em",
                  color: "var(--blue-bright)",
                }}
              >
                TARGET
              </span>
            </div>

            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                marginBottom: "var(--space-2)",
              }}
            >
              {company}
            </h3>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
                marginBottom: "var(--space-4)",
              }}
            >
              {role}
            </p>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "var(--border-faint)",
                marginBottom: "var(--space-4)",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {win}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1em",
                  background: "var(--blue-bright)",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </p>
          </div>

          <div className="pipeline-card-back">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
                color: "var(--text-primary)",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Next deal.
              <br />
              Actively in conversation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pipeline-card reveal"
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="pipeline-card-inner">
        {/* Front face */}
        <div className="pipeline-card-front">
          {/* Step number */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-ghost)",
              marginBottom: "var(--space-2)",
              display: "block",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Stage */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              marginBottom: "var(--space-3)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: stageColor,
                flexShrink: 0,
                ...(isCurrent ? { animation: "pulse-glow 2s ease-in-out infinite" } : {}),
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
              }}
            >
              {stage}
            </span>
            {isCurrent && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-1)",
                  color: "var(--blue-bright)",
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--green)",
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
              color: "var(--text-primary)",
              lineHeight: 1.2,
              marginBottom: "var(--space-1)",
            }}
          >
            {company}
          </h3>

          {/* Role */}
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
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
              color: "var(--text-ghost)",
              marginTop: "auto",
            }}
          >
            {renderDates()}
          </p>

          {/* Hover hint */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--text-ghost)",
              marginTop: "var(--space-2)",
              opacity: 0.6,
            }}
          >
            Hover to reveal &rarr;
          </p>
        </div>

        {/* Back face */}
        <div className="pipeline-card-back">
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: "var(--space-3)",
              }}
            >
              {stage}
            </span>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-primary)",
                lineHeight: 1.6,
                marginBottom: "var(--space-4)",
              }}
            >
              {win}
            </p>
            {metric && (
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  color: "var(--blue-bright)",
                  fontWeight: 600,
                }}
              >
                {metric}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareerPipeline() {
  return (
    <section id="career" className="section-alt">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section number + label */}
        <div className="section-header reveal">
          <span className="section-number">03</span>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              marginTop: "var(--space-2)",
            }}
          >
            CAREER PIPELINE
          </p>
        </div>

        {/* Stage headers (desktop) */}
        <div
          className="career-stage-headers"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "var(--space-4)",
            marginBottom: "var(--space-6)",
          }}
        >
          {CAREER.map((deal) => (
            <div
              key={deal.stage}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--text-ghost)",
                letterSpacing: "0.1em",
                textAlign: "center",
              }}
            >
              {deal.stage}
            </div>
          ))}
        </div>

        {/* Connector line (desktop) */}
        <div
          className="career-connector"
          style={{
            position: "relative",
            marginBottom: "var(--space-4)",
            height: "2px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "100%",
              background: "linear-gradient(90deg, var(--blue-core), var(--blue-bright), var(--border-subtle) 85%, transparent)",
              opacity: 0.4,
              borderRadius: "1px",
            }}
          />
        </div>

        {/* Deal cards grid */}
        <div
          className="career-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "var(--space-4)",
          }}
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
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (min-width: 1024px) and (max-width: 1279px) {
          .career-stage-headers {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .career-cards-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .career-connector {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .career-stage-headers {
            display: none !important;
          }
          .career-connector {
            display: none !important;
          }
          .career-cards-grid {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
            margin: 0 auto !important;
            position: relative !important;
          }
          .career-cards-grid::before {
            content: "" !important;
            position: absolute !important;
            left: 16px !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 2px !important;
            background: var(--border-subtle) !important;
            z-index: 0 !important;
          }
          .career-cards-grid > div {
            position: relative !important;
            padding-left: 2.5rem !important;
          }
          .career-cards-grid > div::before {
            content: "" !important;
            position: absolute !important;
            left: 13px !important;
            top: 1.75rem !important;
            width: 8px !important;
            height: 8px !important;
            border-radius: 50% !important;
            background: var(--blue-core) !important;
            z-index: 1 !important;
          }
          .pipeline-card {
            height: auto !important;
          }
          .pipeline-card-inner {
            transform: none !important;
          }
          .pipeline-card:hover .pipeline-card-inner {
            transform: none !important;
          }
          .pipeline-card-back {
            display: none !important;
          }
          .pipeline-card-front {
            position: relative !important;
            backface-visibility: visible !important;
          }
        }
      `}</style>
    </section>
  );
}
