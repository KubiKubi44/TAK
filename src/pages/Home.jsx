import { useHead } from '@unhead/react';
import Hero3D from '../components/Hero3D';
import HomeAbout from '../components/HomeAbout';
import TrustedLogos from '../components/TrustedLogos';

const Home = () => {
    useHead({
        title: 'Vývoj digitálních produktů a webových aplikací | TAK',
        meta: [
            { name: 'description', content: 'Jsme digitální studio zaměřené na návrh a vývoj moderních webových aplikací, které mají jasný cíl – pomáhat značkám růst a přinášet skutečné výsledky.' }
        ],
        link: [
            { rel: 'canonical', href: 'https://www.itakk.cz/' }
        ]
    });

    return (
        <div className="min-h-screen relative">
            <Hero3D />

            <div className="relative z-10 border-t border-white/10">
                {/* Short About Us section replacing Core Systems */}
                <HomeAbout />

                {/* Replaces Testimonials as per user request */}
                <TrustedLogos />
            </div>
        </div>
    );
};

export default Home;
