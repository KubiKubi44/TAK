import { motion } from 'framer-motion';
import {
    Layout, Palette, Code, Smartphone, Zap,
    Database, LifeBuoy, User, MessageSquare,
    Award, Cpu, TrendingUp, Search
} from 'lucide-react';
import Section from './Section';
import SectionTitle from './SectionTitle';

const services = [
    { icon: Layout, title: "Návrh UX a struktury" },
    { icon: Palette, title: "Moderní UI design" },
    { icon: Code, title: "Vývoj web aplikací" },
    { icon: Smartphone, title: "Responzivní design" },
    { icon: Search, title: "SEO a výkon" },
    { icon: Database, title: "Integrace API" },
    { icon: LifeBuoy, title: "Dlouhodobá podpora" }
];

const benefits = [
    { icon: User, title: "Individuální přístup" },
    { icon: MessageSquare, title: "Transparentní proces" },
    { icon: Award, title: "Důraz na kvalitu" },
    { icon: Cpu, title: "Moderní technologie" },
    { icon: TrendingUp, title: "Škálovatelné řešení" }
];

const About = () => {
    return (
        <Section id="about" className="border-t border-white/5 pb-20">
            <div className="container mx-auto px-6">

                {/* 1. COMPACT HERO SECTION (Text Split) */}
                <div className="mb-24">
                    <SectionTitle
                        title="O nás"
                        subtitle="Kdo jsme"
                        align="left"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">
                        <div className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                            <p className="mb-6">
                                Jsme digitální studio zaměřené na návrh a vývoj moderních webových aplikací, které mají jasný cíl – pomáhat značkám růst a přinášet skutečné výsledky.
                            </p>
                            <p className="text-neon-cyan">
                                Vytváříme produkty, které nejen dobře vypadají, ale především plní svůj obchodní účel.
                            </p>
                        </div>

                        <div className="space-y-6 text-gray-400 leading-relaxed text-base pt-2">
                            <p>
                                Věříme, že kvalitní web není jen o designu, ale především o funkčnosti, rychlosti a dobrém uživatelském zážitku. Specializujeme se na kompletní realizaci od prvotního návrhu až po technickou implementaci a dlouhodobou udržitelnost.
                            </p>
                            <p>
                                Každý projekt vnímáme individuálně. Ať už jde o firemní prezentaci nebo interaktivní aplikaci, pracujeme s ověřenými postupy, které zajišťují rychlost, bezpečnost a bezproblémové fungování na všech zařízeních.
                            </p>
                            <ul className="grid grid-cols-2 gap-4 pt-4 text-white font-mono text-sm uppercase tracking-wide">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></div> Čistý kód</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-magenta rounded-full"></div> Škálovatelnost</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-yellow rounded-full"></div> Rychlost</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> Bezpečnost</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. COMPACT FEATURES SECTION (Redesigned) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left: Services (Holo Cards) */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <code className="text-neon-cyan">&lt;</code> Co nabízíme <code className="text-neon-cyan">/&gt;</code>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {services.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative overflow-hidden bg-black/40 border border-white/5 p-4 rounded-xl hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(4,255,247,0.15)] transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/5 to-neon-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="text-gray-400 group-hover:text-neon-cyan transition-colors">
                                            <s.icon size={20} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{s.title}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Benefits (Stylized Vertical List) */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="text-neon-magenta">#</span> Proč my
                        </h3>
                        <div className="space-y-4">
                            {benefits.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group flex items-center justify-between p-4 bg-white/[0.02] border-l-2 border-transparent hover:border-neon-magenta hover:bg-neon-magenta/[0.05] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-white/5 text-neon-magenta group-hover:bg-neon-magenta group-hover:text-black transition-colors">
                                            <b.icon size={18} />
                                        </div>
                                        <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{b.title}</span>
                                    </div>
                                    <div className="h-1 w-1 rounded-full bg-gray-600 group-hover:bg-neon-magenta group-hover:shadow-[0_0_8px_#F704FF] transition-all"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </Section>
    );
};

export default About;
