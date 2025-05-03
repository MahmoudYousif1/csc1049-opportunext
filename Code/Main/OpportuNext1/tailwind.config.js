module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Dosis', 'sans-serif'],
      },
      
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      colors: {
        Dim_grey: '#746D75',
        Jet: '#39393A',
        Gunmetal: '#2A2D34',
        Raisen_black: '#2C2C34',
        Raisen_black2: '#2C2C34',
        Azure: '#EAF4F4',
      }
    },
  },
  plugins: [],
};
