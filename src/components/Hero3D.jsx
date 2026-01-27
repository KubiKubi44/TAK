import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero3D = () => {
    const containerRef = useRef(null);
    const { t } = useTranslation();

    // Scroll Animation - "Fly Away"
    const { scrollY } = useScroll();
    const flyAwayY = useTransform(scrollY, [0, 600], [0, -800]); // Moves up faster than scroll
    const flyAwayScale = useTransform(scrollY, [0, 600], [1, 0.5]); // Shrinks slightly
    const flyAwayOpacity = useTransform(scrollY, [0, 400], [1, 0]); // Fades out
    const flyAwayRotate = useTransform(scrollY, [0, 600], [0, 45]); // Slight rotation on exit

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the rotation (Combined with scroll rotation)
    const baseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { damping: 15, stiffness: 150 });
    const baseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { damping: 15, stiffness: 150 });

    // Combine mouse rotation with scroll rotation
    const rotateX = useMotionTemplate`calc(${baseRotateX}deg - ${flyAwayRotate}deg)`;
    const rotateY = baseRotateY;

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();

        // Normalize mouse coordinates to -0.5 to 0.5
        const x = (e.clientX - left - width / 2) / width;
        const y = (e.clientY - top - height / 2) / height;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // The text to render
    const TEXT = "T&K";
    // Drastically reduce layers on mobile to save GPU
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const LAYERS = isMobile ? 15 : 35; // Restored 15 layers for mobile to get 3D effect back
    const DEPTH_STEP = 3;

    return (
        <div
            ref={containerRef}
            className="relative min-h-[100dvh] w-full flex items-center justify-center touch-pan-y overflow-hidden"
            style={{ perspective: "600px", perspectiveOrigin: "center center" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    y: flyAwayY,
                    scale: flyAwayScale,
                    opacity: flyAwayOpacity,
                    transformStyle: "preserve-3d",
                    fontFamily: "'Rajdhani', sans-serif", // Clean tech font
                    letterSpacing: "-0.1em" // Connects the letters
                }}
                className="relative z-10 font-bold text-[25vw] leading-none select-none cursor-default text-center will-change-transform"
            >
                {/* BASE TEXT - Forces layout size & Centering pivot */}
                <span className="relative z-0 text-transparent opacity-0 pointer-events-none block transform scale-x-115">{TEXT}</span>

                {/* 3D LAYERS - Overlay exactly on top of the base text */}
                {/* 3D LAYERS - Overlay exactly on top of the base text */}
                {/* 3D LAYERS - Overlay exactly on top of the base text */}
                <div className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-none">
                    {/* RENDER FOR ALL DEVICES - Just adjust layer count via constant */}
                    {[...Array(LAYERS)].map((_, i) => (
                        <span
                            key={i}
                            className="absolute inset-0 flex items-center justify-center w-full h-full text-center"
                            style={{
                                transform: `translateZ(-${i * DEPTH_STEP}px) scaleX(1.15)`,
                            }}
                        >
                            {i === 0 ? (
                                <span
                                    className="text-transparent bg-clip-text animate-rgb-flow drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                    style={{
                                        backgroundImage: `
                                            linear-gradient(to bottom, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px, transparent 4px),
                                            linear-gradient(to right, #04FFF7, #F704FF, #FFF704)
                                        `,
                                        backgroundSize: '100% 4px, 200% 200%'
                                    }}
                                >
                                    {TEXT}
                                </span>
                            ) : (
                                <span
                                    className="text-black"
                                    style={{
                                        color: '#032022',
                                        WebkitTextStroke: '1px rgba(4, 255, 247, 0.4)',
                                        paintOrder: 'stroke fill',
                                        textShadow: '0 0 2px rgba(4, 255, 247, 0.3)'
                                    }}
                                >
                                    {TEXT}
                                </span>
                            )}
                        </span>
                    ))}
                </div>

            </motion.div >

            {/* Intro Text */}
            < motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-32 left-0 w-full text-center z-20 pointer-events-none"
            >
                <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-neon-cyan/30 bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(4,255,247,0.1)]">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_#04FFF7]"></span>
                    <span className="text-sm font-mono font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow">
                        {t('hero.systemOnline')}
                    </span>
                </div>
            </motion.div >

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 text-white z-20">
                <span className="text-xs uppercase tracking-[0.3em] font-bold">Scroll</span>
                <ArrowDown size={16} className="animate-bounce" />
            </div>

        </div >
    );
};

export default Hero3D;
