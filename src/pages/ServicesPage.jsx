import Services from '../components/Services';
import { motion } from 'framer-motion';

const ServicesPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20"
        >
            <Services />
        </motion.div>
    );
};

export default ServicesPage;
