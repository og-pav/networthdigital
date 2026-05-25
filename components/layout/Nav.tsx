"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/nav";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only the homepage has a dark hero behind the nav. Elsewhere (e.g. /book)
  // the background is light, so the nav must be solid with dark text at the top.
  const overDarkHero = pathname === "/";

  useEffect(() => {
    // Over the dark hero, stay transparent until the content arrives under the
    // nav, then switch to the solid bar. Elsewhere, solidify almost immediately.
    const onScroll = () => {
      const threshold = overDarkHero ? window.innerHeight * 0.9 : 12;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overDarkHero]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !overDarkHero || open;
  const onLight = solid;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out",
        solid
          ? "border-b border-ink/10 bg-bone/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-section-x md:h-20"
      >
        <Link href="/" aria-label={`${nav.logo} home`} className="flex items-center">
          {/* Full colour logo on the light bar; pure white over the dark hero. */}
          <img
            src={asset("/logo/nwd-full.svg")}
            alt={nav.logo}
            width={152}
            height={127}
            className={cn(
              "h-10 w-auto transition-[filter] duration-300 md:h-12",
              !onLight && "[filter:brightness(0)_invert(1)]",
            )}
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "font-mono text-eyebrow uppercase tracking-[0.12em] transition-colors duration-300 hover:text-accent",
                  onLight ? "text-ink-soft" : "text-bone/80",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button href={nav.cta.href} variant="primary" size="md">
              {nav.cta.label}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-pill border border-current transition-colors md:hidden",
              onLight ? "text-ink" : "text-bone",
            )}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-ink/10 bg-bone md:hidden"
          >
            <ul className="flex flex-col gap-2 px-section-x py-6">
              {nav.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-h3 text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Button
                  href={nav.cta.href}
                  variant="primary"
                  size="lg"
                  magnetic={false}
                  block
                  onClick={() => setOpen(false)}
                >
                  {nav.cta.label}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
