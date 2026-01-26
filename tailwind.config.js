/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-cyan': '#04FFF7',
                'neon-magenta': '#F704FF',
                'neon-yellow': '#FFF704',
                'bg-dark': '#050510',
                'bg-dark-90': 'rgba(5, 5, 16, 0.9)',
            },
            keyframes: {
                'rgb-flow': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                }
            },
            animation: {
                'rgb-flow': 'rgb-flow 5s linear infinite',
            }
        },
    },
    plugins: [],
}
