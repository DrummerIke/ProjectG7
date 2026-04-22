/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bork: {
          dark: '#1a1a1a',
          primary: '#ff6b00',
          secondary: '#2d2d2d',
          accent: '#4a9eff'
        }
      }
    },
  },
  plugins: [],
}
