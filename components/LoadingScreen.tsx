"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOADING_LINES } from "@/lib/constants";

interface LoadingScreenProps {
  onComplete: () => void;
}

function randomTypingSpeed() {
  return Math.floor(Math.random() * (35 - 15 + 1)) + 15;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasSkippedRef = useRef(false);

  // Progress percentage based on completed lines
  const progressPercent = Math.round((completedLines.length / LOADING_LINES.length) * 100);

  const handleComplete = useCallback(() => {
    if (hasSkippedRef.current) return;
    hasSkippedRef.current = true;
    // Flash on 100%
    setIsFlashing(true);
    timeoutRef.current = setTimeout(() => {
      setIsFlashing(false);
      setIsTransitioning(true);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 600);
    }, 200);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    handleComplete();
  }, [handleComplete]);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible || isTransitioning || isFlashing) return;
    if (hasSkippedRef.current) return;

    if (currentLineIndex >= LOADING_LINES.length) {
      timeoutRef.current = setTimeout(() => {
        handleComplete();
      }, 80);
      return () => {
        if (timeoutRef.current && !hasSkippedRef.current) clearTimeout(timeoutRef.current);
      };
    }

    const line = LOADING_LINES[currentLineIndex];
    const fullText = line.text;

    if (currentCharIndex < fullText.length) {
      const speed = randomTypingSpeed();
      timeoutRef.current = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);
    } else {
      timeoutRef.current = setTimeout(() => {
        setCompletedLines((prev) => [...prev, fullText]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 50);
    }

    return () => {
      if (timeoutRef.current && !hasSkippedRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLineIndex, currentCharIndex, isVisible, isTransitioning, isFlashing, handleComplete]);

  // Build the current line being typed
  const currentLine =
    currentLineIndex < LOADING_LINES.length
      ? LOADING_LINES[currentLineIndex].text.slice(0, currentCharIndex)
      : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-start justify-center"
          style={{ background: "var(--bg-base)" }}
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

          {/* Flash overlay */}
          {isFlashing && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "white",
                opacity: 0.3,
                zIndex: 2,
              }}
            />
          )}

          {/* Terminal content area */}
          <div className="w-full max-w-4xl mx-auto px-6 md:px-12 relative" style={{ zIndex: 3 }}>
            {/* Completed lines */}
            {completedLines.map((line, i) => (
              <div
                key={i}
                className="mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  color: "var(--blue-core)",
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
                  color: "var(--blue-core)",
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
                    background: "var(--blue-core)",
                    marginLeft: "2px",
                    verticalAlign: "text-bottom",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </div>
            )}

            {/* Progress bar */}
            <div
              className="mt-8"
              style={{
                maxWidth: "320px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  background: "var(--bg-surface)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    background: "var(--blue-core)",
                    borderRadius: "2px",
                  }}
                />
              </div>
              <div
                className="mt-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Initializing...</span>
                <span>{progressPercent}%</span>
              </div>
            </div>
          </div>

          {/* Skip link */}
          <button
            onClick={handleSkip}
            className="fixed bottom-8 right-8 cursor-pointer bg-transparent border-none"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              transition: "color 180ms ease",
              zIndex: 4,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--blue-bright)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-muted)";
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
