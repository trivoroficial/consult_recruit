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
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // NOVA IDENTIDADE ZENTHOS
        burgundy: {
          50: '#FDF2F2',
          100: '#FCE8E8',
          200: '#F5C5C5',
          300: '#EBA3A3',
          400: '#D96060',
          500: '#C41D1D',
          600: '#8B0000',      // Principal
          700: '#700000',
          800: '#550000',
          900: '#3A0000',
        },
        slate: {
          50: '#F8F9FA',
          100: '#F1F2F3',
          200: '#DDE0E2',
          300: '#C9CDD1',
          400: '#A1A8AE',
          500: '#78858B',
          600: '#708090',      // Principal
          700: '#5A6773',
          800: '#434D56',
          900: '#2D343A',
        },
        champagne: {
          50: '#FDFBF7',
          100: '#FCF8F0',
          200: '#F7EDDC',
          300: '#F2E2C8',
          400: '#E8D0AD',
          500: '#E3C9A8',      // Principal
          600: '#D4B894',
          700: '#C5A780',
          800: '#B6966C',
          900: '#A78558',
        },
        offwhite: {
          DEFAULT: '#F8F4E6',   // Principal
          50: '#FDFCF8',
          100: '#F8F4E6',
          200: '#F0E8D0',
          300: '#E8DCBA',
        },
        // MANTENDO CORES LEGADAS PARA NÃO QUEBRAR
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
