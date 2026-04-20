"use client";

import { motion } from "framer-motion";
import { LINKS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Contact({ className }: { className?: string }) {
  return (
    <section
      id="contact"
      className={`py-20 md:py-32 px-6${className ? ` ${className}` : ""}`}
      style={{
        borderTop: "1px solid var(--color-divider)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section label */}
          <motion.p
            className="mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-accent)",
            }}
            variants={fadeInUp}
          >
            // 06 —
          </motion.p>

          {/* Headline */}
          <motion.h2
            className="font-extrabold leading-tight mb-6"
            style={{
              fontSize: "var(--text-2xl)",
              fontFamily: "var(--font-body)",
              color: "var(--color-text)",
            }}
            variants={fadeInUp}
          >
            Ready to Add a Pipeline Builder to Your Team?
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            className="mx-auto mb-10 leading-relaxed"
            style={{
              maxWidth: "50ch",
              fontSize: "var(--text-base)",
              color: "var(--color-text-muted)",
              whiteSpace: "pre-line",
            }}
            variants={fadeInUp}
          >
            {"I don\u2019t wait for inbound. I research, personalize, and close.\nIf you\u2019re building an enterprise sales team \u2014 let\u2019s talk for 20 minutes."}
          </motion.p>

          {/* Social proof line */}
          <motion.p
            className="mb-10"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-accent)",
            }}
            variants={fadeInUp}
          >
            170% over quota. Top performer at OpenText.
          </motion.p>

          {/* CTA row — 2 CTAs only */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
            variants={fadeInUp}
          >
            {/* Book a Call — solid primary */}
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md px-6 text-white font-semibold transition-transform duration-180"
              style={{
                minHeight: "44px",
                background: "var(--color-primary)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Book a Call
            </a>

            {/* Connect on LinkedIn — ghost */}
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md px-6 font-semibold transition-transform duration-180"
              style={{
                minHeight: "44px",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text)";
              }}
            >
              Connect on LinkedIn
            </a>
          </motion.div>

          {/* Email as text */}
          <motion.div
            variants={fadeInUp}
          >
            <a
              href={`mailto:${LINKS.email}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-faint)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-faint)";
              }}
            >
              {LINKS.email}
            </a>
          </motion.div>

          {/* Response time */}
          <motion.p
            className="mt-4 mb-12"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-faint)",
            }}
            variants={fadeInUp}
          >
            Response time: usually same day.
          </motion.p>

        </motion.div>
      </div>
    </section>
  );
}
