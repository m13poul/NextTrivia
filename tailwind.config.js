module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Bungee Shade"', 'cursive'],
        questions: ['Acme', 'sans-serif'],
        garamond: ['"EB Garamond"', 'serif'],
        barcode: ['"Libre Barcode 39 Text"', 'cursive'],
        roboto: ['"Roboto Serif"', 'serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
