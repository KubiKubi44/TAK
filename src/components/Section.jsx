import { motion } from 'framer-motion';

const Section = ({ children, id, className = "" }) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`py-20 relative overflow-hidden ${className}`}
        >
            {children}
        </motion.section>
    );
};

export default Section;
