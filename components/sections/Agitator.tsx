import { agitator } from "@/content/agitator";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Agitator() {
  return (
    <section className="bg-bone py-section-y">
      <Container>
        <SectionHeader
          eyebrow={agitator.eyebrow}
          heading={agitator.headline}
          lead={agitator.sub}
        />

        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {agitator.cards.map((card, i) => (
            <Reveal
              as="li"
              key={card.number}
              delay={i * 0.12}
              className="flex flex-col gap-3 bg-bone-warm p-6 transition-colors duration-300 hover:bg-bone-soft md:gap-4 md:p-8"
            >
              <span className="font-mono text-eyebrow tracking-[0.12em] text-accent">
                {card.number}
              </span>
              <h3 className="text-h3 font-display text-ink">{card.title}</h3>
              <p className="text-body text-ink-soft">{card.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
