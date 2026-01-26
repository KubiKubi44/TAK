import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, PenTool, Code, CheckCircle, Rocket } from 'lucide-react';
import Section from './Section';
import SectionTitle from './SectionTitle';

const steps = [
    {
        icon: Search,
        title: "Analýza a strategie",
        description: "Mapujeme digitální terén. Analyzujeme vaše cíle, publikum a konkurenci, abychom definovali přesnou trajektorii k úspěchu.",
        color: "text-neon-cyan",
        borderColor: "border-neon-cyan",
        shadow: "shadow-[0_0_20px_rgba(4,255,247,0.3)]"
    },
    {
        icon: PenTool,
        title: "UI/UX Inženýrství",
        description: "Architektujeme zážitek. Wireframy se mění na high-fidelity rozhraní navržená pro maximální zapojení a konverzi.",
        color: "text-neon-magenta",
        borderColor: "border-neon-magenta",
        shadow: "shadow-[0_0_20px_rgba(247,4,255,0.3)]"
    },
    {
        icon: Code,
        title: "Agilní vývoj",
        description: "Píšeme logiku. Pomocí moderních frameworků a škálovatelné architektury stavíme robustní systémy v rychlých, iterativních sprintech.",
        color: "text-neon-yellow",
        borderColor: "border-neon-yellow",
        shadow: "shadow-[0_0_20px_rgba(255,247,4,0.3)]"
    },
    {
        icon: CheckCircle,
        title: "Důkladné testování",
        description: "Neprůstřelný kód. Automatizované a manuální testování zajišťuje výkon, bezpečnost a stabilitu na všech zařízeních.",
        color: "text-neon-cyan",
        borderColor: "border-neon-cyan",
        shadow: "shadow-[0_0_20px_rgba(4,255,247,0.3)]"
    },
    {
        icon: Rocket,
        title: "Spuštění a evoluce",
        description: "Zapínáme systém. Nasazení je jen začátek; poskytujeme průběžnou podporu, aby se váš produkt mohl vyvíjet.",
        color: "text-neon-magenta",
        borderColor: "border-neon-magenta",
        shadow: "shadow-[0_0_20px_rgba(247,4,255,0.3)]"
    }
];

const ProcessStep = ({ step, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Content Card */}
            <div className="flex-1 w-full md:w-auto">
                <motion.div
                    initial={{ x: isEven ? 50 : -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    className={`bg-bg-dark border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-white/30 transition-all duration-300 ${isEven ? 'text-left md:text-left' : 'text-left md:text-right'}`}
                >
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    <h3 className={`text-xl font-bold mb-3 ${step.color} uppercase tracking-wider`}>{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed relative z-10">{step.description}</p>
                </motion.div>
            </div>

            {/* Central Node */}
            <div className="relative z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 + (index * 0.1) }}
                    className={`w-12 h-12 rounded-full bg-black border-2 ${step.borderColor} flex items-center justify-center ${step.shadow} z-20 relative`}
                >
                    <step.icon size={20} className="text-white" />
                </motion.div>

                {/* Connector Line to Card */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[2px] ${step.borderColor} opacity-30 ${isEven ? 'right-full' : 'left-full'}`}></div>
            </div>

            {/* Spacer */}
            <div className="flex-1 hidden md:block"></div>

        </motion.div>
    );
};

const Process = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Map scroll total progress to the height of the line
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <Section id="process" className="bg-black relative py-32 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
                <div className="mb-20">
                    <SectionTitle
                        title="Proces"
                        subtitle="Systematická exekuce"
                    />
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Background Line (Dim) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block"></div>

                    {/* Active Line (Fills on Scroll) */}
                    <motion.div
                        style={{ height }}
                        className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-yellow -translate-x-1/2 hidden md:block shadow-[0_0_15px_rgba(4,255,247,0.5)] origin-top z-0"
                    ></motion.div>

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, index) => (
                            <ProcessStep key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Process;
