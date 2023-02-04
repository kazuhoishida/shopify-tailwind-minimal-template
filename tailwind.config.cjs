const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["../**/*.liquid"],
  theme: {
    extend: {
      colors: {
        "v-white": "#FFFFFF",
      },
    },
    screens: {
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
