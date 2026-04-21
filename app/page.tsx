"use client";

import { useState, useEffect, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import SpotlightCursor from "@/components/CursorTrail";
import EasterEgg from "@/components/EasterEgg";
import Hero from "@/components/Hero";
import NumbersBar from "@/components/NumbersBar";
import ProfileDossier from "@/components/ProfileDossier";
import CareerPipeline from "@/components/CareerPipeline";
import ValueProps from "@/components/ValueProps";
import IntelFeed from "@/components/IntelFeed";
import Contact from "@/components/Contact";
import { useReveal } from "@/lib/useReveal";
import { useMagneticButtons } from "@/lib/useMagneticButtons";

function AppContent() {
  useReveal();
  useMagneticButtons();

  return (
    <>
      <ScrollProgress />
      <SpotlightCursor />
      <EasterEgg />
      <Navigation />
      <main id="main">
        <Hero />
        <NumbersBar />
        <ProfileDossier />
        <CareerPipeline />
        <ValueProps />
        <IntelFeed />
        <Contact />
      </main>
      <footer
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--text-ghost)",
          borderTop: "1px solid var(--border-faint)",
          paddingTop: "var(--space-6)",
          paddingBottom: "var(--space-12)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <div style={{ maxWidth: "var(--content-max-width)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingInline: "clamp(1rem, 0.5rem + 2vw, 2rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <a
              href="https://github.com/akumar1119"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-muted)", transition: "color 180ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--blue-bright)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/amankumar1106/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-muted)", transition: "color 180ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--blue-bright)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-muted)", transition: "color 180ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--blue-bright)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
              aria-label="X"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/></svg>
            </a>
          </div>
          <span style={{ textAlign: "right" }}>
            Aman Kumar &middot; Toronto, Ontario &middot; Built with intention.
          </span>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("aman-loaded")) {
      setIsLoading(false);
    }
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem("aman-loaded", "true");
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <LoadingScreen onComplete={handleComplete} />
  ) : (
    <AppContent />
  );
}
