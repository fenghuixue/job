#! /usr/bin/env node

// 1. 找到当前执行名的路径，拿到webpack.config.js
let path = require('path');

let config = require(path.resolve('webpack.config.js'))

let Compiler = require('../lib/Compiler')

let compiler = new Compiler(config)

compiler.run();

// 本项目执行npm link
// 在其他项目中执行npm link test-pack
// 在本地开发npm模块的时候，我们可以使用npm link命令，将npm 模块链接到对应的运行项目中去，方便地对模块进行调试和测试