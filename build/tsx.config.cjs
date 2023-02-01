#!/usr/bin/env node
const glob = require("glob")

const preactResolvePlugin = {
  name: "preact-compat resolver",
  setup(build) {
    const { resolve } = require("path")

    build.onResolve({ filter: /^react$/ }, (args) => {
      return { path: resolve(process.env.INIT_CWD, "./node_modules/preact/compat/dist/compat.js") }
    })
    build.onResolve({ filter: /^react-dom$/ }, (args) => {
      return { path: resolve(process.env.INIT_CWD, "./node_modules/preact/compat/dist/compat.js") }
    })
  },
}

module.exports = {
  logLevel: "info",
  watch: process.env.NODE_ENV !== "PRODUCTION",
  entryPoints: glob.sync("src/js/app/!(_)*.tsx"),
  outdir: "assets",
  bundle: true,
  format: "esm",
  treeShaking: true,
  minify: process.env.NODE_ENV === "PRODUCTION",
  sourcemap: process.env.NODE_ENV !== "PRODUCTION" ? "inline" : false,
  jsxFactory: "h",
  jsxFragment: "Fragment",
  inject: ["./react-shim.js"],
  plugins: [preactResolvePlugin],
}
