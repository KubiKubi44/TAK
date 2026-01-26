import { motion } from 'framer-motion';

const PortfolioHero = () => {
    return (
        <div className="pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Minimal Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-cyan/5 blur-[100px] pointer-events-none opacity-30"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto"
            >
                {/* Verified Badge */}
                <div className="mb-6 inline-block">
                    <span className="px-4 py-2 rounded-full border border-neon-cyan/30 bg-black/50 backdrop-blur-md text-neon-cyan font-mono text-xs tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(4,255,247,0.2)]">
                        Ověřené projekty
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase sm:leading-tight">
                    Vybrané <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow">Práce</span>
                </h1>

                {/* Description */}
                <p className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto">
                    Kolekce digitálních zážitků navržených pro rychlost, estetiku a maximální dopad.
                </p>
            </motion.div>
        </div>
    );
};

export default PortfolioHero;
