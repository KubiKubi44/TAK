import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Globe, Server, Palette, Layers, Box, Cpu, ArrowUpRight, X, CheckCircle, Zap } from 'lucide-react'; // Added icons
import Section from './Section';
import SectionTitle from './SectionTitle';

const services = [
    {
        icon: Globe,
        title: "Vývoj webů",
        description: "Pixel-perfect weby pro škálování.",
        extendedDescription: "Stavíme digitální pevnosti. Náš balík pro vývoj webu využívá nejnovější technologie React, Next.js a WebGL k poskytování zážitků, které nejsou jen vidět, ale i cítit. Od SEO optimalizovaných vstupních stránek po komplexní PWA ekosystémy zajišťujeme načítání v řádu milisekund a 100% skóre v Lighthouse.",
        features: ["React / Next.js", "WebGL a 3D interaktivita", "Integrace Headless CMS", "Globální nasazení CDN"],
        color: "neon-cyan"
    },
    {
        icon: Layers,
        title: "Webové aplikace",
        description: "Komplexní SaaS platformy poháněné moderní infrastrukturou.",
        extendedDescription: "Škálovatelnost není dodatečný nápad; je to základ. Navrhujeme robustní SaaS platformy schopné zvládnout miliony souběžných uživatelů. Naše architektura mikroslužeb zajišťuje nasazení s nulovým výpadkem a nekonečné horizontální škálování.",
        features: ["Architektura mikroslužeb", "Real-time Socket.io", "AWS / Azure Cloud Native", "Enterprise zabezpečení"],
        color: "neon-magenta"
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "Kde se psychologie potkává s futuristickou estetikou.",
        extendedDescription: "Design je vdechnutí života do kódu. Náš proces začíná hlubokou empatií k uživateli a končí pixel-perfect rozhraními, která uživatele vedou bez námahy. Simulujeme uživatelské toky, testujeme interakce A/B a vytváříme pohybové jazyky, které potěší.",
        features: ["Prototypování ve Figmě", "Systém pohybového designu", "Mapování cesty uživatele", "Přístupnost (WCAG 2.1)"],
        color: "neon-yellow"
    },
    {
        icon: Server,
        title: "IT Architektura",
        description: "Robustní backend systémy zvládající miliony požadavků.",
        extendedDescription: "Neviditelná páteř vašeho podnikání. Navrhujeme schémata databází a vrstvy API, které jsou odolné, bezpečné a rychlé. Ať už jde o SQL nebo NoSQL, GraphQL nebo REST, vybíráme ten správný nástroj pro misi.",
        features: ["Optimalizace databází", "Návrh API Gateway", "Serverless funkce", "Automatizované CI/CD pipelines"],
        color: "neon-cyan"
    },
    {
        icon: Box,
        title: "Produktový design",
        description: "Od MVP po enterprise řešení, vedení celého životního cyklu.",
        extendedDescription: "Měníme náčrty na ubrousku na lídry trhu. Naše metodika produktového designu zahrnuje rychlou iteraci, validaci uživateli a rozhodování založené na datech. Pomáháme vám rychleji najít shodu produktu s trhem.",
        features: ["Strategie MVP", "Analýza trhu", "Iterativní designové sprinty", "Growth Hacking"],
        color: "neon-magenta"
    },
    {
        icon: Cpu,
        title: "Optimalizace",
        description: "Refaktoring starších systémů pro rychlost a bezpečnost.",
        extendedDescription: "Rychlost je funkce. Auditujeme existující kódové základny, abychom identifikovali úzká místa, bezpečnostní chyby a technologický dlh. Poté chirurgicky refaktorujeme nebo přepisujeme kritické komponenty, abychom obnovili špičkový výkon.",
        features: ["Refaktoring legacy kódu", "Bezpečnostní audity", "Ladění výkonu", "Redukce velikosti balíku"],
        color: "neon-yellow"
    }
];

const shadowColors = {
    "neon-cyan": "rgba(4, 255, 247, 0.5)",
    "neon-magenta": "rgba(247, 4, 255, 0.9)", // Boosted from 0.5
    "neon-yellow": "rgba(255, 247, 4, 0.9)"    // Boosted from 0.5
};

