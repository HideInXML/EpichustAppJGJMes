import axios from 'axios'
import Storage from './storage'
//import _ from 'lodash'

let instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待5分钟
instance.defaults.timeout = 5 * 60 * 1000;

// 请求的拦截
instance.interceptors.request.use(function (request) {
    return request;
});

// 响应的拦截
instance.interceptors.response.use(function (response) {
    return response;
});

const urlData = {
    url: '',
    data: {},
    autoLogin: false
}

const getPrefix = () => {
    let network = Storage.getObject('network')
    let selectedIndex = Storage.getItem('selectedIndex')
    let protocol = 'http:'
    let locationNet = {
        ip: window.location.hostname,
        port: window.location.port,
    }
    let prefix = network ? network[selectedIndex] : locationNet
    prefix = process.env.NODE_ENV === 'development' ? '/test/' : (protocol + '//' + prefix.ip + ':' + prefix.port + '/' + (prefix.appName ? prefix.appName + '/' : ''))
    return prefix
}

const formateUrl = (controllerName) => {
    let loginConfig = Storage.getObject("loginConfig")
    let multipleObj = Storage.getObject("multipleObj")
    // 是否启用多工作中心  false 不启用, true 启用
    let datarole = multipleObj ? "&_dr=" + multipleObj.workCenterGid : ''
    if (!loginConfig) {
        return 'no login'
    } else if (!controllerName) {
        return 'no controllerName'
    }
    let url = getPrefix() + "autoLoginController!login.m?_u=" + loginConfig.un + "&_p=" + loginConfig.pw +
        datarole + "&_pt=min" + "&_to=" + controllerName;
    //window.console.log(url)
    return url
}

const get = (params = urlData) => {
    window.console.log('get', params)
    params = Object.assign(urlData, params)
    let url = getPrefix() + params.url
    return instance.get(url, {
        params: params.data
    })
}

const post = (params = urlData) => {
    params = Object.assign(urlData, params)
    let url = params.autoLogin ? formateUrl(params.url) : getPrefix() + params.url
    //window.console.log(params, url)
    return instance.post(url, params.data)
}

// const getUrl = (paramUrl) => {
//     let loginConfig = Storage.getObject("loginConfig");
//     let multipleObj = Storage.getObject("multipleObj");
//     let isMultipleWorkCenters = loginConfig.isMultipleWorkCenters; // 是否启用多工作中心  false 不启用, true 启用
//     let datarole = multipleObj == null ? "" : multipleObj.workCenterGid;
//     var params = {};
//     params.loginName = loginConfig.un;
//     params.passWorld = loginConfig.pw;
//     let paramData = {
//         loginName: 'admin',
//         passWorld: '123456'
//     }
//     paramData = Object.assign(paramData, params);
//     let url = "";
//     if (isMultipleWorkCenters == true && datarole != "" && datarole != null) {
//         url = getPrefix() + "autoLoginController!login.m?_u=" + paramData.loginName + "&_p=" + paramData.passWorld + "&_pt=min" + "&_dr=" + datarole + "&_to=" + paramUrl;
//     } else {
//         url = getPrefix() + "autoLoginController!login.m?_u=" + paramData.loginName + "&_p=" + paramData.passWorld + "&_pt=min" + "&_to=" + paramUrl;
//     }
//     return url

// }

const url = {
    getAppFirstPageInfo: 'productPadCommController!getAppFirstPageInfo.m', // 首页顶部轮播信息
    getAppMsg: 'productPadCommController!getAppMsg.m', // 获取消息
    getAllWorkCenterAndCell: 'productPadCommController!getAllWorkCenterAndCellByLoginName.m', //
    changePassword : 'productPadCommController!doChangePwd.m'
}

export default {
    url,
    get,
    post,
    // getUrl,
    instance,
    formateUrl,
    getPrefix
}