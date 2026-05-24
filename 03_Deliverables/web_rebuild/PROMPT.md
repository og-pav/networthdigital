---
doc: claude_code_prompt
client: NetWorth Digital
updated: 2026-05-24
---

# PROMPT.md — paste this into Claude Code to start the build

You are building the new NetWorth Digital website. This is a full rebuild, not a refactor of the existing GoHighLevel funnel. The goal is to reposition the agency from a loud, hustle-coded GHL reseller into a premium, authoritative operations partner.

Read the other docs in this folder before writing code. The order is:

1. This file (PROMPT.md), for context and scope.
2. DESIGN.md, for the design system, tokens and visual rules.
3. ARCHITECTURE.md, for the file tree and component breakdown.
4. COPY.md, for every piece of copy in the build.
5. ANIMATIONS.md, for the concrete GSAP, Framer Motion, Lenis and Three.js recipes.

If something contradicts between these files, this file wins, then DESIGN, then ARCHITECTURE.

## Project context

- Client: NetWorth Digital. Australian digital agency, resells GoHighLevel as a productised service.
- Audience: Australian service-based business owners, $250k to $2M revenue, 3 to 15 staff, owner is still operator.
- Existing site: `networth-digital.com`, GHL funnel template. The voice and design both need to change.
- Brand posture: premium minimalism. Calm authority over hustle. Whitespace, restrained type, one accent colour, deliberate motion.

## Tech stack (fixed)

- Next.js 15, app router, TypeScript, React Server Components where possible, client components only where animation requires it.
- Tailwind CSS for layout and spacing. CSS variables for design tokens.
- Lenis for smooth scroll.
- GSAP and ScrollTrigger for scroll-driven animation. Use the official `@gsap/react` hook (`useGSAP`).
- Framer Motion for component-level micro-interactions (hover states, page transitions, springs).
- Three.js for the hero background shader only. Keep the bundle under 80kb gzipped.
- Vercel for hosting. Deploy from `main`. PR previews on every push.
- Bun or pnpm for the package manager (your call, document it in the README).

## Performance targets (non-negotiable)

- Lighthouse: 95+ Performance, 100 Accessibility, 100 Best Practices, 95+ SEO on desktop. 90+ Performance on mobile.
- LCP under 2.0s on a Moto G4 throttled.
- CLS under 0.05.
- First Load JS under 180kb gzipped for the homepage. The Three.js hero loads behind a dynamic import with a static fallback.
- Total page weight under 1.5MB on desktop, under 1MB on mobile (lazy-load anything below the fold).

## Page structure (homepage only at launch)

The homepage is the entire site at launch. Section order matters. Do not reorder without asking.

1. **Nav**: logo left, three nav items (Services, Approach, FAQ), primary CTA right (`Book a strategy call`). Sticky, becomes translucent on scroll.
2. **Hero**: full viewport. Subtle WebGL gradient mesh background. Eyebrow label, headline, sub, primary CTA, secondary text link. Scroll cue at bottom.
3. **Marquee strip**: scrolling row of capability tags. Loops infinitely. Pauses on hover.
4. **Agitator**: a short, calm acknowledgment of where the prospect is right now. Three to four numbered pain cards (`001`, `002`, `003`).
5. **Vs-comparison**: the chaos column versus the structure column. Pinned scroll. Left column desaturates, right column resolves into focus as the user scrolls through it.
6. **Approach (the three steps)**: scroll-pinned process diagram. Structure → Systems → Scaling. Each step builds piece by piece.
7. **Services**: three offers, stacked vertically. Each is a full-bleed row with a hover-reveal interaction. On hover, the row darkens slightly and an arrow slides in from the right.
8. **Proof**: one case study card and a small logo strip. Placeholder content for now, marked as `TODO: real data`.
9. **ROI calculator**: interactive widget. Inputs: monthly leads, current close rate, average client value. Output: revenue today vs revenue after a 5% close-rate lift. See ANIMATIONS.md for the spring-animated number ticker.
10. **Filter ("Who this is for")**: a stark, oversized list. Hover states sweep an underline left to right.
11. **FAQ**: accordion. Six questions, copy in COPY.md.
12. **Final CTA**: one screen, one message, one button. The whole site has been pushing toward this.
13. **Footer**: minimal. Logo, phone, three sub-links, copyright.

## Voice and copy

