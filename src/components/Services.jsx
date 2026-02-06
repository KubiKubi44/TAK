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

    const borderColors = {
        "neon-cyan": "border-neon-cyan",
        "neon-magenta": "border-neon-magenta",
        "neon-yellow": "border-neon-yellow"
    };

    const textColors = {
        "neon-cyan": "text-neon-cyan",
        "neon-magenta": "text-neon-magenta",
        "neon-yellow": "text-neon-yellow"
    };

    const buttonBgColors = {
        "neon-cyan": "bg-neon-cyan",
        "neon-magenta": "bg-neon-magenta",
        "neon-yellow": "bg-neon-yellow"
    };

    const gradientColors = {
        "neon-cyan": "from-neon-cyan/20 via-transparent to-transparent",
        "neon-magenta": "from-neon-magenta/20 via-transparent to-transparent",
        "neon-yellow": "from-neon-yellow/20 via-transparent to-transparent"
    };

    // Helper to get safe Tailwind classes
    const getBadgeStyle = (colorKey) => {
        switch (colorKey) {
            case "neon-cyan": return "bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan";
            case "neon-magenta": return "bg-neon-magenta/10 border-neon-magenta/20 text-neon-magenta";
            case "neon-yellow": return "bg-neon-yellow/10 border-neon-yellow/20 text-neon-yellow";
            default: return "bg-white/10 border-white/20 text-white";
        }
    };

    const getIconContainerStyle = (colorKey) => {
        switch (colorKey) {
            case "neon-cyan": return "text-neon-cyan bg-neon-cyan/5 border-neon-cyan/20";
            case "neon-magenta": return "text-neon-magenta bg-neon-magenta/5 border-neon-magenta/20";
            case "neon-yellow": return "text-neon-yellow bg-neon-yellow/5 border-neon-yellow/20";
            default: return "text-white bg-white/5 border-white/20";
        }
    }

    return createPortal(
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center p-0 sm:p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                layoutId={`service-card-${service.id}`}
                className={`
                    relative w-full max-w-5xl rounded-t-[2rem] sm:rounded-[2rem]
                    bg-[#0a0a0a]/90 backdrop-blur-2xl border ${borderColors[service.color]} border-opacity-50
                    flex flex-col md:flex-row shadow-2xl 
                    h-[85vh] max-h-[85vh] overflow-hidden
                `}
            >
                {/* Decorative Background Effects */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${gradientColors[service.color]} opacity-30 pointer-events-none`} />
                <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none brightness-100 contrast-150"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/40 md:bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/10 shadow-lg"
                >
                    <X size={24} />
                </button>

                {/* SCROLLABLE WRAPPER (Unified on Mobile, Left-side on Desktop) */}
                <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">

                    {/* LEFT: Visual & Title (FIXED on Desktop) */}
                    <div className="relative w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-white/5 shrink-0 overflow-y-auto md:overflow-hidden no-scrollbar">
                        <div>
                            {/* Mobile Compact Header Header */}
                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                                    <span>{t('services.modal.id', { defaultValue: 'ID:' })} {service.id}</span>
                                </div>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle(service.color)}`}>
                                    <Activity size={12} />
                                    <span>{t('services.modal.systemOnline', { defaultValue: 'System Online' })}</span>
                                </div>
                            </div>

                            <div className="mb-2 md:mb-8 flex md:block items-center gap-4">
                                <div className={`
                                    w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-0 md:mb-6
                                    bg-gradient-to-br from-white/10 to-transparent border border-white/10
                                    ${getIconContainerStyle(service.color)}
                                    shrink-0
                                `}>
                                    <service.icon size={28} className="md:w-10 md:h-10" />
                                </div>
                                <h2 className="text-2xl md:text-5xl font-black uppercase text-white leading-[0.9] tracking-tighter shadow-black drop-shadow-lg">
                                    {service.title}
                                </h2>
                            </div>
                        </div>

                        {/* Stylized "Code" Decor (Desktop Only) */}
                        <div className="hidden md:block font-mono text-[10px] text-gray-600 space-y-1 opacity-50">
                            <p>{'>'} {t('services.modal.initiatingProtocol', { defaultValue: 'INITIATING PROTOCOL...' })}</p>
                            <p>{'>'} {t('services.modal.verifyingDependencies', { defaultValue: 'VERIFYING DEPENDENCIES...' })}</p>
                            <p>{'>'} {t('services.modal.moduleLoaded', { defaultValue: 'MODULE LOADED SUCCESSFULLY.' })}</p>
                        </div>
                    </div>

                    {/* RIGHT: Content & Features (SCROLLABLE on Desktop) */}
                    <div className="w-full md:w-3/5 p-6 md:p-10 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
                        <div className="mb-2">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Terminal size={14} />
                                {t('services.modal.overview', { defaultValue: 'Overview' })}
                            </h3>
                            <p className="text-base md:text-xl text-gray-200 leading-relaxed font-light">
                                {service.extDesc || service.description}
                            </p>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent my-6 md:my-8" />

                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Cpu size={14} />
                                {t('services.modal.modulesFeatures', { defaultValue: 'Modules & Features' })}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                {service.features.map((feature, i) => (
                                    <div key={i} className="group flex items-start gap-3 p-3 rounded-lg bg-white/5 md:bg-transparent md:hover:bg-white/5 transition-colors">
                                        <div className={`mt-0.5 w-1.5 h-1.5 rounded-full ${buttonBgColors[service.color]} shadow-[0_0_10px_currentColor]`} />
                                        <span className="text-sm font-medium text-gray-300 md:group-hover:text-white transition-colors">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Spacer for mobile to avoid bottom navigation/safe area overlap */}
                        <div className="h-20 md:h-0" />
                    </div>
                </div>

                {/* STICKY BOTTOM ACTION BAR (Mobile Only) - Desktop has it inline */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent md:hidden pointer-events-none">
                    <button
                        onClick={handleStartProject}
                        className={`
                        pointer-events-auto w-full py-4 px-6 rounded-xl flex items-center justify-between
                        font-bold uppercase tracking-widest text-black shadow-lg
                        active:scale-[0.98] transition-all duration-300
                        ${buttonBgColors[service.color]}
                    `}>
                        <span className="flex items-center gap-3">
                            <Zap size={20} fill="currentColor" />
                            {t('contact.startProject', { defaultValue: 'Zahájit spolupráci' })}
                        </span>
                        <ArrowRight size={20} />
                    </button>
                </div>

                {/* DESKTOP INLINE ACTION (Hidden on Mobile) */}
                <div className="hidden md:block absolute bottom-12 right-12 left-[40%] pl-12 pointer-events-none">
                    <button
                        onClick={handleStartProject}
                        className={`
                        pointer-events-auto w-full py-4 px-6 rounded-xl flex items-center justify-between
                        font-bold uppercase tracking-widest text-black shadow-lg
                        hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                        ${buttonBgColors[service.color]}
                    `}>
                        <span className="flex items-center gap-3">
                            <Zap size={20} fill="currentColor" />
                            {t('contact.startProject', { defaultValue: 'Zahájit spolupráci' })}
                        </span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
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
                        {service.features.slice(0, 3).map((feature, i) => (
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
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Services;
