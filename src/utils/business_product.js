import http from './http';
import qs from 'qs'
import Storage from './storage'
import _ from 'lodash'
import moment from "moment";

moment.locale('zh-cn') // moment 支持中文

// 产品业务处理js库

const get = http.get;
const post = http.post;

const isApicloud = window.navigator.userAgent.toLowerCase().includes("apicloud");

const hexToRgba = (hex, opacity) => {
  return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
}

const menuConf = {
  filter: true, //是否过滤编辑菜单的配置
  fold: true, //是否按每组16个分隔
}

const login = (params) => {
  let paramData = {
    username: 'admin',
    password: '123456'
  }
  paramData = Object.assign(paramData, params)
  let url = http.getPrefix() + "autoLoginController!login.m?_u=" + paramData.username + "&_p=" + paramData.password + "&_pt=min" + "&_to=productPadCommController!login.m";
  http.instance.defaults.timeout = 30 * 1000;
  return http.instance.post(url, {
    _u: paramData.username,
    _p: paramData.password
  })
}

const getMenulist = (config) => {
  config = Object.assign(menuConf, config)
  let loginConfig = Storage.getObject("loginConfig");
  let params = {};
  params.loginName = loginConfig.un;
  params.passWorld = loginConfig.pw;
  let url = http.formateUrl('productPadCommController!getAppMenuListByLoginName.m')

  return http.instance.post(url).then(res => {
    let menuFilter = Storage.getObject("menuFilter")
    menuFilter = menuFilter || {}
    let list = res.data.data
    if (!list) {
      throw new Error('菜单获取失败')
    }
    if (config.filter) {
      list = _.filter(list, item => {
        return menuFilter[item.id]
      })
    }
    return list
  }).then(list => {
    window.console.log('menu', list)
    if (!config.fold) {
      return list
    }
    let filertList = _.chain(list).filter(item => {
      return item.menuLevel == '2'
    }).map((item, index) => {
      item.index = index
      return item
    }).groupBy(item => {
      return Math.floor(item.index / 16)
    }).map(item => {
      return item
    }).value()
    return filertList
  })
}

const getAllWorkCenterAndCellByLoginName = () => {
  let loginConfig = Storage.getObject("loginConfig");
  let params = {};
  params.loginName = loginConfig.un;
  params.passWorld = loginConfig.pw;
  let paramData = {
    loginName: 'admin',
    passWorld: '123456'
  }
  paramData = Object.assign(paramData, params);
  //let url = http.getUrl("productPadCommController!getAllWorkCenterAndCellByLoginName.m");
  window.console.log(qs.stringify({
    loginName: paramData.loginName
  }))
  // return http.post({
  //     url: http.url.getAllWorkCenterAndCell,
  //     data: {
  //         loginName: paramData.loginName
  //     },
  //     autoLogin: false
  // })
  return http.instance.post(http.formateUrl(http.url.getAllWorkCenterAndCell), qs.stringify({
    loginName: paramData.loginName
  }))
}

const doChangePwd = (params) => {
  params.loginName = params.username;
  //let url = http.getUrl("productPadCommController!doChangePwd.m");
  return http.instance.post(http.formateUrl(http.url.changePassword), qs.stringify(params))
}

const getFactory = () => {
  let loginConfig = Storage.getObject("loginConfig");
  let params = {};
  params.loginName = loginConfig.un;
  params.passWorld = loginConfig.pw;
  let paramData = {
    loginName: 'admin',
    passWorld: '123456'
  }
  paramData = Object.assign(paramData, params);
  let url = http.getPrefix() + "autoLoginController!login.m?_u=" + paramData.loginName + "&_p=" + paramData.passWorld + "&_pt=min" + "&_to=productPadCommController!getFactory.m";
  return http.instance.post(url, qs.stringify({
    loginName: paramData.loginName
  }))
}
/**
 * 获取顶部轮播内容
 *
 * @param {*} banner vue data中绑定banner对象（可选）
 * @returns AxiosPromise 包含所有返回值的banner对象
 */
const getMainTopInfo = (banner) => {
  const equipStatus = {
    离线: '#eee',
    运行: '#1abc9c',
    暂停: '#FDAD00',
    报警: '#e1261c',
    未启用: '#fff'
  }
  return http.post({
    url: http.url.getAppFirstPageInfo,
    data: {},
    autoLogin: true
  }).then(res => {
    let _banner = banner || {}
    if (res.status == 200 && res.data.data) {
      _banner = Object.assign(_banner, res.data.data)
      let workCellInfo = Storage.getObject('workCells') || []
      workCellInfo = workCellInfo[0] || {}
      workCellInfo = workCellInfo.name ? workCellInfo.name + ' | ' + workCellInfo.code : ''
      _banner.workCellInfo = workCellInfo
      //检测
      _banner.uqcInfo = _banner.uqcInfoList.length ? _banner.uqcInfoList[0] : {}
      //工艺
      _banner.route = _banner.routeList.length ? _banner.routeList[0] : {
        opName: '',
        opCode: ''
      }
      //关键件
      _banner.kpartDaq = (_banner.kpartDaqList && _banner.kpartDaqList.length) ? _banner.kpartDaqList[0] : {
        mrlName: '',
        mrlCode: ''
      }
      //设备
      _banner.equipInfo = _banner.equipList[0] || {}
      _banner.equipInfo.equipColor = equipStatus[_banner.equipInfo.useStatus]
    }
    return _banner
  })
}
/**
 * 获取首页消息列表，取前两个
 *
 * @returns AxiosPromise 包含所有返回值的message的对象数组
 */
const getMainMessages = () => {
  return http.post({
    url: http.url.getAppMsg,
    data: {},
    autoLogin: true
  }).then(res => {
    let _messages = []
    if (res.status == 200 && res.data.data) {
      let messageList = res.data.data;
      (messageList.length > 2) ? (messageList.length = 2) : null
      _messages = res.data.data.map(item => {
        let _item = {}
        _item.msgId = item.msgId || ''
        _item.workCenterName = item.workCenterName || ''
        _item.workCellName = item.workCellName || ''
        _item.exceptionType = item.exceptionType || ''
        _item.content = (item.exceptionContent || '').replace('undefined', '')
        _item.launchId = item.launchId || ''
        _item.launchTime = item.launchTime || ''
        _item.exceptionTypeId = item.exceptionTypeId || ''
        _item.exceptionBillId = item.exceptionBillId || ''
        _item.dateForNow = moment(new Date(item.launchTime)).fromNow()
        return _item
      })
    }
    return _messages
  })
}

export default {
  get,
  post,
  login,
  getMenulist,
  getFactory,
  doChangePwd,
  getAllWorkCenterAndCellByLoginName,
  getMainTopInfo,
  getMainMessages,
  isApicloud,
  hexToRgba
}
