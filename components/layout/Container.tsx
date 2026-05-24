import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-content",
        !bleed && "px-section-x",
        className,
      )}
    >
      {children}
    </div>
  );
}
