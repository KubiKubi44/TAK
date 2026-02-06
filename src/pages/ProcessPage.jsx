import Process from '../components/Process';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';

const ProcessPage = () => {
    return (
        <>
            <Seo
                title="Náš proces | ITAKK"
                description="Jak pracujeme? Od úvodní analýzy přes design a vývoj až po spuštění a podporu."
                path="/proces"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-20"
            >
                <Process />
            </motion.div>
        </>
    );
};

export default ProcessPage;
