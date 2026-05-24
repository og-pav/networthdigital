---
doc: architecture
client: NetWorth Digital
updated: 2026-05-24
---

# ARCHITECTURE.md — file tree, components, data flow

## Stack confirmed

- Next.js 15, app router, TypeScript strict.
- React 19.
- Tailwind CSS v3 (or v4 if stable when build starts). Tokens defined in `app/globals.css` as CSS variables and mirrored into `tailwind.config.ts` for autocomplete.
- `next/font` for Instrument Serif, Geist, Geist Mono.
- Lenis for smooth scroll. Single instance via a client provider.
- GSAP 3, ScrollTrigger plugin. Use `@gsap/react`'s `useGSAP` hook so timelines clean up correctly with React.
- Framer Motion 11. Used at component level (hover, page transitions, springs).
- Three.js + a small inline shader for the hero only. Loaded via `dynamic(() => import(...), { ssr: false })`.
- Lucide React for icons.
- `clsx` and `tailwind-merge` for conditional classnames.
- `zod` for form validation if any forms ship at launch.

No CMS. All copy lives in `content/*.ts` files exported as typed constants. This keeps Claude Code's edits surgical.

## File tree

```
networth-digital/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx              // site shell, nav + footer + providers
│   │   ├── page.tsx                // the homepage. composes the sections.
│   │   ├── book/
│   │   │   └── page.tsx            // GHL booking embed route
│   │   └── opengraph-image.tsx     // OG image generator
│   ├── globals.css                 // CSS variables, base resets, Lenis container
│   ├── layout.tsx                  // <html>, fonts, metadata defaults
│   ├── not-found.tsx               // 404
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── ui/
│   │   ├── Button.tsx              // magnetic button. variants: primary | secondary | ghost
│   │   ├── Eyebrow.tsx             // mono label, accent colour
│   │   ├── SectionHeading.tsx
│   │   ├── SectionLead.tsx
│   │   ├── Accordion.tsx           // FAQ
│   │   ├── Slider.tsx              // ROI calculator inputs
│   │   ├── AnimatedNumber.tsx      // spring-animated ticker for ROI output
│   │   └── ScrollCue.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── HeroBackground.tsx      // Three.js shader (dynamic import)
│   │   ├── Marquee.tsx
│   │   ├── Agitator.tsx
│   │   ├── VsComparison.tsx        // pinned scroll
│   │   ├── Approach.tsx            // pinned scroll process
│   │   ├── Services.tsx
│   │   ├── Proof.tsx
│   │   ├── RoiCalculator.tsx
│   │   ├── Filter.tsx
│   │   ├── Faq.tsx
│   │   └── FinalCta.tsx
│   └── providers/
│       ├── LenisProvider.tsx       // client component, wraps children, drives smooth scroll
│       ├── GsapProvider.tsx        // registers plugins once, exposes context
│       └── MotionProvider.tsx      // wraps Framer Motion config with reduced-motion handling
├── content/
│   ├── nav.ts
│   ├── hero.ts
│   ├── marquee.ts
│   ├── agitator.ts
│   ├── vs.ts
│   ├── approach.ts
│   ├── services.ts
│   ├── proof.ts
│   ├── filter.ts
│   ├── faq.ts
│   ├── finalCta.ts
│   └── footer.ts
├── lib/
│   ├── reduced-motion.ts           // single source of truth for prefers-reduced-motion
│   ├── format.ts                   // Intl.NumberFormat helpers for the ROI calculator
│   ├── cn.ts                       // clsx + tailwind-merge wrapper
│   └── schema.ts                   // JSON-LD builders
├── public/
│   ├── og/                         // pre-baked OG fallbacks
│   ├── logo/                       // SVG logos
│   └── images/                     // optimised case study and texture imagery
├── styles/                         // optional, currently empty; everything in globals.css
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Data flow

The site is fully static at launch. Everything from `content/*.ts` is imported at build time. No client-side fetches, no API routes. The booking widget is an iframe embed.

If we want to add a contact form later, it goes through a Vercel route handler (`app/api/contact/route.ts`) that pushes into the GHL inbound webhook. Not at launch.

## Server vs client components

Default: server components.

Client components only when:

- Lenis, GSAP, Framer Motion or Three.js need to mount. Mark these with `'use client'` and keep them as leaf components so the rest of the tree stays static.
- Form state, slider state, modal state.

Pattern: each `sections/*.tsx` file is a server component that imports its copy and renders the structure. Any animation is wrapped in a small client child component co-located in the same file or in `components/animations/`.

Example:

```tsx
// components/sections/Hero.tsx (server)
import { hero } from '@/content/hero';
import { HeroBackground } from './HeroBackground';
import { HeroReveal } from './HeroReveal'; // 'use client'

export function Hero() {
  return (
    <section>
      <HeroBackground />
      <HeroReveal>
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1>{hero.headline}</h1>
        ...
      </HeroReveal>
    </section>
  );
}
```

## Providers

`app/(site)/layout.tsx` wraps children in:

```tsx
<LenisProvider>
  <GsapProvider>
    <MotionProvider>
      <Nav />
      <main>{children}</main>
      <Footer />
    </MotionProvider>
  </GsapProvider>
</LenisProvider>
```

`LenisProvider` initialises Lenis with sensible defaults (`duration: 1.2`, `easing: t => 1 - Math.pow(1 - t, 3)`) and bridges scroll events into GSAP's ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`).

`GsapProvider` registers `ScrollTrigger` once and exposes a context where children can opt in. In practice, individual components use `useGSAP()` from `@gsap/react` and the provider exists mainly to register plugins.

`MotionProvider` wraps `MotionConfig` and sets `reducedMotion: 'user'` so the entire Framer Motion tree respects `prefers-reduced-motion` without per-component checks.

## Metadata and SEO

`app/layout.tsx` exports a default `metadata` object: title template, description, OG defaults, Twitter card defaults.

`app/(site)/page.tsx` exports `generateMetadata()` for the homepage-specific overrides.

`app/(site)/opengraph-image.tsx` generates the OG image at the edge using `next/og`. Dark background, big serif headline, accent stripe. One image per route.

`lib/schema.ts` exports JSON-LD builders. The homepage renders four JSON-LD blocks inside `<script type="application/ld+json">`:

- `Organization`
- `LocalBusiness`
- `Service` (one per offer)
- `FAQPage` (built from `content/faq.ts`)

## Routing

Only two routes at launch:

- `/` the homepage
- `/book` the booking widget embed

If we add `/services/{slug}` detail pages later, those become route segments under `app/(site)/services/[slug]/page.tsx` and `content/services.ts` becomes the data source.

## Image strategy

- `next/image` for everything. `priority` only on the hero shot.
- Source images live in `public/images/`. Originals checked into the repo, served as compressed AVIF and WebP via Next.
- Real product UI screenshots and warm textures only. No stock photo handshakes.
- `sizes` attribute on every image, accurate to the layout.

## Forms

No forms at launch. The booking widget handles intake.

## Testing

- Type-check: `tsc --noEmit` in CI.
- Lint: `eslint` with the Next 15 config.
- Accessibility: `@axe-core/playwright` for one smoke test that loads the homepage and asserts zero violations.
- Lighthouse: `unlighthouse` or PageSpeed Insights manually before each deploy.

Visual regression and unit testing not needed at launch. Add Playwright if we ship features past the homepage.

## CI/CD

- GitHub Actions: type-check + lint + axe smoke on every PR.
- Vercel: PR previews automatic. Production deploy on push to `main`.
- Branch protection on `main`. PRs require one review (Loki) and passing CI.

## Env vars

Only one likely at launch: `NEXT_PUBLIC_GHL_BOOKING_URL` for the booking widget src. Document in `.env.example`.

## Folder conventions

- One component per file. PascalCase filename matches the component name.
- Co-locate styles, types and tiny helpers inside the component file. Reach for a separate file only when something is reused.
- Content files (`content/*.ts`) export typed constants. Define the type inline at the top of the file.

## End of architecture

Read ANIMATIONS.md next.
