"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { ArrowUpRight } from "lucide-react";
import ProjectModal from "./ProjectModal";

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

export default function Portfolio() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const czProjects: Project[] = [
    {
      title: "Soundtrack Festival",
      category: "video",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      client: "Michal Dvořák & Kangaroo Production",
      year: "11. Ročník",
      desc: "Mezinárodní festival pod vedením Michala Dvořáka proměňuje lázeňské město v unikátní scénu, kde se potkává špičková kinematografie s živou hudbou a nejmodernějšími technologiemi. Jako prestižní událost světového formátu pravidelně hostí držitele Oscarů a legendární skladatele, kteří do Poděbrad přitahují desetitisíce návštěvníků ročně.",
      subtitle: "KULTURA POD ŠIRÝM NEBEM",
      stats: [
        { value: "11.", label: "ROČNÍK" },
        { value: "300+", label: "UMĚLCŮ" },
        { value: "3", label: "HLAVNÍ PÓDIA" },
        { value: "25.000+", label: "NÁVŠTĚVNÍKŮ" }
      ],
      bullets: [
        "Hudba, film, zážitek",
        "Světová show v kulisách lázní",
        "Světové hvězdy na dosah ruky",
        "Symfonie v pohybu"
      ],
      chips: ["Vizuální energie", "Kouzlo projekcí", "Umění v pohybu"],
      quote: "Na Soundtrack Poděbrady nejsou žádná hluchá místa, každý moment stojí za to. Festival, který nemá v Česku obdoby a organicky spojuje film s živou hudbou a multimédii.",
      quoteAuthor: "Radiožurnál (Český rozhlas)",
      showreelUrl: "#",
      websiteUrl: "https://soundtrackfestival.cz"
    },
    {
      title: "Beats & Blondes",
      category: "music",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80",
      client: "Beats & Blondes",
      year: "2025",
      desc: "Dva světy. Jeden rytmus. Klasická hudba se potkává s pulzující energií techna. Jedinečné duo, které dokonale spojuje dva hudební světy v ohromující fúzi klasické elegance a elektronické energie. DJ Lucca a houslová virtuoska Martina Bačová vytvářejí nezapomenutelný zážitek, který promění každou akci.",
      subtitle: "KLASICKÁ ELEGANCE S ENERGIÍ TECHNA",
      stats: [
        { value: "100+", label: "MĚST" },
        { value: "2", label: "HLAVNÍ HVĚZDY" },
        { value: "100%", label: "ŽIVÉ VYSTOUPENÍ" },
        { value: "1", label: "UNIKÁTNÍ SHOW" }
      ],
      bullets: [
        "Špičková vizuální produkce",
        "Víc než jen show",
        "Exkluzivní VJ",
        "Hudba která pohltí"
      ],
      chips: ["Firemní eventy", "Gala večery", "Soukromé akce"],
      quote: "Strhující spojení klasické a elektronické hudby. Čistá magie na jevišti.",
      quoteAuthor: "FESTIVAL REVIEW",
      showreelUrl: "#"
    },
    {
      title: "DRAWMAN Show",
      category: "cgi",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
      client: "Kangaroo Production",
      year: "2026",
      desc: "DRAWMAN je jedinečné multimediální představení, které vypráví silný příběh o věčném boji mezi tvořením a ničením. Show je inspirována dílem legendárního umělce z období secese - Alfonse Muchy, jehož elegantní plakáty, šperky a monumentální plátna definovala celou uměleckou éru.",
      subtitle: "ORIGINÁLNÍ MULTIMEDIÁLNÍ PROJEKT",
      stats: [
        { value: "1", label: "KULTOVNÍ VYPRAVĚČ" },
        { value: "3D", label: "PROJEKCE" },
        { value: "LIVE", label: "MULTIMEDIÁLNÍ SHOW" },
        { value: "2", label: "SVĚTY" }
      ],
      bullets: [
        "Secesní styl",
        "3D projekce",
        "Originální hudba",
        "Živé vystoupení"
      ],
      chips: ["Arénová vystoupení", "Divadelní představení", "Venkovní scény"],
      quote: "Úchvatné dílo. Za prvé výborný nápad, pocta Muchovi jako géniovi, velikánovi a světově uznávanému Čechovi, za druhé silný vizuální a hudební prožitek.",
      quoteAuthor: "PrahaIN.cz",
      showreelUrl: "#",
      websiteUrl: "https://drawmanshow.com"
    },
    {
      title: "LUCIE 40 Let",
      category: "video",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=80",
      client: "LUCIE",
      year: "40 Let",
      desc: "Skupina LUCIE je stálicí české hudební scény, která svým vlivem a tvorbou zásadně ovlivnila vývoj domácí rockové hudby. Během své existence získala LUCIE řadu prestižních ocenění, včetně deseti cen Anděl, a prodala stovky tisíc hudebních nosičů. Nedávné narozeninové turné po České republice potvrdilo postavení kapely na domácí scéně i trvající zájem publika napříč generacemi. LUCIE aktuálně pracuje na novém albu R.A.D.O.S.T.",
      subtitle: "LEGENDA ČESKÉ HUDEBNÍ SCÉNY",
      stats: [
        { value: "40", label: "LET NA SCÉNĚ" },
        { value: "10", label: "OCENĚNÍ CENY ANDĚL" },
        { value: "8", label: "STUDIOVÝCH ALB" },
        { value: "15+", label: "LEGENDÁRNÍCH HITŮ" }
      ],
      bullets: [
        "Hlas celé generace",
        "Jedinečná show",
        "Sbírka deseti Andělů",
        "Scénické osvětlení"
      ],
      chips: ["Festivaly", "Firemní eventy", "Koncertní sály"],
      quote: "Každý moment působil jako hlavní událost večera. Propracovaná světelná show i výtečný zvuk.",
      quoteAuthor: "Seznam zprávy / iREPORT",
      showreelUrl: "#",
      websiteUrl: "https://lucie.cz"
    }
  ];

  const enProjects: Project[] = [
    {
      title: "Soundtrack Festival",
      category: "video",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
      client: "Michal Dvořák & Kangaroo Production",
      year: "11th Edition",
      desc: "An international festival led by Michal Dvořák transforms the spa town into a unique stage where world-class cinematography meets live music and cutting-edge technologies. As a prestigious global event, it regularly hosts Academy Award winners and legendary composers, attracting tens of thousands of visitors to Poděbrady annually.",
      subtitle: "OUTDOOR CULTURE",
      stats: [
        { value: "11th", label: "EDITION" },
        { value: "300+", label: "ARTISTS" },
        { value: "3", label: "MAIN STAGES" },
        { value: "25,000+", label: "VISITORS" }
      ],
      bullets: [
        "Music, film, experience",
        "World-class show in a spa setting",
        "Global stars within arm's reach",
        "Symphony in motion"
      ],
      chips: ["Visual Energy", "Projection Magic", "Art in Motion"],
      quote: "There are no dull moments at Soundtrack Poděbrady; every single second is worth it. A festival unparalleled in the Czech Republic, organically blending film with live music and multimedia.",
      quoteAuthor: "Radiozurnal (Czech Radio)",
      showreelUrl: "#",
      websiteUrl: "https://soundtrackfestival.cz"
    },
    {
      title: "Beats & Blondes",
      category: "music",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80",
      client: "Beats & Blondes",
      year: "2025",
      desc: "Two worlds. One rhythm. Classical music meets the pulsing energy of techno. A unique duo that perfectly blends two musical realms in a stunning fusion of classical elegance and electronic energy. DJ Lucca and violin virtuoso Martina Bačová deliver an unforgettable experience that elevates any event.",
      subtitle: "CLASSICAL ELEGANCE MEETS TECHNO ENERGY",
      stats: [
        { value: "100+", label: "CITIES" },
        { value: "2", label: "MAIN STARS" },
        { value: "100%", label: "LIVE PERFORMANCE" },
        { value: "1", label: "UNIQUE SHOW" }
      ],
      bullets: [
        "State-of-the-art visual production",
        "More than just a show",
        "Exclusive VJ",
        "Immersive music"
      ],
      chips: ["Corporate Events", "Gala Nights", "Private Parties"],
      quote: "A captivating fusion of classical and electronic music. Pure magic on stage.",
      quoteAuthor: "FESTIVAL REVIEW",
      showreelUrl: "#"
    },
    {
      title: "DRAWMAN Show",
      category: "cgi",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
      client: "Kangaroo Production",
      year: "2026",
      desc: "DRAWMAN is a unique multimedia performance telling a powerful story of the eternal struggle between creation and destruction. The show is inspired by the work of legendary Art Nouveau artist Alphonse Mucha, whose elegant posters, jewelry, and monumental canvases defined an entire artistic era.",
      subtitle: "ORIGINAL MULTIMEDIA PROJECT",
      stats: [
        { value: "1", label: "ICONIC NARRATOR" },
        { value: "3D", label: "PROJECTIONS" },
        { value: "LIVE", label: "MULTIMEDIA SHOW" },
        { value: "2", label: "WORLDS" }
      ],
      bullets: [
        "Art Nouveau style",
        "3D projections",
        "Original music",
        "Live performance"
      ],
      chips: ["Arena Shows", "Theater Performances", "Outdoor Stages"],
      quote: "A breathtaking work. Firstly, an excellent concept paying tribute to Mucha as a genius and globally acclaimed Czech figure; secondly, a powerful visual and musical experience.",
      quoteAuthor: "PrahaIN.cz",
      showreelUrl: "#",
      websiteUrl: "https://drawmanshow.com"
    },
    {
      title: "LUCIE 40 Let",
      category: "video",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=80",
      client: "LUCIE",
      year: "40 Years",
      desc: "The band LUCIE is a cornerstone of the Czech music scene, fundamentally shaping the development of domestic rock music with its influence and output. Throughout its existence, LUCIE has won numerous prestigious awards, including ten Anděl Awards, and sold hundreds of thousands of albums. Their recent anniversary tour across the Czech Republic confirmed the band's top-tier standing and enduring appeal across generations. LUCIE is currently working on their new album R.A.D.O.S.T.",
      subtitle: "LEGEND OF THE CZECH MUSIC SCENE",
      stats: [
        { value: "40", label: "YEARS ON STAGE" },
        { value: "10", label: "ANDEL AWARDS" },
        { value: "8", label: "STUDIO ALBUMS" },
        { value: "15+", label: "LEGENDARY HITS" }
      ],
      bullets: [
        "Voice of an entire generation",
        "One-of-a-kind show",
        "Ten Andel Awards collection",
        "Scenic lighting design"
      ],
      chips: ["Festivals", "Corporate Events", "Concert Halls"],
      quote: "Every single moment felt like the main event of the night. A sophisticated light show and exceptional sound.",
      quoteAuthor: "Seznam zprávy / iREPORT",
      showreelUrl: "#",
      websiteUrl: "https://lucie.cz"
    }
  ];

  const projects = locale === "cz" ? czProjects : enProjects;

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const handleFilterChange = (val: string) => {
    setFilter(val);
    setActiveIndex(0);
  };

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-[#08080a] border-t border-white/[0.03]"
      style={{ paddingLeft: "clamp(24px, 5vw, 160px)", paddingRight: "clamp(24px, 3vw, 48px)" }}
    >
      {/* Background ambient light guides */}
      <div className="absolute top-[20%] left-[-5%] w-[350px] h-[350px] bg-accent-cyan/3 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-5%] w-[350px] h-[350px] bg-accent-magenta/3 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl flex flex-col gap-16">
        {/* Section Heading & Filter Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="inline-block text-[9px] uppercase font-bold tracking-[0.3em] text-[#ff5f20] border border-[#ff5f20]/20 px-3 py-1 rounded-full bg-[#ff5f20]/5 mb-6">
              {t("nav.work")}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--foreground)] leading-none">
              {t("portfolio.title")}
            </h2>
          </div>

          {/* Luxury Minimalist Switcher */}
          <div className="flex flex-wrap gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] p-1 rounded-none self-start backdrop-blur-md z-20">
            {[
              { label: t("portfolio.filter.all"), val: "all" },
              { label: t("portfolio.filter.cgi"), val: "cgi" },
              { label: t("portfolio.filter.video"), val: "video" },
              { label: t("portfolio.filter.music"), val: "music" },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={() => handleFilterChange(btn.val)}
                className={`px-4 py-2 rounded-none text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  filter === btn.val
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm scale-102"
                    : "text-gray-400 hover:text-[var(--foreground)]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Responsive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mt-4 relative">
          
          {/* LEFT SIDE PANEL (Sticky Catalogue Desk - Hidden on Mobile, Pinned Vertically in Viewport on Desktop) */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div 
              className="sticky flex flex-col justify-center pr-8 border-r border-white/5"
              style={{ top: "12vh", height: "76vh" }}
            >
              {/* Giant Stationary Title - Perfectly locked in place like Mevia */}
              <div className="flex flex-col gap-1 mb-6">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-[#ff5f20] uppercase leading-[0.85] tracking-tighter">
                  KANGAROO<br />PRODUCTION
                </h2>
              </div>

              {/* Description Premium Glassmorphic Text Window Container (stands in place, changes on hover/scroll) */}
              <div className="relative h-[460px] w-full mt-4">
                {filteredProjects.map((project, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <motion.div
                      key={project.title}
                      initial="inactive"
                      animate={isActive ? "active" : "inactive"}
                      variants={{
                        active: {
                          opacity: 1,
                          filter: "blur(0px)",
                          pointerEvents: "auto",
                          scale: 1,
                          y: 0,
                        },
                        inactive: {
                          opacity: 0,
                          filter: "blur(12px)",
                          pointerEvents: "none",
                          scale: 0.96,
                          y: 15,
                        }
                      }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-0 left-0 w-full h-full bg-[#0e0e10]/80 backdrop-blur-xl border border-white/[0.04] rounded-3xl p-8 flex flex-col gap-5 shadow-2xl"
                      aria-hidden={!isActive}
                    >
                      {/* Category Tag & Formatted Index */}
                      <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                        <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-[#ff5f20] uppercase">
                          {project.category === "cgi" && "3D & CGI"}
                          {project.category === "video" && "Video Production"}
                          {project.category === "music" && "Music Production"}
                        </span>
                        <span className="text-sm font-sans font-bold text-gray-500">
                          {String(projects.indexOf(project) + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Compact Title & Subtitle */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-gray-500 uppercase">
                          {project.subtitle}
                        </span>
                        <h4 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight leading-tight uppercase">
                          {project.title}
                        </h4>
                      </div>

                      {/* Narrative Description - Scaled up */}
                      <p className="text-sm sm:text-base md:text-lg text-gray-300 font-sans font-normal leading-relaxed text-left my-2">
                        {project.desc}
                      </p>
                      
                      {/* Compact metadata beneath description */}
                      <div className="flex items-center gap-6 mt-auto border-t border-white/[0.04] pt-4 text-xs font-sans font-bold tracking-widest text-gray-500 uppercase">
                        <span>{project.client}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                        <span>{project.year}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PANEL (Vertical Scroll - Render Visual Cards) */}
          <div 
            className="col-span-1 lg:col-span-8 flex flex-col gap-32 py-4 lg:py-8 pl-0 lg:pl-12"
            style={{ perspective: 1200 }}
          >
            {filteredProjects.map((project, idx) => {
              const formattedIndex = String(projects.indexOf(project) + 1).padStart(2, "0");
              return (
                <motion.div
                  key={project.title}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onViewportEnter={() => setActiveIndex(idx)}
                  viewport={{ amount: 0.65 }}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="flex flex-col w-full bg-[#0e0e10]/80 border border-white/[0.04] rounded-3xl p-6 md:p-8 gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_35px_70px_-15px_rgba(255,95,32,0.16),0_40px_80px_rgba(0,0,0,0.9)] hover:border-[#ff5f20]/30 transition-all duration-500"
                >
                  {/* Card Header (Category Title + Number) */}
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                    <h3 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-white uppercase">
                      {project.category === "cgi" && "3D & CGI"}
                      {project.category === "video" && "Video Production"}
                      {project.category === "music" && "Music Production"}
                    </h3>
                    <span className="text-xs font-sans font-bold tracking-widest text-[#ff5f20]">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Cinematic Visual Frame */}
                  <div
                    onClick={() => setActiveProject(project)}
                    className="group relative w-full aspect-[16/10] overflow-hidden bg-transparent rounded-2xl border border-white/5 cursor-pointer shadow-sm transition-all duration-500 will-change-transform"
                  >
                    {/* Background Visual Asset */}
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-102 group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    
                    {/* Bottom dark shadow visual shroud */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
                    
                    {/* Artistic Inline Card Overlay Elements */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 pointer-events-none">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-white/80 uppercase mb-1">
                          {project.subtitle}
                        </span>
                        <h4 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight leading-none">
                          {project.title}
                        </h4>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/20 bg-black/20 group-hover:border-white/50 group-hover:bg-[#ff5f20] flex items-center justify-center transition-all duration-300 backdrop-blur-sm pointer-events-auto">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer (Minimal Action Link) */}
                  <div className="flex justify-between items-center border-t border-white/[0.04] pt-4">
                    <span className="text-xs font-sans font-semibold text-gray-500">
                      {project.client} &bull; {project.year}
                    </span>
                    <button
                      onClick={() => setActiveProject(project)}
                      className="flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-[#ff5f20] hover:text-white transition-colors duration-300 uppercase cursor-pointer"
                    >
                      LEARN MORE <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* MOBILE DETAILED METADATA BLOCK (Only rendered on mobile/tablet viewports, stacked inline) */}
                  <div className="flex lg:hidden flex-col gap-5 mt-2 border-t border-white/5 pt-6">
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">
                      {project.desc}
                    </p>
                    
                    {project.stats && project.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {project.stats.slice(0, 2).map((stat, sIdx) => (
                          <div key={sIdx} className="bg-[#ff5f20]/[0.03] border border-[#ff5f20]/10 p-2.5 flex flex-col justify-center">
                            <span className="text-base font-display font-bold text-[var(--accent-cyan)] leading-none mb-1">
                              {stat.value}
                            </span>
                            <span className="text-[8px] font-sans font-bold tracking-wider text-gray-400 uppercase">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Full Screen Interactive Project Detailed Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
