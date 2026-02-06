import About from '../components/About';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';

const AboutPage = () => {
    return (
        <>
            <Seo
                title="O nás | ITAKK"
                description="Poznejte tým ITAKK. Jsme experti na webový vývoj a design, kteří mění vize v realitu."
                path="/o-nas"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-20"
            >
                <About />
            </motion.div>
        </>
    );
};

export default AboutPage;
