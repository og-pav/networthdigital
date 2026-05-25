import type { Config } from "tailwindcss";

/**
 * Design tokens mirror app/globals.css :root variables.
 * Colours are declared as hex literals here so Tailwind opacity modifiers
 * (e.g. border-ink/12, text-ink/40) work. The same values live as CSS
 * variables in globals.css for use inside JS animation variants.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Net Worth brand palette (see DESIGN.md for full use-case table).
        // Brand: navy #223870, gold #B1870F, steel #508CA4,
        // alabaster #E5E6E4, gunmetal #414042. Shades derived for surfaces.
        navy: {
          DEFAULT: "#223870", // Twilight Indigo
          deep: "#16224A",
        },
        steel: {
          DEFAULT: "#508CA4", // Air Force Blue
          deep: "#3F7488",
        },
        accent: {
          DEFAULT: "#B1870F", // Dark Goldenrod (gold)
          deep: "#8E6B0B",
        },
        ink: {
          DEFAULT: "#1B2240", // deep navy: dark surfaces + strong text
          soft: "#414042", // Gunmetal: body
          muted: "#5C5C5F", // tertiary labels (AA on alabaster)
        },
        bone: {
          DEFAULT: "#E5E6E4", // Alabaster Grey
          soft: "#D6D7D4",
          warm: "#F1F1F0",
        },
        success: "#2F8F5C",
        danger: "#B23A28",
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(3rem, 9vw, 7.5rem)",
          { lineHeight: "1.03", letterSpacing: "-0.02em" },
        ],
        h1: [
          "clamp(2.5rem, 6vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        h2: [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        h3: [
          "clamp(1.5rem, 2.5vw, 2rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
        lead: [
          "clamp(1.25rem, 1.6vw, 1.5rem)",
          { lineHeight: "1.5", letterSpacing: "-0.005em" },
        ],
        body: [
          "clamp(1rem, 1.1vw, 1.125rem)",
          { lineHeight: "1.65", letterSpacing: "-0.005em" },
        ],
        eyebrow: [
          "clamp(0.75rem, 0.9vw, 0.875rem)",
          { lineHeight: "1.2", letterSpacing: "0.12em" },
        ],
        caption: ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },
      spacing: {
        "section-y": "var(--section-y)",
        "section-x": "var(--section-x)",
        gutter: "var(--gutter)",
      },
      maxWidth: {
        content: "1440px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "16px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 2px 8px -2px rgba(15, 14, 12, 0.06), 0 4px 16px -4px rgba(15, 14, 12, 0.04)",
        lg: "0 12px 32px -8px rgba(15, 14, 12, 0.12), 0 24px 64px -16px rgba(15, 14, 12, 0.08)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        soft: "cubic-bezier(0.32, 0.72, 0, 1)",
        snap: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "180ms",
        DEFAULT: "320ms",
        slow: "640ms",
        cinematic: "1200ms",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "scroll-cue": "scroll-cue 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
