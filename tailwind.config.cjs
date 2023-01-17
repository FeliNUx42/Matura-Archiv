/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,html,js}"],
  theme: {
    extend: {
      colors: {
        "dark": {
          700: "#303134",
          800: "#282a2d",
          900: "#202124",
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
