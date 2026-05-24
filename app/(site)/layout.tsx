import { ReactNode } from "react";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <GsapProvider>
        <MotionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-eyebrow focus:uppercase focus:tracking-[0.12em] focus:text-bone"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </GsapProvider>
    </LenisProvider>
  );
}
