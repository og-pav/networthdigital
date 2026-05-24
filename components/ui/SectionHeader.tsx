import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { SectionHeading } from "./SectionHeading";
import { SectionLead } from "./SectionLead";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  heading,
  lead,
  className,
  align = "left",
  size = "h1",
  as = "h2",
}: {
  eyebrow: string;
  heading: ReactNode;
  lead?: ReactNode;
  className?: string;
  align?: "left" | "center";
  size?: "display" | "h1" | "h2";
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionHeading as={as} size={size} className="max-w-[20ch]">
        {heading}
      </SectionHeading>
      {lead ? (
        <SectionLead className={align === "center" ? "mx-auto" : undefined}>
          {lead}
        </SectionLead>
      ) : null}
    </Reveal>
  );
}
