/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      white: "#FFFFFF",
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      bluegray: colors.blueGray,
      coolgray: colors.coolGray,
      truegray: colors.trueGray,
      warmgray: colors.warmGray,
      red: colors.red,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      indigo: colors.indigo,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      rose: colors.rose,
    },
    textColor: {
      white: "#FFF",
      black: "#000",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      gradientColorStops: (theme) => ({
        primary: "#FF8C00",
        secondary: "#FFA500",
        danger: "#FFD700",
      }),
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
