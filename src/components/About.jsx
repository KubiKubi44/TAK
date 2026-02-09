import { motion } from 'framer-motion';
import {
    Layout, Palette, Code, Smartphone, Zap,
    Database, LifeBuoy, User, MessageSquare,
    Award, Cpu, TrendingUp, Search, Target
} from 'lucide-react';
import Section from './Section';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    const benefits = [
        { icon: User, title: t('about.benefits.individual'), desc: t('about.benefits.individualDesc') },
        { icon: MessageSquare, title: t('about.benefits.transparent'), desc: t('about.benefits.transparentDesc') },
        { icon: Award, title: t('about.benefits.quality'), desc: t('about.benefits.qualityDesc') },
        { icon: Cpu, title: t('about.benefits.tech'), desc: t('about.benefits.techDesc') },
        { icon: TrendingUp, title: t('about.benefits.scalable'), desc: t('about.benefits.scalableDesc') },
        { icon: Target, title: t('about.benefits.results'), desc: t('about.benefits.resultsDesc') }
    ];

    return (
        <Section id="about" className="border-t border-white/5 pb-20">
            <div className="container mx-auto px-6">

                {/* 1. COMPACT HERO SECTION (Text Split) */}
                <div className="mb-24">
                    <SectionTitle
                        title={t('about.title')}
                        subtitle={t('about.subtitle')}
                        align="left"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">
                        <div className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                            <p className="mb-6">
                                {t('about.description1')}
                            </p>
                            <p className="text-neon-cyan">
                                {t('about.description2')}
                            </p>
                        </div>

                        <div className="space-y-6 text-gray-400 leading-relaxed text-base pt-2">
                            <p>
                                {t('about.description3')}
                            </p>
                            <p>
                                {t('about.description4')}
                            </p>
                            <ul className="grid grid-cols-2 gap-4 pt-4 text-white font-mono text-sm uppercase tracking-wide">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></div> {t('about.cleanCode')}</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-magenta rounded-full"></div> {t('about.scalability')}</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-yellow rounded-full"></div> {t('about.speed')}</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"></div> {t('about.security')}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. EXPANDED BENEFITS SECTION (Redesigned) */}
                <div>
                    <SectionTitle
                        title={t('about.whyUs')}
                        align="left"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-neon-magenta/30 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/0 via-neon-magenta/0 to-neon-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-neon-magenta mb-6 group-hover:scale-110 group-hover:bg-neon-magenta group-hover:text-black transition-all duration-300">
                                        <b.icon size={24} />
                                    </div>

                                    <h4 className="text-xl font-bold text-white mb-4 group-hover:text-neon-magenta transition-colors">
                                        {b.title}
                                    </h4>

                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {b.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </Section>
    );
};

export default About;
