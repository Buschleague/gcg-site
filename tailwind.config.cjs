/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['ui-serif','Georgia','serif'],
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Arial','sans-serif']
      },
    },
  },
  plugins: [],
};
