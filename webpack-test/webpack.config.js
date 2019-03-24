// webpack的配置文件
let path = require('path');
let HtmlWebpackPluigin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    optimization: { // 优化项
        minimizer: [
            new OptimizeCssPlugin(), // 压缩css
            new UglifyJsPlugin({ // 压缩js
                cache: true,
                parallel: true,
                sourceMap: true
            }) 
        ]
    },
    // devServer: {
    //     port: 3000,
    //     progress: true,
    //     contentBase: './build',
    //     // compress: true  //解压
    // },
    mode: 'development',  // production development
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, 'build')
    }, 
    plugins: [
        new HtmlWebpackPluigin({
             template: './src/index.html',
             filename: 'index.html',
            //  minify: {
            //      removeAttributeQuotes: true, //双引号去掉
            //      collapseWhitespace: true,   //折叠成一行
            //      hash: true
            //  }
        }),
        new MiniCssExtractPlugin({
             filename: '[name].css',
             chunkFilename: '[id].css'
        }),
        
    ],
    module: {
        rules: [
            {
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true}],
                            ["@babel/plugin-proposal-class-properties", { "loose": true}]
                        ]
                    }
                }
            },
            // css-loader 解析@import这种语法
            //  style-loader 把css插入head标签
            // 多个loader需要[], 
            // loader默认顺序是 从右向左执行
            // loader还可以写成对象
            {
                test: /\.css|less$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader', // 加浏览器前缀, 使用postcss-loader， 必须添加postcss.config.js, 引入autoprefixer
                    'less-loader'
                ] 
            },
        ]
    }
}