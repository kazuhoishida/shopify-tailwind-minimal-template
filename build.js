#!/usr/bin/env node
const { build } = require('esbuild')
const jsxConfig = require('./build/jsx.config')
const vanillaConfig = require('./build/vanilla.config')

Promise.all([build(jsxConfig), build(vanillaConfig)])
