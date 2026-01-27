import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import PortfolioMobile from './PortfolioMobile'; // Imported
import { useTranslation } from 'react-i18next';

// Categories should inevitably be translated or mapped, but since there is only one "Weby", we can keep it simple for now or translate it.
// Ideally, we'd have keys like 'web', 'app' and translate them for display.
const categories = ["Weby"];

const PortfolioGrid = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState("Weby");
    const [selectedProject, setSelectedProject] = useState(null);
    const location = useLocation();

    // Mobile Detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const projects = useMemo(() => [
        {
            id: 1,
            title: "Hydroizolace Minar",
            category: "Weby",
            image: "/Minar/screencapture-hydroizolace-minar-cz-index-html-2026-01-20-12_24_41.webp",
            imageMobile: "/Minar/minar-mobile.webp",
            link: "https://hydroizolace-minar.cz/index.html",
            description: t('portfolio.projects.minar.description'),
            tech: ["HTML", "CSS", "JavaScript"],
            role: t('portfolio.projects.minar.role'),
            goal: t('portfolio.projects.minar.goal'),
            solution: t('portfolio.projects.minar.solution'),
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
            imageMobile: "/Sbertickou/sbertickou-mobile.webp",
            link: "https://www.sbertickounaryby.cz/",
            description: t('portfolio.projects.berticka.description'),
            tech: ["React", "TypeScript", "Tailwind CSS"],
            role: t('portfolio.projects.berticka.role'),
            goal: t('portfolio.projects.berticka.goal'),
            solution: t('portfolio.projects.berticka.solution'),
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
            imageMobile: "/ASminar/asminar-mobile.webp",
            link: "https://asminar.cz/",
            description: t('portfolio.projects.asminar.description'),
            tech: ["HTML5", "CSS3", "JavaScript"],
            role: t('portfolio.projects.asminar.role'),
            goal: t('portfolio.projects.asminar.goal'),
            solution: t('portfolio.projects.asminar.solution'),
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
            description: t('portfolio.projects.jaz.description'),
            tech: ["React", "JavaScript", "AOS"],
            role: t('portfolio.projects.jaz.role'),
            goal: t('portfolio.projects.jaz.goal'),
            solution: t('portfolio.projects.jaz.solution'),
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
            description: t('portfolio.projects.stejskal.description'),
            tech: ["React", "Vite", "Tailwind CSS"],
            role: t('portfolio.projects.stejskal.role'),
            goal: t('portfolio.projects.stejskal.goal'),
            solution: t('portfolio.projects.stejskal.solution'),
            gallery: [
                "/Stejskalstav/screencapture-localhost-5173-services-2026-01-26-13_36_34.webp",
                "/Stejskalstav/screencapture-localhost-5173-realizations-2026-01-26-13_39_09.webp",
                "/Stejskalstav/screencapture-localhost-5173-about-2026-01-26-13_36_57.webp",
                "/Stejskalstav/screencapture-localhost-5173-contact-2026-01-26-13_37_04.webp"
            ],
            size: "large"
        }
    ], [t]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const projectId = params.get('project');

        if (projectId) {
            const found = projects.find(p => p.id === parseInt(projectId));
            if (found) {
                setSelectedProject(found);
            }
        }
    }, [location, projects]);

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

                {/* CONDITIONAL RENDERING: Mobile List vs Desktop Grid */}
                {isMobile ? (
                    <PortfolioMobile
                        projects={filteredProjects}
                        onSelect={setSelectedProject}
                    />
                ) : (
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
                )}

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
                        {t('portfolio.footerTagline')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PortfolioGrid;
