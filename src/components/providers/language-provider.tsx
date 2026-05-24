"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Locale = "en" | "cz";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.work": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact & Booking",
    "nav.cta": "Let's connect",

    // Hero
    "nav.logo": "KANGAROO",
    "hero.tagline": "CREATIVE HUB",
    "hero.headline": "Kangaroo Production",
    "hero.subheadline": "World-class creative and audiovisual production studio of Michal Dvořák.",
    "hero.explore": "Explore projects",
    "hero.touch": "Contact us",
    "hero.scroll": "Scroll to explore",

    // Services
    "services.title": "Our Focus",
    "services.subtitle": "Transforming creative ideas into high-fidelity sensory realities.",
    "services.immersive.title": "Multimedia Shows",
    "services.immersive.desc": "Bespoke high-end multimedia productions combining lasers, holograms, live orchestras, and interactive tech.",
    "services.events.title": "Live Festivals",
    "services.events.desc": "Full production and technical direction for world-class music and film festivals.",
    "services.video.title": "Video Production",
    "services.video.desc": "Cinematic showreels, live video mapping, documentary, and full-scale postproduction pipelines.",
    "services.music.title": "Music & Scoring",
    "services.music.desc": "Original soundtracks, orchestrations, sound engineering, and concert mixes by Michal Dvořák.",
    "services.3d.title": "3D & CGI Projections",
    "services.3d.desc": "Hyper-realistic virtual sets, holographic animations, and architectural projection mappings.",
    "services.ai.title": "Hologram Tech",
    "services.ai.desc": "Pioneering mixed-reality stage visuals, volumetric capture, and next-generation projection stages.",
    "services.graphic.title": "Scenic Design",
    "services.graphic.desc": "Visual branding, grand stage designs, custom interactive screens, and dynamic light setups.",
    "services.marketing.title": "Artist Management",
    "services.marketing.desc": "Tour production, booking management, and strategic marketing for legends and rising stars.",
    "services.learnMore": "Learn more",

    // About
    "about.title": "Kangaroo",
    "about.philosophy": "We turn grand ideas into visual symphonies",
    "about.desc1": "Kangaroo Production is a multi-disciplinary audiovisual agency bridging the gap between grand physical stages, live music, and cutting-edge digital dimensions.",
    "about.desc2": "Led by renowned composer and producer Michal Dvořák, we focus on technical perfection, artistic freedom, and creating unforgettable emotional connections for audiences worldwide.",
    "about.stat.awards": "Anděl Awards",
    "about.stat.clients": "Cities Toured",
    "about.stat.projects": "Completed Shows",

    // Portfolio
    "portfolio.title": "Showcase",
    "portfolio.filter.all": "All",
    "portfolio.filter.cgi": "CGI & Shows",
    "portfolio.filter.ai": "Technology",
    "portfolio.filter.video": "Festivals",
    "portfolio.filter.music": "Music & Tours",
    "portfolio.viewCase": "View Showcase",
    "portfolio.modal.close": "Close project",

    // Testimonials
    "testimonials.title": "Our Partnerships",
    "testimonials.subtitle": "Delivering jaw-dropping performances across generations.",

    // Contact
    "contact.title": "Contact & Booking",
    "contact.subtitle": "Let's connect and create an unforgettable show together!",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.project": "Show Inquiry",
    "contact.project.placeholder": "Select an event type...",
    "contact.message": "Describe your project or show vision...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent! We will connect with you shortly.",
    "contact.error": "Something went wrong. Please try again.",

    // Footer
    "footer.rights": "All rights reserved. Powered by Kangaroo Production.",
  },
  cz: {
    // Nav
    "nav.home": "Domů",
    "nav.services": "Zaměření",
    "nav.work": "Projekty",
    "nav.about": "O nás",
    "nav.contact": "Kontakt & Rezervace",
    "nav.cta": "Spojte se s námi",

    // Hero
    "nav.logo": "KANGAROO",
    "hero.tagline": "KREATIVNÍ HUB",
    "hero.headline": "Kangaroo Production",
    "hero.subheadline": "Špičková kreativní a audiovizuální produkční stáj Michala Dvořáka.",
    "hero.explore": "Prozkoumat projekty",
    "hero.touch": "Napište nám",
    "hero.scroll": "Objevujte sjezdem",

    // Services
    "services.title": "Naše Zaměření",
    "services.subtitle": "Měníme kreativní myšlenky ve špičkové smyslové zážitky.",
    "services.immersive.title": "Multimediální show",
    "services.immersive.desc": "Špičkové produkce kombinující lasery, hologramy, živé orchestry a interaktivní technologie.",
    "services.events.title": "Živé festivaly",
    "services.events.desc": "Kompletní produkce, dramaturgie a technická režie pro hudební a filmové festivaly světové úrovně.",
    "services.video.title": "Video produkce",
    "services.video.desc": "Filmové showreely, live video mapping, dokumenty a komplexní postprodukční pipeline.",
    "services.music.title": "Hudba a zvuk",
    "services.music.desc": "Originální soundtracky, orchestrace, zvukový design a koncertní mixy z dílny Michala Dvořáka.",
    "services.3d.title": "3D & CGI projekce",
    "services.3d.desc": "Fotorealistické scény, holografické animace a monumentální architektonické mappingy.",
    "services.ai.title": "Holografické show",
    "services.ai.desc": "Pionýrské využití smíšené reality na scéně, volumetrické snímání a jevištní technologie budoucnosti.",
    "services.graphic.title": "Scénografie a design",
    "services.graphic.desc": "Vizuální koncepce scén, design pódií na míru, interaktivní LED stěny a světelný design.",
    "services.marketing.title": "Management & Booking",
    "services.marketing.desc": "Produkce turné, zastupování umělců a strategický marketing pro hudební legendy i nové projekty.",
    "services.learnMore": "Zjistit více",

    // About
    "about.title": "Kangaroo",
    "about.philosophy": "Měníme velké myšlenky ve vizuální symfonie",
    "about.desc1": "Kangaroo Production je multidisciplinární audiovizuální agentura propojující velkolepé fyzické scény, živou hudbu a nejmodernější digitální dimenze.",
    "about.desc2": "Pod vedením uznávaného hudebního skladatele a producenta Michala Dvořáka klademe důraz na technickou dokonalost, uměleckou svobodu a vytváření nezapomenutelných emocí pro diváky z celého světa.",
    "about.stat.awards": "Cen Anděl",
    "about.stat.clients": "Navštívených Měst",
    "about.stat.projects": "Hotových Show",

    // Portfolio
    "portfolio.title": "Projekty",
    "portfolio.filter.all": "Vše",
    "portfolio.filter.cgi": "CGI & Show",
    "portfolio.filter.ai": "Technologie",
    "portfolio.filter.video": "Festivaly",
    "portfolio.filter.music": "Hudba & Turné",
    "portfolio.viewCase": "Zobrazit projekt",
    "portfolio.modal.close": "Zavřít projekt",

    // Testimonials
    "testimonials.title": "Naše partnerství",
    "testimonials.subtitle": "Přinášíme úchvatné zážitky, které propojují generace.",

    // Contact
    "contact.title": "Kontakt & Rezervace",
    "contact.subtitle": "Spojte se s námi a vytvořme společně show, na kterou se nezapomíná!",
    "contact.name": "Vaše Jméno",
    "contact.email": "Váš E-mail",
    "contact.project": "Poptávka show",
    "contact.project.placeholder": "Vyberte typ akce...",
    "contact.message": "Popište váš projekt nebo představu o show...",
    "contact.send": "Odeslat Zprávu",
    "contact.sending": "Odesílá se...",
    "contact.success": "Zpráva odeslána! Brzy se s vámi spojíme.",
    "contact.error": "Něco se nepovedlo. Zkuste to prosím znovu.",

    // Footer
    "footer.rights": "Všechna práva vyhrazena. Běží na Kangaroo Production.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("mevia-lang") as Locale;
    if (savedLocale === "en" || savedLocale === "cz") {
      setTimeout(() => {
        setLocale(savedLocale);
      }, 0);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("mevia-lang", newLocale);
  };

  const t = (key: string): string => {
    const dict = translations[locale];
    return (dict as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
