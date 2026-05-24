import { finalCta } from "@/content/finalCta";
import { site } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ink py-section-y text-bone">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <p className="mx-auto max-w-[16ch] font-display text-display italic leading-[1.05] text-bone">
            {finalCta.sentence}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-lead text-bone/70">
            {finalCta.sub}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-col items-center gap-5">
            <Button href={finalCta.primaryCta.href} variant="primary" size="lg">
              {finalCta.primaryCta.label}
            </Button>
            <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-bone/50">
              {finalCta.phoneLabel}{" "}
              <a
                href={site.phoneHref}
                className="text-bone/80 transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
