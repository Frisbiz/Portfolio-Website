"use client";

import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "fade-in" | "zoom-in";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: RevealVariant;
  delay?: number; // ms
  duration?: number; // ms
  threshold?: number; // Intersection threshold (0..1)
  once?: boolean; // animate only once
}

/**
 * Reveal
 * - Lightweight scroll-reveal animation using IntersectionObserver.
 * - No deps, GPU-friendly (opacity/transform), accessible (no motion if prefers-reduced-motion).
 *
 * Usage:
 * <Reveal variant="fade-up" delay={100}>...</Reveal>
 */
export default function Reveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user preference for reduced motion
    const disableMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (disableMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once && el) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px", // reveal a bit before fully in view
      }
    );

    observer.observe(el);
    return () => {
      try {
        observer.disconnect();
      } catch {}
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        variant === "fade-up" && "reveal--fade-up",
        variant === "fade-in" && "reveal--fade-in",
        variant === "zoom-in" && "reveal--zoom-in",
        visible && "reveal--visible",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
