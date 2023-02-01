#!/usr/bin/env node
const glob = require("glob")

module.exports = {
  logLevel: "info",
  watch: process.env.NODE_ENV !== "PRODUCTION",
  entryPoints: glob.sync("src/ts/**/!(_)*.{js,ts}"),
  outdir: "assets",
  bundle: true,
  format: "esm",
}
