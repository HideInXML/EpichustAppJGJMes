<template>
  <div id="app">
    <!-- 第一部分 -->
    <section class="top-banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- 人员信息-->
        <swiper-slide class="card-wrapper">
          <div class="swiper-card" id="bg1" style="color:#9c6018">
            <mu-flex align-items="center" class="card-header" style="color: #9c6018;">
              <!-- 原来的图标 -->
              <!-- <mu-icon class="toggle-icon" size="24" value="account_circle"></mu-icon> -->
              <img :src="imgSrc[0]" class="toggle-icon" />
              <div>{{ $t('pro.personal') + $t('base.info') }}</div>
            </mu-flex>
            <mu-flex justify-content="center" class="card-content">
              <b>{{ banner.employeeMap.employeeName + '/' + banner.employeeMap.employeeCode }}</b>
            </mu-flex>
            <mu-flex align-items="center" justify-content="between" class="card-sub-con">
              <div>{{ $t('pro.production_dep') }}</div>
              <div>{{ banner.employeeMap.employeeDeptName }}</div>
            </mu-flex>
          </div>
        </swiper-slide>

        <!-- 设备信息 -->
        <swiper-slide class="card-wrapper">
          <div class="swiper-card" id="bg2" style="color:#54565b">
            <mu-flex align-items="center" class="card-header">
              <img :src="imgSrc[1]" class="toggle-icon" />
              <div>{{ $t('pro.equip') + $t('base.info') }}</div>
              <mu-icon
                class="toggle-icon"
                :color="banner.equipInfo.equipColor"
                size="24"
                style="margin-left:auto"
                value="power_settings_new"
              ></mu-icon>
            </mu-flex>
            <mu-flex
              justify-content="between"
              class="card-content"
              align-items="center"
              style="margin-bottom:.4rem;"
            >
              <div
                style="font-size:16px;border-right:1px solid #999999;padding-left:1rem;padding-right:1rem;"
              >
                <p style="font-weight:bold;">{{banner.equipInfo.equipName}}</p>
                <b>{{banner.equipInfo.equipCode}}</b>
              </div>
              <div
                style="padding-right:1rem;padding-left:1rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                <div style="margin-bottom:6px;font-size:16px;">
                  <span
                    style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                  >{{ banner.workCellInfo }}</span>
                </div>
                <div style="font-size:16px;">
                  <span>{{ $t('pro.production') + $t('base.qty') }}100</span>
                </div>
              </div>
            </mu-flex>
          </div>
        </swiper-slide>

        <!-- 检测信息 -->
        <swiper-slide class="card-wrapper">
          <div class="swiper-card" id="bg3" style="color:#7c4c29">
            <mu-flex align-items="center" class="card-header">
              <img :src="imgSrc[2]" class="toggle-icon1" />
              <div>{{ $t('pro.check') + $t('base.info') }}</div>
            </mu-flex>
            <mu-flex justify-content="center" class="card-content" style="padding-right: .5rem;">
              <b
                style="font-size:20px;"
              >{{ banner.uqcInfo.checkItemName + '/' + banner.uqcInfo.checkItemCode}}</b>
            </mu-flex>
            <mu-flex align-items="center" justify-content="between" class="card-sub-con">
              <div>{{ banner.workCellInfo }}</div>
            </mu-flex>
          </div>
        </swiper-slide>

        <!-- 工艺信息 -->
        <swiper-slide class="card-wrapper">
          <div class="swiper-card" id="bg4" style="color:#fff">
            <mu-flex align-items="center" class="card-header">
              <img :src="imgSrc[3]" class="toggle-icon" />
              <div>{{ $t('pro.process') + $t('base.info') }}</div>
              <div style="margin-left:auto">{{ banner.route.routeLineName }}</div>
            </mu-flex>
            <mu-flex justify-content="center" class="card-content" style="padding-right:1rem;">
              <b style="font-size:20px;">{{ banner.route.opName + '/' + banner.route.opCode}}</b>
            </mu-flex>
            <mu-flex align-items="center" justify-content="between" class="card-sub-con">
              <div>{{ banner.workCellInfo }}</div>
            </mu-flex>
          </div>
        </swiper-slide>

        <!-- 关键件信息 -->
        <swiper-slide class="card-wrapper">
          <div class="swiper-card" id="bg5" style="color:#774e29;">
            <mu-flex align-items="center" class="card-header">
              <img :src="imgSrc[4]" class="toggle-icon" />
              <div>{{ $t('pro.key_piece') + $t('base.info') }}</div>
              <div style="margin-left:auto">{{ banner.kpartDaq.produName }}</div>
            </mu-flex>
            <mu-flex justify-content="center" class="card-content">
              <b
                style="font-size:20px;"
              >{{ banner.kpartDaq.mrlName + '/' + banner.kpartDaq.mrlCode}}</b>
            </mu-flex>
            <mu-flex align-items="center" justify-content="between" class="card-sub-con">
              <div>{{ banner.workCellInfo }}</div>
            </mu-flex>
          </div>
        </swiper-slide>

        <!-- 生产信息 -->
        <swiper-slide class="card-wrapper">
          <div class="swiper-card" id="bg6" style="color:#FFF;">
            <mu-flex align-items="center" class="card-header">
              <img :src="imgSrc[5]" class="toggle-icon" />
              <div>{{ $t('pro.production') + $t('base.info') }}</div>
            </mu-flex>
            <mu-flex justify-content="around" class="card-content">
              <b>{{ $t('pro.effective_product') + $t('base.qty') + '：' + banner.uexDaqInfoMap.effectiveQty }}</b>
              <b>{{ $t('pro.uneffective_product') + $t('base.qty') + '：' + banner.uexDaqInfoMap.uneffectiveQty }}</b>
            </mu-flex>
            <mu-flex align-items="center" justify-content="between" class="card-sub-con">
              <div
                style="margin-left:18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >{{ $t('pro.production') + $t('base.qty') + '：' + banner.uexDaqInfoMap.productQty }}</div>
              <div
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >{{ banner.workCellInfo }}</div>
            </mu-flex>
          </div>
        </swiper-slide>
      </swiper>

      <div class="pagination-wrapper">
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </section>

    <!-- 第二部分 -->
    <section class style="margin-top:0.5rem;">
      <index-menu :menuData="asynMenuData"></index-menu>
    </section>

    <!-- 第三部分 -->
    <section class="ex-messages" v-if="messages.length" @click="changeTab">
      <mu-row v-for="(item,index) in messages" :key="index">
        <mu-col span="9" style="text-align:right;margin-top: 6px;">
          <mu-flex align-items="center">
            <mu-icon class="toggle-icon" size="6" color="#ccc" value="fiber_manual_record"></mu-icon>
            <div class="content text-overflow">{{ item.content }}</div>
          </mu-flex>
        </mu-col>
        <mu-col
          span="2"
          style="font-size:.7rem;text-align:left;margin-top: 5px;"
        >{{ item.dateForNow }}</mu-col>
      </mu-row>
      <div class="arrow-icon">
        <mu-icon class="toggle-icon" color="#d8d8d8" size="35" value="keyboard_arrow_right"></mu-icon>
      </div>
    </section>
  </div>
