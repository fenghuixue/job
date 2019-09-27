const path = require('path')
const srcDir = path.join(__dirname, 'src');
const AddDatePlugin = require(srcDir + '/views/Webpack/AddDatePlugin.js')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 开发服务配置
  // devServer: {
  //   port: 8888, // 端口号
  //   host: 'localhost', // 主机
  //   https: false, // 是否启用https
  //   open: false // 配置是否自动启动浏览器
  // },
  // // webpack配置节点
  chainWebpack: config => {
    config.resolve
      .alias
        .set(
          'vue$',
          'vue/dist/vue.js'
        )
        .set('@', resolve('src'))
    
  },    
    // // 路径配置
    // resolve: {
      // extensions: ['.js', '.vue', '.json'],
      // // 别名配置
      // alias: {
      //   // @ is an alias to /src
      //   // '@': resolve('src'),
      //   components: srcDir + '/components',
      //   views: srcDir + '/views',
      //   assets: srcDir + '/assets',
      //   vue$: 'vue/dist/vue.js',
      // }
    // },
    // 插件配置
    configureWebpack: {
      plugins: [
        new AddDatePlugin()
      ],
    }
}
