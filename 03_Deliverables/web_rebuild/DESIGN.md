---
doc: design_system
client: NetWorth Digital
updated: 2026-05-24
---

# DESIGN.md — the design system

## Design philosophy

Premium minimalism. The expensive feel does not come from how much is on the screen, it comes from how little. Whitespace is a feature. Type does the work. One accent colour does the punctuation. Motion is deliberate and eased on bespoke curves.

Three rules:

1. If a section needs more than one decorative element to feel finished, the type and spacing are not doing their job.
2. Animations explain, they do not entertain. If a motion does not tell the viewer something they did not already know, cut it.
3. Every state has a hover, focus, active and reduced-motion version. There is no such thing as a "default only" component in this build.

## Colour tokens

The official Net Worth brand palette (Coolors: `223870-b1870f-508ca4-e5e6e4-414042`).
Five brand colours plus derived shades for surfaces, state and contrast. Cool navy
and steel anchor the system, gold is the single action colour, gunmetal carries body
copy on an alabaster ground.

### Brand colours (the five)

| Name | Hex | Token | Use case |
| --- | --- | --- | --- |
| Twilight Indigo (navy) | `#223870` | `--navy` | The primary brand colour. Eyebrow / mono labels on light, secondary buttons, the emblem badge, diagram accents. High contrast on alabaster (8.9:1). |
| Dark Goldenrod (gold) | `#B1870F` | `--accent` | The single action colour. Primary CTA fill, the hero emphasis line, key highlights, accents on dark surfaces. |
| Air Force Blue (steel) | `#508CA4` | `--steel` | Secondary accent. Hero shader, approach connector lines, proof imagery wash, marquee separators. Fills / large / decorative only (fails AA as small text on light). |
| Alabaster Grey | `#E5E6E4` | `--bone` | Primary page background; text colour on dark surfaces. |
| Gunmetal | `#414042` | `--ink-soft` | Body copy and secondary text on light (7.8:1 on alabaster). |

### Derived shades (surfaces, state, contrast)

| Token | Hex | Use case |
| --- | --- | --- |
| `--ink` | `#1B2240` | Deep navy. Dark-section backgrounds (hero, final CTA, footer, services hover, the "after" column), strongest headings, and the CTA label on gold. Deep enough to clear AA on gold (4.7:1) and to make gold/steel accents readable on dark. |
| `--ink-muted` | `#5C5C5F` | Tertiary labels, captions, scroll cues (AA on alabaster, 5.3:1). |
| `--navy-deep` | `#16224A` | Secondary button hover / pressed. |
| `--accent-deep` | `#8E6B0B` | Gold hover / pressed. |
| `--steel-deep` | `#3F7488` | Steel hover. |
| `--bone-soft` | `#D6D7D4` | Dividers, inactive states, marquee strip background. |
| `--bone-warm` | `#F1F1F0` | Lifted card surfaces above the alabaster background. |
| `--success` | `#2F8F5C` | Form success only. |
| `--danger` | `#B23A28` | Form error only. |

CSS variables on `:root`, mirrored into `tailwind.config.ts` (`bg-navy`, `text-ink-soft`, `border-ink/12`, `bg-steel`, etc.).

### Contrast rules (WCAG AA minimum)

- Body copy: gunmetal on alabaster (AAA). Headings: deep navy `--ink` (12:1).
- Small accent text on light uses **navy**, never gold or steel (gold 2.9:1, steel 2.8:1 on alabaster both fail). Gold and steel are reserved for fills, large display and decoration.
- Dark sections are deep navy (`--ink`), so gold and steel accents on them clear AA (gold 4.7:1, steel 4.5:1).
- Primary CTA: gold fill with the deep-navy `--ink` label (4.7:1). Focus ring: navy, 2px, 3px offset.

## Typography

