import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const PortfolioMobile = ({ projects, onSelect }) => {
    return (
        <div className="flex flex-col gap-12 pb-20">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex flex-col gap-4"
                >
                    {/* Index & Category */}
                    <div className="flex items-center justify-between px-2">
                        <span className="font-mono text-neon-cyan text-sm">0{index + 1}</span>
                        <span className="font-mono text-gray-500 text-xs uppercase tracking-widest">{project.category}</span>
                    </div>

                    {/* Card Container - No heavy effects, just clean UI */}
                    <div
                        className="group relative w-full bg-bg-dark border border-white/10 rounded-xl overflow-hidden active:scale-[0.98] transition-transform duration-200"
                        onClick={() => onSelect(project)}
                    >
                        {/* Image - Fixed Height, restricted to avoid memory limit */}
                        <div className="relative w-full h-64 overflow-hidden bg-white/5">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                                decoding="async"
                            />
                            {/* Simple Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-60"></div>

                            {/* Action Icon */}
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 text-white">
                                <ArrowUpRight size={18} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                                {project.title}
                            </h3>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.slice(0, 3).map((t, i) => (
                                    <span key={i} className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-neon-cyan text-xs font-bold uppercase tracking-widest group-active:translate-x-2 transition-transform">
                                Zobrazit detail
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Simple decoration */}
            <div className="w-full h-px bg-white/10 my-8"></div>
            <p className="text-center text-gray-600 font-mono text-xs uppercase">
                End of Stream
            </p>
        </div>
    );
};

export default PortfolioMobile;
