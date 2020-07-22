// eslint-disable-next-line @typescript-eslint/no-var-requires
const pages = require('./build/pages')
const path = require('path')
// const VueLoaderPlugin = require('./node_modules/vue-loader/lib')

module.exports = {
  publicPath: './',
  assetsDir: 'assets',
  pages: pages,
  productionSourceMap: false, // 是否生成sourceMap文件
  devServer: {
    // open: true, // 启动服务后是否打开浏览器
    proxy: {
      '/test': {
        // http://61.183.71.118:9098/uma-unimax-web/login.action
        // EpicHust_User02/123456
        target: 'http://61.183.71.118:9098/uma-unimax-web/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/test': ''
        }
      }
    }
  },
  chainWebpack: config => {
    //vue默认@指向src目录，这里要修正为examples，另外新增一个~指向packages
    config.resolve.alias
      .set('~', path.resolve('src/product'));
    //   config.module
    //     .rule('ts')
    //     .include.add(/packages/)
    //     .end()
    //     .include.add(/examples/)
    //     .end()
    //     .use('babel')
    //     .loader('babel-loader')
    //     .tap(options => {
    //       // 修改它的选项...
    //       return options;
    //     });

    // },
    // configureWebpack: {
    //   plugins: [
    //     new VueLoaderPlugin()
    //   ],
  }
}
