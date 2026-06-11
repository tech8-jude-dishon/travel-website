/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Poppins', 'sans-serif'],
        cursive: ['Dancing Script', 'cursive'],
      },
      colors: {
        'brand-gold': '#0fb7fb',
        'brand-dark': '#02285b',
        'brand-bg': '#ffff',
      }
    }
  },
  plugins: [],
}
