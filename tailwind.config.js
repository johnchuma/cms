/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradientHero:
          "linear-gradient(180deg, rgba(138,75,224,1) 0%, rgba(120,39,230,1) 100%)",
      },
      colors: {
        primary: "#3783c8",
        secondary: "#F7467F",
        muted: "#757575",
        dark: "#1f252f",
        border: "#ECE9F1",
        background: "#F5F6F8",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
