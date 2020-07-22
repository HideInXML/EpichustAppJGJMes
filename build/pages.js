const glob = require('glob')
const con = require('console')
// 检测是否为产品开发模式，(为了方便，默认项目模式)
const mode = process.env.NODE_ENV.includes('product_mode')
const filesDir = mode ? 'product' : 'project'
// 还原node环境模式
process.env.NODE_ENV = process.env.NODE_ENV.includes('development') ? 'development' : 'production'
// const ora = require('ora')
const chalk = require('chalk')
con.log(chalk.green('  产品服务正在启动....\n'))
con.log(chalk.green('  正在扫描页面....\n'))

const files = glob.sync('**/' + filesDir + '/**/main.js')

con.log(chalk.green('  页面扫描完成....\n'))

const pages = {}
files.forEach(item => {
  const items = item.split('/')
  let page = items[items.length - 2]
  const pageParent = items[items.length - 3]
  if (page === 'frame') {
    page = `${pageParent}Frame`
  }
  pages[page] = item
})
con.log('文件获取结束', JSON.stringify(pages))

module.exports = pages
