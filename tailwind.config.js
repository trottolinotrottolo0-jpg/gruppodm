/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#003082",
          yellow: "#F5C400",
          green: "#2D8C4E",
          dark: "#1A1A2E",
          gray: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
}
