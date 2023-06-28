/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        '3xl': '1800px',
      },
      colors: {
        white: {
          DEFAULT: '#FFFFFF',
        },
        gray: {
          100: '#F5F6F8',
          500: '#CBD5E1',
          700: '#4A5568',
          900: '#1A202C',
        },
        indigo: {
          DEFAULT: '#6655FE',
          600: '#4D3DFF',
          800: '#4438FF',
        },
        orange: {
          DEFAULT: '#FE9945',
          600: '#FF7D1D',
          800: '#FF6F00',
        },
        pink: {
          DEFAULT: '#EB6FF9',
          600: '#DB36CE',
          800: '#C725A7',
        },
        teal: {
          DEFAULT: '#0fb69b',
          600: '#0CA287',
          800: '#0B8C7B',
        },
        blue: {
          DEFAULT: '#50BAFF',
          600: '#0FA5DB',
          800: '#0E8EBE',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        open_sans: ['var(--font-open-sans)'],
        roboto: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
