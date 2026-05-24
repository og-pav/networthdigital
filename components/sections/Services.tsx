import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services, servicesIntro } from "@/content/services";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Services() {
  return (
    <section id="services" className="bg-bone pt-section-y">
      <Container className="pb-14 md:pb-20">
        <SectionHeader
          eyebrow={servicesIntro.eyebrow}
          heading={servicesIntro.headline}
          lead={servicesIntro.sub}
        />
      </Container>

      <ul className="border-t border-ink/12">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href="/book"
              aria-label={`${service.title} — book a strategy call`}
              className="group relative block border-b border-ink/12 bg-bone transition-colors duration-300 ease-out hover:bg-ink"
            >
              <div className="mx-auto flex min-h-[280px] max-w-content flex-col justify-center px-section-x py-12">
                <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">
                  {service.label}
                </p>

                <h3 className="mt-4 origin-left text-h2 font-display text-ink transition-[color,transform] duration-300 ease-out group-hover:scale-[1.02] group-hover:text-bone">
                  {service.title}
                </h3>

                <p className="mt-3 max-w-2xl text-lead text-ink-soft transition-colors duration-300 group-hover:text-bone/70">
                  {service.sub}
                </p>

                {/* Detail: expands on hover (desktop), always open on mobile */}
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="max-w-3xl pt-6">
                      <p className="text-body text-ink-soft transition-colors duration-300 group-hover:text-bone/70">
                        {service.body}
                      </p>
                      <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {service.inclusions.map((inc) => (
                          <li
                            key={inc}
                            className="flex items-start gap-2 text-caption text-ink-soft transition-colors duration-300 group-hover:text-bone/60"
                          >
                            <Check
                              size={16}
                              strokeWidth={1.5}
                              className="mt-1 shrink-0 text-accent"
                              aria-hidden
                            />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="mt-6 inline-block font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">
                        {service.cta}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sliding arrow */}
                <span
                  className="pointer-events-none absolute right-section-x top-1/2 -translate-y-1/2 translate-x-[-8px] text-bone opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden
                >
                  <ArrowRight size={32} strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
