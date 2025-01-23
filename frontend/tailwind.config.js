/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        // dark
        darkBack:'#0f172a', //gray-900
        darkTxtTitle:'#e5e7eb',
        dIcon:'#e5e7eb',
        dText:'#9ca3af',
        dMainBack:'#1e293b',
        //light
        lightBack:'#f5f5f4',// sidebar ve header için b-stone-100
        lIcon:'#991b1b',
        ltxtTitle:'#1f2937',
        lText:'#4b5563',
        lMainBack:'#e5e7eb',
        ////////
        
        
       
      }
    },
  },
  plugins: [],
}

