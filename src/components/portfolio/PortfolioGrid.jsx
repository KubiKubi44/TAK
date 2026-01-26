import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

// Dummy Data (replace with real data later)
const projects = [
    {
        id: 1,
        title: "Hydroizolace Minar",
        category: "Weby",
        image: "/Minar/screencapture-hydroizolace-minar-cz-index-html-2026-01-20-12_24_41.webp",
        link: "https://hydroizolace-minar.cz/index.html",
        description: "Kompletní návrh a realizace responzivního firemního webu pro společnost působící v oblasti hydroizolací staveb a prodeje specializovaných materiálů.",
        tech: ["HTML", "CSS", "JavaScript"],
        role: "Návrh struktury a UX, UI design, implementace, testování responzivity",
        goal: "Cílem projektu bylo vytvořit moderní, přehlednou a důvěryhodnou prezentaci značky, která usnadní orientaci uživatelům, jasně komunikuje nabídku služeb a produktů a podporuje získávání nových poptávek.",
        solution: "Web klade důraz na srozumitelnou informační strukturu, intuitivní navigaci a konzistentní vizuální styl. Součástí řešení je katalog produktů, sekce půjčovny vybavení, přehledná prezentace týmu a optimalizovaná kontaktní stránka s mapovou integrací. Rozhraní je plně responzivní a optimalizované pro různá zařízení s důrazem na rychlost načítání a čitelnost obsahu.",
        gallery: [
            "/Minar/screencapture-hydroizolace-minar-cz-produkty-html-2026-01-20-12_33_45.webp",
            "/Minar/screencapture-hydroizolace-minar-cz-team-html-2026-01-20-12_33_33.webp",
            "/Minar/screencapture-hydroizolace-minar-cz-kontakt-html-2026-01-20-12_34_27.webp"
        ],
        size: "large"
    },
    {
        id: 2,
        title: "S Bertičkou na ryby",
        category: "Weby",
        image: "/Sbertickou/screencapture-sbertickounaryby-cz-2026-01-20-12_46_40.webp",
        link: "https://www.sbertickounaryby.cz/",
        description: "Komplexní návrh a realizace moderní digitální platformy, která propojuje rybářskou komunitu s charitativní pomocí.",
        tech: ["React", "TypeScript", "Tailwind CSS"],
        role: "UX strategie, UI design, frontend implementace",
        goal: "Vytvořit atraktivní, důvěryhodný a snadno použitelný web, který motivuje návštěvníky k účasti na závodech, usnadňuje registraci týmů a transparentně komunikuje smysl celé iniciativy. Silná vizuální identita podporuje emoce spojené s pobytem v přírodě.",
        solution: "Platforma je navržena s důrazem na výkon, responzivitu a škálovatelnost. Klíčovým prvkem je online registrační proces, který zjednodušuje administrativu. Součástí řešení je přehled nadcházejících akcí a sekce partnerů.",
        gallery: [
            "/Sbertickou/screencapture-sbertickounaryby-cz-2026-01-20-12_46_53.webp",
            "/Sbertickou/screencapture-sbertickounaryby-cz-2026-01-20-12_47_03.webp",
            "/Sbertickou/screencapture-sbertickounaryby-cz-2026-01-20-12_46_40.webp"
        ],
        size: "large"
    },
    {
        id: 3,
        title: "AS Minar",
        category: "Weby",
        image: "/ASminar/screencapture-asminar-cz-2026-01-20-13_53_12.webp",
        link: "https://asminar.cz/",
        description: "Komplexní návrh a realizace moderní webové prezentace pro společnost AS Minar – aplikační středisko specializované na profesionální hydroizolační a izolační systémy.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        role: "UX návrh struktury, UI design, frontend implementace, responzivní ladění",
        goal: "Cílem projektu bylo vytvořit reprezentativní digitální identitu, která posiluje důvěryhodnost značky, jasně komunikuje rozsah služeb a efektivně podporuje poptávkový proces. Web musel působit profesionálně a zároveň sloužit jako praktický obchodní nástroj.",
        solution: "Web je postaven na přehledné informační architektuře a výrazném vizuálním stylu. Klíčovou roli hraje stránka služeb se strukturovanými segmenty a sekce portfolia pro budování důvěry. Kontaktní stránka je optimalizována pro minimalizaci bariér s mapovou integrací a jasnými CTA.",
        gallery: [
            "/ASminar/screencapture-asminar-cz-aplikace-html-2026-01-20-13_53_22.webp",
            "/ASminar/screencapture-asminar-cz-reference-html-2026-01-20-13_53_31.webp",
            "/ASminar/screencapture-asminar-cz-kontakt-html-2026-01-20-13_53_37.webp"
        ],
        size: "large"
    },
    {
        id: 4,
        title: "Chalupa JAZ",
        category: "Weby",
        image: "/Jaz/screencapture-localhost-5174-2026-01-20-14_07_31.webp",
        link: "https://chalupajaz.cz/",
        description: "Návrh a realizace moderní webové prezentace pro rekreační ubytování Chalupa JAZ v Bedřichově v Jizerských horách.",
        tech: ["React", "JavaScript", "AOS"],
        role: "UX návrh, UI design, frontend implementace, animace",
        goal: "Vytvořit atraktivní a důvěryhodnou digitální prezentaci, která návštěvníkům poskytuje klíčové informace přehlednou formou a podporuje rozhodnutí k rezervaci. Důraz na silnou vizuální stránku a emoce.",
        solution: "Web kombinuje fotografie interiéru a lokality s jasně strukturovaným obsahem. Rozhraní využívá kartové layouty, jemné animace a transparentní cenovou komunikaci. Responzivní design zajišťuje pohodlné prohlížení na všech zařízeních.",
        gallery: [
            "/Jaz/screencapture-localhost-5174-about-2026-01-20-14_07_46.webp",
            "/Jaz/screencapture-localhost-5174-pricing-2026-01-20-14_07_53.webp",
            "/Jaz/screencapture-localhost-5174-rules-2026-01-20-14_08_08.webp"
        ],
        size: "large"
    },
    {
        id: 5,
        title: "StejskalStav",
        category: "Weby",
        image: "/Stejskalstav/screencapture-localhost-5173-2026-01-24-12_24_45.webp",
        link: "https://stejskalstav.cz",
        description: "Komplexní návrh a realizace moderní prezentační webové stránky pro stavební společnost s důrazem na důvěryhodnost a konverzi.",
        tech: ["React", "Vite", "Tailwind CSS"],
        role: "UI/UX Design, Frontend Development, Komponentová architektura",
        goal: "Navrhnout a vyvinout moderní prezentační web s důrazem na důvěryhodnost, výkon a jasnou konverzní cestu. Design pracuje s tmavým industriálním vizuálem.",
        solution: "Web obsahuje dynamickou úvodní sekci s 3D hero efektem, přehledné členění služeb a samostatnou sekce realizací. Technické řešení na React + Vite zajišťuje rychlost a snadnou údržbu.",
        gallery: [
            "/Stejskalstav/screencapture-localhost-5173-services-2026-01-26-13_36_34.webp",
            "/Stejskalstav/screencapture-localhost-5173-realizations-2026-01-26-13_39_09.webp",
            "/Stejskalstav/screencapture-localhost-5173-about-2026-01-26-13_36_57.webp",
            "/Stejskalstav/screencapture-localhost-5173-contact-2026-01-26-13_37_04.webp"
        ],
        size: "large"
    }
];

