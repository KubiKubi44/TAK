import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Code, Cpu, Globe } from 'lucide-react';

const HomeAbout = () => {
    return (
        <section className="py-32 px-6 relative z-10 overflow-hidden">
            <div className="container mx-auto max-w-6xl">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Column: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                            Jsme <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow animate-rgb-flow">
                                TAK
                            </span>
                        </h2>

                        <div className="h-1 w-24 bg-neon-cyan mb-10"></div>

                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
                            Jsme kolektiv digitálních architektů a kreativních inženýrů. Nestavíme jen weby; konstruujeme pohlcující digitální reality, které pozvednou značky nad rámec běžného hluku.
                        </p>

                        <p className="text-gray-400 mb-10 leading-relaxed">
                            Specializujeme se na vysoce výkonné webové aplikace, 3D interaktivní zážitky a futuristický branding. Naším posláním je spojit umění a inženýrství do jedinečného, silného vyjádření vaší identity.
                        </p>

                        <a href="/o-nas" className="group inline-flex items-center gap-2 text-neon-cyan font-mono uppercase tracking-widest hover:text-white transition-colors">
                            <span>Více o nás</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    {/* Right Column: Visual / Stats with 3D Interaction */}
                    <TiltCard />
                </div>
            </div>
        </section>
    );
};

const TiltCard = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
        >
            {/* Rotating 3D Ring decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transform translate-z-[-50px]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-[120%] h-[120%] border border-white/5 rounded-full border-dashed"
                ></motion.div>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[140%] h-[140%] border border-neon-cyan/10 rounded-full"
                ></motion.div>
            </div>

            {/* Decorative Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/20 to-neon-magenta/20 blur-[100px] rounded-full pointer-events-none transform translate-z-[-20px]"></div>

            {/* Floating Cards Container */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="flex flex-col gap-6 relative z-10"
            >
                {[
                    { icon: Cpu, title: "Inženýrství", desc: "Technologické sady nové generace pro rychlost a škálování.", color: "text-neon-cyan", border: "border-neon-cyan" },
                    { icon: Globe, title: "Globální dosah", desc: "Digitální řešení, která spojují s publikem po celém světě.", color: "text-neon-magenta", border: "border-neon-magenta" },
                    { icon: Code, title: "Čistý kód", desc: "Udržovatelný, škálovatelný a postavený tak, aby vydržel.", color: "text-neon-yellow", border: "border-neon-yellow" }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: 50, opacity: 0, z: 0 }}
                        whileInView={{ x: 0, opacity: 1, z: 50 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                        style={{ transformStyle: "preserve-3d", transform: `translateZ(${(3 - index) * 20}px)` }}
                        className={`relative p-6 rounded-xl bg-black/50 backdrop-blur-md border border-white/5 overflow-hidden group transition-all duration-300 hover:bg-white/5`}
                    >
                        {/* Neon Accent Line */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${item.color.replace('text-', '')} group-hover:w-2 transition-all duration-300`}></div>

                        <div className="flex items-start gap-6 pl-4 transform translate-z-20">
                            <div className={`p-3 rounded-lg bg-white/5 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-wider mb-1 group-hover:text-white transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Floating 'Signature' or extra nuance */}
            <div className="absolute -bottom-6 -right-6 font-black text-9xl text-white/5 select-none pointer-events-none z-[-1] transform translate-z-[-30px]">
                T&K
            </div>
        </motion.div>
    );
}

export default HomeAbout;