Brand typeface is **Azo Sans** (geometric sans, per the brand identity document).
Azo Sans is a licensed font, so the build ships **Outfit** (the closest free
geometric match, full weight range) via `next/font/google`; swap in the licensed
Azo Sans web fonts to match exactly. A monospace (`Geist Mono`) is kept for
technical labels and tabular numbers.

| Role | Brand font | Build font | Weight | Notes |
| --- | --- | --- | --- | --- |
| Display | Azo Sans Black | Outfit | 900 | Hero headline, final CTA line. The heaviest geometric moment. |
| Heading | Azo Sans Bold | Outfit | 700 | Section and card headings. |
| Sub-display | Azo Sans Light | Outfit | 300 | Section leads and large sub copy. |
| Body / UI | Azo Sans Regular | Outfit | 400, 500 | Body copy, buttons, nav. |
| Mono | (n/a) | Geist Mono | 400, 500 | Eyebrow labels (`/ 001`, `/ APPROACH`), ROI numbers, microcopy. |

Emphasis comes from weight and the navy/gold colours, not italics: the geometric
sans has no italic, so the hero's second line is gold rather than serif italic.

Type scale (mobile first, scale up at `lg`):

| Token | Mobile | Desktop | Use |
| --- | --- | --- | --- |
| `text-display` | `clamp(3rem, 9vw, 7.5rem)` | up to 120px | Hero headline, final CTA. |
| `text-h1` | `clamp(2.5rem, 6vw, 4.5rem)` | up to 72px | Section opener headlines. |
| `text-h2` | `clamp(2rem, 4vw, 3rem)` | up to 48px | Subsection headlines. |
| `text-h3` | `clamp(1.5rem, 2.5vw, 2rem)` | up to 32px | Card titles. |
| `text-lead` | `1.25rem` | `1.5rem` | The sentence below the hero headline. |
| `text-body` | `1rem` | `1.125rem` | Body copy. Line height 1.65. |
| `text-eyebrow` | `0.75rem` | `0.875rem` | Mono labels. Tracking `0.12em`. Uppercase. |
| `text-caption` | `0.875rem` | `0.875rem` | Captions and microcopy. |

Tracking on display sizes: `-0.02em`. Body: `-0.005em`. Mono: `0.04em` for body, `0.12em` for eyebrow.

Line height on display sizes: `1.02` to `1.05`. Body: `1.65`.

## Spacing scale

Tailwind's default spacing scale plus three section-level tokens.

| Token | Value | Use |
| --- | --- | --- |
| `--section-y` | `clamp(6rem, 12vw, 12rem)` | Vertical padding for major sections. |
| `--section-x` | `clamp(1.5rem, 5vw, 8rem)` | Horizontal padding for sections. |
| `--gutter` | `clamp(1rem, 2vw, 2rem)` | Grid gutter. |

Sections breathe. Default to too much space, then dial back.

## Grid

12-column grid on desktop, 6-column on tablet, 4-column on mobile. Max content width `1440px`. Some sections break out to full bleed (hero, marquee strip, vs-comparison, services). Build a `Container` component for the constrained sections.

## Radii and borders

- `--radius-sm`: `4px`. Form inputs, badges.
- `--radius`: `8px`. Cards, buttons.
- `--radius-lg`: `16px`. Large surfaces, modals.
- `--radius-pill`: `999px`. Pills, the marquee tags, the primary CTA on light surfaces.
- Border weight: `1px` everywhere. `1.5px` on focus rings.
- Border colour on light surfaces: `var(--ink)` at 12% opacity. On dark: `var(--bone)` at 16% opacity.

## Shadows

Used sparingly. Two tokens.

- `--shadow-sm`: `0 2px 8px -2px rgba(15, 14, 12, 0.06), 0 4px 16px -4px rgba(15, 14, 12, 0.04)`. Hover lift on cards.
- `--shadow-lg`: `0 12px 32px -8px rgba(15, 14, 12, 0.12), 0 24px 64px -16px rgba(15, 14, 12, 0.08)`. Modals only.

