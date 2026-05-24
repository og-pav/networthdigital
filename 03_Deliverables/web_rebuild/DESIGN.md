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

The palette is taken from the analysed references (demo1 and demo3). Warm dark base, warm cream surface, one vibrant warm accent. No cool blues, no greys, no gradients except in the hero shader.

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#0F0E0C` | Body text on light surfaces. Background of the hero and the final CTA. |
| `--ink-soft` | `#3A3733` | Secondary body text, captions, mono labels. |
| `--ink-muted` | `#8A857D` | Tertiary text, dividers, scroll cues. |
| `--bone` | `#F4EFE6` | Primary page background. Warm off-white. |
| `--bone-soft` | `#EAE3D6` | Section dividers, inactive states. |
| `--bone-warm` | `#FBF7F0` | Lifted surfaces (cards on the bone background). |
| `--accent` | `#FF5A36` | Primary accent. Hover lifts, focus rings, the one button that matters most. |
| `--accent-deep` | `#D9441E` | Pressed state, focus ring on light backgrounds. |
| `--success` | `#2F8F5C` | Form success only. Used sparingly. |
| `--danger` | `#B23A28` | Form error only. |

CSS variables, defined on `:root`, available everywhere through Tailwind's arbitrary value syntax (`bg-[var(--bone)]`) or a Tailwind theme extension.

Dark sections (hero and final CTA) invert: ink becomes background, bone becomes text. The accent stays the same on both.

## Typography

Three families. Display, body, mono. Pulled from Google Fonts via `next/font/google` so they self-host and preload.

| Role | Family | Weights | Notes |
| --- | --- | --- | --- |
| Display | `Instrument Serif` | 400 | The editorial moment. Hero headline, section labels, the final CTA line. Italic available for the one sentence that needs it. |
| Body / UI | `Geist` | 400, 500, 600 | Everything else. Buttons, body copy, nav. |
| Mono | `Geist Mono` | 400, 500 | Eyebrow labels (`/ 001`, `/ APPROACH`), numbers in the ROI calculator, microcopy. |

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
