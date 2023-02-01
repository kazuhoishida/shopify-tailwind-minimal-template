#!/usr/bin/env node
const { build } = require("esbuild")
const tsxConfig = require("./build/tsx.config.cjs")
const vanillaConfig = require("./build/vanilla.config.cjs")

Promise.all([build(tsxConfig), build(vanillaConfig)])
