import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a strategy call",
  description:
    "Book a thirty minute strategy call with NetWorth Digital. No deck, no pressure. Bring the parts of your business that frustrate you most.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <div className="flex min-h-[100svh] flex-col bg-bone">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-section-x pb-6 pt-28 md:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
          Back to home
        </Link>
        <a
          href={site.phoneHref}
          className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-accent"
        >
          {site.phone}
        </a>
      </div>

      <div className="mx-auto w-full max-w-content px-section-x pb-10">
        <h1 className="font-display text-h1 text-ink">Book a strategy call</h1>
        <p className="mt-4 max-w-xl text-lead text-ink-soft">
          Thirty minutes. No deck. No pressure. Pick a time that works and bring
          the parts of your business that frustrate you most.
        </p>
      </div>

      <div className="mx-auto w-full max-w-content flex-1 px-section-x pb-section-y">
        <div className="overflow-hidden rounded-lg border border-ink/10 bg-bone-warm shadow-sm">
          <iframe
            src={site.bookingUrl}
            title="NetWorth Digital booking calendar"
            className="h-[820px] w-full"
            loading="lazy"
            style={{ border: "none" }}
          />
        </div>
        <noscript>
          <p className="mt-6 text-body text-ink-soft">
            The booking calendar needs JavaScript. You can also call us on{" "}
            <a href={site.phoneHref} className="underline">
              {site.phone}
            </a>
            .
          </p>
        </noscript>
      </div>
    </div>
  );
}
