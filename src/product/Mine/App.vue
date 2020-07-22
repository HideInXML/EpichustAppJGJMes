<template>
  <div id="app">
    <!--    个人信息    -->
    <mu-container>
      <mu-card style="width: 100%; margin: 0 auto;">
        <mu-card-header :title="personInfo['empName']+' '+personInfo.userName+'' ">
          <mu-avatar slot="avatar" color="blue" class="main-bg">
            <mu-icon size="32" value="account_circle"></mu-icon>
          </mu-avatar>
        </mu-card-header>
        <mu-card-text>
          <mu-flex class="flex-wrapper" justify-content="between">
            <p>{{$t('base.email')}}</p>
            <p>{{personInfo.userEmail}}</p>
          </mu-flex>
        </mu-card-text>
        <mu-card-text>
          <mu-flex class="flex-wrapper" justify-content="between">
            <p v-text="this.showWorkCenterOrFactory"></p>
            <p>{{factoryName}}</p>
          </mu-flex>
        </mu-card-text>
      </mu-card>
    </mu-container>
    <!--   功能页面   -->
    <mu-paper :z-depth="0" class="demo-list-wrap">
      <mu-list class="item-border-b">
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="speaker_notes"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.voice_announcements')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-action>
              <mu-switch
                v-model="voice"
                :label="voiceLabel"
                ripple
                @change="changeData('voice',$event)"
              ></mu-switch>
            </mu-list-item-action>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar size="28" class="main-bg">
              <mu-icon size="20" value="record_voice_over"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.audible_tone')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-action>
              <mu-switch
                v-model="voiceTip"
                :label="voiceTipLabel"
                ripple
                @change="changeData('voiceTip',$event)"
              ></mu-switch>
            </mu-list-item-action>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar size="28" class="main-bg">
              <mu-icon size="20" value="input"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.automatic_logon')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-action>
              <mu-switch
                v-model="autoLogin"
                :label="loginLabel"
                ripple
                @change="changeData('autoLogin',$event)"
              ></mu-switch>
            </mu-list-item-action>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button @click="bindWorkCellClk">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="donut_small"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.binding_station')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button @click="changeNetwork">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="rss_feed"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.switching_gateway')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button @click="changeFatory">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="swap_horiz"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.switching_factories')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button @click="passwordChange">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="vpn_key"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.change_password')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button @click="checkUpdate">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="cloud_upload"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.check_updates')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button @click="editMenu">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="create"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.edit_menu')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button @click="control">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="desktop_mac"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.remote_control')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item avatar button @click="aboutFn">
          <mu-list-item-action>
            <mu-avatar size="28" color="blue" class="main-bg">
              <mu-icon size="20" value="info"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{$t('base.about')}}</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <!-- 退出登录弹框 -->
        <mu-container class="button-wrapper">
          <mu-flex justify-content="center" align-items="center">
            <mu-button
              full-width
              round
              large
              color="info"
              class="main-bg"
              @click="loginOut"
            >{{$t('base.quit')}}</mu-button>
          </mu-flex>
        </mu-container>
      </mu-list>
    </mu-paper>

    <!-- 关于的弹框 -->
    <mu-container>
      <mu-dialog
        :title="$t('base.about')"
        width="500"
        :scrollable="scrollable"
        :open.sync="openScroll"
        max-width="500"
        :padding="padding"
      >
        <mu-list>
          <mu-list-item>{{$t('base.current_version')}}:{{appVersion}}</mu-list-item>
          <mu-list-item>{{showWorkCenterOrFactory}}:{{factoryName}}</mu-list-item>
        </mu-list>
        <mu-button
          slot="actions"
          flat
          color="primary"
          @click="closeScrollDialog"
        >{{$t('base.confirm')}}</mu-button>
      </mu-dialog>
    </mu-container>

    <!-- 修改密码的弹框 -->
    <mu-container>
      <mu-dialog
        :title="$t('base.change_password')"
        width="500"
        :scrollable="scrollableP"
        :open.sync="openScrollP"
        max-width="330"
        :padding="padding"
      >
        <mu-text-field
          ref="username"
          v-model="user.username"
          :label="$t('base.username')"
          label-float
          help-text
          icon="account_circle"
          :error-text="usernameText"
        ></mu-text-field>
        <mu-text-field
          ref="oldPassword"
          v-model="user.oldPassword"
          :label="$t('base.password')"
          label-float
          icon="locked"
          :error-text="oldPasswordText"
          type="password"
        ></mu-text-field>
        <mu-text-field
          ref="newPassword"
          v-model="user.newPassword"
          :label="$t('base.new_password')"
          label-float
          icon="locked"
          :error-text="newPasswordText"
          type="password"
        ></mu-text-field>
        <mu-button
          slot="actions"
          flat
          color="primary"
          :esc-press-close="false"
          :overlay-close="false"
          @click="cancelUpdatePassWord"
        >{{$t('base.cancel')}}</mu-button>
        <mu-button
          slot="actions"
          flat
          color="primary"
          @click="updatePassWord"
        >{{$t('base.confirm_change')}}</mu-button>
      </mu-dialog>
    </mu-container>

    <!-- 下载进度条 -->
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
      <mu-appbar color="primary" :title="$t('message.message_login_update_down')"></mu-appbar>
      <div class="download-modal">
        <mu-flex class="linear-progress">
          <mu-linear-progress :value="linear" size="18" mode="determinate" color="green"></mu-linear-progress>
        </mu-flex>
        <div style="margin-top:10vh;">{{$t('message.message_login_update_downing') }}</div>
        <div class="percent">{{linear}}%</div>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
