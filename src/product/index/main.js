import Vue from 'vue'
//import App from './App.vue'
import network from '../network/App.vue'
import login from '../login/App.vue'
import store from '@/store'
import VueI18n from 'vue-i18n'
//todo 引入下面的js，准备使用双层架构，既可以在app内使用，也可以在浏览器端开发调试
import appCommon from '../../utils/doubleApi.js'
import Storage from '../../utils/storage'
//主要ui组件库
// import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import "muse-ui-loading/dist/muse-ui-loading.css";
import '../../assets/font/material-icons.css'
import Loading from "muse-ui-loading";
import '../../assets/style/main.scss'
import Eh from 'eh-ui'
window.console.log(Eh)
// import EH from 'eh-ui'
// window.console.log(EH)
//引入字体图标
// import {
//   FontAwesomeIcon
// } from '@fortawesome/vue-fontawesome'

// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Loading).use(VueI18n).use(Eh);

Vue.config.productionTip = false
//解决app的一个报错提醒：[WDS] Disconnected! 
module.hot ? module.hot.accept() : null

let lang = Storage.getObject('lang')
const i18n = new VueI18n({
  locale: lang ? lang.value : 'cn', // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    cn: require('../../utils/lang/cn'), // 中文语言包
    en: require('../../utils/lang/en') // 英文语言包
  }
})

const doubleProp = new appCommon.DoubleProp()
let readyApp = (page, doubleApi) => {
  window.vm = new Vue({
    store,
    i18n,
    data: {
      api: doubleApi
    },
    render: h => h(page)
  }).$mount('#app')
  //调用一些优化app的方法
  doubleApi.api.setScreenOrientation(doubleProp.screenOri)
  doubleApi.api.setStatusBarStyle(doubleProp.barStyle)
}
let networkStorage = Storage.getObject('network')
if (networkStorage) {
  if (doubleProp.isApicloud) {
    window[doubleProp.ready] = () => {
      let doubleApi = new appCommon.DoubleApi(window.api)
      doubleApi.checkNetwork(networkStorage[Storage.getItem('selectedIndex')]).then(res => {
        res.status == true ? readyApp(login, doubleApi) : readyApp(network, doubleApi)
      }).catch(err => {
        window.console(JSON.stringify(err))
        readyApp(network, doubleApi)
      })
    }
  } else {
    readyApp(login, new appCommon.DoubleApi())
  }
} else {
  window[doubleProp.ready] = () => {
    let doubleApi = new appCommon.DoubleApi(window.api)
    //doubleApi.console(JSON.stringify(doubleApi))
    readyApp(network, doubleApi)
  }
}
