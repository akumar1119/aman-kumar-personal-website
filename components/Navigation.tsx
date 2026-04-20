"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, LINKS } from "@/lib/constants";
import { House, BarChart3, User, Mail, Briefcase } from "lucide-react";

interface NavigationProps {
  isLoading?: boolean;
}

const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "#home", Icon: House },
  { label: "Numbers", href: "#numbers", Icon: BarChart3 },
  { label: "Profile", href: "#profile", Icon: User },
  { label: "Career", href: "#career", Icon: Briefcase },
  { label: "Contact", href: "#contact", Icon: Mail },
] as const;

export default function Navigation({ isLoading = false }: NavigationProps) {
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
    if (isLoading) return;

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

    // Small delay to let sections render
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
  }, [isLoading]);

  // Show nav after loading screen finishes
  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(false);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <>
      {/* DESKTOP NAV */}
      <nav
        className="hidden md:block fixed top-0 left-0 right-0 z-40"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(10, 13, 26, 0.8)",
          borderBottom: "1px solid var(--color-divider)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
              }}
            >
              AK
            </span>
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium transition-colors duration-180 cursor-pointer bg-transparent border-none"
                style={{
                  color:
                    activeSection === link.href
                      ? "var(--color-primary)"
                      : "var(--color-text-muted)",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.href) {
                    e.currentTarget.style.color = "var(--color-text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.href) {
                    e.currentTarget.style.color = "var(--color-text-muted)";
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <a
            href={LINKS.resume}
            className="inline-flex items-center justify-center rounded-md px-4 text-sm font-medium transition-colors duration-180"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
          >
            Download Resume
          </a>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <AnimatePresence>
        <motion.nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-40"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(10, 13, 26, 0.9)",
            borderTop: "1px solid var(--color-divider)",
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
                        ? "var(--color-primary)"
                        : "var(--color-text-faint)",
                  }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    color:
                      activeSection === href
                        ? "var(--color-primary)"
                        : "var(--color-text-faint)",
                  }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
}
