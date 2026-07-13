/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      // Nova tipografia para visual internacional
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Nova Identidade Internacional TRIVOR
        navy: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        gold: {
          100: '#FDF6E3',
          200: '#F5E6C8',
          300: '#E8D5A3',
          400: '#D9C17E',
          500: '#C9A84C',
          600: '#B8963A',
          700: '#A68428',
        },
        // Mantendo as cores originais para não quebrar dashboards
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        yellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
      },
    },
  },
  plugins: [],
}