const ServiceCard = ({ service, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group relative cursor-pointer"
            onClick={onClick}
        >
            {/* 
               THE DIAGONAL TRICK: 
               1. Skew the container to create the shape.
               2. Skew the content back so it's readable.
            */}
            <motion.div
                className="relative h-full bg-bg-dark border border-white/5 p-8 overflow-hidden hover:border-white/20 hover:z-20"
                initial={{ skewX: -12, scale: 1 }}
                whileHover={{
                    skewX: 0,
                    scale: [1, 1.2, 1.35], // Aggressive Growth: Pop to 1.2, Grow to 1.35
                    zIndex: 20
                }}
                transition={{
                    skewX: { duration: 0.3, ease: "easeOut" },
                    scale: {
                        times: [0, 0.2, 2], // 0-0.2s (Fast Pop), 0.2-2s (Slow continuous growth)
                        duration: 2,
                        ease: "linear"
                    },
                    zIndex: { delay: 0 } // Instant
                }}
                style={{
                    boxShadow: `0 0 20px ${shadowColors[service.color].replace('0.9', '0.2').replace('0.5', '0.05')}`
                }}
            >
                {/* The "Color Shadow" Backdrop - creates the glow */}
                <div
                    className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        // Significantly increased spread and opacity for the "Boosted" effect on hover
                        boxShadow: `inset 0 0 60px ${shadowColors[service.color].replace('0.9', '0.4').replace('0.5', '0.15')}, 0 0 40px ${shadowColors[service.color].replace('0.9', '0.6').replace('0.5', '0.3')}`
                    }}
                ></div>

                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Content Container (Counter-skewed) */}
                <div className="transform skew-x-12 h-full flex flex-col justify-between relative z-10">

                    <div className="mb-6 flex justify-between items-start">
                        <div className={`w-12 h-12 rounded-lg bg-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'}/10 flex items-center justify-center text-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'} group-hover:scale-110 transition-transform duration-300`}>
                            <service.icon size={24} />
                        </div>
                        <span className="text-xs font-mono text-gray-600 group-hover:text-white transition-colors">0{index + 1}</span>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-neon-cyan transition-colors">{service.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                            {service.description}
                        </p>
                    </div>

                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        <span>Více info</span>
                        <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>

                </div>
            </motion.div>

            {/* Decorative Lines */}
            <div className={`absolute -bottom-2 -right-2 w-full h-full border-r border-b border-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'}/30 -skew-x-12 -z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300`}></div>

        </motion.div>
    );
};

const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`relative w-full max-w-3xl bg-bg-dark border rounded-2xl p-8 md:p-12 overflow-hidden shadow-2xl`}
                style={{
                    borderColor: shadowColors[service.color].replace('0.5', '0.3').replace('0.9', '0.5'),
                    boxShadow: `0 0 50px ${shadowColors[service.color].replace('0.5', '0.1').replace('0.9', '0.2')}`
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Glow */}
                <div className={`absolute -top-1/2 -right-1/2 w-full h-full bg-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'}/10 blur-[100px] pointer-events-none rounded-full`}></div>


                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <div className="relative z-10 flex flex-col md:flex-row gap-8">
                    {/* Icon Column */}
                    <div className="flex-shrink-0">
                        <div className={`w-20 h-20 rounded-2xl bg-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'}/10 flex items-center justify-center text-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'}`}>
                            <service.icon size={40} />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1">
                        <h3 className={`text-4xl font-black uppercase tracking-tight mb-4 text-white`}>
                            {service.title}
                        </h3>
                        <div className={`h-1 w-20 bg-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'} mb-6`}></div>

                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            {service.extendedDescription}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {service.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-400">
                                    <CheckCircle size={16} className={`text-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'}`} />
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <button className={`flex items-center gap-2 px-8 py-4 rounded-lg bg-${service.color === 'neon-cyan' ? 'neon-cyan' : service.color === 'neon-magenta' ? 'neon-magenta' : 'neon-yellow'} text-black font-bold uppercase tracking-wider hover:scale-105 transition-transform`}>
                            <Zap size={18} fill="currentColor" />
                            Inicializovat protokol
                        </button>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
};

const Services = () => {
    const sectionRef = useRef(null);
    const [selectedService, setSelectedService] = useState(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const ybg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <Section id="services" className="relative overflow-hidden py-32">

            {/* Animated Diagonal Background Strips */}
            <motion.div style={{ y: ybg }} className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-[20%] w-[1px] h-[150%] bg-white/10 -rotate-[15deg] transform origin-top"></div>
                <div className="absolute top-0 left-[40%] w-[1px] h-[150%] bg-white/10 -rotate-[15deg] transform origin-top"></div>
                <div className="absolute top-0 left-[60%] w-[1px] h-[150%] bg-white/10 -rotate-[15deg] transform origin-top"></div>
                <div className="absolute top-0 left-[80%] w-[1px] h-[150%] bg-white/10 -rotate-[15deg] transform origin-top"></div>
            </motion.div>

            <div className="container mx-auto px-6 relative z-10" ref={sectionRef}>
                <div className="mb-20">
                    <SectionTitle
                        title="Služby"
                        subtitle="Akcerelované schopnosti"
                    />
                </div>

                {/* 
                    The Grid:
                    Using a standard grid but renderingSkewed cards creates a "sawtooth" diagonal effect.
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            index={index}
                            onClick={() => setSelectedService(service)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Layer */}
            <AnimatePresence>
                {selectedService && (
                    <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
                )}
            </AnimatePresence>

        </Section>
    );
};

export default Services;
