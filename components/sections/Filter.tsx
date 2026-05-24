import { filter } from "@/content/filter";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Filter() {
  return (
    <section className="bg-bone py-section-y">
      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>{filter.eyebrow}</Eyebrow>
          <SectionHeading className="max-w-[18ch]">
            {filter.headline}
          </SectionHeading>
        </div>

        <ul className="mt-14 flex flex-col">
          {filter.items.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 0.06}>
              <span className="group relative inline-block py-3">
                <span className="text-h1 font-display text-ink-muted transition-colors duration-300 group-hover:text-ink">
                  {item}
                </span>
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full"
                  aria-hidden
                />
              </span>
            </Reveal>
          ))}
        </ul>

        <p className="mt-12 text-lead text-ink-soft">{filter.closer}</p>
      </Container>
    </section>
  );
}
