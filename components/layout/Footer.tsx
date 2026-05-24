import Link from "next/link";
import { footer } from "@/content/footer";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-content px-section-x py-16 md:py-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-h2">{footer.logo}</p>
            <p className="mt-3 font-mono text-eyebrow uppercase tracking-[0.12em] text-bone/50">
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <a
              href={site.phoneHref}
              className="text-h3 font-display text-bone transition-colors hover:text-accent"
            >
              {site.phone}
            </a>
            <ul className="flex gap-6">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-eyebrow uppercase tracking-[0.12em] text-bone/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-bone/16 pt-6">
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-bone/50">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
