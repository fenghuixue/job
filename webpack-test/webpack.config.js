// webpack的配置文件
let path = require('path');
let HtmlWebpackPluigin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ((env, argv) => {
    const config = {
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
            new VueLoaderPlugin(),
            // new BundleAnalyzerPlugin(),
            new CopyWebpackPlugin([{
                context: './src',
                from: 'libs',
                to: 'libs'
            }])
        ],
        externals: {
            jquery: 'jQuery',
            vue: "window.Vue"
        },
        module: {
            rules: [
                {
                    test: /\.js$/, 
                    use: [{
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
                        },    
                        {
                            loader: path.resolve(__dirname, 'src/loaders/filter-debugger.js'),
                            options: {
                                name: 'filter-debugger-loader',
                                platform: env.platform
                            }
                        }
                    ]
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
                {
                    test: /\.vue$/,
                    use: 'vue-loader',
                    // exclude: /libs|node_modules/,
                },
                {   
                    test: /\.(woff|svg|eot|ttf)\??.*$/,
                    loader: 'url-loader'
                }
            ]
        }
    }
    return config;
});