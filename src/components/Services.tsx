"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { 
  Sparkles, 
  Disc, 
  Video, 
  Music, 
  Layers, 
  Cpu, 
  Palette, 
  Users, 
  ArrowUpRight 
} from "lucide-react";


export default function Services() {
  const { t } = useLanguage();

  const servicesList = [
    { titleKey: "services.immersive.title", descKey: "services.immersive.desc", iconId: 1 },
    { titleKey: "services.events.title", descKey: "services.events.desc", iconId: 2 },
    { titleKey: "services.video.title", descKey: "services.video.desc", iconId: 3 },
    { titleKey: "services.music.title", descKey: "services.music.desc", iconId: 4 },
    { titleKey: "services.3d.title", descKey: "services.3d.desc", iconId: 5 },
    { titleKey: "services.ai.title", descKey: "services.ai.desc", iconId: 6 },
    { titleKey: "services.graphic.title", descKey: "services.graphic.desc", iconId: 7 },
    { titleKey: "services.marketing.title", descKey: "services.marketing.desc", iconId: 8 },
  ];

  const getIcon = (id: number) => {
    const className = "w-5 h-5 text-[var(--accent-magenta)] transition-all duration-300";
    switch (id) {
      case 1: return <Sparkles className={className} />;
      case 2: return <Disc className={className} />;
      case 3: return <Video className={className} />;
      case 4: return <Music className={className} />;
      case 5: return <Layers className={className} />;
      case 6: return <Cpu className={className} />;
      case 7: return <Palette className={className} />;
      case 8: return <Users className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      {/* Background delicate elements */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-accent-magenta/3 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-accent-cyan/3 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Header Block */}
        <div className="max-w-2xl text-left">
          <div className="inline-block text-[9px] uppercase font-bold tracking-[0.3em] text-[var(--accent-magenta)] border border-[var(--accent-magenta)]/20 px-3 py-1 rounded-full bg-[var(--accent-magenta)]/5 mb-6">
            {t("nav.services")}
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--foreground)] mb-6 leading-none">
            {t("services.title")}
          </h2>
          
          <p className="text-sm sm:text-base text-gray-500 font-sans font-normal leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Minimalist Typographic List (Completely eliminates grids) */}
        <div className="flex flex-col border-t border-[var(--foreground)]/10">
          {servicesList.map((service, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <div
                key={index}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-[var(--foreground)]/10 cursor-pointer transition-all duration-300 overflow-hidden"
              >
                {/* Subtle highlight row background */}
                <div className="absolute inset-0 bg-[var(--accent-magenta)]/[0.02] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out pointer-events-none -z-10" />
                
                {/* Left Side: Number + Title */}
                <div className="flex items-center gap-6 sm:gap-10 md:w-1/3 transition-transform duration-300 group-hover:translate-x-2">
                  <span className="text-lg font-display font-medium tracking-widest text-[var(--accent-magenta)] opacity-70">
                    {num}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent-cyan)] transition-colors duration-300">
                    {t(service.titleKey)}
                  </h3>
                </div>

                {/* Center Side: Description */}
                <div className="mt-3 md:mt-0 md:w-1/2 px-0 md:px-6">
                  <p className="text-xs sm:text-sm text-gray-400 font-sans font-normal leading-relaxed group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {t(service.descKey)}
                  </p>
                </div>

                {/* Right Side: Icon & Arrow */}
                <div className="flex items-center gap-4 mt-4 md:mt-0 justify-between md:justify-end md:w-[15%]">
                  {/* Miniature beautiful icon frame */}
                  <div className="w-10 h-10 rounded-full border border-[var(--foreground)]/5 bg-[var(--foreground)]/[0.02] flex items-center justify-center group-hover:border-[var(--accent-magenta)]/30 group-hover:bg-[var(--accent-magenta)]/5 transition-all duration-300">
                    {getIcon(service.iconId)}
                  </div>
                  
                  {/* Clean minimal arrow */}
                  <div className="w-8 h-8 rounded-full border border-transparent flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--accent-cyan)] group-hover:rotate-45 transition-all duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
