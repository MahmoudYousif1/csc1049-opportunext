/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        Dim_grey: '#746D75',
        Rich_black: '39393A',
        Gunmetal: '#2A2D34',
        Raisen_black: '#2C2C34',
        Raisen_black2: '#2C2C34',
        Azure: '#EAF4F4',
        Oranges: '#F4AC45'
      }
    },
    fontFamily: {
      oxanium: ['Oxanium', 'sans-serif'],
    },
  },
  plugins: [],
}
