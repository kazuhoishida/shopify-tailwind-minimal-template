#!/usr/bin/env node
const { build } = require('esbuild')
const vanillaConfig = require('./build/vanilla.config')

Promise.all([build(vanillaConfig)])
