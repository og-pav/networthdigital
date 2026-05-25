import { asset } from "@/lib/site";

/**
 * Fixed circular brand emblem in the bottom-left corner. Doubles as a
 * back-to-top control; the anchor routes through the Lenis smooth-scroll
 * handler (#top is the hero section).
 */
export function EmblemBadge() {
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className="group fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy shadow-lg ring-1 ring-bone/15 transition-[transform,background-color] duration-300 ease-out hover:scale-105 hover:bg-navy-deep md:bottom-6 md:left-6 md:h-14 md:w-14"
    >
      <img
        src={asset("/logo/nw-emblem-white.svg")}
        alt=""
        aria-hidden
        width={427}
        height={253}
        className="h-5 w-auto md:h-6"
      />
    </a>
  );
}
