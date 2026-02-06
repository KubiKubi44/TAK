import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Instagram, Linkedin, Mail } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // Custom TikTok Icon
  const TikTokIcon = ({ size = 20, className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  const navLinks = [
    { name: t('navbar.home'), href: '/' },
    { name: t('navbar.about'), href: '/o-nas' },
    { name: t('navbar.services'), href: '/sluzby' },
    { name: t('navbar.portfolio'), href: '/portfolio' },
    // { name: 'Proces', href: '/proces' },
    { name: t('navbar.contact'), href: '/kontakt' },
  ];

  return (
    <>
      {/* === CORNER ELEMENTS (Always Visible) === */}

      {/* Shared Gradient Definition for SVGs */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#04FFF7">
              <animate attributeName="stop-color" values="#04FFF7; #F704FF; #FFF704; #04FFF7" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#F704FF">
              <animate attributeName="stop-color" values="#F704FF; #FFF704; #04FFF7; #F704FF" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#FFF704">
              <animate attributeName="stop-color" values="#FFF704; #04FFF7; #F704FF; #FFF704" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      {/* Top Left: Logo */}
      <div className="fixed top-0 left-0 p-8 z-50">
        <Link to="/" className="block group">
          <div className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow group-hover:opacity-80 transition-opacity">
            TAK
          </div>
        </Link>
      </div>

      {/* Top Right: Menu Trigger & Language Switcher */}
      <div className={`fixed top-0 right-0 p-8 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} flex items-center gap-8`}>
        <LanguageSwitcher />

        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 text-white mix-blend-difference"
        >
          <span className="hidden md:block font-bold tracking-widest uppercase text-sm group-hover:tracking-[0.2em] transition-all">
            {t('navbar.menu')}
          </span>
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* RGB Border Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow opacity-70 group-hover:opacity-100 transition-opacity"></div>
            {/* Inner Black Circle */}
            <div className="absolute inset-[2px] rounded-full bg-black flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Menu size={20} className="text-white relative z-10" />
            </div>
          </div>
        </button>
      </div>

      {/* Top Right: CLOSE BUTTON (Top Level) */}
      <div className={`fixed top-0 right-0 p-8 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={() => setIsOpen(false)}
          className="w-12 h-12 rounded-full border border-neon-cyan/50 flex items-center justify-center bg-black hover:bg-neon-cyan hover:text-black transition-colors shadow-[0_0_15px_rgba(4,255,247,0.2)]"
        >
          <X size={20} className="text-neon-cyan hover:text-black" />
        </button>
      </div>

      {/* Bottom Right: CTA */}
      <div className="fixed bottom-0 right-0 p-8 z-50 hidden md:block">
        <Link to="/kontakt" className="group flex items-center gap-4">
          <span className="font-bold tracking-widest uppercase text-sm text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow">
            {t('navbar.startProject')}
          </span>
          <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
            {/* RGB Border Ring - Always Visible but subtle, bolder on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow opacity-70 group-hover:opacity-100 transition-opacity blur-[2px]"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow opacity-70 group-hover:opacity-100 transition-opacity"></div>

            <div className="absolute inset-[2px] rounded-full bg-black flex items-center justify-center">
              <ArrowRight size={20} className="text-white group-hover:text-neon-cyan relative z-10 -rotate-45 group-hover:rotate-0 transition-all" />
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom Left: Socials */}
      <div className="fixed bottom-0 left-0 p-8 z-50 hidden md:flex items-center gap-6">
        <a href="https://www.instagram.com/itakk.cz/" target="_blank" rel="noopener noreferrer" className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all drop-shadow-[0_0_8px_rgba(4,255,247,0.6)] group">
          <Instagram size={20} className="stroke-[url(#neon-gradient)] group-hover:stroke-white transition-colors" />
        </a>
        <a href="#" className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all drop-shadow-[0_0_8px_rgba(4,255,247,0.6)] group">
          <TikTokIcon size={20} className="stroke-[url(#neon-gradient)] group-hover:stroke-white transition-colors" />
        </a>
        <a href="#" className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all drop-shadow-[0_0_8px_rgba(4,255,247,0.6)] group">
          <Linkedin size={20} className="stroke-[url(#neon-gradient)] group-hover:stroke-white transition-colors" />
        </a>
      </div>

      {/* === MEGA OVERLAY === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[90] bg-black text-white flex flex-col md:flex-row"
          >
            {/* Left Side: Info (Desktop) */}
            <div className="hidden md:flex flex-col justify-between w-1/3 p-20 border-r border-white/10 bg-white/[0.02]">
              <div className="space-y-12">
                <div>
                  <h3 className="text-gray-500 font-mono mb-4 text-sm tracking-widest">{t('navbar.latestProject')}</h3>
                  <Link
                    to="/portfolio?project=4"
                    onClick={() => setIsOpen(false)}
                    className="group block relative overflow-hidden rounded-lg aspect-video w-full border border-white/10 hover:border-neon-cyan transition-colors"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    {/* Placeholder Image or specific project image */}
                    <img src="/Jaz/screencapture-localhost-5174-2026-01-20-14_07_31.webp" alt="Latest Project" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 z-20">
                      <h4 className="text-white font-bold text-lg group-hover:text-neon-cyan transition-colors">Chalupa JAZ</h4>
                      <p className="text-xs text-gray-400 font-mono">WEB DESIGN / DEV</p>
                    </div>
                  </Link>
                </div>

                <div>
                  <h3 className="text-gray-500 font-mono mb-4 text-sm tracking-widest">{t('navbar.socials')}</h3>
                  <div className="flex flex-col gap-2">
                    <a href="https://www.instagram.com/itakk.cz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
                      <Instagram size={18} className="group-hover:stroke-neon-cyan transition-colors" />
                      <span className="text-sm font-mono group-hover:tracking-wider transition-all">{t('navbar.instagram')}</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
                      <TikTokIcon size={18} className="group-hover:stroke-neon-magenta transition-colors" />
                      <span className="text-sm font-mono group-hover:tracking-wider transition-all">{t('navbar.tiktok')}</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
                      <Linkedin size={18} className="group-hover:stroke-neon-yellow transition-colors" />
                      <span className="text-sm font-mono group-hover:tracking-wider transition-all">{t('navbar.linkedin')}</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-500 font-mono mb-4 text-sm tracking-widest">{t('navbar.email')}</h3>
                  <a href="mailto:info@itakk.cz" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow">
                    info@itakk.cz
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Navigation */}
            <div className="flex-1 flex flex-col justify-center p-10 md:p-20 relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>

              <nav className="flex flex-col gap-2 relative z-10">
                {navLinks.map((link, i) => (
                  <div key={link.href} className="overflow-hidden py-4">
                    <motion.div
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      exit={{ y: 100 }}
                      transition={{ delay: 0.1 + (i * 0.05), duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                    >
                      <NavLink
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => `
                                                    block text-6xl md:text-8xl font-black tracking-tighter uppercase transition-all duration-300
                                                    hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-neon-cyan hover:via-neon-magenta hover:to-neon-yellow hover:animate-rgb-flow hover:ml-10
                                                    ${isActive ? 'text-neon-cyan' : 'text-white'}
                                                `}
                      >
                        {link.name}
                      </NavLink>
                    </motion.div>
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
