#!/usr/bin/env node
const glob = require('glob')
const { build } = require('esbuild')


build({
  logLevel: "info",
  watch: process.env.NODE_ENV !== 'PRODUCTION',
  entryPoints: glob.sync('src/js/**/!(_)*.js'),
  outdir: 'assets',
  bundle: true,
  format: 'esm'
}).catch(() => process.exit(1))