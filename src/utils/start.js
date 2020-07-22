import Vue from 'vue'
//import App from './App.vue'
//import store from '@/store'
import VueI18n from 'vue-i18n'
//todo 引入下面的js，准备使用双层架构，既可以在app内使用，也可以在浏览器端开发调试
import appCommon from './doubleApi'
import Storage from './storage'
//主要ui组件库
// import MuseUI from 'muse-ui';
import EH from 'eh-ui';
import * as ehCss from 'eh-ui/lib/eh-ui.css';
// import * as materialIcons from '../assets/font/material-icons.css'
//import "muse-ui-loading/dist/muse-ui-loading.css";
//import Progress from 'vue-multiple-progress'

import * as mainCss from '../assets/style/main.scss'
//new appCommon.DoubleApi().ready(Vue,App,VueI18n,MuseUI,Loading)
//Vue.use(MuseUI).use(VueI18n).use(Progress);

class Start {
  App = {}
  AppId = '#app'
  constructor(app, appId) {
    this.App = app
    this.AppId = appId || this.AppId
  }
  
  ready(...usePackage) {
    usePackage = [EH, VueI18n, ...usePackage]
    usePackage.forEach(item => {
      Vue.use(item)
    })
    let lang = Storage.getObject('lang')
    const i18n = new VueI18n({
      locale: lang ? lang.value : 'cn',
      fallbackLocale: 'cn',
      messages: {
        cn: require('./lang/cn'), // 中文语言包
        en: require('./lang/en') // 英文语言包
      },
      silentTranslationWarn: true //去掉 无法转换keypath'....'的值 的报错
    })

    Vue.config.productionTip = false
    //解决app的一个报错提醒：[WDS] Disconnected! 
    module.hot ? module.hot.accept() : null

    const doubleProp = new appCommon.DoubleProp()
    window[doubleProp.ready] = () => {
      let doubleApi = new appCommon.DoubleApi(window.api)
      new Vue({
        //store,
        i18n,
        data: {
          api: doubleApi
        },
        render: h => h(this.App)
      }).$mount(this.AppId)
    }

  }
}

export default {
  Start,
  ehCss,
  // materialIcons,
  mainCss
}
