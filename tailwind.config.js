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
        white: '#FFFFFF',
        gray: '#F5F6F8',
        indigo: '#6655FE',
        orange: '#FE9945',
        pink: '#EB6FF9',
        teal: '#12E4C2',
        blue:'#50BAFF'
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
