"use client";

import Script from "next/script";
import { useState } from "react";
import { site } from "@/lib/site";

/**
 * GoHighLevel booking calendar.
 *
 * Height handling: GHL calendars change height as the visitor moves between
 * steps. The cleanest fix is GHL's form_embed.js, which listens for postMessage
 * events from the iframe and sets the iframe height to match its content. We
 * load it below. The CSS min-height values are only a fallback for the moment
 * before the script resizes (or if it fails) — tweak them if the calendar ever
 * clips or shows an inner scrollbar:
 *   - mobile  (default): min-h-[920px]  (slots stack vertically, needs more)
 *   - >=768px (md):      min-h-[760px]
 *   - >=1024px (lg):     min-h-[720px]
 */
export function BookingEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[800px]">
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 z-10 flex min-h-[920px] flex-col items-center justify-center gap-3 md:min-h-[760px] lg:min-h-[720px]">
          <span
            className="h-8 w-8 animate-spin rounded-full border-[3px] border-bone-soft border-t-navy"
            aria-hidden
          />
          <span className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
            Loading calendar
          </span>
        </div>
      )}

      <iframe
        src={site.bookingUrl}
        id="ghl-booking-calendar"
        title="NetWorth Digital booking calendar"
        scrolling="no"
        onLoad={() => setLoaded(true)}
        className="block w-full min-h-[920px] rounded-lg md:min-h-[760px] lg:min-h-[720px]"
        style={{ border: "none", overflow: "hidden" }}
      />

      {/* GHL auto-resize: posts the calendar's true height to the parent so the
          iframe height tracks the content. Loads after the page is interactive. */}
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />

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
  );
}
