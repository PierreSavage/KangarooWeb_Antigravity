"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  angle: number;
  speed: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 90;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          baseX: x,
          baseY: y,
          radius: Math.random() * 2 + 1,
          angle: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      
      // If first movement, initialize instantly to avoid slide-in from -1000
      if (mouseRef.current.x < 0) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      // Lerp mouse coordinate for ultra-smooth fluid spotlight following
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient backdrop spotlight
      if (mouse.x > -500) {
        const spotlightRadius = 380;
        const spotGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotlightRadius
        );

        if (theme === "dark") {
          spotGrad.addColorStop(0, "rgba(56, 189, 248, 0.045)"); // Deep sky blue
          spotGrad.addColorStop(0.4, "rgba(217, 180, 143, 0.015)"); // Champagne glow
          spotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          spotGrad.addColorStop(0, "rgba(197, 168, 128, 0.07)"); // Elegant Champagne Gold
          spotGrad.addColorStop(0.5, "rgba(15, 43, 92, 0.015)"); // Navy bleed
          spotGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        }

        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Physics & Particle connections (faint lines)
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Gentle organic float
        p1.angle += p1.speed;
        p1.x += p1.vx + Math.sin(p1.angle) * 0.06;
        p1.y += p1.vy + Math.cos(p1.angle) * 0.06;

        // Screen boundary collisions
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse interaction: physical repulsion force
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const force = (180 - dist) / 180;
          const pushAngle = Math.atan2(dy, dx);
          // Apply elegant push
          p1.x += Math.cos(pushAngle) * force * 1.8;
          p1.y += Math.sin(pushAngle) * force * 1.8;
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p1.x - p2.x;
          const ldy = p1.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < maxDistance) {
            // Line opacity based on closeness & proximity to mouse spotlight
            const closeness = (maxDistance - ldist) / maxDistance;
            
            // Nodes close to mouse spotlight connect with brighter lines
            const p1DistToMouse = Math.sqrt((p1.x - mouse.x) ** 2 + (p1.y - mouse.y) ** 2);
            const spotBonus = p1DistToMouse < 220 ? (220 - p1DistToMouse) / 220 * 0.6 : 0;
            const finalOpacity = closeness * (0.045 + spotBonus * 0.08);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = theme === "dark" 
              ? `rgba(255, 255, 255, ${finalOpacity})` 
              : `rgba(21, 21, 24, ${finalOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // 3. Draw the particle dot
        const distToMouse = Math.sqrt((p1.x - mouse.x) ** 2 + (p1.y - mouse.y) ** 2);
        const isInSpotlight = distToMouse < 200;
        
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius * (isInSpotlight ? 1.25 : 1), 0, Math.PI * 2);
        
        if (isInSpotlight) {
          // Spotlight glows in accent color
          ctx.fillStyle = theme === "dark" 
            ? `rgba(56, 189, 248, ${0.45 + (200 - distToMouse) / 200 * 0.3})` // Steel blue glow
            : `rgba(197, 168, 128, ${0.6 + (200 - distToMouse) / 200 * 0.25})`; // Luxury gold glow
        } else {
          ctx.fillStyle = theme === "dark" 
            ? "rgba(255, 255, 255, 0.15)" 
            : "rgba(21, 21, 24, 0.08)";
        }
        
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, theme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 will-change-transform"
    />
  );
}