const categories = ["Weby"];

const PortfolioGrid = () => {
    const [activeFilter, setActiveFilter] = useState("Weby");
    const [selectedProject, setSelectedProject] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const projectId = params.get('project');

        if (projectId) {
            const found = projects.find(p => p.id === parseInt(projectId));
            if (found) {
                setSelectedProject(found);
            }
        }
    }, [location]);

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section className="pb-20 px-6 min-h-screen relative z-10 w-full">
            <div className="container mx-auto">

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className="relative px-6 py-2 rounded-full text-sm font-mono tracking-wider uppercase transition-all duration-300 group"
                        >
                            {/* Active Tab Background */}
                            {activeFilter === cat && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {/* Hover Effect for Inactive */}
                            {activeFilter !== cat && (
                                <div className="absolute inset-0 border border-white/10 rounded-full group-hover:border-white/30 transition-colors"></div>
                            )}

                            <span className={`relative z-10 ${activeFilter === cat ? 'text-neon-cyan font-bold' : 'text-gray-400 group-hover:text-white'}`}>
                                {cat}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={setSelectedProject}
                        />
                    ))}
                </motion.div>

                {/* Detail Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <ProjectDetailModal
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    )}
                </AnimatePresence>

                {/* Bottom Tagline */}
                <div className="text-center mt-32">
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">
                        Každý projekt je příležitostí vytvořit něco výjimečného.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PortfolioGrid;
