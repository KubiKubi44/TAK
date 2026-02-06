import Services from '../components/Services';
import { motion } from 'framer-motion';
import Seo from "../components/Seo";

const ServicesPage = () => {
    return (
        <>
            <Seo
                title="Služby: weby a webové aplikace na míru | ITAKK"
                description="Navrhujeme a vyvíjíme rychlé weby a webové aplikace. UX, výkon a SEO-ready řešení, které přináší poptávky."
                path="/sluzby"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "Vývoj webů a webových aplikací",
                    "provider": { "@type": "Organization", "name": "ITAKK", "url": "https://www.itakk.cz" },
                    "areaServed": "CZ",
                    "serviceType": ["Tvorba webových stránek", "Webové aplikace", "UI/UX", "SEO-ready weby"],
                    "url": "https://www.itakk.cz/sluzby"
                }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-20"
            >
                <Services />
            </motion.div>
        </>
    );
};

export default ServicesPage;
