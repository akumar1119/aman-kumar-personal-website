"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOADING_LINES } from "@/lib/constants";

interface LoadingScreenProps {
  onComplete: () => void;
}

function randomTypingSpeed() {
  return Math.floor(Math.random() * (80 - 40 + 1)) + 40;
}

function generateProgressBar(progress: string) {
  if (progress === "100%") return "████████████";
  if (progress === "$6,000,000") return "████████████";
  if (progress === "170.4%") return "████████████";
  if (progress === "4 contacts") return "████████████";
  return "";
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasSkippedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (hasSkippedRef.current) return;
    hasSkippedRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 600);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    handleComplete();
  }, [handleComplete]);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible || isTransitioning) return;
    if (hasSkippedRef.current) return;

    if (currentLineIndex >= LOADING_LINES.length) {
      // All lines typed out, wait a brief moment then complete
      timeoutRef.current = setTimeout(() => {
        handleComplete();
      }, 150);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    const line = LOADING_LINES[currentLineIndex];
    const fullText = "progress" in line && line.progress
      ? `${line.text}       [${generateProgressBar(line.progress)}] ${line.progress}`
      : line.text;

    if (currentCharIndex < fullText.length) {
      const speed = randomTypingSpeed();
      timeoutRef.current = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);
    } else {
      // Line complete, move to next
      timeoutRef.current = setTimeout(() => {
        setCompletedLines((prev) => [...prev, fullText]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLineIndex, currentCharIndex, isVisible, isTransitioning, handleComplete]);

  // Build the current line being typed
  const currentLine =
    currentLineIndex < LOADING_LINES.length
      ? (() => {
          const line = LOADING_LINES[currentLineIndex];
          const fullText = "progress" in line && line.progress
            ? `${line.text}       [${generateProgressBar(line.progress)}] ${line.progress}`
            : line.text;
          return fullText.slice(0, currentCharIndex);
        })()
      : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-start justify-center"
          style={{ background: "var(--color-bg)" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
              zIndex: 1,
            }}
            aria-hidden="true"
          />

          {/* Terminal content area */}
          <div className="w-full max-w-4xl mx-auto px-6 md:px-12 relative" style={{ zIndex: 2 }}>
            {/* Completed lines */}
            {completedLines.map((line, i) => (
              <div
                key={i}
                className="mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  color: "#2563eb",
                  lineHeight: "1.8",
                  opacity: 0.5,
                }}
              >
                <span style={{ opacity: 0.7 }}>&gt; </span>
                {line}
              </div>
            ))}

            {/* Current line being typed */}
            {currentLine !== null && (
              <div
                className="mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  color: "#2563eb",
                  lineHeight: "1.8",
                }}
              >
                <span style={{ opacity: 0.7 }}>&gt; </span>
                {currentLine}
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "1.2em",
                    background: "#2563eb",
                    marginLeft: "2px",
                    verticalAlign: "text-bottom",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </div>
            )}
          </div>

          {/* Skip link */}
          <button
            onClick={handleSkip}
            className="fixed bottom-8 right-8 cursor-pointer bg-transparent border-none"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "#4a5568",
              transition: "color 180ms ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#2563eb";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "#4a5568";
            }}
            aria-label="Skip intro animation"
          >
            Skip intro &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
