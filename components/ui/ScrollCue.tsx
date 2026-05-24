import { cn } from "@/lib/cn";

export function ScrollCue({
  label = "SCROLL",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-eyebrow uppercase text-bone/60",
        className,
      )}
      aria-hidden
    >
      <span>{label}</span>
      <span className="inline-block animate-scroll-cue">↓</span>
    </div>
  );
}
