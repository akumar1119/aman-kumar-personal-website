"use client";

import { INTEL_POSTS, OFF_CLOCK, LINKS } from "@/lib/constants";

export default function IntelFeed() {
  return (
    <section id="content" className="section-alt">
      <div style={{ maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
        {/* Section number + label */}
        <div className="section-header reveal">
          <span className="section-number">05</span>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              marginTop: "var(--space-2)",
            }}
          >
            WEEKLY AI NEWSFLASH
          </p>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              marginTop: "var(--space-1)",
            }}
          >
            Latest dispatches — every Tuesday
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-10)",
          }}
          className="intel-grid"
        >
          {/* LEFT COLUMN — Intel posts */}
          <div className="reveal-children" style={{ gridColumn: "span 1" }}>
            {INTEL_POSTS.map((post, i) => (
              <a
                key={i}
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal"
                style={{
                  "--i": i,
                  display: "block",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-faint)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem 1.5rem",
                  marginBottom: "var(--space-4)",
                  textDecoration: "none",
                  transition: "border-color 200ms, box-shadow 200ms",
                  cursor: "pointer",
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.boxShadow = "0 0 20px var(--blue-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-faint)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-ghost)" }}>
                    {post.date}
                  </span>
                  {post.isLatest && (
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: "var(--blue-glow)",
                        color: "var(--blue-bright)",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      [LATEST]
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontWeight: 500,
                    marginBottom: "var(--space-3)",
                    lineHeight: "1.5",
                    fontSize: "var(--text-sm)",
                    color: "var(--text-primary)",
                  }}
                >
                  {post.title}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "var(--text-xs)",
                    color: "var(--text-ghost)",
                  }}
                >
                  <span>
                    {post.reactions} reactions &middot; {post.comments} comments
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      color: "var(--blue-bright)",
                    }}
                  >
                    Read on LinkedIn &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* RIGHT COLUMN — Off the Clock */}
          <div className="reveal">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "var(--space-6)",
              }}
            >
              Off the Clock
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {OFF_CLOCK.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-4)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginBottom: "var(--space-1)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive grid */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .intel-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
      `}</style>
    </section>
  );
}
