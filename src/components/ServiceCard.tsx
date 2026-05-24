"use client";

import { useRef, useState } from "react";
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

interface ServiceCardProps {
  titleKey: string;
  descKey: string;
  iconId: number;
}

export default function ServiceCard({ titleKey, descKey, iconId }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Normalize coordinates between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Convert coordinate offsets to degrees of rotation for subtle 3D tilt
  const tiltX = coords.y * -8; 
  const tiltY = coords.x * 8;  

  const renderIcon = () => {
    const className = "w-6 h-6 sm:w-7 sm:h-7 text-accent-cyan transition-transform duration-500 group-hover:rotate-[6deg] group-hover:scale-105";
    switch (iconId) {
      case 1:
        return <Sparkles className={className} />;
      case 2:
        return <Disc className={className} />;
      case 3:
        return <Video className={className} />;
      case 4:
        return <Music className={className} />;
      case 5:
        return <Layers className={className} />;
      case 6:
        return <Cpu className={className} />;
      case 7:
        return <Palette className={className} />;
      case 8:
        return <Users className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${
          isHovered ? 1.015 : 1
        }, ${isHovered ? 1.015 : 1}, 1)`,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative p-8 rounded-3xl bg-[var(--card-bg)] border border-accent-cyan/10 overflow-hidden transition-all duration-300 flex flex-col justify-between h-[340px] group ${
        isHovered
          ? "border-accent-cyan/35 shadow-[0_4px_30px_rgba(184,119,57,0.06)] z-10"
          : "z-0 shadow-sm"
      }`}
    >
      {/* Subtle Mouse Tracking Radial Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(280px circle at ${
              (coords.x + 0.5) * 100
            }% ${(coords.y + 0.5) * 100}%, rgba(184, 119, 57, 0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Top Section: Title & Elegant Vector Icon Box */}
      <div className="flex justify-between items-start w-full gap-4">
        <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-[var(--foreground)] group-hover:text-accent-cyan transition-colors duration-300 max-w-[70%] leading-tight">
          {t(titleKey)}
        </h3>

        {/* Minimalist Copper Line Icon Container */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-accent-cyan/15 bg-accent-cyan/5 flex items-center justify-center flex-shrink-0 group-hover:border-accent-cyan/35 group-hover:bg-accent-cyan/10 transition-all duration-300 relative shadow-inner">
          {renderIcon()}
          {/* Subtle accent light indicator */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-25 group-hover:opacity-60 transition-opacity" />
        </div>
      </div>

      {/* Bottom Section: Description & Learn More Anchor */}
      <div className="flex flex-col gap-5">
        <p className="text-sm sm:text-base text-gray-500 font-sans font-normal leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
          {t(descKey)}
        </p>

        <a
          href="#contact"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-accent-cyan/85 group-hover:text-accent-cyan transition-colors self-start group/link cursor-pointer"
        >
          {t("services.learnMore")}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
