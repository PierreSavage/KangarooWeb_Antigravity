"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Play } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

interface Project {
  title: string;
  category: string;
  image: string;
  client: string;
  year: string;
  desc: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  bullets: string[];
  chips: string[];
  quote: string;
  quoteAuthor: string;
  showreelUrl?: string;
  websiteUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { locale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!mounted) return null;

  const isLucie = project?.title.includes("LUCIE");

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto"
          data-lenis-prevent // Prevents scroll conflicts in Lenis smooth scroll
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0 -z-10" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="relative w-full max-w-6xl my-auto rounded-3xl bg-[#0b0908] border border-accent-cyan/15 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full border border-white/10 bg-black/60 text-white hover:text-accent-cyan hover:border-accent-cyan/35 active:scale-90 transition-all duration-300 focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 md:p-12">
              
              {/* Left Column: Rich Project Details (7/12 width) */}
              <div className="lg:col-span-7 flex flex-col justify-start">
                
                {/* Category subtitle (e.g. KULTURA POD ŠIRÝM NEBEM) */}
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent-cyan uppercase mb-2">
                  {project.subtitle}
                </span>

                {/* Main Title (elegant high-contrast serif) */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-none mb-6">
                  {project.title}
                </h2>

                {/* Sub-divider line */}
                <div className="h-[1px] w-full bg-white/10 mb-6" />

                {/* Case Description Paragraph */}
                <p className="text-sm sm:text-base text-gray-300/90 font-sans font-normal leading-relaxed mb-8">
                  {project.desc}
                </p>

                {/* Dynamic Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-t border-b border-white/5 mb-8">
                  {project.stats?.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-3xl sm:text-4xl font-display font-bold text-accent-cyan">
                        {stat.value}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-gray-500 mt-1 uppercase leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Copper Bullet Points Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {project.bullets?.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {/* Stylized premium copper frame box */}
                      <div className="w-5 h-5 rounded-md border border-accent-cyan/30 bg-accent-cyan/5 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-sm bg-accent-cyan" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap gap-4 mt-auto pt-4">
                  {project.showreelUrl && (
                    <a
                      href={project.showreelUrl}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-cyan text-black font-bold tracking-wide transition-all hover:bg-accent-cyan/90 hover:scale-[1.02] active:scale-95 text-sm shadow-md shadow-accent-cyan/10"
                    >
                      <Play className="w-4 h-4 fill-current text-black" />
                      {locale === "cz"
                        ? project.title.includes("Festival")
                          ? "View Showreel"
                          : "Přehrát ukázku"
                        : "View Showreel"}
                    </a>
                  )}

                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-accent-cyan/40 text-accent-cyan hover:text-white font-bold tracking-wide transition-all hover:bg-accent-cyan/10 hover:border-accent-cyan hover:scale-[1.02] active:scale-95 text-sm"
                    >
                      <Globe className="w-4 h-4" />
                      {locale === "cz"
                        ? project.title.includes("Festival")
                          ? "Visit Website"
                          : "Navštívit web"
                        : "Visit Website"}
                    </a>
                  )}
                </div>

              </div>

              {/* Right Column: Visual Case and Blockquotes (5/12 width) */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                
                {/* Visual Cover Picture with high-end glow shadow */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 group shadow-xl bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Subtitle Tags/Chips below image */}
                <div className="flex flex-wrap gap-2 my-5">
                  {project.chips?.map((chip, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 text-[10px] sm:text-xs font-semibold text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0 animate-pulse" />
                      {chip}
                    </div>
                  ))}
                </div>

                {/* Styled Quoted Testimonial Card */}
                {isLucie ? (
                  <div className="flex flex-col gap-4 mt-1">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 border-l-4 border-l-accent-cyan relative overflow-hidden flex flex-col gap-2 shadow-inner">
                      <p className="font-display italic text-gray-300 text-sm sm:text-base leading-relaxed">
                        {locale === "cz"
                          ? "“Každý moment působil jako hlavní událost večera.”"
                          : "“Every single moment felt like the main event of the night.”"}
                      </p>
                      <span className="text-xs font-semibold text-accent-cyan self-start">
                        — Seznam zprávy
                      </span>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 border-l-4 border-l-accent-cyan relative overflow-hidden flex flex-col gap-2 shadow-inner">
                      <p className="font-display italic text-gray-300 text-sm sm:text-base leading-relaxed">
                        {locale === "cz"
                          ? "“Propracovaná světelná show i výtečný zvuk.”"
                          : "“A sophisticated light show and exceptional sound.”"}
                      </p>
                      <span className="text-xs font-semibold text-accent-cyan self-start">
                        — iREPORT
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 border-l-4 border-l-accent-cyan relative overflow-hidden flex flex-col gap-3 mt-1 shadow-inner">
                    <p className="font-display italic text-gray-300 text-sm sm:text-base leading-relaxed">
                      &ldquo;{project.quote}&rdquo;
                    </p>
                    <span className="text-xs sm:text-sm font-semibold text-accent-cyan self-start">
                      — {project.quoteAuthor}
                    </span>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
