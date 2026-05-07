/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amazon_blue: "#131921",
        amazon_light: "#232f3e",
        amazon_yellow: "#febd69",
        amazon_orange: "#f3a847",
        amazon_gray: "#eaeded",
      },
    },
  },
  plugins: [],
}