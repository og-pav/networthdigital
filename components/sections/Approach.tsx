"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { approach } from "@/content/approach";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLead } from "@/components/ui/SectionLead";

gsap.registerPlugin(ScrollTrigger);

export function Approach() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(".approach-step", { opacity: 0, y: 32 });
          gsap.set(".approach-line", { scaleY: 0, transformOrigin: "top" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".approach-pin",
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 0.5,
            },
          });

          approach.steps.forEach((_, i) => {
            tl.to(`#step-0${i + 1}`, { opacity: 1, y: 0, duration: 1 }, i);
            if (i < approach.steps.length - 1) {
              tl.to(`#line-${i}`, { scaleY: 1, duration: 0.5 }, i + 0.4);
            }
          });
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="approach" ref={root} className="bg-bone">
      <div className="approach-pin flex items-center py-section-y lg:min-h-[100svh]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Left: sticky headline */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{approach.eyebrow}</Eyebrow>
              <SectionHeading className="max-w-[14ch]">
                {approach.headline}
              </SectionHeading>
              <SectionLead>{approach.sub}</SectionLead>
            </div>

            {/* Right: diagram */}
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-x-4 -inset-y-6 grid-pattern opacity-60"
                aria-hidden
              />
              <ol className="relative flex flex-col">
                {approach.steps.map((step, i) => (
                  <li key={step.label} className="relative">
                    <div
                      id={`step-0${i + 1}`}
                      className="approach-step relative rounded-lg border border-ink/10 bg-bone-warm p-7 shadow-sm md:p-8"
                    >
                      <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-navy">
                        {step.label}
                      </p>
                      <h3 className="mt-3 text-h3 font-display text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-body text-ink-soft">{step.body}</p>
                    </div>
                    {i < approach.steps.length - 1 && (
                      <div className="flex h-12 justify-start pl-8" aria-hidden>
                        <span
                          id={`line-${i}`}
                          className="approach-line block w-px bg-steel"
                          style={{ height: "100%" }}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
