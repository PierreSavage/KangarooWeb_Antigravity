"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/providers/theme-provider";

function InteractiveScene() {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    // Mouse responsive camera drift (lerped)
    const targetX = mouse.x * 1.5;
    const targetY = mouse.y * 1.5;
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);

    // Scroll parallax depth rotation and offset
    if (groupRef.current) {
      groupRef.current.position.z = -scrollY * 0.005;
      groupRef.current.rotation.y = scrollY * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Multilayered Starry Sky */}
      <ParticleStars />
    </group>
  );
}

// Particle counts for realistic JWST deep-field density
const DUST_COUNT = 2000;   // Ultra-distant cosmic dust
const TINY_COUNT = 1200;
const MID_COUNT = 400;
const BRIGHT_COUNT = 80;

// Coordinate generation helper
const generatePositions = (count: number, spreadX: number, spreadY: number, spreadZ: number) => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    arr[i] = (Math.random() - 0.5) * spreadX;
    arr[i + 1] = (Math.random() - 0.5) * spreadY;
    arr[i + 2] = (Math.random() - 0.5) * spreadZ;
  }
  return arr;
};

// Thermodynamic star color generator helper (Ice Blue, Pure White, Soft Amber, Faint Red)
const generateColors = (count: number) => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    const rand = Math.random();
    if (rand < 0.30) {
      // Ice Blue star (hot O/B class)
      arr[i] = 0.72;
      arr[i + 1] = 0.85;
      arr[i + 2] = 1.0;
    } else if (rand < 0.55) {
      // Soft Amber star (cool K class)
      arr[i] = 1.0;
      arr[i + 1] = 0.88;
      arr[i + 2] = 0.72;
    } else if (rand < 0.80) {
      // Pure White star (A/F class)
      arr[i] = 1.0;
      arr[i + 1] = 0.98;
      arr[i + 2] = 0.96;
    } else {
      // Faint reddish star (M class — JWST infrared signature)
      arr[i] = 1.0;
      arr[i + 1] = 0.70;
      arr[i + 2] = 0.55;
    }
  }
  return arr;
};

// Static star buffers generated at module scope to avoid re-renders
const DUST_POSITIONS = generatePositions(DUST_COUNT, 32, 32, 28);
const DUST_COLORS = generateColors(DUST_COUNT);

const TINY_POSITIONS = generatePositions(TINY_COUNT, 26, 26, 20);
const TINY_COLORS = generateColors(TINY_COUNT);

const MID_POSITIONS = generatePositions(MID_COUNT, 22, 22, 16);
const MID_COLORS = generateColors(MID_COUNT);

const BRIGHT_POSITIONS = generatePositions(BRIGHT_COUNT, 18, 18, 12);
const BRIGHT_COLORS = generateColors(BRIGHT_COUNT);

