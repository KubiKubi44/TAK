import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import Section from './Section';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <Section id="contact" className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-magenta/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle
                    title={t('contact.title')}
                    subtitle={t('contact.subtitle')}
                />

                <div className="flex justify-center text-white">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl w-full"
                    >
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-bold mb-6">{t('contact.ctaTitle')} <span className="text-neon-yellow">{t('contact.ctaTitleHighlight')}</span></h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {t('contact.ctaDesc')}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(4,255,247,0.1)] transition-all duration-300 text-center">
                                <div className="p-4 bg-white/5 rounded-full text-neon-cyan mb-2">
                                    <Mail size={32} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-400 text-sm uppercase tracking-wider mb-2">{t('contact.writeUs')}</h4>
                                    <a href="mailto:info@itakk.cz" className="text-2xl font-bold text-white hover:text-neon-cyan transition-colors">info@itakk.cz</a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-magenta/50 hover:shadow-[0_0_15px_rgba(255,0,255,0.1)] transition-all duration-300 text-center">
                                <div className="p-4 bg-white/5 rounded-full text-neon-magenta mb-2">
                                    <Phone size={32} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-400 text-sm uppercase tracking-wider mb-2">{t('contact.callUs')}</h4>
                                    <div className="flex flex-col gap-1 items-center">
                                        <a href="tel:+420777040413" className="text-xl font-bold text-white hover:text-neon-magenta transition-colors">+420 777 040 413</a>
                                        <a href="tel:+420702286065" className="text-xl font-bold text-white hover:text-neon-magenta transition-colors">+420 702 286 065</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
