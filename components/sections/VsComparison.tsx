"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Minus, Check } from "lucide-react";
import { vs } from "@/content/vs";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLead } from "@/components/ui/SectionLead";

gsap.registerPlugin(ScrollTrigger);

export function VsComparison() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Pinned, scrubbed timeline only on desktop with motion allowed.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".vs-pin",
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: 0.6,
            },
          });

          tl.to(
            ".vs-left",
            { opacity: 0.4, filter: "grayscale(1)", duration: 1 },
            0,
          );
          tl.from(
            ".vs-right-item",
            { opacity: 0.15, y: 24, stagger: 0.08, duration: 1, ease: "expo.out" },
            0,
          );
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-bone">
      <div className="vs-pin flex min-h-[100svh] items-center py-section-y">
        <Container>
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>{vs.eyebrow}</Eyebrow>
            <SectionHeading className="max-w-[18ch]">{vs.headline}</SectionHeading>
            <SectionLead className="mx-auto">{vs.sub}</SectionLead>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 lg:grid-cols-2">
            {/* TODAY */}
            <div className="vs-left bg-bone-warm p-8 md:p-12">
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
                {vs.left.label}
              </p>
              <h3 className="mt-4 text-h3 font-display text-ink">
                {vs.left.heading}
              </h3>
              <ul className="mt-8 flex flex-col gap-4">
                {vs.left.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-body text-ink-soft">
                    <Minus
                      size={20}
                      strokeWidth={1.5}
                      className="mt-1 shrink-0 text-ink-muted"
                      aria-hidden
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AFTER */}
            <div className="bg-ink p-8 text-bone md:p-12">
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">
                {vs.right.label}
              </p>
              <h3 className="mt-4 text-h3 font-display text-bone">
                {vs.right.heading}
              </h3>
              <ul className="mt-8 flex flex-col gap-4">
                {vs.right.bullets.map((b) => (
                  <li
                    key={b}
                    className="vs-right-item flex items-start gap-3 text-body text-bone/85"
                  >
                    <Check
                      size={20}
                      strokeWidth={1.5}
                      className="mt-1 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center font-display text-h3 italic text-ink">
            {vs.closer}
          </p>
        </Container>
      </div>
    </section>
  );
}