// Helper to dynamically generate a smooth circular star glow texture on load
const createCircularStarTexture = () => {
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  
  // Radial gradient: bright white center fading out to transparent blue-white glow
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.5, "rgba(240, 248, 255, 0.4)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

function ParticleStars() {
  const { theme } = useTheme();
  const [starTexture, setStarTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const tex = createCircularStarTexture();
    let frameId: number;
    if (tex) {
      frameId = requestAnimationFrame(() => {
        setStarTexture(tex);
      });
    }
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (tex) tex.dispose();
    };
  }, []);

  // Mesh Refs for independent rotation speeds
  const dustPointsRef = useRef<THREE.Points>(null);
  const tinyPointsRef = useRef<THREE.Points>(null);
  const midPointsRef = useRef<THREE.Points>(null);
  const brightPointsRef = useRef<THREE.Points>(null);

  // Material Refs to animate twinkling opacities in useFrame
  const dustMatRef = useRef<THREE.PointsMaterial>(null);
  const tinyMatRef = useRef<THREE.PointsMaterial>(null);
  const midMatRef = useRef<THREE.PointsMaterial>(null);
  const brightMatRef = useRef<THREE.PointsMaterial>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotations for 3D parallax depth
    if (dustPointsRef.current) {
      dustPointsRef.current.rotation.y = time * 0.002;
      dustPointsRef.current.rotation.x = time * 0.0005;
    }
    if (tinyPointsRef.current) {
      tinyPointsRef.current.rotation.y = time * 0.005;
      tinyPointsRef.current.rotation.x = time * 0.001;
    }
    if (midPointsRef.current) {
      midPointsRef.current.rotation.y = -time * 0.008;
      midPointsRef.current.rotation.x = time * 0.002;
    }
    if (brightPointsRef.current) {
      brightPointsRef.current.rotation.y = time * 0.012;
      brightPointsRef.current.rotation.x = -time * 0.003;
    }

    // Independent scintillation (twinkling) effects
    if (dustMatRef.current) {
      // Dust barely flickers
      dustMatRef.current.opacity = (theme === "dark" ? 0.20 : 0.35) + Math.sin(time * 8.0) * 0.06;
    }
    if (tinyMatRef.current) {
      tinyMatRef.current.opacity = (theme === "dark" ? 0.35 : 0.5) + Math.sin(time * 6.0) * 0.12;
    }
    if (midMatRef.current) {
      midMatRef.current.opacity = (theme === "dark" ? 0.55 : 0.75) + Math.sin(time * 3.5) * 0.2;
    }
    if (brightMatRef.current) {
      brightMatRef.current.opacity = (theme === "dark" ? 0.75 : 0.9) + Math.sin(time * 1.8) * 0.25;
    }
  });

  const isDark = theme === "dark";

  if (!starTexture) return null;

  return (
    <group>
      {/* Layer 0: Ultra-distant cosmic dust field (JWST deep-field background) */}
      <points ref={dustPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[DUST_POSITIONS, 3]}
            count={DUST_COUNT}
            array={DUST_POSITIONS}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[DUST_COLORS, 3]}
            count={DUST_COUNT}
            array={DUST_COLORS}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={dustMatRef}
          size={isDark ? 0.015 : 0.022}
          vertexColors={isDark}
          color={isDark ? undefined : "#c58341"}
          sizeAttenuation={true}
          transparent
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          map={starTexture}
          depthWrite={false}
          alphaTest={0.001}
        />
      </points>

      {/* Layer 1: Tiny Background Cosmic Dust */}
      <points ref={tinyPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[TINY_POSITIONS, 3]}
            count={TINY_COUNT}
            array={TINY_POSITIONS}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[TINY_COLORS, 3]}
            count={TINY_COUNT}
            array={TINY_COLORS}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={tinyMatRef}
          size={isDark ? 0.035 : 0.045}
          vertexColors={isDark}
          color={isDark ? undefined : "#c58341"}
          sizeAttenuation={true}
          transparent
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          map={starTexture}
          depthWrite={false}
          alphaTest={0.001}
        />
      </points>

      {/* Layer 2: Mid-Range Constellation Stars */}
      <points ref={midPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[MID_POSITIONS, 3]}
            count={MID_COUNT}
            array={MID_POSITIONS}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[MID_COLORS, 3]}
            count={MID_COUNT}
            array={MID_COLORS}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={midMatRef}
          size={isDark ? 0.08 : 0.10}
          vertexColors={isDark}
          color={isDark ? undefined : "#c58341"}
          sizeAttenuation={true}
          transparent
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          map={starTexture}
          depthWrite={false}
          alphaTest={0.001}
        />
      </points>

      {/* Layer 3: Large Radiant Foreground Stars */}
      <points ref={brightPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[BRIGHT_POSITIONS, 3]}
            count={BRIGHT_COUNT}
            array={BRIGHT_POSITIONS}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[BRIGHT_COLORS, 3]}
            count={BRIGHT_COUNT}
            array={BRIGHT_COLORS}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={brightMatRef}
          size={isDark ? 0.16 : 0.20}
          vertexColors={isDark}
          color={isDark ? undefined : "#c58341"}
          sizeAttenuation={true}
          transparent
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          map={starTexture}
          depthWrite={false}
          alphaTest={0.001}
        />
      </points>
    </group>
  );
}

export default function HeroCanvas() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div 
      className="absolute inset-0 w-full h-full -z-10 bg-transparent overflow-hidden pointer-events-none transition-all duration-700"
      style={{
        background: isDark 
          ? [
              // Core nebula glow — warm amber stellar nursery (JWST Carina-inspired)
              "radial-gradient(ellipse 50% 40% at 25% 35%, rgba(180,120,60,0.12) 0%, transparent 70%)",
              // Deep teal gas cloud — upper right (JWST Pillars of Creation palette)
              "radial-gradient(ellipse 45% 35% at 75% 25%, rgba(30,90,120,0.14) 0%, transparent 65%)",
              // Soft violet distant galaxy cluster — center-left
              "radial-gradient(ellipse 30% 50% at 15% 60%, rgba(80,40,120,0.08) 0%, transparent 60%)",
              // Warm amber dust lane — lower center
              "radial-gradient(ellipse 60% 25% at 55% 80%, rgba(160,100,40,0.10) 0%, transparent 55%)",
              // Faint blue-white galaxy arm — upper left sweep
              "radial-gradient(ellipse 35% 30% at 10% 15%, rgba(60,100,160,0.09) 0%, transparent 50%)",
              // Deep magenta emission nebula — far right
              "radial-gradient(ellipse 25% 40% at 90% 55%, rgba(120,40,80,0.07) 0%, transparent 55%)",
              // Subtle cosmic teal mist — lower left
              "radial-gradient(ellipse 40% 30% at 30% 90%, rgba(20,80,100,0.08) 0%, transparent 50%)",
              // Faint golden core diffraction — center
              "radial-gradient(circle at 50% 45%, rgba(200,160,80,0.04) 0%, transparent 40%)",
              // Deep space base
              "#0a0a0e"
            ].join(", ")
          : "transparent"
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      >
        <ambientLight intensity={isDark ? 0.4 : 0.8} />
        <InteractiveScene />
      </Canvas>
    </div>
  );
}
