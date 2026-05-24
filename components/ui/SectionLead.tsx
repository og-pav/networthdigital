import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionLead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-lead text-ink-soft max-w-2xl", className)}>
      {children}
    </p>
  );
}
