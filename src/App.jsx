import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ProcessPage from './pages/ProcessPage';
import ContactPage from './pages/ContactPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-bg-dark min-h-screen text-white selection:bg-neon-cyan selection:text-black cursor-none flex flex-col relative z-0">
        <GlobalBackground />
        <CustomCursor />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/o-nas" element={<AboutPage />} />
            <Route path="/sluzby" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/proces" element={<ProcessPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;
