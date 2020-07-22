# EpichustAppJGJMes
##### 项目环境 
* 1. node : ^12.14.X 
* 2. npm : >= ^6.10.x 
* 3. vue-cli : ^4.2.2  
> 有问题可查看app环境搭建文档 http://bbs.epichust.com:9099/article/1568903122001  
##### 更新npm资源库地址，以便获取公司封装组件库  

内网（推荐在公司的同事使用）：
``` 
npm config set registry http://************/repository/npm-all/ 
``` 
外网：  
``` 
npm config set registry http://************/repository/npm-all/ 
``` 
还原npm资源库：  
``` 
npm config set registry http://registry.npmjs.org 
``` 
~~淘宝镜像~~（已废弃，直接使用cnpm）  
``` 
npm config set registry https://registry.npm.taobao.org 
``` 
设置完成之后，查看npm配置，会显示更改后的地址  
``` 
npm config ls 
```
##### 获取项目依赖 打开命令行工具，目录指到项目根目录，然后  
``` 
npm install 
``` 
等待下载完成，执行  
``` 
npm run serve 
``` 
启动项目，进入（项目）开发模式  

（项目）生产模式（打包apicloud需要的页面资源）  
``` 
npm run build 
```  
#### 更多： 在package.json中，script属性下，列举了可执行的命令行代码  
其中开发产品时，选择执行 "serve:pro"、"build:pro"
