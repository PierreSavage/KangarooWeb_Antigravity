"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const { t } = useLanguage();

  const brands = [
    "AETHER LABS",
    "NEO-TOKYO",
    "HYBRID AI",
    "VOLUMETRIC RECORDS",
    "SPECTRA SOUNDS",
    "CHRONOS PORTAL",
    "NEXUS VR",
    "SYNTHESIS INC",
  ];

  const quotes = [
    {
      text: "Working with Kangaroo Production was an absolute game changer. Their attention to volumetric details and 3D precision is unparalleled. They didn't just build our virtual world; they breathed life into it.",
      author: "Alex Mercer",
      role: "CTO, Neo-Tokyo Corp",
    },
    {
      text: "Kangaroo Production's fusion of high-poly 3D assets and generative AI pipelines scaled our interactive branding across global nodes in weeks. A visionary studio that commands excellence.",
      author: "Elena Rostova",
      role: "Design Lead, Aether Labs",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden"
      style={{ paddingLeft: "clamp(24px, 4vw, 80px)", paddingRight: "clamp(24px, 4vw, 80px)" }}
    >
      {/* Background cyber glows */}
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[30%] left-[-5%] w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Title Block */}
        <div className="max-w-2xl text-center mx-auto">
          <div className="inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-accent-cyan border border-accent-cyan/20 px-3 py-1 rounded-full bg-accent-cyan/5 mb-6 text-glow-cyan">
            {t("testimonials.title")}
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white mb-6 leading-none">
            {t("testimonials.subtitle")}
          </h2>
        </div>

        {/* 1. Infinite Scrolling Logo Marquee */}
        <div className="relative w-full overflow-hidden border-y border-white/5 py-10 bg-black/10 backdrop-blur-sm">
          {/* Fades on left and right for smooth reveal */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Flex row (Repeated once for continuous seam-free loop) */}
          <div className="flex w-[200%] items-center animate-infinite-marquee">
            {/* List 1 */}
            <div className="flex justify-around items-center w-1/2 gap-8">
              {brands.map((brand, idx) => (
                <span
                  key={idx}
                  className="text-lg sm:text-xl font-display font-black tracking-[0.3em] text-gray-500 hover:text-white transition-colors duration-300 pointer-events-none"
                >
                  {brand}
                </span>
              ))}
            </div>
            {/* List 2 (Duplicate) */}
            <div className="flex justify-around items-center w-1/2 gap-8">
              {brands.map((brand, idx) => (
                <span
                  key={`dup-${idx}`}
                  className="text-lg sm:text-xl font-display font-black tracking-[0.3em] text-gray-500 hover:text-white transition-colors duration-300 pointer-events-none"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Partner Quotes with Glass spheres */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-0">
          {quotes.map((quote, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 rounded-3xl glass-panel border border-white/5 flex flex-col justify-between gap-8 hover:border-accent-cyan/20 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-6">
                <Quote className="w-8 h-8 text-accent-cyan opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                
                <p className="text-base sm:text-lg text-gray-300 font-medium leading-relaxed italic">
                  &ldquo;{quote.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                {/* 3D Glass Avatar representation */}
                <div className="w-12 h-12 rounded-full border border-white/10 bg-gradient-to-tr from-accent-cyan/40 via-accent-purple/35 to-accent-magenta/35 flex items-center justify-center text-sm font-extrabold shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:scale-105 transition-transform duration-300 select-none">
                  {quote.author.split(" ").map((n) => n[0]).join("")}
                </div>
                
                <div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">
                    {quote.author}
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    {quote.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
