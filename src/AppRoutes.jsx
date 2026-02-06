import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import ProcessPage from "./pages/ProcessPage";
import ContactPage from "./pages/ContactPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/o-nas" element={<AboutPage />} />
            <Route path="/sluzby" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/proces" element={<ProcessPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
        </Routes>
    );
}
