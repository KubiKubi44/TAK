import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from "vite-prerender-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'log-env',
      configResolved(config) {
        console.log('Build Environment:', {
          mode: config.mode,
          isVercel: process.env.VERCEL,
          nodeEnv: process.env.NODE_ENV
        });
      }
    },
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      additionalPrerenderRoutes: [
        "/",
        "/o-nas",
        "/sluzby",
        "/portfolio",
        "/proces",
        "/kontakt",
      ],
      // Disable on Vercel to debug hang
      disabled: !!process.env.VERCEL,
    }),
  ],
})
