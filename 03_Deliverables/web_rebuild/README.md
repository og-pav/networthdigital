---
doc: handoff_readme
client: NetWorth Digital
updated: 2026-05-24
---

# NetWorth Digital — web rebuild handoff

This folder is the full dev brief for the NetWorth Digital website rebuild. It is designed to be handed directly to Claude Code (or another capable agent) so they can scaffold and build the site without needing back-and-forth on scope.

## What this package is

A premium minimalist rebuild of `networth-digital.com`. The brief reframes NetWorth Digital from a loud GoHighLevel reseller into an authoritative operations partner. Look and feel pull from agency references like Rig, Shift5 and Heimdall Power. Tech stack: Next.js 15, Tailwind, GSAP, Lenis, Framer Motion, Three.js.

## Read order

Read these files in this order. Do not skip ahead.

1. `PROMPT.md` — paste this into Claude Code first. It sets the scope, tech stack, performance targets, page structure, voice rules and acceptance criteria. This file wins any conflict with the others.
2. `DESIGN.md` — the full design system. Colour, typography, spacing, components, easing curves, section-by-section visual spec.
3. `ARCHITECTURE.md` — Next.js file tree, providers, server vs client component split, content data flow, SEO and JSON-LD setup.
4. `COPY.md` — every word that ships on the site. Already written, already approved-in-principle. Do not invent new copy without flagging it.
5. `ANIMATIONS.md` — concrete code recipes for the bigger animation moments (Lenis, GSAP hero reveal, pinned vs section, magnetic CTA, WebGL hero, scroll-pinned approach, ROI ticker, FAQ accordion).

## How to kick this off in Claude Code

From a fresh Claude Code session, paste this:

> I am building the new NetWorth Digital website. The full brief is in the same directory as this message, in five markdown files. Read them in this order: `PROMPT.md`, `DESIGN.md`, `ARCHITECTURE.md`, `COPY.md`, `ANIMATIONS.md`. Then scaffold the Next.js 15 project, install the dependencies listed in `ARCHITECTURE.md`, set up the providers and design tokens, and build the homepage in the order given under "Build order (recommended)" in `PROMPT.md`. After each commit, stop and tell me what you shipped and what you are about to do next. Do not start a new section until I have confirmed the previous one.

The build order in `PROMPT.md` is intentional. It front-loads the long-lead and high-risk items (pinned scroll, WebGL hero) so they get stress-tested before the easier sections.

## Open items to chase down before code starts

These are blockers, not nice-to-haves. Resolve them before the first commit:

1. Repo name and GitHub org.
2. Vercel project name and target domain (preview subdomain or production).
3. Brand assets: logo SVG, founder photos, any imagery to lift from the current site.
4. Real testimonial and case study copy, or confirmation to use placeholder.
5. Whether the GHL booking widget is a full route or a modal.
6. The client's email address for the footer.
7. Final sign-off on dropping the profanity from the current site.

## Voice rules (also in `PROMPT.md`, restated for emphasis)

- Australian English: organise, optimise, behaviour, colour, centre.
- No em dashes or en dashes. Anywhere.
- No filler: leverage, delve, tapestry, robust, transformative, holistic, synergy, facilitate, utilise, navigate (metaphorically).
- No exclamation marks (except the marquee strip).
- Tone is confident, calm and terse. Authority over hustle.

## Commit and PR conventions

- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `perf:`, `a11y:`, `seo:`.
- Small PRs, squashed on merge.
- Each commit must leave the site in a deployable state.
- PR description: one sentence on what shipped, one sentence on what is next, link to the Vercel preview.

## Acceptance criteria (also in `PROMPT.md`)

Done means:

- All thirteen homepage sections built and matching `DESIGN.md`.
- Lighthouse: 95+ Performance desktop, 90+ Performance mobile, 100 A11y, 100 Best Practices.
- All copy matches `COPY.md` exactly.
- Every animation has a working reduced-motion fallback.
- Keyboard user reaches the booking widget in under ten tabs from any section.
- README in the repo explains run, develop and deploy.
- Vercel preview approved by Loki.

## If something is missing

If you read these docs and something is unclear or contradictory:

1. Apply the precedence: `PROMPT.md` wins over `DESIGN.md` wins over `ARCHITECTURE.md` wins over the others.
2. If still ambiguous, default to the most premium, most restrained, most minimalist option.
3. Flag the assumption in chat and keep moving. Do not block waiting for a clarification you can answer yourself with a sensible default.

## Where this folder sits

This is inside Loki's Second Brain vault at:

```
/Users/kiks/Documents/Obsidian Vault/Second Brain/1_Nunik_Co/Clients/NetWorth Digital/03_Deliverables/web_rebuild/
```

Siblings: `_INDEX.md`, `00_Brief_and_Discovery.md`, `01_Strategy.md` at the client root. Those are the why and the strategic frame. This folder is the how.

## End of README

Go to `PROMPT.md`.
