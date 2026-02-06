import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import GlobalBackground from "./components/GlobalBackground";
import AppRoutes from "./AppRoutes";

export default function AppShell() {
    return (
        <div className="bg-bg-dark min-h-screen text-white selection:bg-neon-cyan selection:text-black cursor-none flex flex-col relative z-0">
            {/* Heavy client-only stuff */}
            <GlobalBackground />
            <CustomCursor />

            <Navbar />

            <main className="flex-grow">
                <AppRoutes />
            </main>

            <Footer />

            {/* Analytics */}
            <Analytics />
            <SpeedInsights />
        </div>
    );
}
