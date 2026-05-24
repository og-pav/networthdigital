"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/reduced-motion";

export function AnimatedNumber({
  value,
  format,
  className,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (ref.current) ref.current.textContent = format(value);
      last.current = value;
      return;
    }
    const controls = animate(last.current, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    last.current = value;
    return () => controls.stop();
  }, [value, format]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
