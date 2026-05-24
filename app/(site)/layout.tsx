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
          <Nav />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </GsapProvider>
    </LenisProvider>
  );
}
