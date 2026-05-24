# NetWorth Digital

Marketing site for NetWorth Digital, a premium operations partner for Australian
service businesses. Single long-scroll homepage plus a `/book` page that embeds
the GoHighLevel scheduling widget.

Built as a fully static site, so it runs the same on GitHub Pages (development)
and Vercel (production) with no server.

## Stack

- **Next.js 15** (App Router, TypeScript strict), static export (`output: "export"`)
- **React 19**
- **Tailwind CSS v3** with design tokens defined in `app/globals.css` and mirrored in `tailwind.config.ts`
- **Lenis** smooth scroll, **GSAP + ScrollTrigger** for pinned scroll animations, **Framer Motion** for component interactions
- **Three.js** for the hero gradient-mesh background (dynamic import with a static fallback)
- **next/font** self-hosting Instrument Serif, Geist, Geist Mono
- Package manager: **npm**

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # static export to ./out
npm run typecheck  # tsc --noEmit
npm run serve:out  # serve the built ./out locally
```

## Environment

Copy `.env.example` to `.env.local` and adjust if needed. All are optional and
have sensible defaults baked in.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GHL_BOOKING_URL` | GoHighLevel booking widget embedded on `/book`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata. |
| `GITHUB_PAGES` | Set to `true` only for the GitHub Pages build (applies the `/networkdigital` basePath). Leave unset locally and on Vercel. |

## Deploy

### GitHub Pages (development)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static
export with `GITHUB_PAGES=true` and publishes `./out`. One-time setup: in the
repo settings, set **Settings → Pages → Build and deployment → Source** to
**GitHub Actions**. The site serves at `https://lokidum.github.io/networkdigital/`.

The `basePath`/`assetPrefix` of `/networkdigital` is applied only when
`GITHUB_PAGES=true`, so asset URLs resolve correctly under the project subpath.

### Vercel (production, later)

Import the repo in Vercel. No env vars required (leave `GITHUB_PAGES` unset so the
site serves from the root). Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Project structure

```
app/                 # routes: (site)/page.tsx (home), (site)/book, layout, metadata, sitemap, robots
components/
  layout/            # Nav, Footer, Container
  ui/                # Button, Eyebrow, headings, Slider, AnimatedNumber, Reveal, ...
  sections/          # Hero, Marquee, Agitator, VsComparison, Approach, Services, Proof, RoiCalculator, Filter, Faq, FinalCta
  providers/         # Lenis, GSAP, Framer Motion providers (reduced-motion aware)
content/             # all copy as typed constants (no CMS)
lib/                 # cn, format, reduced-motion, site config, JSON-LD builders
```

All copy lives in `content/*.ts`. Design system reference and source docs are in
`03_Deliverables/web_rebuild/`.

## Accessibility & motion

Every animation has a reduced-motion fallback (`prefers-reduced-motion`): GSAP
timelines and the WebGL hero are skipped, Lenis falls back to native scroll, the
marquee stops. Colour contrast meets WCAG AA, with a skip-to-content link and
visible focus rings throughout.
