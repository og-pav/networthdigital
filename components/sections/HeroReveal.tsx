"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/reduced-motion";

export function HeroReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll(".reveal-word > span");
      const fades = ref.current?.querySelectorAll(".hero-fade");

      if (prefersReducedMotion()) {
        if (words) gsap.set(words, { yPercent: 0, opacity: 1 });
        if (fades) gsap.set(fades, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.15 });
      if (words?.length) {
        tl.fromTo(
          words,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.08, ease: "expo.out" },
        );
      }
      if (fades?.length) {
        tl.fromTo(
          fades,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.64, stagger: 0.1, ease: "power2.out" },
          "-=0.7",
        );
      }
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
