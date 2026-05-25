"use client";

import dynamic from "next/dynamic";

// WebGL hero loads behind a dynamic import with a static dark fallback so it
// never blocks first paint. The fallback gradient also covers reduced-motion
// and no-WebGL cases.
const HeroBackground = dynamic(
  () => import("./HeroBackground").then((m) => m.HeroBackground),
  {
    ssr: false,
    loading: () => null,
  },
);

export function HeroBackgroundLazy() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      {/* Static fallback gradient (visible until/instead of WebGL) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 65% 40%, rgba(177,135,15,0.20) 0%, rgba(177,135,15,0.04) 40%, rgba(27,34,64,0) 72%), radial-gradient(60% 55% at 26% 70%, rgba(80,140,164,0.40) 0%, rgba(80,140,164,0.07) 45%, rgba(27,34,64,0) 75%), #1B2240",
        }}
      />
      <HeroBackground />
    </div>
  );
}
