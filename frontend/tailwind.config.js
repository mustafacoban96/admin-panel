/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        // background color
        appGray: '#f3f4f6',
        txtColor:'#374151',
        txtTitle:'#1f2937'
      }
    },
  },
  plugins: [],
}

