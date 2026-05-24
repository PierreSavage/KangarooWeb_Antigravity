"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { Award, Globe, Briefcase } from "lucide-react";

interface StatProps {
  value: number;
  suffix: string;
  labelKey: string;
  icon: React.ReactNode;
}

function StatCounter({ value, suffix, labelKey, icon }: StatProps) {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    const end = value;
    const duration = 1.6; // seconds
    const fps = 60;
    const totalFrames = Math.round(duration * fps);
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easeProgress = progress * (2 - progress);
      const nextCount = Math.round(easeProgress * end);

      setCount(nextCount);

      if (currentFrame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="p-8 rounded-none border border-[var(--foreground)]/5 bg-[var(--card-bg)] backdrop-blur-sm flex flex-col justify-between h-[180px] hover:border-[var(--accent-magenta)]/30 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between w-full">
        {/* Minimal Icon wrapper */}
        <div className="p-3 border border-[var(--foreground)]/5 bg-[var(--foreground)]/[0.02] text-[var(--accent-magenta)] group-hover:text-[var(--accent-cyan)] transition-colors duration-300">
          {icon}
        </div>
        <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-gray-400 uppercase">
          Metric
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-[var(--foreground)] leading-none">
          {count}
          <span className="text-[var(--accent-magenta)]">{suffix}</span>
        </h4>
        
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 mt-1">
          {t(labelKey)}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden"
      style={{ paddingLeft: "clamp(24px, 4vw, 80px)", paddingRight: "clamp(24px, 4vw, 80px)" }}
    >
      {/* Background delicate elements */}
      <div className="absolute top-[40%] left-[-10%] w-[350px] h-[350px] bg-accent-magenta/3 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-accent-cyan/3 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Column: Typography & Narrative Philosophy */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div>
            <div className="inline-block text-[9px] uppercase font-bold tracking-[0.3em] text-[var(--accent-magenta)] border border-[var(--accent-magenta)]/20 px-3 py-1 rounded-full bg-[var(--accent-magenta)]/5 mb-6">
              {t("about.title")}
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--foreground)] mb-6 leading-none">
              {t("about.philosophy")}
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-sm sm:text-base text-gray-500 font-sans font-normal leading-relaxed">
            <p>{t("about.desc1")}</p>
            <p>{t("about.desc2")}</p>
          </div>

          {/* Interactive minimalist highlight box */}
          <div className="p-6 rounded-none border border-[var(--foreground)]/5 bg-[var(--accent-magenta)]/[0.03] backdrop-blur-md">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[var(--accent-cyan)] block mb-2">
              Lights On philosophy
            </span>
            <p className="text-xs sm:text-sm font-sans font-medium text-gray-600 dark:text-gray-300 italic leading-relaxed">
              &ldquo;We believe that true immersion lies at the interface of pure physics, mathematical code, and unbounded visual poetry.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Ease Stats Counter Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <StatCounter
            value={12}
            suffix="+"
            labelKey="about.stat.awards"
            icon={<Award className="w-4 h-4" />}
          />
          <StatCounter
            value={150}
            suffix="+"
            labelKey="about.stat.clients"
            icon={<Globe className="w-4 h-4" />}
          />
          <div className="sm:col-span-2">
            <StatCounter
              value={320}
              suffix="+"
              labelKey="about.stat.projects"
              icon={<Briefcase className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