- Australian English. Organise, optimise, behaviour, colour, centre.
- No em dashes or en dashes anywhere. Use commas, colons, parentheses or sentence breaks. Ranges use "to".
- Tone: confident, calm, terse. No profanity. No exclamation marks except in the marquee strip and the CTA microcopy.
- No fluff words: leverage, delve, tapestry, robust, transformative, holistic, synergy, facilitate, utilise, navigate (metaphorically).
- All final copy lives in COPY.md. Do not write your own copy unless something is missing, then add it to COPY.md and flag it in chat.

## Accessibility

- WCAG 2.1 AA minimum. Run a check before each commit.
- Every animation respects `prefers-reduced-motion`. When reduced motion is on, GSAP timelines should fast-forward to their end states, Framer Motion variants should skip the spring, the WebGL hero falls back to a static gradient.
- Keyboard navigation must reach every interactive element. Visible focus rings, never `outline: none` without a replacement.
- Colour contrast: AAA on body copy, AA on display copy.
- Real semantic HTML. `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`. No `<div>`-soup.

## SEO

- Single `<h1>` per page. Logical heading hierarchy after that.
- Metadata in the app router `generateMetadata`. OG image generated at build time using `next/og`.
- JSON-LD: `Organization`, `LocalBusiness`, `Service` for each of the three offers, `FAQPage` for the FAQ section.
- Sitemap and robots.txt via `next-sitemap` or the built-in app router files.

## Booking integration

The existing GoHighLevel booking widget lives at `https://link.jmdigital360.com/widget/booking/FqXWOENX9f3c5jJteFOx`. Embed it in a route called `/book` or a modal triggered by every CTA. Confirm with the client which they prefer. Default to a full-page route so the embed is not constrained by a modal width.

## Out of scope at launch

- Blog or insights section.
- Case study detail pages.
- A live chat widget.
- A CMS.
- A separate about page (founder bio sits inside the homepage proof section if it sits anywhere).

## Build order (recommended)

Work in this sequence so we can ship the long-lead items first.

1. Project setup. Next 15 app router, Tailwind, design tokens from DESIGN.md, base layout, fonts (next/font), Lenis, GSAP context, Framer Motion provider. Commit.
2. Nav, footer, base typography, button components. Commit.
3. Hero (static first, WebGL last). Commit at static. Add WebGL behind a dynamic import in a separate commit.
4. Marquee strip. Commit.
5. Vs-comparison section, pinned scroll. This is the highest-risk piece, so build it early and stress-test on mobile. Commit.
6. Services section. Commit.
7. Approach (scroll-pinned process). Commit.
8. ROI calculator. Commit.
9. Agitator, Filter, Proof, FAQ. Commit.
10. Final CTA. Commit.
11. SEO pass. Metadata, OG image, JSON-LD, sitemap, robots.txt. Commit.
12. A11y pass. Run axe, fix every violation. Commit.
13. Performance pass. Lighthouse on desktop and mobile. Optimise images (next/image), audit JS bundle, lazy-load below-fold. Commit.
14. Deploy preview, hand off to Loki for client review.

## Commit conventions

- Conventional commits. `feat:`, `fix:`, `chore:`, `refactor:`, `perf:`, `a11y:`, `seo:`.
- Small PRs. Squash on merge.
- Each commit should leave the site in a deployable state.

## Acceptance criteria

The build is done when:

- All thirteen sections from "Page structure" are implemented and match DESIGN.md.
- The site passes the performance targets above on a fresh PageSpeed Insights run.
- All copy matches COPY.md exactly.
- Every animation has a reduced-motion fallback that is genuinely usable (not just disabled with no replacement).
- A keyboard user can reach the booking widget from any section in under ten tab presses.
- The repo has a README that tells the next developer how to run, develop and deploy.
- Loki has reviewed a Vercel preview and approved.

## What to clarify before writing code

If any of these are unclear, ask in chat before scaffolding:

1. Repo name and GitHub org.
2. Vercel project name.
3. Domain. Are we deploying to `networth-digital.com` directly, or to `next.networth-digital.com` first for review?
4. Brand assets. Logo SVG, founder photos, any existing imagery to lift.
5. Real case study content, or placeholder for now?
6. The GHL booking embed: full route or modal?

When in doubt, default to the recommendation in this document and flag the assumption in chat. Do not block on questions you can answer yourself with a reasonable default.

## End of brief

Read DESIGN.md next.
