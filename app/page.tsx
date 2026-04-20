"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import CursorTrail from "@/components/CursorTrail";
import EasterEgg from "@/components/EasterEgg";
import Hero from "@/components/Hero";
import NumbersBar from "@/components/NumbersBar";
import ProfileDossier from "@/components/ProfileDossier";
import CareerPipeline from "@/components/CareerPipeline";
import ValueProps from "@/components/ValueProps";
import IntelFeed from "@/components/IntelFeed";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <ScrollProgress />
      <CursorTrail />
      <EasterEgg />
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <Navigation />
      )}
      <main id="main" style={{ paddingBottom: 80 }}>
        <Hero />
        <NumbersBar />
        <ProfileDossier className="section" />
        <CareerPipeline className="section-alt" />
        <ValueProps className="section" />
        <IntelFeed className="section-alt" />
        <Contact className="section" />
      </main>
      <footer
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--color-text-faint)",
          borderTop: "1px solid var(--color-divider)",
          paddingTop: "var(--space-6)",
          textAlign: "center",
          paddingBottom: "var(--space-6)",
        }}
      >
        Aman Kumar &middot; Toronto, Ontario &middot; Built with intention.
      </footer>
    </>
  );
}
