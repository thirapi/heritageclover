"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

// Honours the visitor's OS "reduce motion" setting for every motion element
// inside an hcl-* section. GSAP-driven sections must also check
// `prefers-reduced-motion` / `isCanvas` themselves (docs/01 §4).
export function HclMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
