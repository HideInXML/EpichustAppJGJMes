const isApicloud = window.navigator.userAgent.toLowerCase().includes('apicloud')

const getQueryVariable = function (variable) {
  let query = decodeURIComponent(window.location.search.substring(1));
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

class DoubleApi {
  constructor(api) {
    this.api = api || this.api
  }

  api = {
    appVersion: '00.00.00',
    pageParam: JSON.parse(getQueryVariable('pageParam')),
    setScreenOrientation: () => {
        //
    },
    setStatusBarStyle: () => {
        //
    },
    require: () => {
        //
    },
    openWin: (param) => {
      // window.open(param.url, '_blank')
      let pageParam = param.pageParam || {}
      window.open(param.url + '?pageParam=' + encodeURIComponent(JSON.stringify(pageParam)), '_self')
    },
    openTabLayout: (param) => {
      window.console.log(param)
      if (param.name == 'MainPage') {
        window.open('./MainTab.html', '_self')
      } else {
        window.open(param.url, '_self')
      }

    },
    setTabBarAttr: (param) => {
      if (param.callback) {
        param.callback()
      }
    },
    addEventListener: () => {
        //
    },
    sendEvent: () => {
        //
    },
    closeWin: () => {
      window.history.go(-1);
    },
    toast: (param) => {
      window.alert(param.msg)
    },
    alert: window.alert,
    console: window.console.log
  }

  console = isApicloud ? this.api.alert : window.console.log

  checkNetwork(network) {
    let networkAddress = this.api.require("networkAddress");
    let targethost = network.ip;
    let reslut = new Promise((resolve, reject) => {
      networkAddress.ping({
          target: targethost
        },
        function (ret, err) {
          ret ? resolve(ret) : reject(err)
        }
      );
    })
    return reslut
  }

  ready(vue, app, VueI18n, ...usePackage) {
    vue.use(VueI18n)
    usePackage.forEach(item => {
      vue.use(item)
    })
    vue.config.productionTip = false
    //解决app的一个报错提醒：[WDS] Disconnected! 
    module.hot ? module.hot.accept() : null
    const i18n = new VueI18n({
      locale: 'cn', // 语言标识
      //this.$i18n.locale // 通过切换locale的值来实现语言切换
      messages: {
        cn: require('./lang/cn'), // 中文语言包
        en: require('./lang/en') // 英文语言包
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window[new DoubleProp().ready] = () => {
      let doubleApi = this.api
      // eslint-disable-next-line new-cap
      new vue({
        i18n,
        data: {
          api: doubleApi
        },
        render: h => h(app)
      }).$mount('#app')
      //调用一些优化app的方法
      // doubleApi.api.setScreenOrientation(doubleProp.screenOri)
      // doubleApi.api.setStatusBarStyle(doubleProp.barStyle)
    }
  }
}

class DoubleProp {
    
//   constructor() {
      
//   }

  ready = isApicloud ? 'apiready' : 'onload'

  isApicloud = isApicloud

  barStyle = {
    style: "light",
    color: "rgba(0, 0, 0, 0.15)"
  }

  screenOri = {
    orientation: 'auto'
  }
}

export default {
  DoubleApi,
  DoubleProp
}
