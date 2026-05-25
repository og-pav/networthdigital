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
        // Navy by default (passes AA on cream). On dark sections pass a
        // text-accent (gold) override via className.
        "font-mono text-eyebrow uppercase text-navy",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
