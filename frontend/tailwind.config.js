/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                'xs': '475px',
                // => @media (min-width: 475px) { ... }
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    xl: '5rem',
                    '2xl': '6rem',
                },
            },
            colors: {
                'slate-900': '#0f172a',
                'slate-800': '#1e293b',
                'slate-700': '#334155',
                'slate-600': '#475569',
                'slate-400': '#94a3b8',
                'emerald-400': '#2dd4bf',
                'emerald-500': '#10b981',
                'emerald-600': '#059669',
            },
        },
    },
    plugins: [],
}
