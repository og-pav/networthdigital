import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Agitator } from "@/components/sections/Agitator";
import { VsComparison } from "@/components/sections/VsComparison";
import { Approach } from "@/components/sections/Approach";
import { Services } from "@/components/sections/Services";
import { Proof } from "@/components/sections/Proof";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { Filter } from "@/components/sections/Filter";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Agitator />
      <VsComparison />
      <Approach />
      <Services />
      <Proof />
      <RoiCalculator />
      <Filter />
      <Faq />
      <FinalCta />
    </>
  );
}
