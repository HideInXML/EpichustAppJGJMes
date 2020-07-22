<template>
  <div id="app" style="height: 100vh;" class="flex-bottom-auto">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'检测单创建',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <!-- 检测单号 -->
    <section class="sessionOne">
      <mu-paper
        :z-depth="0"
        style="height:5rem;line-height:2rem;text-align:center;"
        class="spacing_shadowdiv"
      >
        <mu-list>
          <mu-list-item button :ripple="false">
            <mu-row style="width: 100%;color:#fff;">
              <mu-col span="12" style="font-size:16px;text-align:left;font-weight:bold;">检测单号</mu-col>
              <mu-col
                span="12"
                style="font-size:1rem;text-align:center;padding-right: 15px;"
              >WIP-20190703-1001</mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 工作中心 -->
    <section>
      <mu-paper :z-depth="1">
        <mu-list class="work-center">
          <mu-sub-header class="item-hedaer">工作中心信息</mu-sub-header>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="location_on" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title class="fontcolor">请选择工作中心</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 检测模板信息 -->
    <section style="background-color: #2cb69a;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items">
          <mu-sub-header class="item-hedaer">检测模板信息</mu-sub-header>
          <mu-list-item>
            <mu-list-item-action>
              <mu-icon value="subtitles" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                v-model="mrlCode"
                underline-color="#2cb69a"
                placeholder="请输入物料编码"
              ></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action @click="toSacnner">
              <mu-icon class="toggle-icon" size="30" value="center_focus_strong"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="format_list_bulleted" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title class="fontcolor">请选择检测模板</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider style="width:77.5%;margin:0 auto;"></mu-divider>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="description" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title class="fontcolor">请选择工单</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider style="width:77.5%;margin:0 auto;"></mu-divider>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="control_point" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-text-field
                type="number"
                underline-color="#2cb69a"
                v-model="qty"
                placeholder="请输入数量"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <section class="bottom-auto">
      <mu-row>
        <mu-col span="12">
          <mu-button large class="main-bg" textColor="white" style="width:100%">创建</mu-button>
        </mu-col>
      </mu-row>
    </section>
  </div>
</template>
<script >
// import http from "../../../utils/http.js";
import SafeHeader from "../../../components/safeHeader";
import Toast from "muse-ui-toast";
// import "muse-ui-loading/dist/muse-ui-loading.css";
// import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Message from "muse-ui-message";

export default {
  name: "UqcCheckBillCreate",
  components: {
    SafeHeader
  },
  data() {
    return {
      mrlCode: "",
      qty: ""
    };
  },
  methods: {
    toSacnner() {
      let that = this;
      const isApicloud = window.navigator.userAgent
        .toLowerCase()
        .includes("apicloud");
      if (isApicloud) {
        // eslint-disable-next-line no-undef
        let FNScanner = api.require("FNScanner");
        FNScanner.openScanner(
          {
            autorotation: true
          },
          function(ret, err) {
            if (ret.eventType == "success") {
              that.mrlCode = ret.content;
            }
          }
        );
      } else {
        Toast.info({
          message: "扫码功能只能在手机上使用",
          time: "3000",
          close: false
        });
      }
    }
  },
  // mounted() {}
};
</script>
<style scoped lang="scss">
.mu-item-title {
  font-size: 0.9rem;
}
.sectionOne {
  /deep/.mu-text-field-input {
    color: #fff;
    text-align: center;
    padding-left: 20px;
    padding-bottom: 22px;
    font-weight: bold;
    font-size: 18px;
  }
  /deep/.mu-input-line.disabled {
    border-bottom: 0;
  }
}

.input-items {
  /deep/.mu-item {
    height: 60px;
  }
}
.work-center {
  /deep/.mu-item {
    height: 60px;
    padding-top: 10px;
  }
}
</style>
