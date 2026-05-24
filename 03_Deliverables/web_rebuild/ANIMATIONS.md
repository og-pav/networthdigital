---
doc: animations
client: NetWorth Digital
updated: 2026-05-24
---

# ANIMATIONS.md — concrete recipes

Working starting points for the bigger animation moments. Treat these as cookbook examples, not gospel. Tune the timings against the site once it is running.

All examples assume the providers from ARCHITECTURE.md are in place (`LenisProvider`, `GsapProvider`, `MotionProvider`) and the design tokens from DESIGN.md are exposed as CSS variables.

## 1. Lenis smooth scroll provider

```tsx
// components/providers/LenisProvider.tsx
'use client';

import Lenis from 'lenis';
import { ReactNode, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

## 2. Hero masked text reveal (GSAP + SplitText alternative)

GSAP's SplitText is a Club GreenSock plugin. Free alternative: split manually into words wrapped in spans with `overflow: hidden`.

```tsx
// components/sections/HeroReveal.tsx
'use client';

import { ReactNode, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export function HeroReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = ref.current?.querySelectorAll('.reveal-word > span');
    if (!words?.length) return;

    gsap.fromTo(
      words,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
        delay: 0.2,
      }
    );
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
```

To use, wrap each word in a span and that span in a clipping span:

```tsx
<h1>
  {'Stop working in your business.'.split(' ').map((w, i) => (
    <span key={i} className="reveal-word inline-block overflow-hidden">
      <span className="inline-block">{w}&nbsp;</span>
    </span>
  ))}
</h1>
```

Reduced motion: skip the GSAP call entirely (it does), text just shows.

## 3. Pinned vs-comparison section

```tsx
// components/sections/VsComparison.tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function VsComparisonAnimation({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.6,
        },
      });

      tl.to('.vs-left', { opacity: 0.4, filter: 'grayscale(1)', duration: 1 }, 0);
      tl.from('.vs-right-item', {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
      }, 0);
    }, root);

    return () => ctx.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
```

Mobile fallback (under `lg`): swap the pin for `whileInView` Framer Motion stagger. Detect viewport in a `useEffect` and bail out of the GSAP path.

## 4. Magnetic CTA button (Framer Motion)

```tsx
// components/ui/MagneticButton.tsx
'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MouseEvent, ReactNode, useRef } from 'react';

export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 240, damping: 28, mass: 0.6 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
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

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.98 }}
      transition={{ scale: { type: 'spring', stiffness: 400, damping: 25 } }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
```

Reduced motion handled by the `MotionProvider` config from ARCHITECTURE.md.

## 5. Marquee strip

Pure CSS, no JS. Better for performance and instantly accessible.

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 40s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; transform: none; }
}
```

The track contains the tag list twice in sequence (so the loop is seamless). Tag separator is the `+` symbol in accent colour.

## 6. ROI calculator output ticker

Spring-animated number with Framer Motion's `animate` API.

```tsx
// components/ui/AnimatedNumber.tsx
'use client';

import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(0);

  useEffect(() => {
    const controls = animate(last.current, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    last.current = value;
    return () => controls.stop();
  }, [value, format]);

  return <span ref={ref}>{format(value)}</span>;
}
```

Format helper:

```ts
// lib/format.ts
export const aud = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n);
```

## 7. Hero WebGL shader (Three.js)

Minimal animated gradient mesh. Loaded via dynamic import so it does not block first paint. Falls back to a CSS radial gradient when reduced motion is on or WebGL is unavailable.

```tsx
// components/sections/HeroBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !ref.current) return;

    const canvas = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `void main(){ gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          float d = distance(uv, uMouse);
          float wave = 0.5 + 0.5 * sin(uTime * 0.3 + d * 6.0);
          vec3 ink = vec3(0.058, 0.054, 0.047);
          vec3 accent = vec3(1.0, 0.352, 0.211);
          vec3 col = mix(ink, accent * 0.35, smoothstep(0.55, 0.0, d) * wave * 0.6);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      uniforms.uMouse.value.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove);

    const tick = (t: number) => {
      uniforms.uTime.value = t * 0.001;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onResize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      uniforms.uResolution.value.set(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
```

In `Hero.tsx`, import this with `dynamic(() => import('./HeroBackground').then(m => m.HeroBackground), { ssr: false, loading: () => <div className="absolute inset-0 bg-[var(--ink)]" /> })`.

## 8. Scroll-pinned approach diagram

Each step (`01 STRUCTURE`, `02 SYSTEMS`, `03 SCALING`) reveals on a scroll-progress checkpoint inside a pinned ScrollTrigger.

```tsx
// inside Approach.tsx (client child)
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.approach',
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.5,
    },
  });

  ['#step-01', '#step-02', '#step-03'].forEach((id, i) => {
    tl.fromTo(id, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1 }, i);
    if (i < 2) {
      tl.fromTo(`#line-${i}`, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5 }, i + 0.4);
    }
  });
}, []);
```

`drawSVG` is a paid plugin. Free alternative: animate `stroke-dashoffset` from `dasharray` length to 0.

## 9. Services hover row

Default: bone background, ink text, accent eyebrow. Hover: invert.

```tsx
<motion.li
  whileHover="hover"
  initial="rest"
  animate="rest"
  className="relative cursor-pointer border-b border-ink/12"
>
  <motion.div
    variants={{ rest: { backgroundColor: 'var(--bone)' }, hover: { backgroundColor: 'var(--ink)' } }}
    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    className="px-[var(--section-x)] py-12"
  >
    <Eyebrow>{eyebrow}</Eyebrow>
    <motion.h3
      variants={{ rest: { color: 'var(--ink)' }, hover: { color: 'var(--bone)' } }}
      transition={{ duration: 0.32 }}
      className="text-h2 mt-4"
    >
      {title}
    </motion.h3>
    <motion.span
      variants={{ rest: { x: -8, opacity: 0 }, hover: { x: 0, opacity: 1 } }}
      transition={{ duration: 0.32 }}
      className="absolute right-[var(--section-x)] top-1/2 -translate-y-1/2"
      aria-hidden
    >
      →
    </motion.span>
  </motion.div>
</motion.li>
```

## 10. Filter list (underline sweep on hover)

```tsx
<li className="group relative">
  <span className="text-h1 text-ink/40 transition-colors duration-300 group-hover:text-ink">
    {label}
  </span>
  <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
</li>
```

## 11. FAQ accordion (Framer Motion)

```tsx
<AnimatePresence initial={false}>
  {open && (
    <motion.div
      key="content"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <p className="pb-8 text-body text-ink-soft">{answer}</p>
    </motion.div>
  )}
</AnimatePresence>
```

Plus icon rotates 45deg via CSS `transform: rotate(var(--rot))` toggled by the `open` state.

## 12. Page transitions

Optional at launch. If we ship `/book` as a real route (not a modal), wrap the `app/(site)/layout.tsx` children in a Framer Motion `AnimatePresence` keyed on the pathname, with a `fade-and-slide` variant.

```tsx
<AnimatePresence mode="wait" initial={false}>
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

## 13. Reduced-motion checklist

Before every animation commit, confirm:

- [ ] GSAP timeline is gated by `prefers-reduced-motion` or jumps to end on reduced motion.
- [ ] Framer Motion respects `MotionConfig reducedMotion="user"`.
- [ ] CSS animations have a `@media (prefers-reduced-motion: reduce)` override.
- [ ] The WebGL hero falls back to a static gradient.
- [ ] Lenis is disabled on reduced motion.
- [ ] No animation longer than 500ms runs without a way to skip it.

## End of animations

Read README.md for the run order and you are ready to start the project.
