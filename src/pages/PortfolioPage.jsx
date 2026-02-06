import PortfolioHero from '../components/portfolio/PortfolioHero';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import Seo from '../components/Seo';

const PortfolioPage = () => {
    return (
        <div className="min-h-screen">
            <Seo
                title="Portfolio | ITAKK"
                description="Prohlédněte si naše realizované projekty. Od firemních webů po komplexní webové aplikace."
                path="/portfolio"
            />
            <PortfolioHero />
            <PortfolioGrid />
        </div>
    );
};

export default PortfolioPage;
