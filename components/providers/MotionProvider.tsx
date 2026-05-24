"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  // reducedMotion="user" makes the whole Framer Motion tree respect the
  // prefers-reduced-motion media query without per-component checks.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
