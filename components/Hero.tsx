"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, fadeInUpSlow, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      animationDuration: `${15 + Math.random() * 15}s`,
    }));
  }, []);

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNumbers = () => {
    document.getElementById("numbers")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen overflow-hidden grid-pattern"
      style={{
        minHeight: "100dvh",
        background: "var(--color-bg)",
      }}
    >
      {/* Radial gradient glow behind text side */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          width: "600px",
          height: "600px",
          top: "50%",
          right: "10%",
          transform: "translateY(-50%)",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <Particles />

      <div className="relative z-10 flex flex-col lg:flex-row items-center w-full" style={{ maxWidth: "var(--content-max-width, 1100px)", margin: "0 auto", padding: "0 clamp(1rem, 0.5rem + 2vw, 2rem)" }}>
        {/* LEFT — Photo (desktop) / Circular photo (mobile) */}
        <motion.div
          className="w-full lg:w-[40%] flex-shrink-0 mb-8 lg:mb-0 flex justify-center lg:justify-end lg:pr-6"
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
        >
          <div
            className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] lg:w-full lg:max-w-[420px] lg:h-[520px] rounded-2xl overflow-hidden lg:rounded-2xl"
            style={{
              border: "2px solid var(--color-border)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <Image
              src="/headshot.png"
              alt="Aman Kumar"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority
            />
            {/* Blue tinted overlay at edges */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, transparent 40%, transparent 60%, rgba(37, 99, 235, 0.05) 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* Vertical divider (desktop only) */}
        <div
          className="hidden lg:block flex-shrink-0 mx-10"
          style={{
            width: "1px",
            height: "300px",
            background: "linear-gradient(180deg, transparent, var(--color-primary), var(--color-border), transparent)",
          }}
          aria-hidden="true"
        />

        {/* RIGHT — Text content */}
        <motion.div
          className="w-full lg:w-[52%] flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-2"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Name */}
          <motion.h1
            variants={fadeInUpSlow}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: "var(--text-hero)",
              color: "var(--color-text)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              textShadow: "0 0 80px rgba(37,99,235,0.15)",
            }}
          >
            AMAN KUMAR
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mt-4 lg:mt-6"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--color-accent)",
              lineHeight: 1.6,
            }}
          >
            B2B SAAS SALES &middot; AI-POWERED PIPELINE &middot; FULL-CYCLE CLOSING
          </motion.p>

          {/* Body copy */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 lg:mt-8"
            style={{
              maxWidth: "55ch",
              color: "var(--color-text-muted)",
              fontSize: "var(--text-base)",
              lineHeight: 1.7,
            }}
          >
            <p>I build pipeline that closes.</p>
            <p className="mt-3">
              $6M pipeline in the last year at OpenText — combining AI-assisted research with multi-stakeholder selling into EDI and supply chain SaaS.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-10"
          >
            <button
              onClick={scrollToNumbers}
              className="rounded-md px-6 py-3 cursor-pointer border-none"
              style={{
                background: "var(--color-primary)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                minHeight: "44px",
                transition: "transform 180ms ease, box-shadow 180ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-glow)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              View My Work &darr;
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-6 py-3 flex items-center justify-center"
              style={{
                border: "1px solid var(--color-border)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                minHeight: "44px",
                background: "transparent",
                transition: "transform 180ms ease, border-color 180ms ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-text-faint)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              }}
            >
              Download Resume &uarr;
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{
          transform: "translateX(-50%)",
          opacity: Math.max(0, 1 - scrollY / 200),
          transition: "opacity 200ms ease",
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-faint)",
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
            stroke="var(--color-text-faint)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
