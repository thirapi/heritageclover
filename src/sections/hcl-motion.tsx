"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

// Honours the visitor's OS "reduce motion" setting for every motion element
// inside an hcl-* section. GSAP-driven sections must also check
// `prefers-reduced-motion` / `isCanvas` themselves (docs/01 §4).
export function HclMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface HclRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  // Editor canvas / static preview: render the final state, no animation.
  isCanvas?: boolean;
  as?: "div" | "li" | "article";
}

// One-time fade + small rise when the element scrolls into view.
export function HclReveal({ children, className, delay = 0, isCanvas, as = "div" }: HclRevealProps) {
  if (isCanvas) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
