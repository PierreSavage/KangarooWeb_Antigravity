"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Video } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Waving Grid of gold particles for the footer background
function WaveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  
  const count = 400;
  const positions = new Float32Array(count * 3);

  // Initialize a grid of particles
  for (let i = 0; i < count; i++) {
    const xIndex = i % 20;
    const zIndex = Math.floor(i / 20);
    positions[i * 3] = xIndex * 0.95 - 9.5; // X
    positions[i * 3 + 1] = -1.2;             // Y
    positions[i * 3 + 2] = zIndex * 0.95 - 9.5; // Z
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const x = pos[i * 3];
      const z = pos[i * 3 + 2];
      pos[i * 3 + 1] = Math.sin(x * 0.35 + time * 0.9) * 0.2 + Math.cos(z * 0.35 + time * 0.9) * 0.2 - 1.0;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const color = theme === "dark" ? "#d9b48f" : "#c5a880";
  const opacity = theme === "dark" ? 0.35 : 0.55;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={opacity}
        blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 72,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative w-full py-16 bg-[var(--background)] border-t border-[var(--foreground)]/5 overflow-hidden flex flex-col justify-end min-h-[320px] transition-colors duration-500">
      {/* 3D Wave Particle Canvas Background */}
      {mounted && (
        <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-40">
          <Canvas camera={{ position: [0, 2, 6.2], fov: 45 }}>
            <WaveParticles />
          </Canvas>
        </div>
      )}

      {/* Footer Content */}
      <div 
        className="max-w-7xl mx-auto w-full z-10 flex flex-col gap-12"
        style={{ paddingLeft: "clamp(24px, 4vw, 80px)", paddingRight: "clamp(24px, 4vw, 80px)" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-display font-medium tracking-[0.2em] uppercase text-[var(--foreground)] transition-opacity hover:opacity-85 focus:outline-none"
            >
              {t("nav.logo")}
            </button>
            <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[var(--accent-magenta)] uppercase">
              {t("hero.tagline")}
            </span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {[
              { label: t("nav.home"), id: "hero" },
              { label: t("nav.services"), id: "services" },
              { label: t("nav.work"), id: "portfolio" },
              { label: t("nav.about"), id: "about" },
              { label: t("nav.contact"), id: "contact" },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                className="text-xs font-sans font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 hover:text-[var(--foreground)] transition-colors duration-300 focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/mevia"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[var(--accent-magenta)] transition-colors duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://vimeo.com/mevia"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[var(--accent-magenta)] transition-colors duration-300"
              aria-label="Vimeo"
            >
              <Video className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/company/mevia"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[var(--accent-magenta)] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[var(--foreground)]/5 pt-8 text-[11px] font-medium text-gray-400 gap-4 text-center">
          <p>© {new Date().getFullYear()} Kangaroo Production. {t("footer.rights")}</p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-[var(--foreground)] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-[var(--foreground)] transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