Never use `box-shadow` for decoration. Only for elevation that the user needs to perceive.

## Buttons

Three variants, all built from one `Button` component.

| Variant | Surface | Use |
| --- | --- | --- |
| `primary` | Accent fill, ink text | The booking CTA. There is one primary on screen at a time. |
| `secondary` | Ink fill, bone text (or inverse on dark sections) | Supporting actions in the nav and footer. |
| `ghost` | No fill, ink text, underline-on-hover | Inline text links. |

Sizes: `md` (default, `h-12`), `lg` (`h-14`, for the hero and final CTA).

All buttons are magnetic (see ANIMATIONS.md). On hover, the button subtly translates toward the cursor with a spring. On press, it scales to `0.98` for `120ms` then back. Focus ring is `1.5px` of `--accent-deep` offset by `3px`.

## Forms

Inputs are floating-label, single-line. Border bottom only (`1px var(--ink)` at 30%), no full border box. On focus the border becomes `--accent` and animates from left to right over `220ms`. Error state replaces the border with `--danger` and shakes the field once on submit (8px translate, 4 oscillations, 280ms, reduced-motion: skip the shake, just colour change).

## Iconography

Lucide icons only. Stroke width `1.5px`. Size `20px` inline, `24px` standalone. Colour inherits from text.

## Section anatomy

Every section follows the same structure:

```
<section>
  <Container>
    <Eyebrow>/ 003</Eyebrow>            <-- mono label, accent colour
    <SectionHeading>...</SectionHeading> <-- display serif
    <SectionLead>...</SectionLead>       <-- 1-2 sentence sub
    {children}
  </Container>
</section>
```

The eyebrow is the only place the accent colour appears as text. Anywhere else, accent is reserved for buttons, focus rings and the underline-on-hover.

## Animation tokens

Easing curves matter more than durations. Use these consistently.

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default. UI reveals, hover transitions. |
| `--ease-soft` | `cubic-bezier(0.32, 0.72, 0, 1)` | Larger reveals, scroll-driven type. |
| `--ease-snap` | `cubic-bezier(0.16, 1, 0.3, 1)` | Snappy micro-interactions, buttons. |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Two-way transitions (modals open/close). |

Durations:

| Token | ms |
| --- | --- |
| `--dur-fast` | 180 |
| `--dur` | 320 |
| `--dur-slow` | 640 |
| `--dur-cinematic` | 1200 |

Default duration is `--dur`. The hero text reveal uses `--dur-cinematic`.

For Framer Motion springs: `stiffness: 180, damping: 22, mass: 0.8`. The magnetic CTA uses `stiffness: 240, damping: 28`.

## Reduced motion

Anything that moves needs a reduced-motion path.

- GSAP timelines: detect `prefers-reduced-motion`, jump to the end state.
- Framer Motion: set `transition: { duration: 0 }` via a reduced-motion provider.
- The WebGL hero: replace with a static SVG gradient.
- The marquee strip: stop scrolling, show one row.
- Smooth scroll (Lenis): disable, fall back to native.

This is a global concern. Build the detection once in `lib/reduced-motion.ts` and consume from there.

## Section visual specs

### Hero

- Full viewport (`100svh`).
- Background: dark (`var(--ink)`) with a Three.js gradient mesh shader subtly responding to cursor movement. Fallback: a flat dark colour with a soft animated radial gradient via CSS `background-position`.
- Top: nav (transparent over the hero).
- Centre-left: eyebrow (`/ OPERATIONS PARTNER`), display headline (`Stop working in your business. / Start scaling it.`), sub (one sentence), primary CTA, secondary link.
- Bottom: scroll cue, a small mono label `SCROLL ↓` that pulses once every 2s.
- Type reveal is masked-clip from below, word by word, 80ms stagger, 1200ms total.

### Marquee strip

- Horizontal scroll, infinite. Two rows would be too busy. One row.
- Tags separated by a small `+` symbol in accent colour.
- Height: 64px on desktop, 56px on mobile.
- Pauses on hover.
- Background: `--bone-soft`. Text: `--ink`.

