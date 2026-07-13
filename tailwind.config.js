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
        // Nova Identidade TRIVOR - Verde Oliva + Lilás
        oliva: {
          50: '#F4F5F0',
          100: '#E8EAE0',
          200: '#D1D5C1',
          300: '#B9BFA2',
          400: '#A2AA83',
          500: '#5C6347',      // Principal
          600: '#4A5039',
          700: '#383D2B',
          800: '#2D3121',      // Deep
          900: '#1F2216',
        },
        lilas: {
          50: '#F5F2FA',
          100: '#EBE5F4',
          200: '#D7CCE9',
          300: '#C3B2DE',
          400: '#AF99D3',
          500: '#8E7AB5',      // Principal
          600: '#726191',
          700: '#56496E',
          800: '#3A304A',
          900: '#1E1825',
        },
        // Mantendo cores originais para compatibilidade
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
