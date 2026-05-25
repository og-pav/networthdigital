import { marquee } from "@/content/marquee";

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {marquee.tags.map((tag, i) => (
        <li key={`${tag}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink">
            {tag}
          </span>
          <span className="mx-6 select-none text-steel md:mx-8" aria-hidden>
            +
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Capabilities"
      className="group flex h-14 items-center overflow-hidden border-y border-ink/10 bg-bone-soft md:h-16"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}
