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
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 58%, rgba(255,90,54,0.22) 0%, rgba(255,90,54,0.06) 38%, rgba(15,14,12,0) 70%), #0F0E0C",
        }}
      />
      <HeroBackground />
    </div>
  );
}
