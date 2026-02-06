import Seo from '../components/Seo';
import Hero3D from '../components/Hero3D';
import HomeAbout from '../components/HomeAbout';
import TrustedLogos from '../components/TrustedLogos';

const Home = () => {
    return (
        <div className="min-h-screen relative">
            <Seo
                title="Vývoj digitálních produktů a webových aplikací | ITAKK"
                description="Jsme digitální studio zaměřené na návrh a vývoj moderních webových aplikací, které mají jasný cíl – pomáhat značkám růst a přinášet skutečné výsledky."
                path="/"
            />
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
