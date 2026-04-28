"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LINKS } from "@/lib/constants";
import { fadeInLeft, fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

interface HeroProps {
  visible?: boolean;
}

export default function Hero({ visible = false }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNumbers = () => {
    document.getElementById("numbers")?.scrollIntoView({ behavior: "smooth" });
  };

  // Word-by-word reveal for hero statement
  const heroWords = ["I", "find", "the", "deal.", "I", "build", "the", "case.", "I", "close", "it.", "170%", "over", "quota."];

  return (
    <section
      id="home"
      data-hero
      ref={heroRef}
      className={`${visible ? "hero-reveal" : "hero-hidden"} relative flex items-center overflow-hidden`}
      style={{
        minHeight: "100dvh",
        background: "var(--bg-base)",
      }}
    >
      {/* Dot grid background — fades at edges via radial mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 40% 45%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 40% 45%, black 20%, transparent 70%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Content — left-aligned at 45% from top */}
      <div
        className="relative z-10 w-full flex flex-col"
        style={{
          maxWidth: "80%",
          margin: "0 auto",
          paddingTop: "2vh",
          paddingBottom: "5vh",
        }}
      >
        {/* Circular profile picture */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid var(--blue-core)",
            boxShadow: "0 0 20px rgba(37, 99, 235, 0.25)",
            marginBottom: "var(--space-6)",
            flexShrink: 0,
          }}
        >
          <Image
            src="/headshot.png"
            alt="Aman Kumar"
            width={160}
            height={160}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        {/* Name — Cal Sans with subtle gradient */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "var(--text-hero)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            background: "var(--hero-name-gradient)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "var(--space-6)",
          }}
        >
          AMAN KUMAR
        </motion.h1>

        {/* Subtitle — Geist Mono */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "var(--space-6)",
          }}
        >
          B2B SAAS SALES &middot; AI PIPELINE &middot; FULL-CYCLE CLOSING
        </motion.p>

        {/* Animated blue underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "2px",
            background: "var(--blue-core)",
            maxWidth: "120px",
            marginBottom: "var(--space-6)",
          }}
        />

        {/* Hero statement — word-by-word reveal */}
        <p style={{ marginBottom: "var(--space-4)" }}>
          {heroWords.map((word, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "var(--text-xl)",
                color: "var(--text-primary)",
                opacity: 0,
                animation: `word-reveal 400ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60 + 800}ms forwards`,
                marginRight: "0.25em",
              }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic inline-flex items-center justify-center rounded-md px-6 no-underline"
            style={{
              background: "var(--blue-core)",
              color: "#ffffff",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              letterSpacing: "0.01em",
              minHeight: "44px",
              padding: "0.75rem 1.5rem",
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

          <button
            onClick={scrollToNumbers}
            className="btn-magnetic inline-flex items-center justify-center rounded-md px-6 cursor-pointer no-underline"
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              minHeight: "44px",
              padding: "0.75rem 1.5rem",
              border: "1px solid var(--border-subtle)",
              borderRadius: "6px",
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
            View the Work &darr;
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator — bottom-right */}
      <motion.div
        className="absolute bottom-8 right-12 flex flex-col items-center gap-2"
        style={{
          opacity: Math.max(0, 1 - scrollY / 200),
          transition: "opacity 200ms ease",
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--text-ghost)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <path
            d="M8 4L8 20M8 20L2 14M8 20L14 14"
            stroke="var(--text-ghost)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
