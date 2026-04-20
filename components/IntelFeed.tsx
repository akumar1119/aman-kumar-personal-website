"use client";

import { motion } from "framer-motion";
import { INTEL_POSTS, OFF_CLOCK, LINKS } from "@/lib/constants";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";

export default function IntelFeed({ className }: { className?: string }) {
  return (
    <section id="content" className={`py-20 md:py-32 px-6${className ? ` ${className}` : ""}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* LEFT COLUMN — 60% */}
          <motion.div className="md:col-span-3" variants={slideInLeft}>
            <div className="mb-8">
              <h2
                className="text-[var(--text-lg)] font-bold tracking-tight mb-2"
                style={{ color: "var(--color-text)" }}
              >
                ⚡ // 05 — WEEKLY AI NEWSFLASH
              </h2>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-muted)",
                }}
              >
                Latest dispatches — every Tuesday
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {INTEL_POSTS.map((post, i) => (
                <motion.a
                  key={i}
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg p-5 transition-colors duration-180"
                  style={{
                    background: "var(--color-surface)",
                    borderLeft: "3px solid var(--color-primary)",
                  }}
                  variants={fadeInUp}
                  whileHover={{
                    backgroundColor: "var(--color-surface-3)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span>⚡</span>
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-faint)",
                      }}
                    >
                      {post.date}
                    </span>
                    {post.isLatest && (
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase"
                        style={{
                          background: "var(--color-primary-glow)",
                          color: "var(--color-primary)",
                        }}
                      >
                        [LATEST]
                      </span>
                    )}
                  </div>

                  <p
                    className="font-medium mb-3 leading-snug"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text)",
                    }}
                  >
                    {post.title}
                  </p>

                  <div
                    className="flex items-center justify-between"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-faint)",
                    }}
                  >
                    <span>
                      ★ {post.reactions} reactions &middot; {post.comments} comments
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Read on LinkedIn &rarr;
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN — 40% */}
          <motion.div className="md:col-span-2" variants={slideInRight}>
            <h2
              className="text-[var(--text-lg)] font-bold tracking-tight mb-8"
              style={{ color: "var(--color-text)" }}
            >
              OFF THE CLOCK
            </h2>

            <div className="flex flex-col">
              {OFF_CLOCK.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-4)",
                    paddingBottom: "var(--space-4)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      flexShrink: 0,
                      color: "var(--color-amber)",
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        color: "var(--color-text)",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