import http from "../../utils/http.js";
import Vue from "vue";
import qs from "qs";
import business from "../../utils/business_product.js";
// import SafeHeader from "../../components/safeHeader";
import "muse-ui-message/dist/muse-ui-message.css";
import Toast from "muse-ui-toast";
import Message from "muse-ui-message";
import Storage from "../../utils/storage.js";

Vue.use(Message);

export default {
  name: "Mine",
  components: {},
  data: () => {
    return {
      voice: false,
      voiceTip: false,
      autoLogin: false,
      openScroll: false,
      scrollable: true,
      openScrollP: false,
      scrollableP: true,
      voiceLabel: "关",
      voiceTipLabel: "关",
      loginLabel: "关",
      appVersion: "",
      bindWorkCell: "",
      currentWorkCenterOrFactory: "",
      workCenterName: "",
      factoryName: "",
      padding: 15,
      user: {
        username: "",
        oldPassword: "",
        newPassword: ""
      },
      visibility: false,
      usernameText: "",
      oldPasswordText: "",
      newPasswordText: "",
      loginLoading: false,
      openFullscreen: false,
      linear: 0,
      personInfo: {
        empName: "",
        userName: "",
        userEmail: ""
      },
      showWorkCenterOrFactory: ""
    };
  },
  methods: {
    changeData(value, e) {
      if (value == "voice") {
        Storage.setItem("_isVoice", e);
        this.voice
          ? (this.voiceLabel = this.$i18n.t("base.on"))
          : (this.voiceLabel = this.$i18n.t("base.off"));
      } else if (value == "voiceTip") {
        Storage.setItem("_isVoiceTip", e);
        this.voiceTip
          ? (this.voiceTipLabel = this.$i18n.t("base.on"))
          : (this.voiceTipLabel = this.$i18n.t("base.off"));
      } else if (value == "autoLogin") {
        Storage.setItem("_isAutoLogin", e);
        this.autoLogin
          ? (this.loginLabel = this.$i18n.t("base.on"))
          : (this.loginLabel = this.$i18n.t("base.off"));
      }
    },
    goPage(sysGranularity) {
      let name = "";
        let url = "";
      // 0是组工厂模式；1是组工作中心模式
      if (sysGranularity == "0") {
        name = "Factory"
        url = "./Factory.html"
    
      } else {
        name = "WorkCenter"
        url = "./WorkCenter.html"
      }
      this.$root.api.api.openWin({
        name: name,
        url: url
      });
    },
    changeFatory() {
      let loginConfig = Storage.getObject("loginConfig");
      let sysGranularity = loginConfig.sysGranularity;
      this.goPage(sysGranularity);
    },
    bindWorkCellClk() {
      this.$root.api.api.openWin({
        name: "WorkCell",
        url: "./WorkCell.html",
        pageParam: {
          name: ""
        }
      });
    },
    passwordChange() {
      this.openScrollP = true;
    },
    cancelUpdatePassWord() {
      this.openScrollP = false;
    },
    async updatePassWord() {
      if (!this.user.username) {
        this.usernameText = this.$i18n.t("base.username_change");
        this.$refs.username.focus();
        return false;
      } else {
        this.usernameText = "";
      }
      if (!this.user.oldPassword) {
        this.oldPasswordText = this.$i18n.t("base.password_change");
        this.$refs.oldPassword.focus();
        return false;
      } else {
        this.oldPasswordText = "";
      }
      if (!this.user.newPassword) {
        this.newPasswordText = this.$i18n.t("base.new_password_change");
        this.$refs.newPassword.focus();
        return false;
      } else {
        this.newPasswordText = "";
      }
      let params = {};
      params.username = this.user.username;
      params.oldPassword = this.user.oldPassword;
      params.newPassword = this.user.newPassword;
      try {
        let res = await business.doChangePwd(params);
        if (res.status == 200 && res.data.erroCode == 0) {
          Toast.success({ message: res.data.msg, close: false });
          this.openScrollP = false;
          Storage.removeItem("user");
          setTimeout(function() {
            // eslint-disable-next-line no-undef
            api.rebootApp();
          }, 3000);
        } else {
          Toast.error({ message: res.data.msg, close: false });
        }
      } catch (error) {
        Toast.error({ message: JSON.stringify(error), close: false });
      }
    },
    checkUpdate() {
      const myVersion = this.$root.api.api.appVersion;
      let that = this;
      http
        .post({
          url: "productPadCommController!getAppVer.m",
          data: { ver: this.$root.api.api.appVersion }
        })
        .then(res => {
          if (res.status == 200 && res.data.type == "success") {
            let fs = this.$root.api.api.require("fs");
            fs.exist({ path: "fs://EpichustApp.apk" }, function(ret, err) {
              if (ret.exist) {
                fs.remove({ path: "fs://EpichustApp.apk" }, 
                // function(ret, err
                // ) {}
                );
              }
            });
            let reslut = res.data.data.split(":");
            if (reslut[0] == "S") {
              let serverVersion = Number(reslut[1].replace(/\./g, ""));
              let thisVersion = Number(myVersion.replace(/\./g, ""));
              if (serverVersion > thisVersion) {
                Message.confirm(
                  this.$i18n.t("message.message_login_updateapp") + reslut[1],
                  this.$i18n.t("base.prompt"),
                  {
                    type: "warning"
                  }
                ).then(res => {
                  if (!res.result) {
                    return false;
                  }
                  this.openFullscreen = true;
                  let network = Storage.getObject("network");
                  let selectedIndex = Storage.getObject("selectedIndex");
                  network = network[selectedIndex];
                  let downloadUrl = `http://${network.ip}:${network.port}/${network.appName}/ext/download/EpichustApp_${reslut[1]}.apk`;
                  console.log(downloadUrl);
                  this.$root.api.api.download(
                    {
                      url: downloadUrl,
                      report: true,
                      cache: true,
                      allowResume: true,
                      savePath: "fs://EpichustApp.apk"
                    },
                    function(ret, err) {
                      console.log(JSON.stringify(ret));
                      if (ret && ret.state == 0) {
                        /* 下载进行中 */
                        that.linear = ret.percent;
                      }
                      if (ret && ret.state == 1) {
                        /* 下载完成 */
                        that.linear = ret.percent;
                        let savePath = ret.savePath;
                        that.$root.api.api.installApp({
                          appUri: savePath
                        });
                      }
                      if (ret && ret.state == 2) {
                        Toast.error({
                          message: this.$i18n.t(
                            "message.message_login_update_error"
                          ),
                          close: false
                        });
                      }
                    }
                  );
                });
              } else if (serverVersion < thisVersion) {
                Message.confirm(
                  this.$i18n.t("message.message_login_appversion"),
                  this.$i18n.t("base.prompt"),
                  { type: "warning" }
                );
              } else if (serverVersion == thisVersion) {
                Toast.success({
                  message: this.$i18n.t("message.message_mine_lastappversion"),
                  close: false
                });
                //Message.confirm( "您当前版本已是最新版本,无需更新!。","提示",{ type: "warning"});
              }
            } else {
              Toast.error({ message: reslut, close: false });
            }
          }
        });
    },
    control(value) {
      window.api.openApp(
        {
          //androidPkg: 'com.teamviewer.teamviewer.market.mobile',
          androidPkg: "com.teamviewer.teamviewer.market.mobile",
          mimeType: "text/html"
        },
        function(ret, err) {
          if (ret) {
            console.log(JSON.stringify(ret));
          } else {
            console.log(JSON.stringify(err));
          }
        }
      );
    },
    loginOut(value) {
      Message.confirm(
        this.$i18n.t("message.message_mine_quitout"),
        this.$i18n.t("base.prompt"),
        {
          type: "warning",
          icon: "cloud_upload",
          okLabel: this.$i18n.t("base.confirm"),
          cancelLabel: this.$i18n.t("base.cancel")
        }
      ).then(({ result }) => {
        if (result) {
          window.api.closeToWin({
            name: "root"
          });
        }
      });
    },
    aboutFn(value) {
      this.openScroll = true;
    },
    closeScrollDialog() {
      this.openScroll = false;
    },
    editMenu() {
      this.$root.api.api.openWin({
        name: "EditMenu",
        url: "./EditMenu.html"
      });
    },
    async getUserInfo() {
      try {
        let loginConfig = Storage.getObject("loginConfig");
        let loginName = loginConfig.un;
        let data = qs.stringify({ loginName: loginName });
        await http
          .post({
            url: "productPadCommController!getUserInfoByLoginName.m",
            data,
            autoLogin: true
          })
          .then(res => {
            if (res.status == 200 && res.data.type == "error") {
              Toast.error({
                message: JSON.stringify(res.data.data),
                close: false
              });
            } else {
              let arr = res.data.data;
              this.personInfo = JSON.parse(arr);
            }
          });
      } catch (error) {
        Toast.error({
          message: JSON.stringify(error),
          close: false
        });
      }
    },
    changeNetwork() {
      this.$root.api.api.openWin({
        name: "network",
        url: "./network.html",
        pageParam: {
          name: ""
        }
      });
    }
  },
  mounted: function() {
    let that = this;
    this.$nextTick(function() {
      this.getUserInfo();
    });
    //从localstorage中拿到在登陆页面选择的语言类型
    let lang = Storage.getObject("lang").value;
    if (lang) {
      this.$i18n.locale = lang;
    } else {
      this.$i18n.locale = "cn";
    }
    //从localstorage中拿到是否为工厂
    this.appVersion = this.$root.api.api.appVersion;
    let loginConfig = Storage.getObject("loginConfig");
    let sysGranularity = loginConfig.sysGranularity; // 0是组工厂模式；1是组工作中心模式
    //let isMultipleWorkCenters = loginConfig.isMultipleWorkCenters; // 是否启用多工作中心  false 不启用, true 启用
    let multipleObj = Storage.getObject("multipleObj");
    sysGranularity == "0"
      ? (this.currentWorkCenterOrFactory = "工厂")
      : (this.currentWorkCenterOrFactory = "工作中心");
    sysGranularity == "0"
      ? (this.showWorkCenterOrFactory = this.$i18n.t("base.factory"))
      : (this.showWorkCenterOrFactory = this.$i18n.t("base.workcenter"));
    if (multipleObj == null) {
      sysGranularity == "0"
        ? (this.factoryName = "")
        : (this.workCenterName = "");
    } else {
      sysGranularity == "0"
        ? (this.factoryName =
            multipleObj.siteName + `(${multipleObj.siteCode})`)
        : (this.workCenterName =
            multipleObj.workCenterName + `(${multipleObj.workCenterCode})`);
    }
    let isVoice = Storage.getItem("_isVoice");
    let isVoiceTip = Storage.getItem("_isVoiceTip");
    let isAutoLogin = Storage.getItem("_isAutoLogin");
    // 语言播报
    if (isVoice == "true") {
      this.voiceLabel = this.$i18n.t("base.on");
      this.voice = true;
    } else {
      this.voiceLabel = this.$i18n.t("base.off");
      this.voice = false;
    }
    // 声音提示
    if (isVoiceTip == "true") {
      this.voiceTipLabel = this.$i18n.t("base.on");
      this.voiceTip = true;
    } else {
      this.voiceTipLabel = this.$i18n.t("base.off");
      this.voiceTip = false;
    }
    // 自动登录
    if (isAutoLogin == "true") {
      this.loginLabel = this.$i18n.t("base.on");
      this.autoLogin = true;
    } else {
      this.loginLabel = this.$i18n.t("base.off");
      this.voiautoLoginceTip = false;
    }
    // 解决手机上切换工厂无效的问题
    this.$root.api.api.addEventListener(
      {
        name: "viewappear"
      },
      function(ret, err) {
        let multipleObj = Storage.getObject("multipleObj");
        if (multipleObj) {
          let factoryName = multipleObj.siteName
            ? multipleObj.siteName + " ( " + multipleObj.siteCode + " ) "
            : "";
          that.factoryName = factoryName;
        }
      }
    );
  }
};
</script>
<style scoped lang="scss">
.demo-list-wrap {
  width: 100%;
  overflow: hidden;
}
.download-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  height: 80vh;
  width: 100vw;
  .linear-progress {
    width: 100%;
  }
  .percent {
    font-size: 12vw;
    color: rgb(76, 175, 80);
  }
}
.mu-card-header,
.mu-card-text {
  padding: 5px 16px;
}
.mu-card {
  margin-top: 10px !important;
}
.mu-card-header-title {
  margin-top: 10px;
}
.button-wrapper {
  margin: 8vw 0;
}
</style>