### Agitator

- Bone background.
- Eyebrow `/ THE STATE OF PLAY`, headline `You did not build a business to babysit it.`
- 4 numbered cards in a 4-up grid on desktop, 2-up on tablet, stacked on mobile.
- Each card: mono number top-left, short title, single sentence body.
- Cards reveal in sequence on scroll, 120ms stagger, soft ease.

### Vs-comparison

- Pinned scroll. Section is `200vh` tall, content sticks to the centre for `100vh` of scroll.
- Two columns. Left labelled `/ TODAY`. Right labelled `/ AFTER`.
- Left starts at full opacity, desaturates and dims to 40% as the user scrolls through the section.
- Right starts at 30% opacity, resolves to 100% with each scroll progress increment.
- Each bullet animates in from `y: 20, opacity: 0` to `y: 0, opacity: 1` at a different scroll progress checkpoint.
- Mobile: drop the pin, two stacked lists with the same animations triggered by `whileInView`.

### Approach (the three steps)

- Pinned scroll. Display headline left, animated diagram right.
- The diagram is a simple flowchart: three labelled nodes that connect as the user scrolls.
- Each scroll progress checkpoint reveals one node, draws the connecting line to the next, then settles.
- Behind the diagram: a faint grid pattern, 24px squares, `--ink` at 5% opacity.

### Services

- Three full-bleed rows. No cards, no padding around them, edge to edge.
- Each row is `min-height: 280px`. Default state: ink text on bone, accent eyebrow.
- Hover: the row darkens to `--ink` with text inverting to `--bone`. An arrow slides in from the right and the row title scales up by `1.02`. 320ms, ease-out.
- A hairline border between rows (`1px var(--ink)` at 12%).
- Each row is clickable, navigates to `/services/{slug}` or scrolls to a detail anchor (decide based on Loki's call).

### Proof

- Bone background.
- Eyebrow `/ THE RECEIPTS`, headline `Real systems. Real outcomes.`
- One large case study card (image left, text right) and a row of client logos below, desaturated, animate to full colour on hover.

### ROI calculator

- Bone-warm surface in a card with `--radius-lg` and `--shadow-sm`.
- Three inputs (sliders, not number boxes) and one output number that ticks up with a spring.
- Below the output, a one-line comparison (`current` vs `with NetWorth Digital`), formatted as AUD with `Intl.NumberFormat`.
- Secondary CTA below: `See how we get you there → Book a strategy call`.

### Filter

- Oversized list, one item per line. `text-h1` size.
- Each item is muted (`--ink-muted`) until hover, then sweeps to `--ink` with a hairline underline that draws left to right.
- Six items max.

### FAQ

- Accordion. Closed by default. One question open at a time.
- Question type: `text-h3`. Answer: `text-body`, `--ink-soft` colour.
- Open icon: a plus that rotates 45 degrees into a cross. 220ms snap ease.

### Final CTA

- Full viewport (`100svh`). Ink background. Bone text.
- Centred: a single sentence in `text-display` italic. `One call. One system. One scalable business.`
- One primary button below. Magnetic.
- Footer is the only thing between this and the page end.

### Footer

- Ink background continues.
- Top: logo, phone number, three links (Services, Approach, Book).
- Bottom: copyright in mono, eyebrow size.
- A single hairline border between the two rows.

## Image rules

- All photography is warm-toned, grain on, low contrast. No stock-photo-business-people. If we cannot get real client photos, use abstract textures (linen, paper, concrete) and product UI shots.
- Logo: SVG always. The wordmark version on dark surfaces, the mark on light.
- Aspect ratios: 16:9 for case studies, 1:1 for testimonial avatars, 4:5 for portraits.
- All `<img>` go through `next/image` with `priority` only on the hero shot.

## End of design system

Read ARCHITECTURE.md next.
