import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from "vite-prerender-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Only run prerender plugin if NOT on Vercel
    !process.env.VERCEL && vitePrerenderPlugin({
      renderTarget: "#root",
      additionalPrerenderRoutes: [
        "/",
        "/o-nas",
        "/sluzby",
        "/portfolio",
        "/proces",
        "/kontakt",
      ],
    }),
  ].filter(Boolean),
})
