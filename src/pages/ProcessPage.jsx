import Process from '../components/Process';
import { motion } from 'framer-motion';

const ProcessPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20"
        >
            <Process />
        </motion.div>
    );
};

export default ProcessPage;
