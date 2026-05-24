import { proof } from "@/content/proof";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Proof() {
  return (
    <section className="bg-bone py-section-y">
      <Container>
        <SectionHeader
          eyebrow={proof.eyebrow}
          heading={proof.headline}
          lead={proof.sub}
        />

        <Reveal className="mt-16">
          <article className="grid grid-cols-1 overflow-hidden rounded-lg border border-ink/10 bg-bone-warm shadow-sm lg:grid-cols-2">
            {/* Visual (placeholder texture until real screenshots) */}
            <div className="relative aspect-[16/9] bg-ink lg:aspect-auto">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 120% at 20% 10%, rgba(255,90,54,0.28) 0%, rgba(15,14,12,0) 55%), repeating-linear-gradient(135deg, rgba(244,239,230,0.04) 0px, rgba(244,239,230,0.04) 1px, transparent 1px, transparent 9px), #0F0E0C",
                }}
                aria-hidden
              />
              {proof.caseStudy.isPlaceholder && (
                <span className="absolute left-5 top-5 rounded-pill border border-bone/30 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-bone/70">
                  Placeholder
                </span>
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
                {proof.caseStudy.client}
              </p>
              <p className="text-h2 font-display text-ink">
                {proof.caseStudy.result}
              </p>
              <p className="text-body text-ink-soft">{proof.caseStudy.summary}</p>
              <span className="mt-2 font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">
                {proof.caseStudy.cta}
              </span>
            </div>
          </article>
        </Reveal>

        {/* Logo strip */}
        <Reveal className="mt-16" delay={0.1}>
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
            {proof.logosLabel}
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
            {proof.logos.map((logo) => (
              <li
                key={logo}
                className="font-display text-h3 text-ink/30 transition-colors duration-300 hover:text-ink"
              >
                {logo}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
