/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/**/*.{html,edge}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}