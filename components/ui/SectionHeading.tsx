import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  size = "h1",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h1" | "h2";
}) {
  const sizeClass =
    size === "display" ? "text-display" : size === "h2" ? "text-h2" : "text-h1";
  return (
    <Tag className={cn("font-display text-ink", sizeClass, className)}>
      {children}
    </Tag>
  );
}
