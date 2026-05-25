"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/reduced-motion";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  block?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium tracking-[-0.01em] " +
  "transition-[background-color,color,box-shadow] duration-fast ease-out " +
  "active:scale-[0.98] will-change-transform select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink hover:bg-accent-deep hover:text-bone-warm shadow-sm",
  secondary:
    "bg-navy text-bone hover:bg-navy-deep",
  ghost:
    "bg-transparent text-ink underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-7 text-[0.95rem]",
  lg: "h-14 px-9 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  magnetic = true,
  block = false,
  className,
  href,
  onClick,
  type = "button",
  ...rest
}: BaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 240, damping: 28, mass: 0.6 });

  const enableMagnet = magnetic && !reduced && variant !== "ghost";

  const onMove = (e: MouseEvent) => {
    if (!enableMagnet) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.35);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    base,
    variants[variant],
    variant !== "ghost" && sizes[size],
    block && "w-full",
    className,
  );
  const isInternal = href?.startsWith("/") || href?.startsWith("#");

  const inner = href ? (
    isInternal ? (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    )
  ) : (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={enableMagnet ? { x: sx, y: sy } : undefined}
      className={cn(block ? "flex w-full" : "inline-flex")}
    >
      {inner}
    </motion.div>
  );
}
