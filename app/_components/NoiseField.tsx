"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

/**
 * Full-page WebGL background. Renders an animated mauve noise field that
 * subtly distorts and glows around the cursor. Sits at z -30 behind every
 * section. Performance budget: single fullscreen quad, dpr capped at 1.4,
 * runs at frame rate but kept simple (two octaves of simplex noise).
 */

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  varying vec2 vUv;

  // Classic 2D simplex noise (Ian McEwan, Ashima Arts)
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                     + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g; g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 uv = vUv;
    vec2 p = vec2(uv.x * aspect, uv.y);

    // Two octaves of slow-drifting noise
    float t = uTime * 0.05;
    float n1 = snoise(p * 1.8 + vec2(t, t * 0.6));
    float n2 = snoise(p * 5.0 + vec2(-t * 0.4, t * 0.3));
    float n = n1 * 0.65 + n2 * 0.35;

    // Mouse-driven glow
    vec2 mp = vec2(uMouse.x * aspect, uMouse.y);
    float d = distance(p, mp);
    float glow = smoothstep(0.55, 0.0, d) * 0.50;
    float ring = smoothstep(0.22, 0.18, d) * 0.18;

    // Cobalt & Cream palette (ambient, kept subtle at zIndex -30)
    vec3 deep   = vec3(0.071, 0.078, 0.110);  // #12141c cool ink
    vec3 mauve  = vec3(0.227, 0.427, 0.941);  // #3a6df0 cobalt
    vec3 light  = vec3(0.702, 0.788, 1.000);  // #b3c9ff light cobalt

    // Base ramp tinted by noise
    float mix1 = clamp(0.20 + n * 0.18 + glow * 0.45, 0.0, 1.0);
    vec3 col = mix(deep, mauve, mix1);
    col = mix(col, light, glow * 0.40 + ring);

    // Subtle film-grain dither so the gradient never bands
    float grain = fract(sin(dot(vUv * uRes, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.014;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function NoiseMesh({ mouseRef }: { mouseRef: React.RefObject<[number, number]> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uMouse.value.set(mouseRef.current?.[0] ?? 0.5, mouseRef.current?.[1] ?? 0.5);
    u.uRes.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        depthTest={false}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uRes: { value: new THREE.Vector2(1, 1) },
        }}
      />
    </mesh>
  );
}

export function NoiseField() {
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      mouseRef.current = [
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      ];
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -30 }}
    >
      <Canvas
        dpr={[1, 1.4]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <NoiseMesh mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
