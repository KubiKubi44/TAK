import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Section from './Section';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // alert("Thank you for your message! (Demo)");
    };

    return (
        <Section id="contact" className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-magenta/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle
                    title={t('contact.title')}
                    subtitle={t('contact.subtitle')}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-bold mb-6">{t('contact.ctaTitle')} <span className="text-neon-yellow">{t('contact.ctaTitleHighlight')}</span></h3>
                        <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                            {t('contact.ctaDesc')}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="p-3 bg-white/5 rounded-full text-neon-cyan">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-3">{t('contact.writeUs')}</h4>
                                    <a href="mailto:info@itakk.cz" className="text-gray-300 font-bold text-lg hover:text-neon-cyan transition-colors">info@itakk.cz</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="p-3 bg-white/5 rounded-full text-neon-magenta">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-3">{t('contact.callUs')}</h4>
                                    <div className="flex flex-col gap-2">
                                        <a href="tel:+420777040413" className="text-gray-300 font-bold text-lg hover:text-neon-magenta transition-colors">+420 777 040 413</a>
                                        <a href="tel:+420702286065" className="text-gray-300 font-bold text-lg hover:text-neon-magenta transition-colors">+420 702 286 065</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">{t('contact.form.name')}</label>
                                    <input type="text" className="w-full bg-bg-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(4,255,247,0.3)] transition-all" placeholder={t('contact.form.placeholders.name')} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">{t('contact.form.email')}</label>
                                    <input type="email" className="w-full bg-bg-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(4,255,247,0.3)] transition-all" placeholder={t('contact.form.placeholders.email')} required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">{t('contact.form.subject')}</label>
                                <select className="w-full bg-bg-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(4,255,247,0.3)] transition-all">
                                    <option>{t('contact.form.subjects.general')}</option>
                                    <option>{t('contact.form.subjects.project')}</option>
                                    <option>{t('contact.form.subjects.career')}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">{t('contact.form.message')}</label>
                                <textarea rows="4" className="w-full bg-bg-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(4,255,247,0.3)] transition-all" placeholder={t('contact.form.placeholders.message')} required></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-neon-yellow text-black font-bold rounded-lg hover:bg-white hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                                {t('contact.form.submit')} <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
