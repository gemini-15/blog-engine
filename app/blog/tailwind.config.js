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
        primary: "#2C2C34",
        secondary: "#A8B4A5"
      },
      boxShadow: {
        secondaryone: "0 0 1px #686868 , 0 0 2px #686868"
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