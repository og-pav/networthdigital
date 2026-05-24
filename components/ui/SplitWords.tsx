import { cn } from "@/lib/cn";

/**
 * Renders text as per-word clipping spans for the masked reveal animation.
 * Server-renderable markup; HeroReveal animates `.reveal-word > span`.
 * Falls back to plain visible text when no JS / reduced motion.
 */
export function SplitWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={cn("inline", className)}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="reveal-word">
          <span className="inline-block">{word}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}
