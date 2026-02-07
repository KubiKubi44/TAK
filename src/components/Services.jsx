import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { Globe, Layers, Bot, Share2, TrendingUp, Camera, Film, ArrowRight, Activity, Zap, Terminal, Plus, Cpu, Code2, Wifi, X, CheckCircle } from 'lucide-react';
import Section from './Section';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

const ServiceModal = ({ service, onClose }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Lock body scroll on mount
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleStartProject = () => {
        onClose();
        navigate('/kontakt');
    };

    const colors = {
        "neon-cyan": {
            border: "border-neon-cyan/50",
            glow: "shadow-[0_0_30px_-5px_rgba(4,255,247,0.3)]",
            text: "text-neon-cyan",
            bg: "bg-neon-cyan",
            gradient: "from-neon-cyan"
        },
        "neon-magenta": {
            border: "border-neon-magenta/50",
            glow: "shadow-[0_0_30px_-5px_rgba(247,4,255,0.3)]",
            text: "text-neon-magenta",
            bg: "bg-neon-magenta",
            gradient: "from-neon-magenta"
        },
        "neon-yellow": {
            border: "border-neon-yellow/50",
            glow: "shadow-[0_0_30px_-5px_rgba(255,247,4,0.3)]",
            text: "text-neon-yellow",
            bg: "bg-neon-yellow",
            gradient: "from-neon-yellow"
        }
    };

    const theme = colors[service.color];

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className={`
                    relative w-full max-w-5xl rounded-xl md:rounded-[2rem] overflow-hidden
                    bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10
                    shadow-2xl flex flex-col max-h-[90vh]
                `}
            >
                {/* Decorative Glow */}
                <div className={`absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-br ${theme.gradient} to-transparent opacity-20 blur-[100px] pointer-events-none`} />
                <div className={`absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr ${theme.gradient} to-transparent opacity-10 blur-[100px] pointer-events-none`} />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />


                {/* HEADER: Title & Close Button */}
                <div className="relative z-50 flex items-center justify-between p-4 md:p-10 border-b border-white/10 bg-white/5 backdrop-blur-md">
                    <div className="w-full pr-16 md:pr-24">
                        <div className="flex items-center gap-3 mb-2 md:mb-4">
                            <div className={`w-2 h-2 rounded-full ${theme.bg} shadow-[0_0_10px_currentColor]`} />
                            <span className="font-mono text-[10px] md:text-xs tracking-widest text-gray-400 opacity-70">ID: {service.id}</span>
                        </div>
                        <h2
                            className="text-2xl md:text-5xl font-black uppercase text-white leading-none tracking-tighter break-words"
                            style={{ fontFamily: 'var(--font-syne)' }}
                        >
                            {service.title}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-white/5 hover:border-white/20 group z-50"
                    >
                        <X size={24} className="md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>


                {/* BODY: Full Width Content */}
                <div className="flex flex-col flex-grow overflow-hidden relative z-10">

                    {/* Content */}
                    <div className="bg-black/20 flex flex-col w-full h-full overflow-hidden">
                        <div className="p-5 md:p-12 overflow-y-auto custom-scrollbar flex-grow">
                            <h3 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-3">
                                <span className={theme.text}>//</span> Mission Brief
                            </h3>

                            <p className="text-sm md:text-lg text-gray-300 leading-relaxed font-light mb-8 md:mb-12">
                                {service.extDesc || service.description}
                            </p>

                            <h3 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-3">
                                <span className={theme.text}>//</span> Modules
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                {Array.isArray(service.features) && service.features.map((feature, i) => (
                                    <div key={i} className="group flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                        <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full ${theme.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                        <span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-4 md:p-8 border-t border-white/5 bg-white/[0.02]">
                            <button
                                onClick={handleStartProject}
                                className={`
                                    group w-full py-3 md:py-4 px-6 rounded-xl flex items-center justify-center gap-3
                                    font-bold uppercase tracking-widest text-xs md:text-sm text-black
                                    ${theme.bg} hover:brightness-110 active:scale-[0.98] transition-all
                                    shadow-[0_0_20px_-5px_currentColor] opacity-90 hover:opacity-100
                                `}
                            >
                                <span>Initialize Project</span>
                                <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body
    );
};

const SpotlightCard = ({ service, index, onClick }) => {
    const { t } = useTranslation();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const bgColors = {
        "neon-cyan": "bg-neon-cyan",
        "neon-magenta": "bg-neon-magenta",
        "neon-yellow": "bg-neon-yellow"
    };

    // Static border colors for mobile
    const borderColors = {
        "neon-cyan": "border-neon-cyan/30",
        "neon-magenta": "border-neon-magenta/30",
        "neon-yellow": "border-neon-yellow/30"
    };

    const colors = {
        "neon-cyan": "text-neon-cyan border-neon-cyan/50",
        "neon-magenta": "text-neon-magenta border-neon-magenta/50",
        "neon-yellow": "text-neon-yellow border-neon-yellow/50"
    };

    return (
        <motion.div
            layoutId={`service-card-${service.id}`}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            className={`
                group relative h-full rounded-2xl md:rounded-3xl border border-white/10 
                bg-bg-dark overflow-hidden transition-colors duration-500 
                hover:border-white/20 cursor-pointer
                ${borderColors[service.color]} md:border-white/10
            `}
        >
            {/* Spotlight Effect (Desktop Only) */}
            <motion.div
                className="hidden md:block pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(255, 255, 255, 0.1),
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* Neon Glow on Hover (Desktop) */}
            <motion.div
                className={`hidden md:block pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-20 ${bgColors[service.color]}`}
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            currentColor,
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* Mobile Subtle Glow */}
            <div className={`md:hidden absolute inset-0 opacity-5 ${bgColors[service.color]}`} />

            <div className="relative h-full p-6 md:p-8 flex flex-col">
                <div className="mb-6 md:mb-8 flex items-start justify-between">
                    <div className={`p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 transition-colors duration-300 ${colors[service.color]}`}>
                        <service.icon size={28} className="md:w-8 md:h-8" />
                    </div>
                    <span className="font-mono text-sm font-bold text-gray-600 group-hover:text-white transition-colors">
                        0{index + 1}
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-4 md:group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                </h3>

                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6 md:mb-8 flex-grow md:group-hover:text-gray-300 transition-colors">
                    {service.description}
                </p>

                <div className="border-t border-white/10 pt-6 mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {Array.isArray(service.features) && service.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5 md:group-hover:border-white/10 md:group-hover:text-gray-400 transition-colors">
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-300 md:text-gray-500 md:group-hover:text-white transition-colors">
                        <span>{t('services.modal.detail', { defaultValue: 'Detail' })}</span>
                        <ArrowRight size={16} className="md:group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Services = () => {
    const { t } = useTranslation();
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 'WEB_PROTOCOL',
            icon: Globe,
            title: t('services.cards.webDev.title'),
            description: t('services.cards.webDev.desc'),
            features: t('services.cards.webDev.features', { returnObjects: true }),
            color: "neon-cyan"
        },
        {
            id: 'APP_SYSTEM',
            icon: Layers,
            title: t('services.cards.appDev.title'),
            description: t('services.cards.appDev.desc'),
            features: t('services.cards.appDev.features', { returnObjects: true }),
            color: "neon-magenta"
        },
        {
            id: 'AI_CORE',
            icon: Bot,
            title: t('services.cards.aiImpl.title'),
            description: t('services.cards.aiImpl.desc'),
            features: t('services.cards.aiImpl.features', { returnObjects: true }),
            color: "neon-yellow"
        },
        {
            id: 'SOC_NET',
            icon: Share2,
            title: t('services.cards.socialMedia.title'),
            description: t('services.cards.socialMedia.desc'),
            features: t('services.cards.socialMedia.features', { returnObjects: true }),
            color: "neon-cyan"
        },
        {
            id: 'MKT_STRAT',
            icon: TrendingUp,
            title: t('services.cards.marketing.title'),
            description: t('services.cards.marketing.desc'),
            features: t('services.cards.marketing.features', { returnObjects: true }),
            color: "neon-magenta"
        },
        {
            id: 'DRONE_OPS',
            icon: Camera,
            title: t('services.cards.droneVideo.title'),
            description: t('services.cards.droneVideo.desc'),
            features: t('services.cards.droneVideo.features', { returnObjects: true }),
            color: "neon-yellow"
        }
        /* Removed VID_PROD (7th service) */
    ];

    return (
        <Section id="services" className="relative py-24 z-10">
            {/* Background Grid - Removed as per request for 'original' background */}

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="mb-16 flex flex-col items-center justify-center gap-4 text-center">
                    <SectionTitle
                        title={t('services.title')}
                        subtitle={t('services.subtitle')}
                        align="center"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <SpotlightCard
                            key={service.id}
                            service={service}
                            index={index}
                            onClick={() => setSelectedService({ ...service, index })}
                        />
                    ))}
                </div>
            </div>

            {/* DETAIL MODAL */}
            <AnimatePresence>
                {selectedService && (
                    <ServiceModal
                        key="service-modal"
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Services;
