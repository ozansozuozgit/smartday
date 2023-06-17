/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        gray: '#F5F6F8',
        indigo: '#6655FE',
        orange: '#FE9945',
        pink: '#EB6FF9',
        teal: '#12E4C2',
      },
    },
  },
  plugins: [],
};
