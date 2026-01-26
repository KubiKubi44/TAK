import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Maximize2, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ProjectDetailModal = ({ project, onClose }) => {
    // Lightbox State: stores index of currently viewed image
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Scroll handling for internal modal content
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Defer heavy content rendering
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        // Delay rendering of heavy content to allow animation to start smoothly
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Construct all images array (Hero + Gallery)
    const allImages = project ? [project.image, ...(project.gallery || [])] : [];

    // Lightbox Navigation Handlers
    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % allImages.length));
    }, [allImages.length]);

    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
    }, [allImages.length]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (lightboxIndex === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setLightboxIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, handleNext, handlePrev]);

    if (!project) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-bg-dark/95 md:backdrop-blur-md overflow-hidden flex flex-col"
        >
            {/* Progress Bar */}
            <motion.div style={{ scaleX }} className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow origin-left z-[10000]"></motion.div>

            {/* Header / Nav */}
            <div className="fixed top-0 left-0 right-0 z-[10001] flex justify-center items-start p-6 md:p-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                {/* Center: Close Button */}
                <button
                    onClick={onClose}
                    className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 border border-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 group shadow-lg backdrop-blur-md mt-2"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            {/* Scrollable Content Container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto scrollbar-hide"
            >
                {/* SECTION 1: HERO OVERVIEW */}
                <div className="relative h-[60vh] md:h-[70vh] w-full group cursor-zoom-in" onClick={() => setLightboxIndex(0)}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent"></div>

                    {/* Hover Zoom Hint */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-md p-4 rounded-full border border-white/10">
                            <Maximize2 className="text-white" size={32} />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 pointer-events-none">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-4xl"
                        >
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 mb-8 pointer-events-auto items-center">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-sm font-mono text-black bg-neon-cyan px-3 py-1 font-bold uppercase tracking-wider">
                                        {t}
                                    </span>
                                ))}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white hover:text-neon-cyan transition-colors text-sm font-bold uppercase tracking-widest group border border-white/20 bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full hover:bg-white/10"
                                    >
                                        <span>Navštívit web</span>
                                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {isMounted && (
                    <div className="max-w-7xl mx-auto px-6 md:px-20 py-20 space-y-32">

                        {/* SECTION 2: OVERVIEW & STATS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-20">
                            <div className="md:col-span-2">
                                <h3 className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-widest">Shrnutí projektu</h3>
                                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Role</h3>
                                    <p className="text-white font-light">{project.role || "Development & Design"}</p>
                                </div>
                                {project.stats && project.stats.map((stat, i) => (
                                    <div key={i}>
                                        <h4 className="text-4xl font-bold text-white mb-1">{stat.value}</h4>
                                        <p className="text-sm text-gray-500 font-mono">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 3: GOAL & SOLUTION */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-8">Cíl</h3>
                                <p className="text-gray-400 leading-relaxed mb-8">
                                    {project.goal || "To create a high-performance digital experience that elevates the brand."}
                                </p>
                            </div>
                            <div className="relative p-10 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl">
                                <h3 className="text-3xl font-bold text-neon-cyan mb-8">Řešení</h3>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    {project.solution || "We engineered a robust solution tailored to specific business needs."}
                                </p>
                            </div>
                        </div>

                        {/* SECTION 4: UI SHOWCASE */}
                        {project.gallery && (
                            <div>
                                <h3 className="text-xs font-mono text-gray-500 mb-8 uppercase tracking-widest text-center">Vizuální systém</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.gallery.slice(0, 2).map((img, i) => (
                                        <div
                                            key={i}
                                            className="h-[400px] bg-gray-800 rounded-xl overflow-hidden relative group cursor-zoom-in"
                                            // Index offset by 1 because 0 is the hero image
                                            onClick={() => setLightboxIndex(i + 1)}
                                        >
                                            <img src={img} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" alt={`Detail ${i}`} />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <Maximize2 className="text-white drop-shadow-md" size={32} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {project.gallery[2] && (
                                    <div
                                        className="mt-8 h-[500px] bg-gray-800 rounded-xl overflow-hidden relative group cursor-zoom-in"
                                        onClick={() => setLightboxIndex(2 + 1)} // Index 3 (Hero + 2 gallery items before this)
                                    >
                                        <img src={project.gallery[2]} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" alt="Full Width UI" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <Maximize2 className="text-white drop-shadow-md" size={32} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CTA */}
                        <div className="text-center py-20">
                            <button className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neon-cyan transition-colors">
                                <span>Zahájit projekt</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </div>
                )}
            </div>

            {/* LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10002] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setLightboxIndex(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-2"
                            onClick={() => setLightboxIndex(null)}
                        >
                            <X size={40} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-neon-cyan transition-colors z-50 p-4 hover:bg-white/5 rounded-full"
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-neon-cyan transition-colors z-50 p-4 hover:bg-white/5 rounded-full"
                            onClick={handleNext}
                        >
                            <ChevronRight size={48} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-xs tracking-widest">
                            {lightboxIndex + 1} / {allImages.length}
                        </div>

                        {/* Image */}
                        <motion.img
                            key={lightboxIndex} // Triggers animation on change
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            src={allImages[lightboxIndex]}
                            className="max-w-full max-h-screen object-contain shadow-2xl user-select-none"
                            onClick={(e) => e.stopPropagation()}
                            alt={`Lightbox View ${lightboxIndex + 1}`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>,
        document.body
    );
};

export default ProjectDetailModal;
