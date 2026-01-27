import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hexagon, Cpu, Zap, Radio } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="relative pt-20 pb-10 overflow-hidden text-sm">

            <div className="container mx-auto px-6 relative z-10">

                {/* HUD Header - REMOVED */}

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

                    {/* Left Panel */}
                    <div className="text-center md:text-right space-y-6">
                        <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow font-mono text-xs uppercase tracking-widest border-b border-neon-cyan/20 pb-2 inline-block">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-3 font-mono text-gray-400">
                            <li><Link to="/" className="hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">{t('navbar.home')}</Link></li>
                            <li><Link to="/o-nas" className="hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">{t('navbar.about')}</Link></li>
                            <li><Link to="/sluzby" className="hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">{t('navbar.services')}</Link></li>
                        </ul>
                    </div>

                    {/* Center Core */}
                    <div className="relative flex justify-center py-10 md:py-0">
                        {/* Center Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                            <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow">TAK</h3>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="text-center md:text-left space-y-6">
                        <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow font-mono text-xs uppercase tracking-widest border-b border-neon-cyan/20 pb-2 inline-block">{t('footer.externalChannels')}</h4>
                        <ul className="space-y-3 font-mono text-gray-400">
                            <li><a href="#" className="hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">Instagram</a></li>
                            <li><a href="#" className="hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">TikTok</a></li>
                            <li><a href="#" className="hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">LinkedIn</a></li>
                        </ul>
                    </div>

                </div>

                {/* HUD Footer Info */}
                <div className="mt-20 flex justify-between items-end border-t border-white/10 pt-4 font-mono text-[10px] text-gray-600 uppercase">
                    <div className="flex flex-col gap-1">
                        <span>ID: 884-299-X</span>
                        <span>SECURE LAYER: ACTIVE</span>
                    </div>
                    <div>
                        &copy; 2025 TAK. {t('footer.rights')}
                    </div>
                </div>

            </div>

            {/* Decorative Corners */}
            <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-neon-cyan pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-neon-cyan pointer-events-none"></div>

        </footer>
    );
};

export default Footer;
