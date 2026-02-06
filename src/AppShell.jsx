import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import GlobalBackground from "./components/GlobalBackground";
import AppRoutes from "./AppRoutes";

export default function AppShell() {
    // Determine if we are on the client after hydration to avoid mismatches
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="bg-bg-dark min-h-screen text-white selection:bg-neon-cyan selection:text-black cursor-none flex flex-col relative z-0">
            {/* Heavy client-only stuff rendered only after mount */}
            {isClient && <GlobalBackground />}
            {isClient && <CustomCursor />}

            <Navbar />

            <main className="flex-grow">
                <AppRoutes />
            </main>

            <Footer />

            {/* Analytics only on client */}
            {isClient && <Analytics />}
            {isClient && <SpeedInsights />}
        </div>
    );
}
