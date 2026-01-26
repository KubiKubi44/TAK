import { useMemo } from 'react';
import { motion } from 'framer-motion';

const GlobalBackground = ({ className }) => {
    // Particle System (Preserved from Hero3D)
    const particles = useMemo(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const count = isMobile ? 10 : 50; // Drastically reduce particles on mobile
        return [...Array(count)].map((_, i) => ({
            id: i,
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
        }));
    }, []);

    return (
        <div className={`${className || 'fixed'} inset-0 z-0 bg-[#020205] pointer-events-none overflow-hidden`}>
            {/* Horizon Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-neon-cyan/5 to-transparent opacity-50"></div>

            {/* Radial gradient mask for the grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020205_90%)] z-10 pointer-events-none"></div>

            {/* The Grid */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300vw] h-[300vh] bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 transform perspective-[500px] rotate-x-60 scale-150 origin-bottom"></div>
            </div>

            {/* PARTICLES */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: p.x,
                            top: p.y,
                            opacity: p.opacity,
                            scale: p.scale,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [p.opacity, p.opacity * 2, p.opacity],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Ambient Spotlights */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none opacity-40"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-neon-magenta/5 rounded-full blur-[150px] pointer-events-none opacity-40"></div>
        </div>
    );
};

export default GlobalBackground;
