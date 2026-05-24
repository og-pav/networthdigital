"use client";

import { useId } from "react";

export function Slider({
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-soft"
        >
          {label}
        </label>
        <span className="font-mono text-h3 tabular-nums text-ink">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider h-1.5 w-full cursor-pointer appearance-none rounded-pill outline-none"
        style={{
          background: `linear-gradient(to right, var(--accent) ${pct}%, rgba(15,14,12,0.14) ${pct}%)`,
        }}
        aria-valuetext={display}
      />
    </div>
  );
}
