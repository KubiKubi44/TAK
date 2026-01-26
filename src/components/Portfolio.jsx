import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import Section from './Section';
import SectionTitle from './SectionTitle';

const projects = [
    {
        title: "FinTech Dashboard",
        category: "Web Application",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tech: ["React", "D3.js", "Node.js"],
        size: "large"
    },
    {
        title: "CyberSecurity Platform",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        tech: ["Figma", "React", "Tailwind"],
        size: "small"
    },
    {
        title: "E-Commerce AI",
        category: "Full Stack",
        image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=800", // Adjusted image
        tech: ["Vue.js", "Python", "AWS"],
        size: "small"
    },
    {
        title: "Blockchain Explorer",
        category: "Web3 Development",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
        tech: ["Next.js", "Solidity", "GraphQL"],
        size: "large"
    }
];

const Portfolio = () => {
    return (
        <Section id="portfolio" className="bg-bg-dark">
            <div className="container mx-auto px-6">
                <SectionTitle
                    title="Selected Work"
                    subtitle="Our Portfolio"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative rounded-xl overflow-hidden cursor-pointer ${project.size === 'large' ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video'}`}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 border border-neon-cyan/0 group-hover:border-neon-cyan/50">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-neon-cyan text-sm font-bold tracking-wider mb-2 block uppercase">{project.category}</span>
                                    <div className="flex justify-between items-end">
                                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                                        <div className="p-3 bg-neon-cyan text-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                                            <ArrowUpRight size={24} />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-xs font-mono text-gray-400 border border-white/20 px-2 py-1 rounded">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a href="#" className="inline-flex items-center gap-2 text-white border-b border-neon-cyan pb-1 hover:text-neon-cyan transition-colors">
                        View All Projects <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </Section>
    );
};

export default Portfolio;
