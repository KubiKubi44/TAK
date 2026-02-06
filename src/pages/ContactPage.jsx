import Contact from '../components/Contact';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';

const ContactPage = () => {
    return (
        <>
            <Seo
                title="Kontakt | ITAKK"
                description="Máte projekt? Ozvěte se nám. Jsme připraveni probrat vaše nápady a pustit se do práce."
                path="/kontakt"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-20"
            >
                <Contact />
            </motion.div>
        </>
    );
};

export default ContactPage;
