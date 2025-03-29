/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'airbnb': '#FF385C',
      },
      maxWidth: {
        '7xl': '1280px',
      }
    },
  },
  plugins: [],
}