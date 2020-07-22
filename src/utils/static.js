//import homeImagO from '../assets/img/first-page-active.png'
import homeImag from '../assets/img/first-page.png'
//import messageImagO from '../assets/img/message-active.png'
import messageImag from '../assets/img/message.png'
import seleImagOn from '../assets/img/25.png'
const mainPageParams_cn = {
    name: 'MainPage',
    url: './MainPage.html',
    bgColor: '#fff',
    slidBackEnabled: false,
    progress: {
        type: "default"
    },
    navigationBar: {
        background: "#fff",
        color: "#76777b",
        shadow: "#dddddd",
        hideBackButton: true,
    },
    tabBar: {
        background: "#fff",
        color: "#76777b",
        selectedColor: "#1abc9c",
        fontSize: "14",
        scrollEnabled: false,
        list: [{
                text: "首页",
                iconPath: homeImag,
                selectedIconPath: homeImag
            },
            {
                text: "消息",
                iconPath: messageImag,
                selectedIconPath: messageImag
            },
            {
                text: "个人中心",
                iconPath: seleImagOn,
                selectedIconPath: seleImagOn
            }
        ],
        frames: [{
                title: "艾普工华科技(武汉)有限公司",
                name: "Menu",
                url: "./Menu.html",
                color: '#fff'
            },
            {
                title: "消息",
                name: "Massage",
                url: "./Massage.html"
            },
            {
                title: "个人中心",
                name: "Mine",
                url: "./Mine.html"
            }
        ]
    }
}

const mainPageParams_en = {
    name: 'MainPage',
    url: './MainPage.html',
    bgColor: '#fff',
    slidBackEnabled: false,
    progress: {
        type: "default"
    },
    navigationBar: {
        background: "#fff",
        color: "#76777b",
        shadow: "#dddddd",
        hideBackButton: true,
    },
    tabBar: {
        background: "#fff",
        color: "#76777b",
        selectedColor: "#1abc9c",
        fontSize: "14",
        scrollEnabled: false,
        list: [{
                text: "Main",
                iconPath: homeImag,
                selectedIconPath: homeImag
            },
            {
                text: "Message",
                iconPath: messageImag,
                selectedIconPath: messageImag
            },
            {
                text: "Mine",
                iconPath: seleImagOn,
                selectedIconPath: seleImagOn
            }
        ],
        frames: [{
                title: "EpicHust",
                name: "Menu",
                url: "./Menu.html",
                color: '#fff'
            },
            {
                title: "Message",
                name: "Massage",
                url: "./Massage.html"
            },
            {
                title: "Mine",
                name: "Mine",
                url: "./Mine.html"
            }
        ]
    }
}

export default {
    mainPageParams_cn,
    mainPageParams_en
}