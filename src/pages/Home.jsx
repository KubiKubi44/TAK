import Hero3D from '../components/Hero3D';
import HomeAbout from '../components/HomeAbout';
import TrustedLogos from '../components/TrustedLogos';

const Home = () => {
    return (
        <div className="min-h-screen overflow-x-hidden relative">

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
