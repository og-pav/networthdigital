import { hero } from "@/content/hero";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { SplitWords } from "@/components/ui/SplitWords";
import { HeroBackgroundLazy } from "./HeroBackgroundLazy";
import { HeroReveal } from "./HeroReveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-bone"
    >
      <HeroBackgroundLazy />

      <Container className="relative z-10 pt-28 pb-24 md:pt-32">
        <HeroReveal>
          <Eyebrow className="hero-fade text-accent">{hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 max-w-[15ch] font-display text-display font-black leading-[1.0] text-bone">
            <span className="reveal-line block">
              <SplitWords text={hero.headline.line1} />
            </span>
            <span className="reveal-line block text-accent">
              <SplitWords text={hero.headline.line2} />
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-xl text-lead font-light text-bone/75">
            {hero.sub}
          </p>

          <div className="hero-fade mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} variant="primary" size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryLink.href}
              variant="ghost"
              className="text-bone hover:text-accent"
            >
              {hero.secondaryLink.label}
            </Button>
          </div>
        </HeroReveal>
      </Container>

      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <ScrollCue label={hero.scrollCue} />
      </div>
    </section>
  );
}
