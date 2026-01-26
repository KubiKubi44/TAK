import { useRef, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = memo(({ project, index, onClick }) => {
    const ref = useRef(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        // Disable 3D effect interactions on mobile/touch to prevent event flooding and lag
        if (window.matchMedia("(hover: none)").matches) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(project)}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
            className={`relative group cursor-pointer h-full`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative w-full h-full bg-black/40 md:backdrop-blur-md border border-white/5 overflow-hidden rounded-sm transition-colors duration-500 group-hover:border-transparent"
            >
                {/* Neon Glow Border (Animated) - Desktop Only for performance */}
                <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm z-0">
                    <div className="absolute inset-[-2px] bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow blur-sm animate-rgb-flow"></div>
                    <div className="absolute inset-[1px] bg-black rounded-sm"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative w-full h-80 overflow-hidden min-h-[350px]">
                        {/* Image */}
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                        {/* Holographic Overlay Effect - Desktop Only */}
                        <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay bg-[url('/noise.png')]"></div>
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"></div>

                        {/* Top Right Arrow */}
                        <div className="absolute top-6 right-6 z-20 overflow-hidden">
                            {project.link ? (
                                <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    initial={{ x: -20, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                    className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center translate-x-10 group-hover:translate-x-0 transition-transform duration-300 hover:bg-neon-cyan"
                                    title="Navštívit web"
                                >
                                    <ArrowUpRight size={20} />
                                </motion.a>
                            ) : (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                    className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center translate-x-10 group-hover:translate-x-0 transition-transform duration-300"
                                >
                                    <ArrowUpRight size={20} />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="p-8 absolute bottom-0 left-0 w-full transform translate-z-10">
                        <div className="transform translate-z-20 group-hover:translate-y-[-10px] transition-transform duration-500">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 border border-white/10 rounded-full bg-black/50 text-gray-300 backdrop-blur-sm">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2 leading-tight group-hover:text-neon-cyan transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2 number-of-lines-2 group-hover:text-white transition-colors duration-300 mb-4">
                                {project.description}
                            </p>

                            {/* Mobile Detail Button - Always visible on mobile */}
                            <div className="md:hidden mt-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClick(project);
                                    }}
                                    className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/50 rounded-full text-neon-cyan text-xs font-bold uppercase tracking-widest backdrop-blur-md active:bg-neon-cyan active:text-black transition-colors"
                                >
                                    Zobrazit detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
