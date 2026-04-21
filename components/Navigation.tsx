"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, LINKS } from "@/lib/constants";
import { House, BarChart3, Briefcase, Layers, Mail } from "lucide-react";
import Image from "next/image";

const DESKTOP_LINKS = NAV_LINKS;
const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "#home", Icon: House },
  { label: "Numbers", href: "#numbers", Icon: BarChart3 },
  { label: "Career", href: "#career", Icon: Briefcase },
  { label: "Work", href: "#work", Icon: Layers },
  { label: "Contact", href: "#contact", Icon: Mail },
] as const;

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isVisible, setIsVisible] = useState(false);

  const scrollToSection = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // IntersectionObserver for scroll spy
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    const timeout = setTimeout(() => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  // Show nav with a brief delay (after loading screen)
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* DESKTOP NAV */}
      <nav
        className="hidden md:block fixed top-0 left-0 right-0 z-40"
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          background: "rgba(8, 11, 20, 0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid var(--border-faint)",
        }}
      >
        <div className="flex items-center justify-between w-full" style={{ maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
          {/* Left: photo + nav links */}
          <div className="flex items-center gap-3">
            {/* Tiny headshot */}
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                flexShrink: 0,
              }}
            >
              <Image
                src="/headshot.png"
                alt=""
                width={28}
                height={28}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Nav links */}
            <div className="flex items-center gap-6 ml-8">
              {DESKTOP_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`nav-link${activeSection === link.href ? " active" : ""}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Social icons + Download Resume + Performance Dashboard */}
          <div className="flex items-center gap-3">
            {/* GitHub */}
            <a
              href="https://github.com/akumar1119"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md p-2 no-underline"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                transition: "border-color 180ms, color 180ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-core)";
                e.currentTarget.style.color = "var(--blue-bright)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/amankumar1106/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md p-2 no-underline"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                transition: "border-color 180ms, color 180ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-core)";
                e.currentTarget.style.color = "var(--blue-bright)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md p-2 no-underline"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                transition: "border-color 180ms, color 180ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-core)";
                e.currentTarget.style.color = "var(--blue-bright)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              aria-label="X"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/></svg>
            </a>
            <a
              href={LINKS.dashboard}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md px-4 text-sm font-medium no-underline"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                transition: "border-color 180ms, color 180ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-core)";
                e.currentTarget.style.color = "var(--blue-bright)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              Performance Dashboard
            </a>
            <a
              href={LINKS.resume}
              className="inline-flex items-center justify-center rounded-md px-4 text-sm font-medium no-underline"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                transition: "border-color 180ms, color 180ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-core)";
                e.currentTarget.style.color = "var(--blue-bright)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              Download Resume &uarr;
            </a>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          background: "rgba(8, 11, 20, 0.9)",
          borderTop: "1px solid var(--border-faint)",
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-around h-16 px-4">
          {MOBILE_NAV_ITEMS.map(({ label, href, Icon }) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
              aria-label={label}
            >
              <Icon
                size={20}
                style={{
                  color:
                    activeSection === href
                      ? "var(--blue-bright)"
                      : "var(--text-ghost)",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  color:
                    activeSection === href
                      ? "var(--blue-bright)"
                      : "var(--text-ghost)",
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
