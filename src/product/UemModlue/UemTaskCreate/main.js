// import Vue from 'vue'
// import App from './App.vue'
// import store from '@/store'
// //todo 引入下面的js，准备使用双层架构，既可以在app内使用，也可以在浏览器端开发调试
// import appCommon from '../../../utils/doubleApi.js'
// //主要ui组件库
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
// import '../../../assets/font/material-icons.css'
// import "muse-ui-loading/dist/muse-ui-loading.css";
// import Loading from "muse-ui-loading";
// import '../../../assets/style/main.scss';

// //引入字体图标
// import {
//     FontAwesomeIcon
// } from '@fortawesome/vue-fontawesome'

// Vue.use(MuseUI).use(Loading);

// Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.config.productionTip = false
// //解决app的一个报错提醒：[WDS] Disconnected! 
// module.hot ? module.hot.accept() : null

// const doubleProp = new appCommon.DoubleProp()

// window[doubleProp.ready] = () => {
//     let doubleApi = new appCommon.DoubleApi(window.api)
//     new Vue({
//         store,
//         data: {
//             api: doubleApi
//         },
//         render: h => h(App)
//     }).$mount('#app')
    
// }
import App from './App.vue'
import Main from '../../../utils/start'
import "muse-ui-loading/dist/muse-ui-loading.css";
import Loading from "muse-ui-loading";


let start = new Main.Start(App)
start.ready(Loading)