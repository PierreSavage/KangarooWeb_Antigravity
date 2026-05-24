"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dynamic import with SSR disabled to prevent server-side WebGL compilation issues
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

export default function Hero() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const headline = t("hero.headline"); // Kangaroo Production
  const words = headline.split(" ");

  // Refs for GSAP ScrollTrigger pinning and split screen animation
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Split-screen panels and reveal container refs
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const revealContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const headlineWrapper = headlineWrapperRef.current;
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    const revealContent = revealContentRef.current;
    const indicator = scrollIndicatorRef.current;

    if (!container || !headlineWrapper || !topPanel || !bottomPanel || !revealContent) return;

    // Create the GSAP context to ensure safe animation scrubbing and cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=150%", // Pin hero for rich control
          scrub: 1.1, // Smooth scrub for premium weight
          pin: true,
          pinSpacing: true, // Reserve spacing for scroll reveal
          anticipatePin: 1,
        }
      });

      // 1. Slide panels away and zoom headline wrapper
      tl.to(topPanel, {
        yPercent: -100,
        ease: "power2.inOut",
        duration: 1
      }, 0);

      tl.to(bottomPanel, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 1
      }, 0);

      tl.to(headlineWrapper, {
        scale: 40,
        opacity: 0,
        filter: "blur(15px)",
        ease: "power2.inOut",
        duration: 1
      }, 0);

      // 2. Fade scroll indicator out quickly early on scroll
      tl.to(indicator, {
        opacity: 0,
        y: 20,
        duration: 0.25,
        ease: "power2.out"
      }, 0);

      // 3. Fade in and scale up the main content behind
      tl.fromTo(revealContent,
        {
          opacity: 0,
          scale: 0.9,
          y: 35
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.85
        },
        0.35 // Triggers beautifully as panels part!
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [mounted]);

  // Framer Motion staggered entrance animations on mount
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      const navbarHeight = 72; // Offset for sticky navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 72,
        behavior: "smooth",
      });
    }
  };

  if (!mounted) {
    return (
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-12 bg-[var(--background)]">
        <h1 className="text-[7.5vw] md:text-[6.5vw] font-display font-medium tracking-tight text-[var(--foreground)] text-center whitespace-nowrap">
          Kangaroo Production
        </h1>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden bg-transparent"
    >
      {/* 3D Canvas Background Overlay */}
      <HeroCanvas />

      {/* Ambient delicate glow dots */}
      <div className="absolute top-[25%] left-[15%] w-[300px] h-[300px] bg-accent-magenta/5 rounded-full blur-[100px] pointer-events-none -z-20" />
      <div className="absolute bottom-[25%] right-[15%] w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none -z-20" />

      {/* Split Screen Panels (Matches background perfectly for luxury split reveal) */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-[50.5vh] bg-[var(--background)] z-30 border-b border-[var(--card-border)] pointer-events-none will-change-transform"
      />
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-[var(--background)] z-30 border-t border-[var(--card-border)] pointer-events-none will-change-transform"
      />

      {/* Giant Pinned Zoom Headline Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 overflow-hidden px-6">
        <div ref={headlineWrapperRef} className="w-full flex items-center justify-center pointer-events-none will-change-transform">
          <motion.h1
            ref={headlineRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-[7.8vw] md:text-[6.8vw] lg:text-[6vw] font-display font-medium tracking-tight leading-none flex flex-row flex-nowrap items-center justify-center gap-x-[0.25em] whitespace-nowrap select-none text-[var(--foreground)] text-center w-full will-change-transform"
          >
            {words.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                    className="inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        </div>
      </div>

      {/* Main Content Area (Revealed on scroll) */}
      <div
        ref={revealContentRef}
        className="max-w-4xl text-center flex flex-col items-center justify-center select-none relative z-20 px-4 mt-8 md:mt-12"
      >
        {/* Subtle Luxury Tagline */}
        <motion.div
          ref={taglineRef}
          initial={{ opacity: 0, letterSpacing: "0.2em", y: 10 }}
          animate={{ opacity: 0.8, letterSpacing: "0.3em", y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
          className="text-[10px] md:text-xs font-semibold text-accent-magenta tracking-[0.3em] mb-6 uppercase"
        >
          {t("hero.tagline")}
        </motion.div>

        {/* Sophisticated Minimalist Subheadline */}
        <motion.p
          ref={subheadlineRef}
          className="max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-sans font-normal leading-relaxed mb-8 px-2"
        >
          {t("hero.subheadline")}
        </motion.p>

        {/* Beautiful Floating CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={scrollToPortfolio}
            className="w-full sm:w-auto px-10 py-4 rounded-none font-sans font-bold text-[10px] tracking-[0.25em] uppercase text-[var(--background)] bg-[var(--foreground)] hover:bg-[var(--accent-magenta)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none cursor-pointer"
          >
            {t("hero.explore")}
          </button>
          
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto px-10 py-4 rounded-none font-sans font-bold text-[10px] tracking-[0.25em] uppercase text-[var(--foreground)] border border-[var(--foreground)]/15 hover:border-[var(--foreground)] hover:bg-[var(--foreground)]/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none cursor-pointer"
          >
            {t("hero.touch")}
          </button>
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        onClick={scrollToPortfolio}
        className="absolute bottom-8 cursor-pointer flex flex-col items-center gap-1.5 group z-45"
      >
        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-gray-400 group-hover:text-accent-magenta transition-colors">
          {t("hero.scroll")}
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent-magenta transition-colors animate-bounce" />
      </motion.div>
    </section>
  );
}
