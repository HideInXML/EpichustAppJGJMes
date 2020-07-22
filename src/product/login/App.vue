<template>
  <div id="app">
    <mu-container class="login-box">
      <mu-flex justify-content="end" align-items="center" class="login-img">
        <img src="../../assets/img/epichust-le.png" />
      </mu-flex>
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
        ref="password"
        v-model="user.password"
        v-on:keyup.enter="signIn"
        :label="$t('base.password')"
        label-float
        icon="locked"
        :error-text="passwordText"
        :action-icon="visibility ? 'visibility' : 'visibility_off'"
        :action-click="() => (visibility = !visibility)"
        :type="visibility ? 'text' : 'password'"
      ></mu-text-field>
      <mu-flex justify-content="between" align-items="center" class="check-box">
        <mu-button flat ref="selectLangs" @click="langsOpen = !langsOpen">语言/langs：{{selectLang}}</mu-button>
        <mu-checkbox
          class="mu-checkbox"
          v-model="user.remember"
          :label="$t('base.remember_me')"
          style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
        ></mu-checkbox>
      </mu-flex>
      <mu-button
        round
        class="login-btn"
        style="letter-spacing: 2px;"
        full-width
        color="primary"
        @click="signIn()"
        v-loading="loginLoading"
        data-mu-loading-size="24"
      >{{ $t('base.sign_in') }}</mu-button>
      <!-- 更新下载 -->
    </mu-container>
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
    <!-- 选择工厂 -->
    <mu-dialog
      :title="$t('message.message_login_choose_factory')"
      width="360"
      max-width="500"
      scrollable
      :open.sync="openSimple"
    >
      <mu-list>
        <mu-list-item :key="index" v-for="(factory,index) in factoryList">
          <mu-list-item-content>
            <mu-radio
              :value="factory.siteCode"
              :label="factory.siteName +'(' + factory.siteCode + ')' "
              v-model="factoryCode"
            ></mu-radio>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
      <mu-button
        slot="actions"
        flat
        color="primary"
        @click="closeSimpleDialog()"
      >{{$t('base.confirm') }}</mu-button>
    </mu-dialog>
    <!-- 多语言 -->
    <mu-popover cover :open.sync="langsOpen" :trigger="trigger">
      <mu-list>
        <mu-list-item
          button
          v-for="lang of langs"
          :key="lang.value"
          @click="changeLang(lang)"
          :class="{langSelected:lang.selected}"
        >
          <mu-list-item-title>{{lang.label}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-popover>
    <!-- 报错弹框 -->
    <mu-dialog
      :title="$t('message.message_login_networkerror')"
      width="360"
      max-width="500"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert"
    >
      {{$t('message.message_login_networktip')}}
      <mu-button
        slot="actions"
        flat
        color="primary"
        @click="networkerror_disagree"
      >{{$t('base.cancel')}}</mu-button>
      <mu-button
        slot="actions"
        flat
        color="primary"
        @click="networkerror_agree"
      >{{$t('base.confirm')}}</mu-button>
    </mu-dialog>
    <!-- 版权信息 -->
    <div class="login-copyright">
      <p style="margin-bottom:0px;font-size:12px;">艾普工华科技（武汉）有限公司</p>Copyright&copy;2012-2019
    </div>
  </div>
</template>
<script>
import business from "../../utils/business_product.js";
// load css
import "muse-ui-message/dist/muse-ui-message.css";
import Toast from "muse-ui-toast";
import Message from "muse-ui-message";
import _ from "lodash";
import Storage from "../../utils/storage.js";
import Static from "../../utils/static.js";

export default {
  name: "login",
  components: {},
  data: () => {
    return {
      user: {
        username: "",
        password: "",
        remember: true
      },
      visibility: false,
      usernameText: "",
      passwordText: "",
      loginLoading: false,
      openFullscreen: false,
      linear: 0,
      openSimple: false,
      factoryList: [],
      factoryCode: "",
      langs: [
        { label: "中文", value: "cn", selected: true },
        { label: "English", value: "en", selected: false }
      ],
      langsOpen: false, // 多语言选项
      trigger: null,
      openAlert: false
    };
  },
  computed: {
    selectLang() {
      let _selectLang = this.langs.find(v => v.selected);
      return _selectLang.label;
    }
  },
  methods: {
    signIn() {
      if (!this.user.username) {
        this.usernameText = this.$i18n.t("message.message_login_inputusername");
        this.$refs.username.focus();
        return false;
      } else {
        this.usernameText = "";
      }
      if (!this.user.password) {
        this.passwordText = this.$i18n.t("message.message_login_inputpassword");
        this.$refs.password.focus();
        return false;
      } else {
        this.passwordText = "";
      }
      this.loginLoading = true;
      business
        .login(this.user)
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            Storage.setObject("user", this.user);
            Storage.setObject("loginConfig", res.data);
            let lang = Storage.getObject("lang");
            let mainPageParams = lang
              ? Static["mainPageParams_" + lang.value]
              : Static["mainPageParams_cn"];
            if (res.data.isMultipleWorkCenters) {
              let multipleObj = Storage.getObject("multipleObj");
              if (!multipleObj) {
                this.getFactory();
              } else {
                this.$root.api.api.openTabLayout(mainPageParams);
              }
            } else {
              this.$root.api.api.openTabLayout(mainPageParams);
            }
          } else {
            alert(JSON.stringify(res.data.msg));
          }
        })
        .catch(err => {
          // Toast.error({
          //   message: this.$i18n.t('message.message_login_networkerror')+':' + JSON.stringify(err),
          //   close: true,
          //   time: 60000
          // });
          console.log(JSON.stringify(err));
        })
        .finally(() => {
          this.loginLoading = false;
        });
    },
    closeSimpleDialog() {
      if (!this.factoryCode) {
        Toast.warning({
          message: this.$i18n.t("message.message_login_choosefactory"),
          close: false
        });
        return false;
      }
      let that = this;
      let resObj = _.find(this.factoryList, function(obj) {
        return obj.siteCode == that.factoryCode;
      });
      Storage.setObject("multipleObj", resObj);
      this.openSimple = false;
      if (!Storage.getObject("lang")) {
        Storage.setObject("lang", {
          label: "中文",
          selected: false,
          value: "cn"
        });
      }
      let lang = Storage.getObject("lang");
      let mainPageParams = lang
        ? Static["mainPageParams_" + lang.value]
        : Static["mainPageParams_cn"];
      this.$root.api.api.openTabLayout(mainPageParams);
    },
    async getFactory() {
      try {
        let res = await business.getFactory();
        if (res.status == 200 && res.data.erroCode == 0) {
          this.factoryList = res.data.data;
          this.openSimple = true;
        } else {
          Toast.error({
            message: JSON.stringify(res.data.msg),
            close: false
          });
        }
      } catch (error) {
        Toast.error({
          message: JSON.stringify(error),
          close: false
        });
      }
    },
    changeLang(lang) {
      console.log(lang);
      this.$i18n.locale = lang.value;
      Storage.setObject("lang", lang);
      this.langs = this.langs.map(item => {
        item.selected = item.value == lang.value;
        return item;
      });
      this.langsOpen = !this.langsOpen;
    },
    openAlertDialog() {
      this.openAlert = true;
    },
    networkerror_disagree() {
      this.openAlert = false;
    },
    networkerror_agree() {
      this.openAlert = false;
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
    const myVersion = this.$root.api.api.appVersion;
    let userObj = Storage.getObject("user");
    if (userObj != null) {
      let isRemeber = userObj.remember;
      if (isRemeber) {
        this.user.username = userObj.username;
        this.user.password = userObj.password;
        this.user.remember = userObj.remember;
      }
    }
    //alert(JSON.stringify(userObj));
    let that = this;
    business
      .post({
        url: "productPadCommController!getAppVer.m",
        data: { ver: this.$root.api.api.appVersion }
      })
      .then(res => {
        if (res.status == 200 && res.data.type == "success") {
          let fs = this.$root.api.api.require("fs");
          if (!fs) {
            return true;
          }
          fs.exist({ path: "fs://EpichustApp.apk" }, function(ret, err) {
            if (ret.exist) {
              fs.remove(
                {
                  path: "fs://EpichustApp.apk"
                },
                function(ret, err) {
                  if (ret.status) {
                  }
                }
              );
            }
          });
          let reslut = res.data.data.split(":");
          console.log(reslut);
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
                {
                  type: "warning"
                }
              );
            }
          }
        }
      })
      .catch(error => {
        if (error) {
          console.log(error.stack);
        }
        this.openAlertDialog();
      })
      .then(res => {
        let isAutoLogin = Storage.getItem("_isAutoLogin");
        if (isAutoLogin == "true") {
          this.signIn();
        }
      });
    //设置语言选项
    let theLang = Storage.getObject("lang");
    if (theLang) {
      this.langs = this.langs.map(item => {
        item.selected = item.value == theLang.value;
        return item;
      });
    }
    this.trigger = this.$refs.selectLangs.$el;
  }
};
</script>
<style scoped lang="scss">
.mu-input /deep/ input.mu-text-field-input::-webkit-input-placeholder{
  color: red
}
@media screen and (min-width: 320px) and (max-width: 414px) {
  @keyframes bg-move {
    0% {
      background-position-y: 0px;
    }
    50% {
      background-position-y: 100%;
    }
    100% {
      background-position-y: 0%;
    }
  }
  #app {
    height: 100vh;
    position: relative;
    min-height: 500px;
    background: aquamarine url("../../assets/img/7.15.2.jpg") center/120% 120%
      no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1px;
    background-position-y: 0px;
    animation: bg-move 30s infinite;
  }
}

