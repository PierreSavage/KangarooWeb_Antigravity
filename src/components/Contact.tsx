"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Globe, Mail, Phone, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Profile {
  num: string;
  name: string;
  roleEn: string;
  roleCz: string;
  phone: string;
  email: string;
  subEn: string;
  subCz: string;
  initials: string;
}

export default function Contact() {
  const { locale, t } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const profiles: Profile[] = [
    {
      num: "01",
      name: "Mirri Melcr",
      roleEn: "EXECUTIVE DIRECTOR",
      roleCz: "EXECUTIVE DIRECTOR",
      phone: "+420 739 904 149",
      email: "mirri.melcr@lucie40.com",
      subEn: "Executive Director",
      subCz: "Executive Director",
      initials: "MM",
    },
    {
      num: "02",
      name: "Michal Dvořák",
      roleEn: "ARTISTIC DIRECTOR",
      roleCz: "ARTISTIC DIRECTOR",
      phone: "+420 777 671 931",
      email: "michal@vivaldianno.com",
      subEn: "Composer & Producer",
      subCz: "Skladatel & Producent",
      initials: "MD",
    },
    {
      num: "03",
      name: "Markéta Mohoritová",
      roleEn: "MARKETING DIRECTOR",
      roleCz: "MARKETING DIRECTOR",
      phone: "+420 605 527 527",
      email: "marketa.mohoritova@lucie40.com",
      subEn: "Marketing & PR",
      subCz: "Marketing & PR",
      initials: "MM",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", projectType: "", message: "" });
      
      setTimeout(() => {
        setStatus("idle");
        setIsFormOpen(false);
      }, 3000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden"
      style={{ paddingLeft: "clamp(24px, 4vw, 80px)", paddingRight: "clamp(24px, 4vw, 80px)" }}
    >
      {/* Background delicate elements */}
      <div className="absolute top-[20%] left-[-5%] w-[350px] h-[350px] bg-accent-cyan/3 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-accent-magenta/3 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header with Flex Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[var(--foreground)]/10 pb-8">
          <div>
            <div className="inline-block text-[9px] uppercase font-bold tracking-[0.3em] text-[var(--accent-magenta)] border border-[var(--accent-magenta)]/20 px-3 py-1 rounded-full bg-[var(--accent-magenta)]/5 mb-6">
              KANGAROO PRODUCTION
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--foreground)] leading-none">
              {locale === "cz" ? "Kontakt & Rezervace" : "Contact & Booking"}
            </h2>
          </div>

          {/* Luxury Rectangular Let's Connect CTA Button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-8 py-3.5 border border-[var(--foreground)]/15 text-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)]/5 text-xs font-sans font-bold tracking-widest uppercase rounded-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none cursor-pointer self-start"
          >
            {locale === "cz" ? "Spojte se s námi" : "Let's connect"}
          </button>
        </div>

        {/* 3-Profile Grid Layout (Beautiful Rectangular Panels) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, idx) => (
            <div
              key={idx}
              className="group relative bg-[var(--card-bg)] border border-[var(--foreground)]/5 rounded-none p-8 flex flex-col justify-between hover:border-[var(--accent-magenta)]/30 hover:scale-[1.01] transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              {/* Top-Right Index Number in elegant champagne gold display serif */}
              <span className="absolute top-6 right-8 text-2xl sm:text-3xl font-display font-medium text-[var(--accent-magenta)] opacity-35 select-none transition-opacity duration-300 group-hover:opacity-70">
                {profile.num}
              </span>

              {/* Circle Avatar Frame (gorgeous double ring indicator) */}
              <div className="w-12 h-12 rounded-none border border-[var(--accent-magenta)]/30 bg-[var(--accent-magenta)]/5 flex-shrink-0 flex items-center justify-center relative overflow-hidden mb-6 transition-all duration-300 group-hover:border-[var(--accent-magenta)]/60">
                <span className="text-sm font-display font-semibold text-[var(--accent-magenta)] tracking-wide">
                  {profile.initials}
                </span>
              </div>

              {/* Profile Bio Details */}
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-display font-bold text-[var(--foreground)] tracking-tight">
                  {profile.name}
                </h3>
                <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-[var(--accent-magenta)] uppercase">
                  {locale === "cz" ? profile.roleCz : profile.roleEn}
                </span>
              </div>

              {/* Styled Divider Line */}
              <div className="h-[1px] w-full bg-[var(--foreground)]/5 my-6" />

              {/* Booking Coordinates */}
              <div className="flex flex-col gap-3">
                {/* Phone Link */}
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 text-xs font-sans font-medium text-gray-500 hover:text-[var(--foreground)] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--accent-magenta)]" />
                  {profile.phone}
                </a>

                {/* Email Link */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2.5 text-xs font-sans font-medium text-[var(--accent-cyan)] hover:opacity-85 hover:underline transition-all break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  {profile.email}
                </a>
              </div>

              {/* Sub-Role Description Footnote */}
              <span className="text-[9px] font-sans font-bold text-gray-400 mt-6 block uppercase tracking-[0.15em]">
                {locale === "cz" ? profile.subCz : profile.subEn}
              </span>

            </div>
          ))}
        </div>

        {/* Central bottom domain badge */}
        <div className="flex justify-center mt-6">
          <a
            href="https://kangarooproduction.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-none border border-[var(--foreground)]/10 bg-transparent hover:border-[var(--accent-magenta)] hover:bg-[var(--accent-magenta)]/5 transition-all duration-300 group"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--accent-magenta)] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 group-hover:text-[var(--foreground)] uppercase transition-colors">
              kangarooproduction.com
            </span>
          </a>
        </div>

      </div>

      {/* Sleek Glassmorphic Form Dialog Overlay (Art Gallery styling) */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            data-lenis-prevent
          >
            <div className="absolute inset-0 -z-10" onClick={() => setIsFormOpen(false)} />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl rounded-none bg-[var(--background)] border border-[var(--foreground)]/10 p-6 sm:p-10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full border border-[var(--foreground)]/10 hover:border-[var(--foreground)] hover:bg-[var(--foreground)]/5 text-[var(--foreground)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-[var(--foreground)] mb-2 leading-tight">
                {t("contact.title")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-8 font-sans font-normal leading-relaxed max-w-md">
                {t("contact.subtitle")}
              </p>

              {/* Form Input fields (Luxury Bottom-Border ONLY style) */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400">
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={locale === "cz" ? "Jan Novák" : "John Doe"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-0 py-2.5 bg-transparent border-b border-[var(--foreground)]/10 text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:border-[var(--accent-magenta)] transition-all font-sans font-medium text-xs sm:text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400">
                      {t("contact.email")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jan@email.cz"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-0 py-2.5 bg-transparent border-b border-[var(--foreground)]/10 text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:border-[var(--accent-magenta)] transition-all font-sans font-medium text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Project Category Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400">
                    {t("contact.project")}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-0 py-2.5 bg-transparent border-b border-[var(--foreground)]/10 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-magenta)] transition-all font-sans font-medium text-xs sm:text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[var(--background)]">
                      {t("contact.project.placeholder")}
                    </option>
                    <option value="immersive" className="bg-[var(--background)]">
                      {locale === "cz" ? "Multimediální Show" : "Multimedia Shows"}
                    </option>
                    <option value="events" className="bg-[var(--background)]">
                      {locale === "cz" ? "Živé Festivaly" : "Live Festivals"}
                    </option>
                    <option value="cgi" className="bg-[var(--background)]">
                      {locale === "cz" ? "3D & CGI Projekce" : "3D & CGI Projections"}
                    </option>
                    <option value="music" className="bg-[var(--background)]">
                      {locale === "cz" ? "Hudba & Zvuk" : "Music & Scoring"}
                    </option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400">
                    {locale === "cz" ? "Představa o show" : "Your Vision"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={t("contact.message")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-2.5 bg-transparent border-b border-[var(--foreground)]/10 text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:border-[var(--accent-magenta)] transition-all font-sans font-medium text-xs sm:text-sm resize-none"
                  />
                </div>

                {/* Status Banners */}
                {status === "success" && (
                  <div className="p-4 border border-green-500/20 bg-green-500/5 text-green-600 dark:text-green-400 text-xs font-semibold">
                    {t("contact.success")}
                  </div>
                )}
                {status === "error" && (
                  <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 text-xs font-semibold">
                    {t("contact.error")}
                  </div>
                )}

                {/* Action Submit (Sharp rectangular) */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-none bg-[var(--foreground)] hover:bg-[var(--accent-magenta)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 text-[var(--background)] font-sans font-bold text-xs tracking-widest uppercase mt-4 cursor-pointer"
                >
                  {status === "sending" ? t("contact.sending") : t("contact.send")}
                  <Send className="w-3.5 h-3.5" />
                </button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
