import { useRef, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from './Section';
import SectionTitle from './SectionTitle';
import { useTranslation } from 'react-i18next';

// User Assets
const asMinarLogo = "/logos/Logo design AS MINAR.webp";
const bertickaLogo = "/logos/berticka.png";
const partner3Logo = "/logos/partner3.png";
const chalupaJazLogo = "/logos/chalupa-jaz.png";
const stejskalStavLogo = "/logos/steskalstavlogo.webp";

// Adjusted coordinates to avoid center title collision and utilize full 3D volume
const partners = [
    // --- CLUSTER 1: FRONT & CENTER (High Visibility) ---
    { name: "AS MINAR", src: asMinarLogo, color: "#04FFF7", x: -25, y: -25, z: 80, scale: 1.4 },
    { name: "S BERTIČKOU NA RYBY", src: bertickaLogo, color: "#FFF704", x: 25, y: -30, z: 60, scale: 1.3 },
    { name: "CHALUPA JAZ", src: chalupaJazLogo, color: "#FFF", x: -30, y: 20, z: 100, scale: 1.5 },
    { name: "HYDROIZOLACE MINAR", src: partner3Logo, color: "#E0E0E0", x: 30, y: 15, z: 50, scale: 1.2 },
    { name: "STEJSKALSTAV", src: stejskalStavLogo, color: "#EAB308", x: 0, y: 35, z: 90, scale: 1.5 },

    // --- CLUSTER 2: MID FIELD (Balanced Context) ---
    { name: "AS MINAR", src: asMinarLogo, color: "#04FFF7", x: 40, y: -10, z: -20, scale: 1.1, hiddenOnMobile: true },
    { name: "S BERTIČKOU NA RYBY", src: bertickaLogo, color: "#FFF704", x: -40, y: -5, z: 0, scale: 1.2, hiddenOnMobile: true },
    { name: "CHALUPA JAZ", src: chalupaJazLogo, color: "#FFF", x: 15, y: 40, z: -40, scale: 1.0, hiddenOnMobile: true },
    { name: "HYDROIZOLACE MINAR", src: partner3Logo, color: "#E0E0E0", x: -15, y: 35, z: -10, scale: 1.1, hiddenOnMobile: true },
    { name: "STEJSKALSTAV", src: stejskalStavLogo, color: "#EAB308", x: -25, y: -35, z: -30, scale: 1.1, hiddenOnMobile: true },

    // --- CLUSTER 3: BACKGROUND DEPTH (Atmosphere) ---
    { name: "AS MINAR", src: asMinarLogo, color: "#04FFF7", x: -10, y: -45, z: -100, scale: 0.9, hiddenOnMobile: true },
    { name: "S BERTIČKOU NA RYBY", src: bertickaLogo, color: "#FFF704", x: 10, y: -50, z: -120, scale: 0.9, hiddenOnMobile: true },
    { name: "CHALUPA JAZ", src: chalupaJazLogo, color: "#FFF", x: 45, y: 45, z: -80, scale: 0.8, hiddenOnMobile: true },
    { name: "HYDROIZOLACE MINAR", src: partner3Logo, color: "#E0E0E0", x: -45, y: 10, z: -150, scale: 0.8, hiddenOnMobile: true },
    { name: "STEJSKALSTAV", src: stejskalStavLogo, color: "#EAB308", x: -35, y: -15, z: -90, scale: 0.9, hiddenOnMobile: true }
];

const FloatingLogo = ({ partner, mouseX, mouseY }) => {
    // Parallax Factor based on Z-depth (closer items move faster)
    const depthFactor = (partner.z + 500) / 500;

    // Inverse movement for parallax feel - Increased sensitivity
    const x = useTransform(mouseX, [-1, 1], [-40 * depthFactor, 40 * depthFactor]);
    const y = useTransform(mouseY, [-1, 1], [-40 * depthFactor, 40 * depthFactor]);

    // Depth of Field Calculation - Reduced blur intensity
    const blurAmount = partner.z < 0 ? Math.abs(partner.z) / 80 : 0;
    // Increased opacity overall for visibility
    const opacityAmount = partner.z < 0 ? 0.7 + (1 - Math.abs(partner.z) / 300) * 0.3 : 1;

    // Memoize random values to keep them pure during render
    const randomDelay = useMemo(() => Math.random() * 0.5, []);
    const randomDuration = useMemo(() => 3 + Math.random() * 2, []);

    return (
        <motion.div
            style={{
                x,
                y,
                left: `${50 + partner.x}%`,
                top: `${50 + partner.y}%`,
                z: partner.z,
                filter: `blur(${blurAmount}px)`,
                opacity: opacityAmount,
                position: 'absolute'
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: opacityAmount, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: randomDelay }}
            className={`flex-col items-center gap-3 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer ${partner.hiddenOnMobile ? 'hidden md:flex' : 'flex'}`}
        >
            {/* Float Animation - Increased Amplitude */}
            <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: randomDuration, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
            >
                {/* Removed Box/Background */}
                <div className="relative group-hover:scale-125 transition-transform duration-500">
                    <img
                        src={partner.src}
                        alt={partner.name}
                        // Removed grayscale, added gentle drop shadow for pop
                        className="w-24 md:w-32 h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300"
                    />
                </div>
            </motion.div>

            {/* Optional Label - only visible on hover now to be cleaner */}
            <span className="opacity-0 group-hover:opacity-100 font-mono text-xs font-bold tracking-widest text-white/80 bg-black/60 px-2 py-1 rounded backdrop-blur-md transition-all duration-300">
                {partner.name}
            </span>
        </motion.div>
    );
};

const TrustedLogos = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const MouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const MouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 20 });

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        // Normalize coordinates to -1 to 1
        mouseX.set(x * 2);
        mouseY.set(y * 2);
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
          .perspective-1000 { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <Section
            id="trusted-partners"
            className="relative overflow-hidden h-[500px] md:h-[800px] flex items-center justify-center p-0"
        >
            {/* Deep Space Background - Removed for seamless flow */}

            {/* Atmospheric Fog */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 blur-[150px] rounded-full pointer-events-none opacity-30"></div>

            {/* 3D Field Container - DESKTOP ONLY */}
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                className="absolute inset-0 w-full h-full perspective-1000 overflow-hidden z-10 hidden md:block"
            >
                <div
                    className="absolute inset-0 preserve-3d"
                    style={{ perspective: '1000px' }}
                >
                    {partners.map((partner, i) => (
                        <FloatingLogo
                            key={i}
                            partner={partner}
                            mouseX={MouseXSpring}
                            mouseY={MouseYSpring}
                        />
                    ))}
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-20 w-full h-full container mx-auto px-6 flex flex-col justify-center pointer-events-none">
                <div className="text-center">
                    <SectionTitle
                        title={t('trustedLogos.title')}
                        align="center"
                    />

                    {/* Mobile Infinite Marquee - INSERTED HERE */}
                    <div className="relative z-10 md:hidden w-full overflow-hidden py-12 pointer-events-auto">
                        <div className="flex w-full">
                            <motion.div
                                className="flex items-center gap-0 pr-0"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 20,
                                }}
                            >
                                {/* Render logos twice for seamless loop */}
                                {[...partners.filter(p => !p.hiddenOnMobile), ...partners.filter(p => !p.hiddenOnMobile)].map((partner, i) => (
                                    <div
                                        key={i}
                                        className="flex-shrink-0 transition-all duration-300 w-[140px] h-[80px] flex items-center justify-center mx-1"
                                    >
                                        <img
                                            src={partner.src}
                                            alt={partner.name}
                                            className="max-w-[120px] max-h-[60px] w-auto h-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-12 pointer-events-auto">
                        <Link to="/portfolio" className="group relative inline-flex items-center gap-4 px-8 py-4 bg-black/40 backdrop-blur-md border border-neon-cyan/30 rounded-full text-neon-cyan font-mono font-bold uppercase tracking-widest hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(4,255,247,0.3)] transition-all duration-300">
                            <span className="relative z-10">{t('trustedLogos.viewWork')}</span>
                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />

                            {/* Inner Glow Polish */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/5 to-neon-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>
                    </div>
                </div>
            </div>

        </Section>
    );
};

export default TrustedLogos;
