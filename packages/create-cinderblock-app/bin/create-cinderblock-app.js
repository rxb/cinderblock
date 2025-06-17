#!/usr/bin/env node

const { createCinderblockApp } = require('../src/index.js');

createCinderblockApp(process.argv.slice(2));