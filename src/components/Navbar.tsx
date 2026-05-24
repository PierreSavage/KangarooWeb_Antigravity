"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = isScrolled ? 60 : 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${
        isScrolled
          ? "py-3 glass-navbar shadow-sm"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Typographic Luxury Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg md:text-xl font-display font-medium tracking-[0.2em] uppercase text-[var(--foreground)] transition-all duration-300 hover:opacity-80 active:scale-98 focus:outline-none"
        >
          {t("nav.logo")}
        </button>

        {/* Desktop Menu Links */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { label: t("nav.home"), id: "hero" },
            { label: t("nav.work"), id: "portfolio" },
            { label: t("nav.about"), id: "about" },
            { label: t("nav.contact"), id: "contact" },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-sans font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 hover:text-[var(--foreground)] transition-colors duration-300 relative py-2 focus:outline-none"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[var(--accent-magenta)] -translate-x-1/2 transition-all duration-300 group-hover:w-1/2" />
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {/* CZ/EN Slash Switcher (Minimalist Art style) */}
          <div className="flex items-center text-[10px] font-sans font-bold tracking-widest text-gray-400">
            <button
              onClick={() => setLocale("en")}
              className={`py-1 transition-all duration-300 focus:outline-none ${
                locale === "en" ? "text-[var(--foreground)] font-black" : "hover:text-[var(--foreground)]"
              }`}
            >
              EN
            </button>
            <span className="mx-2 opacity-30">/</span>
            <button
              onClick={() => setLocale("cz")}
              className={`py-1 transition-all duration-300 focus:outline-none ${
                locale === "cz" ? "text-[var(--foreground)] font-black" : "hover:text-[var(--foreground)]"
              }`}
            >
              CZ
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--foreground)]/5 hover:border-[var(--foreground)]/10 text-gray-400 dark:text-gray-500 hover:text-[var(--foreground)] active:scale-95 transition-all duration-300 focus:outline-none"
            aria-label="Toggle visual theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[var(--accent-magenta)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent-cyan)]" />
            )}
          </button>

          {/* Let's Create CTA (Rectangular Sharp) */}
          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-2.5 rounded-none border border-[var(--foreground)]/15 text-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)]/5 text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none cursor-pointer"
          >
            {t("nav.cta")}
          </button>
        </div>

        {/* Mobile Navbar Hamburger Controls */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-400 focus:outline-none"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[var(--accent-magenta)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent-cyan)]" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-none text-[var(--foreground)] focus:outline-none active:scale-90 transition-transform"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 top-[56px] z-40 w-full h-[calc(100vh-56px)] bg-[var(--background)] backdrop-blur-2xl border-t border-[var(--foreground)]/5 transition-all duration-500 ease-in-out lg:hidden flex flex-col justify-between px-8 py-12 ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col gap-6 text-left">
          {[
            { label: t("nav.home"), id: "hero" },
            { label: t("nav.work"), id: "portfolio" },
            { label: t("nav.about"), id: "about" },
            { label: t("nav.contact"), id: "contact" },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.id)}
              className="text-3xl font-display font-medium text-gray-400 dark:text-gray-500 hover:text-[var(--foreground)] transition-colors duration-300 text-left focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-[var(--foreground)]/10 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Language</span>
            <div className="flex items-center text-xs font-bold tracking-widest text-gray-400">
              <button
                onClick={() => setLocale("en")}
                className={`py-1 focus:outline-none ${
                  locale === "en" ? "text-[var(--foreground)] font-black" : ""
                }`}
              >
                EN
              </button>
              <span className="mx-2 opacity-30">/</span>
              <button
                onClick={() => setLocale("cz")}
                className={`py-1 focus:outline-none ${
                  locale === "cz" ? "text-[var(--foreground)] font-black" : ""
                }`}
              >
                CZ
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="w-full text-center py-3.5 rounded-none border border-[var(--foreground)]/15 text-[var(--foreground)] font-sans font-bold text-[10px] tracking-widest uppercase active:scale-95 transition-transform"
          >
            {t("nav.cta")}
          </button>
        </div>
      </div>
    </nav>
  );
}
