import glob from "glob"
import esbuild from "esbuild"

const context = await esbuild.context({
  entryPoints: glob.sync("src/js/**/!(_)*.js"),
  bundle: true,
  format: "esm",
  outdir: "assets",
  logLevel: "info",
})

process.env.NODE_ENV !== "PRODUCTION" ? await context.watch() : await context.rebuild()