@media screen and (min-width: 415px) {
  @keyframes bg-move {
    0% {
      background-position-y: 0px;
    }
    50% {
      background-position-y: 100%;
    }
    100% {
      background-position-y: 0%;
    }
  }
  #app {
    height: 100vh;
    position: relative;
    background: aquamarine url("../../assets/img/pad-2.jpg") center/120% 120%
      no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1px;
    background-position-y: 0px;
    animation: bg-move 30s infinite;
  }
}

.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  max-width: 92%;
  padding: 20px 10px;
  border-radius: 18px;
  margin: 8vw 0;
  flex-shrink: 0;
  .mu-input,
  .check-box,
  .login-btn {
    width: 80vw;
  }
  .login-btn {
    margin-top: 8vw;
    padding: 20px;
    letter-spacing: 8px;
    background: linear-gradient(225deg, #00dcc0 0, #005af0 75%);
  }
  .login-img {
    margin: 6vw 0 8vw;
    img {
      width: 50%;
      margin: 0 auto;
    }
  }
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
.langSelected {
  background-color: #eee;
  .mu-item-title {
    color: #2196f3;
  }
}
.mu-checkbox {
  /deep/.mu-checkbox-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.login-copyright {
  color: white;
  position: absolute;
  bottom: 5px;
  text-align: center;
  font-size: 12px;
}
</style>