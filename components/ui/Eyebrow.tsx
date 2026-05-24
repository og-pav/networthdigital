import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-eyebrow uppercase text-accent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
