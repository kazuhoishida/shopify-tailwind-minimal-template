#!/usr/bin/env node
const { build } = require("esbuild")
const vanillaConfig = require("./build/vanilla.config.cjs")

Promise.all([build(vanillaConfig)])
