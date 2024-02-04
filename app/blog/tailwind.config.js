/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: 'jit', 
  theme: {
    extend: {
      colors: {
        primary: "#101820",
        secondary: "#E94B3C"
      },
      boxShadow: {
        secondaryone: "0 0 1px #E94B3C , 0 0 5px #E94B3C"
      },
      screens: {
        xs: "480px",
        ss: "620px", 
        sm: "768px", 
        md: "1060px",
        lg: "1200px", 
        xl: "1700px"
      }
    },
  },
  plugins: [],
}