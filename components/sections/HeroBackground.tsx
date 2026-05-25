"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !ref.current) return;

    const canvas = ref.current;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return; // WebGL unavailable; the CSS fallback underneath stays visible.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.55) },
      uResolution: {
        value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
      },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `void main(){ gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        // cheap value noise for a soft drifting grain
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
                     mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
        }
        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          float aspect = uResolution.x / uResolution.y;
          vec2 p = uv; p.x *= aspect;
          vec2 m = uMouse; m.x *= aspect;
          float d = distance(p, m);
          float wave = 0.5 + 0.5 * sin(uTime * 0.25 + d * 5.0);
          float n = noise(uv * 3.0 + uTime * 0.03) * 0.05;
          vec3 base = vec3(0.106, 0.133, 0.251); // #1B2240 deep navy
          vec3 steel = vec3(0.314, 0.549, 0.643); // #508CA4 air force blue
          vec3 gold = vec3(0.694, 0.529, 0.059);  // #B1870F goldenrod
          float glow = smoothstep(0.9, 0.0, d) * wave * 0.7;
          vec3 hue = mix(steel, gold, wave);
          vec3 col = mix(base, hue, glow * 0.55);
          col += n;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let frame = 0;
    const target = new THREE.Vector2(0.5, 0.55);
    const onMove = (e: MouseEvent) => {
      target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);

    const tick = (t: number) => {
      uniforms.uTime.value = t * 0.001;
      // ease the mouse for a smoother response
      uniforms.uMouse.value.lerp(target, 0.04);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onResize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      uniforms.uResolution.value.set(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      material.dispose();
      mesh.geometry.dispose();
    };
  }, []);

  return (
    <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
  );
}
