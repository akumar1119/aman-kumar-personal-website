"use client";

import { LINKS } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="contact" className="contact-glow">
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        {/* Section number + label */}
        <div className="section-header reveal">
          <span className="section-number">06</span>
        </div>

        {/* Headline — Cal Sans, NOT --text-hero */}
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-6)",
          }}
        >
          Let&apos;s Talk.
        </h2>

        {/* Sub-copy */}
        <p
          className="reveal"
          style={{
            maxWidth: "44ch",
            margin: "0 auto var(--space-10)",
            fontSize: "var(--text-lg)",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            whiteSpace: "pre-line",
          }}
        >
          {"I don't wait for inbound.\nI research, personalize, and close.\n\nIf you're scaling an enterprise sales team,\nlet's use 20 minutes well."}
        </p>

        {/* CTA row — 2 CTAs */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-4)",
            marginBottom: "var(--space-8)",
          }}
        >
          {/* Book a Call — solid primary */}
          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic inline-flex items-center justify-center no-underline"
            style={{
              background: "var(--blue-core)",
              color: "#ffffff",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              letterSpacing: "0.01em",
              minHeight: "44px",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              border: "none",
              transition: "transform 180ms ease, box-shadow 180ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 0 24px rgba(37, 99, 235, 0.4)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "none";
              el.style.transform = "translateY(0)";
            }}
          >
            Book a Call &rarr;
          </a>

          {/* Connect on LinkedIn — ghost */}
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic inline-flex items-center justify-center no-underline"
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              minHeight: "44px",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              border: "1px solid var(--border-subtle)",
              transition: "transform 180ms ease, border-color 180ms ease, color 180ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-visible)";
              el.style.color = "var(--text-primary)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-subtle)";
              el.style.color = "var(--text-secondary)";
              el.style.transform = "translateY(0)";
            }}
          >
            Connect on LinkedIn
          </a>
        </div>

        {/* Email — mailto only, no raw address visible */}
        <div className="reveal" style={{ marginBottom: "var(--space-4)" }}>
          <a
            href={`mailto:${LINKS.email}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-ghost)",
              textDecoration: "none",
              transition: "color 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--blue-bright)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-ghost)";
            }}
          >
            Email Me &rarr;
          </a>
        </div>

        {/* Response time */}
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--text-ghost)",
            borderTop: "1px solid var(--border-faint)",
            paddingTop: "var(--space-6)",
            maxWidth: "200px",
            margin: "0 auto",
          }}
        >
          Response time: usually same day.
        </p>
      </div>
    </section>
  );
}
