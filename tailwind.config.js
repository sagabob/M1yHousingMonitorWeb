/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {      
       
        // Custom housing-specific colors
        product: {
          'community-profile': '#cb2c30',
          'social-atlas': '#caae01',
          'population-forecast': '#3b6e8f',
          'economic-profile': '#70b859',
          'community-views': '#b21f67',
          'housing-id': '#7513b8',
          'housing-id-hover': '#d6b8ea'
        }
      },      
    },
  },
  plugins: [],
} 