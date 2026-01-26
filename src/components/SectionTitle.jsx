import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, align = "center" }) => {
    return (
        <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-neon-cyan font-medium tracking-wider text-sm uppercase mb-2 block"
            >
                {subtitle}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-white relative inline-block"
            >
                {title}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow opacity-70"></span>
            </motion.h2>
        </div>
    );
};

export default SectionTitle;
