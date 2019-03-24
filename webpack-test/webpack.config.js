// webpack的配置文件
let path = require('path');
console.log(path.resolve('dist'));

module.exports = {
    mode: 'development',  // production development
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}