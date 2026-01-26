import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Zap, Shield, Cpu } from "lucide-react";

const FeaturesGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0 relative z-20 py-20 container mx-auto">
            <TiltCard
                title="Blitz Speed"
                subtitle="Optimized for maximum performance with 99+ Lighthouse scores."
                icon={<Zap size={40} className="text-neon-yellow" />}
                color="rgba(255, 247, 4, 0.3)"
            />
            <TiltCard
                title="Ironclad Security"
                subtitle="Enterprise-grade protection integrated into every layer of code."
                icon={<Shield size={40} className="text-neon-cyan" />}
                color="rgba(4, 255, 247, 0.3)"
            />
            <TiltCard
                title="Modern Tech"
                subtitle="Built with the latest frameworks: React, Tailwind, and Vite."
                icon={<Cpu size={40} className="text-neon-magenta" />}
                color="rgba(247, 4, 255, 0.3)"
            />
        </div>
    );
};

const TiltCard = ({ title, subtitle, icon, color }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * 32.5;
        const mouseY = (e.clientY - rect.top) * 32.5;

        const rX = (mouseY / height - 32.5 / 2) * -1;
        const rY = mouseX / width - 32.5 / 2;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative h-64 rounded-2xl bg-bg-dark-90 border border-white/10 p-8 flex flex-col justify-center items-start shadow-xl backdrop-blur-sm group"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 rounded-xl border border-white/5 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div
                style={{ transform: "translateZ(50px)" }}
                className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10"
            >
                {icon}
            </div>

            <h3
                style={{ transform: "translateZ(50px)" }}
                className="text-2xl font-bold mb-2 text-white group-hover:text-neon-cyan transition-colors"
            >
                {title}
            </h3>

            <p
                style={{ transform: "translateZ(50px)" }}
                className="text-gray-400 text-sm leading-relaxed"
            >
                {subtitle}
            </p>

            {/* Glow Effect */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
                    filter: 'blur(40px)'
                }}
            />
        </motion.div>
    );
};

export default FeaturesGrid;
