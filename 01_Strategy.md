---
client: NetWorth Digital
doc: strategy
updated: 2026-05-24
---

# Strategy: NetWorth Digital

## Positioning

NetWorth Digital is the operations partner that engineers the systems behind a service business so the owner can stop running it manually. They do this on top of GoHighLevel but they do not lead with the tool. They lead with the outcome: predictable revenue, fewer hours, less chaos.

## The shift

| From | To |
| --- | --- |
| Loud, hustle, agency vibe | Calm, authoritative, operations vibe |
| Three services flat | Three services stacked, each with a clear before/after |
| Eight CTAs scattered | One CTA: book a strategy call |
| Generic agency comparison | Vs-comparison block that names the chaos prospects actually live in |
| GHL front-and-centre | GHL implicit, outcome-led |
| Decorative emojis and shouty caps | Restrained typography that does the shouting through scale |

## Core message

Stop working in your business. Start scaling it.

Variations for different sections:
- Hero: Stop working in your business. Start scaling it.
- Closer: One call. One system. One scalable business.

## Three offers, repackaged

1. **Strategy and Optimisation**: weekly coaching, frameworks, private community. Position as the entry point.
2. **Operations and Automation**: done-with-you GHL builds. The flagship offer.
3. **Web and Content**: high-converting websites and content systems. The upgrade.

Sequence matters. We present them in that order so prospects self-select up the ladder.

## Proof strategy

We are building proof into the site itself. The site is a demo of what they can build.

- The vs-comparison block animates on scroll, showing chaos collapsing into structure.
- The services section uses a pinned scroll where each offer reveals piece by piece, mimicking a system being assembled.
- A small ROI calculator on the page lets prospects feel the math before the call, reframing the price as an investment.

## Conversion structure

Hero → Agitator (pain in their words) → Vs-comparison (the contrast) → Services (the arsenal) → Proof (case study or testimonial) → Filter (who this is for) → ROI calculator (the math) → FAQ → Final CTA.

Every section ends with a small affordance pointing to the next. The primary CTA appears in the nav, the hero, after the vs-comparison, after the services, and as the final block. Five touchpoints, same destination.

## Tech direction

- Next.js 15 app router, Tailwind, TypeScript.
- Lenis for smooth scroll. GSAP and ScrollTrigger for cinematic scroll storytelling. Framer Motion for component-level micro-interactions. Three.js (small footprint) for the hero shader. Vercel for hosting.
- All copy in the codebase. No CMS at launch.
- Booking handled by the existing GoHighLevel widget so they do not lose attribution.

See `03_Deliverables/web_rebuild/` for the full dev handoff.
