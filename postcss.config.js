const progress = require("postcss-progress")

module.exports = {
  plugins: [
    progress.start(),
    require("postcss-import")({
      path: ["./src/css", "./node_modules"],
    }),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-preset-env")({
      stage: 1,
      features: {
        "nesting-rules": false,
      },
    }),
    ...(process.env.NODE_ENV === "PRODUCTION"
      ? [require("cssnano")({
          preset: "default",
        })]
      : []),
    progress.stop(),
  ],
}
