/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <- ESSA LINHA é o dark mode manual
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