</template>
<script>
// import http from "../../utils/http";
import business from "../../utils/business_product.js";
import Storage from "../../utils/storage.js";
import IndexMenu from "../../components/menu";
import Massage from "../Massage/App";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import _ from "lodash";

export default {
  name: "Menu",
  props: ["that"],
  components: {
    IndexMenu,
    swiper,
    swiperSlide,
    // eslint-disable-next-line vue/no-unused-components
    Massage
  },
  data() {
    return {
      menuData: [],
      swiperOption: {
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      bannerBg: [
        "#f3d0b3",
        "#C2C6C9",
        "#F3D9CF",
        "#2DD2E3",
        "#E2B87F",
        "#00CCCC"
      ],
      imgSrc: [
        require("../../assets/img/banner1-1.png"),
        require("../../assets/img/banner2-1.png"),
        require("../../assets/img/banner3-1.png"),
        require("../../assets/img/banner4-1.png"),
        require("../../assets/img/banner5-1.png"),
        require("../../assets/img/banner6-1.png")
      ],
      theActiveIndex: 0,
      banner: {
        employeeMap: {
          employeeId: "",
          employeeCode: "",
          employeeName: "",
          employeeDeptName: ""
        },
        equipInfo: {
          equipId: "",
          equipCode: "",
          equipName: "",
          equipColor: "",
          useStatus: ""
        },
        uqcInfo: {},
        route: {},
        kpartDaq: {},
        uexDaqInfoMap: {}
      },
      appIconBadgeQty: 0,
      messages: [{}, {}],
      noticeMsgs: [{}, {}], // 未通知的消息列表
      voiceMsgs: [{}, {}] // 未语音播报的消息列表
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    asynMenuData() {
      let _menuData = Object.assign([], this.menuData);
      let otherColor = business.hexToRgba(
        this.bannerBg[this.theActiveIndex],
        "0.3"
      );
      _menuData.forEach(menus => {
        menus = menus.map(item => {
          item.isActive = item.modlueFlag == this.theActiveIndex;
          item.bgColor = item.isActive
            ? this.bannerBg[item.modlueFlag]
            : otherColor; //"primary";
          return item;
        });
      });
      return _menuData;
    }
  },
  methods: {
    // 获取菜单
    async getMenu() {
      let menuFilter = Storage.getObject("menuFilter");
      let filter = !!menuFilter;
      let menuList = await business
        .getMenulist({ filter: filter })
        .then(list => {
          // list.forEach(menus => {
          //   menus = menus.map(item => {
          //     item.title = this.$t('chinese.' + item.title)
          //     return item;
          //   });
          // });
          return list;
        });
      this.menuData = menuList;
    },
    // 刷新方法,暂时未使用,和轮播有冲突
    refesh() {
      let that = this;
      this.$root.api.api.setCustomRefreshHeaderInfo(
        {
          bgColor: "#eee",
          //images:['widget://image/refesh.png'],
          //images: [''], //默认的是apiCloud提供图片，加上属性就会传自己定义的图片
          tips: {
            pull: "下拉刷新",
            threshold: "松开立即刷新",
            load: "正在刷新"
          }
        },
        function(ret, err) {
          //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
          that.getMenu();
          setTimeout(function() {
            that.$root.api.api.refreshHeaderLoadDone();
          }, 2000);
        }
      );
    },
    // 守护进程
    startAlive() {
      // eslint-disable-next-line no-undef
      let moduleProcessAlive = api.require("moduleProcessAlive");
      let params = {};
      moduleProcessAlive.startAlive(params, function(ret, err) {
        if (ret) {
          let data = ret.data;
          console.log(JSON.stringify(data));
        } else {
          alert(JSON.stringify(err));
        }
      });
    },
    // 退出系统
    existBack() {
      let that = this;
      that.$root.api.api.addEventListener(
        {
          name: "keyback"
        },
        function(ret, err) {
          if (ret) {
            that.$root.api.api.confirm(
              {
                title: "退出提示",
                msg: "确定要退出程序吗?",
                buttons: ["确定", "取消"]
              },
              function(ret, err) {
                let index = ret.buttonIndex;
                if (index == 1) {
                  that.$root.api.api.closeWidget({
                    silent: true
                  });
                }
              }
            );
          } else {
            alert(JSON.stringify(err));
          }
        }
      );
    },
    // 退回桌面
    exitApp() {
      let slef = this;
      slef.$root.api.api.addEventListener(
        {
          name: "keyback"
        },
        function(ret, err) {
          slef.$root.api.api.toast({
            msg: "再点一次返回到桌面",
            duration: 2000,
            location: "bottom"
          });
          slef.$root.api.api.addEventListener(
            {
              name: "keyback"
            },
            function(ret, err) {
              if (ret.keyCode == 4) {
                let rb = window.api.require("runBackground");
                rb.hideActivity();
                //window.api.toLauncher();
              } else {
                slef.$root.api.api.toast({
                  msg: JSON.stringify(err),
                  duration: 2000,
                  location: "bottom"
                });
                alert(JSON.stringify(err));
              }
            }
          );
          setTimeout(function() {
            slef.exitApp();
          }, 2000);
        }
      );
    },
    // 执行消息提醒任务
    exeNoticeTaskNotice() {
      let self = this;
      // this.noticeFn(this.noticeMsgs[0]);
      // 消息提醒
      this.noticeMsgs.forEach(item => {
        self.noticeFn(item);
      });
    },
    // 执行语言播报任务
    exeVoiceTaskNotice() {
      // 语音播报
      this.voiceFn(this.voiceMsgs);
    },
    // 设置图标消息数量
    setAppIconBadgeCount() {
      window.api.setAppIconBadge({
        badge: this.appIconBadgeQty
      });
    },
    // 消息通知
    noticeFn(itemObj) {
      let _isVoiceTip = Storage.getItem("_isVoiceTip");
      if (_isVoiceTip == "false" || _isVoiceTip == null) {
        // 消息提醒标志
        return false;
      }
      let self = this;
      if (itemObj.isNoticeUsed) {
        return false;
      }
      this.appIconBadgeQty++;
      let moduleNotification = window.api.require("moduleNotification");
      let params = {
        title: "来自MES的异常消息",
        content: itemObj.content
      };
      moduleNotification.showNotification(params, function(ret, err) {
        if (ret) {
          if (ret.status) {
            let resObj = self.noticeMsgs.map(value => {
              if (value.msgId == itemObj.msgId) {
                value.isNoticeUsed = true; // 标记为已通知
              }
              return value;
            });
            self.noticeMsgs = resObj;
            self.setAppIconBadgeCount();
          }
        } else {
          alert(JSON.stringify(err));
        }
      });
    },
    // 语言播报
    voiceFn(itemArray) {
      let _isVoice = Storage.getItem("_isVoice");
      if (_isVoice == "false" || _isVoice == null) {
        // 语言播报标志
        return false;
      }
      let self = this;
      let resObj = _.filter(itemArray, function(obj) {
        // 未通知的消息列表
        return obj.isVoiceUsed == false;
      });
      if (resObj.length == 0) {
        return false;
      }
      let toReadArray = [];
      resObj.forEach(item => {
        let workCenterName = item.workCenterName;
        let workCellName = item.workCellName;
        let content = item.content;
        let exceptionType = item.exceptionType;
        let launchId = item.launchId;
        let launchTime = item.launchTime;
        let str = `${workCenterName},${workCellName},${content},${exceptionType},${launchId},${launchTime}`;
        toReadArray.push(str);
      });
      let iflyRecognition = window.api.require("iflyRecognition");
      iflyRecognition.read(
        {
          readStr: toReadArray.toString(),
          speed: 60,
          volume: 60,
          voice: "xiaoyan",
          rate: 16000
          //audioPath: 'fs://speechRecogniser/read.mp3'
        },
        function(ret, err) {
          if (ret.status) {
            if (ret.speakProgress == 100) {
              let resObj = self.voiceMsgs.map(value => {
                value.isVoiceUsed = true; // 标记为已通知
                return value;
              });
              self.voiceMsgs = resObj;
            }
          } else {
            // eslint-disable-next-line no-undef
            api.alert({
              msg: err.msg
            });
          }
        }
      );
    },
    dealTimerTask() {
      let self = this;
      business
        .getMainMessages()
        .then(messages => {
          let a = new Set([...self.noticeMsgs]);
          let b = new Set([...messages]);
          let c = Array.from(new Set([...a, ...b]));
          let e = _.uniqBy(c, "msgId");
          let resObj = e.map(value => {
            if (value.isNoticeUsed == undefined) {
              value.isNoticeUsed = false; // 消息是否已经通知的标记
              value.isVoiceUsed = false; // 语音是否已经播报的标记
            }
            return value;
          });
          self.noticeMsgs = resObj;
          return self.noticeMsgs;
        })
        .then(obj => {
          obj.forEach(item => {
            this.noticeFn(item);
            this.voiceFn(obj);
          });
        });
    },
    initiflyRecognition() {
      // eslint-disable-next-line no-undef
      let iflyRecognition = api.require("iflyRecognition");
      iflyRecognition.createUtility(
        {
          android_appid: "5bd7b19a"
        },
        function(ret, err) {
          if (ret.status) {
            console.log("语音初始化成功");
          } else {
            console.log("语音初始化失败");
          }
        }
      );
    },
    changeTab() {
      if (business.isApicloud) {
        this.$root.api.api.setTabBarAttr({
          index: 1
        });
      } else {
        this.$emit("changeTab", 1);
      }
    }
  },
  mounted() {
    let that = this;
    //获取菜单
    this.getMenu();

    // 解决手机上绑定工位不生效的问题
    this.$root.api.api.addEventListener(
      {
        name: "viewappear"
      },
      function(ret, err) {
        let workCellInfo = Storage.getObject("workCells") || "";
        if (workCellInfo) {
          workCellInfo = workCellInfo[0] || {};
          workCellInfo = workCellInfo.name
            ? workCellInfo.name + " | " + workCellInfo.code
            : "";
          that.banner.workCellInfo = workCellInfo;
        }
        that.banner.workCellInfo = workCellInfo;
      }
    );

    // 解决手机上编辑菜单不生效的问题
    this.$root.api.api.addEventListener(
      {
        name: "menuDataRefresh"
      },
      function(ret, err) {
        that.getMenu();
      }
    );

    this.swiper.on("slideChange", function() {
      let swiperThis = this;
      window.setTimeout(() => {
        that.theActiveIndex = swiperThis.activeIndex;
      }, 10);
    });
    //获取顶部轮播内容
    business.getMainTopInfo(this.banner).then(res => {
      console.log(this.banner);
      this.banner = res;
    });

    // 获取底部消息内容
    business.getMainMessages().then(messages => {
      let resObj = messages.map(value => {
        value.isNoticeUsed = false; // 消息是否已经通知的标记
        value.isVoiceUsed = false; // 语音是否已经播报的标记
        return value;
      });
      this.messages = resObj;
      // android手机消息,语言可用,其它设备不可用
      if (business.isApicloud && this.$root.api.api.systemType == "android") {
        this.initiflyRecognition();
        this.noticeMsgs = _.filter(resObj, function(obj) {
          // 未通知的消息列表
          return obj.isNoticeUsed == false;
        });
        this.voiceMsgs = _.filter(resObj, function(obj) {
          // 未语音播报的消息列表
          return obj.isVoiceUsed == false;
        });
        this.startAlive();
        this.exitApp();
        this.exeNoticeTaskNotice();
        this.exeVoiceTaskNotice();
        // 定时获取消息
        setInterval(() => {
          this.dealTimerTask();
        }, 60000);
      } else {
        this.existBack();
      }
    });
  }
};
</script>
<style scoped lang="scss">
#bg1 {
  background: url("../../assets/img/banner1.png") center/100% 100%;
  z-index: -1;
}
#bg2 {
  background: url("../../assets/img/banner2.png") center/100% 100%;
  z-index: -1;
}
#bg3 {
  background: url("../../assets/img/banner3.png") center/100% 100%;
  z-index: -1;
}
#bg4 {
  background: url("../../assets/img/banner4.png") center/100% 100%;
  z-index: -1;
}
#bg5 {
  background: url("../../assets/img/banner5.png") center/100% 100%;
  z-index: -1;
}
#bg6 {
  background: url("../../assets/img/banner6.png") center/100% 100%;
  z-index: -1;
}

.top-banner {
  /deep/.swiper-pagination-bullet {
    margin: 0 3px;
    &.swiper-pagination-bullet-active {
      background: #888;
    }
  }

  .pagination-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  .card-wrapper {
    padding: 3vw 4vw;
    .swiper-card {
      width: 100%;
      height: 7rem;
      color: #fff;
      border-radius: 8px;
      padding: 2vw 3vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .toggle-icon {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }
      .toggle-icon1 {
        width: 20px;
        height: 24px;
        margin-right: 10px;
      }
      .card-header {
        font-size: 16px;
      }
      .card-content {
        font-size: 18px;
      }
    }
    .card-sub-con {
      padding: 0 0.8rem;
    }
  }
}
.ex-messages {
  font-size: 14px;
  color: #999;
  padding: 3vw 4vw;
  position: relative;
  .mu-icon {
    margin-right: 5px;
    margin-bottom: 4px;
  }
  .content {
    padding: 0 2vw;
  }
  .arrow-icon {
    position: absolute;
    right: 0%;
    bottom: 15px;
  }
}
</style>