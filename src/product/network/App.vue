<template>
  <div id="app">
    <safe-header v-bind="{title:$t('base.setting_network'),fixedTop:true}">
      <template v-slot:rightArea>
        <mu-button flat @click="save()">{{$t('base.save')}}</mu-button>
      </template>
    </safe-header>
    <mu-list>
      <div v-for="(item,index) of network" :key="index">
        <mu-sub-header>{{item.title}}</mu-sub-header>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>ip：</mu-list-item-action>
          <mu-list-item-content>
            <mu-text-field full-width class placeholder v-model="item.ip"></mu-text-field>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>{{$t('base.port')}}：</mu-list-item-action>
          <mu-list-item-content>
            <mu-text-field full-width class placeholder v-model="item.port"></mu-text-field>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button :ripple="false">
          <mu-list-item-action>{{$t('base.application_name')}}：</mu-list-item-action>
          <mu-list-item-content>
            <mu-text-field full-width class placeholder v-model="item.appName"></mu-text-field>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button :ripple="false" style="margin-top:10px">
          <mu-list-item-title>
            <mu-radio v-model="selectedIndex" :value="index" :label="$t('base.set_default')"></mu-radio>
          </mu-list-item-title>
          <mu-list-item-action>
            <mu-button color="primary" @click="check(item)">{{$t('base.network_test')}}</mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </div>
    </mu-list>
  </div>
</template>
<script>
import SafeHeader from "../../components/safeHeader";

import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
import "muse-ui-message/dist/muse-ui-message.css";
import Loading from "muse-ui-loading";
import Toast from "muse-ui-toast";
import Message from "muse-ui-message";
import Storage from "../../utils/storage.js";

export default {
  name: "network",
  components: {
    SafeHeader
  },
  data() {
    return {
      network: [
        {
          title: this.$i18n.t("network.network_one"),
          ip: "10.1.1.190",
          port: "8080",
          appName: "uma-exception-mars",
          save: true,
          checked: false
        },
        {
          title: this.$i18n.t("network.network_two"),
          ip: "10.1.1.190",
          port: "8080",
          appName: "uma-exception-mars",
          save: true,
          checked: false
        }
      ],
      selectedIndex: 0
    };
  },
  methods: {
    check(item) {
      if (!item.ip) {
        Message.alert(
          this.$i18n.t("message.message_network_noip"),
          this.$i18n.t("base.prompt")
        );
        return false;
      }
      const loading = Loading();
      this.$root.api
        .checkNetwork(item)
        .then(res => {
          if (res.status == true) {
            item.checked = true;
            Toast.success({
              message: this.$i18n.t("message.message_network_success"),
              close: false
            });
          } else {
            Toast.error({
              message: this.$i18n.t("message.message_network_error"),
              close: false
            });
          }
        })
        .finally(res => {
          loading.close();
        });
    },
    save() {
      let selectedNetwork = this.network[this.selectedIndex];
      if (selectedNetwork.checked) {
        this.saveStorage();
      } else {
        Message.confirm(
          this.$i18n.t("message.message_network_nocheck"),
          this.$i18n.t("base.prompt"),
          {
            type: "warning",
            okLabel: this.$i18n.t('base.confirm'), // 对话框确定按钮文字
            cancelLabel: this.$i18n.t('base.cancel') // 对话框取消按钮文字
          }
        ).then(({ result }) => {
          if (result) {
            this.saveStorage();
          }
        });
      }
      //this.$root.api.api.alert({msg:'ok'})
    },
    saveStorage() {
      Storage.setObject("network", this.network);
      Storage.setItem("selectedIndex", this.selectedIndex);
      this.$root.api.api.openWin({
        name: "login",
        url: "./login.html",
        pageParam: {
          name: "test"
        },
        progress: {
          type: "default"
        }
      });
    }
  },
  mounted: function() {
    //从LocalStrong中拿到在登陆页面选择的语言类型
    if (!Storage.getObject("lang")) {
      Storage.setObject("lang", {
        label: "中文",
        selected: false,
        value: "cn"
      });
    }
    let lang = Storage.getObject("lang").value;
    if (lang) {
      this.$i18n.locale = lang;
    } else {
      this.$i18n.locale = "cn";
    }

    let network = Storage.getObject("network");
    let selectedIndex = Storage.getItem("selectedIndex");
    if (network) {
      this.network = network;
      this.network[0].title = this.$i18n.t("network.network_one");
      this.network[1].title = this.$i18n.t("network.network_two");
    }
    if (selectedIndex) {
      this.selectedIndex = Number(selectedIndex);
    }
  }
};
</script>
<style scoped lang="scss">
.mu-list .mu-sub-header:first-child {
  margin-top: 0;
  color: #2196f3;
}
.mu-item {
  & > .mu-item-action {
    font-size: 16px;
  }
  .mu-input.full-width {
    height: 48px;
    margin: 0;
    padding: 0;
  }
}
</style>