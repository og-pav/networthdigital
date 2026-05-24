"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
};

/**
 * Standard scroll-in reveal. Respects reduced motion via MotionProvider's
 * MotionConfig reducedMotion="user" (the y/opacity offsets collapse to 0).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.64, ease: [0.32, 0.72, 0, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
