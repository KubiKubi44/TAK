import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import GlobalBackground from "./components/GlobalBackground";
import AppRoutes from "./AppRoutes";

export default function AppShell() {
    const isPrerender =
        typeof globalThis !== "undefined" && globalThis.__PRERENDER__ === true;

    return (
        <div className="bg-bg-dark min-h-screen text-white selection:bg-neon-cyan selection:text-black cursor-none flex flex-col relative z-0">
            {!isPrerender && <GlobalBackground />}
            {!isPrerender && <CustomCursor />}

            <Navbar />

            <main className="flex-grow">
                <AppRoutes />
            </main>

            <Footer />

            {!isPrerender && <Analytics />}
            {!isPrerender && <SpeedInsights />}
        </div>
    );
}
