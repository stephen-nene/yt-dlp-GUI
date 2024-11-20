/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        solidColor: "#1D4ED8", // Customize with your solid color
      },
      backdropBlur: {
        md: "10px",
      },
    },
  },
  plugins: [],
};
