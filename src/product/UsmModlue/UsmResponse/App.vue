<template>
  <div id="app" style="height: 100vh;" class="flex-bottom-auto">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'异常响应',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <!-- 异常发起信息 -->
    <section style="background-color: #1abc9c;margin-bottom:6px;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items">
          <mu-sub-header class="item-hedaer">异常发起信息</mu-sub-header>
          <mu-list-item>
            <mu-list-item-action>
              <mu-icon value="apps" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                v-model="exeBillCode"
                underline-color="#1abc9c"
                placeholder="请选择异常编码"
              ></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="true" style="height:8rem" class="item_one">
            <mu-row style="width: 100%;height:3rem;line-height:1.5rem;">
              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="drafts"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;">CNC设备异常</mu-col>

              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="border_color"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;">CNC防护门异常</mu-col>

              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="person"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;">admin</mu-col>

              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="access_time"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;">2019-07-09 16:22:00</mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 响应信息 -->
    <section style="background-color: #1abc9c;margin-bottom:6px;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items list-height">
          <mu-sub-header class="item-hedaer">异常内容录入</mu-sub-header>
          <mu-list-item button>
            <mu-list-item-title style="width:0;" class="fontcolor">是否转移</mu-list-item-title>

            <mu-list-item-content>
              <mu-flex justify-content="around">
                <mu-radio v-model="isTrans" :value="true" label="是"></mu-radio>
                <mu-radio v-model="isTrans" :value="false" label="否"></mu-radio>
              </mu-flex>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="info" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                underline-color="#1abc9c"
                v-model="remark"
                placeholder="请输入备注"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <section class="bottom-auto">
      <mu-row>
        <mu-col span="12">
          <mu-button
            large
            class="finished"
            textColor="white"
            style="width:100%"
            @click="doSumbit"
          >提交</mu-button>
        </mu-col>
      </mu-row>
    </section>
  </div>
</template>
<script >
// import http from "../../../utils/http.js";
import SafeHeader from "../../../components/safeHeader";
// import "muse-ui-loading/dist/muse-ui-loading.css";
// import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

export default {
  name: "UsmQualityLaunch",
  components: {
    SafeHeader
  },
  data() {
    return {
      exeBillCode: "UEX_EX_BILL_20190709",
      isTrans: "",
      remark: ""
    };
  },
  methods: {
    doSumbit() {
      //
    }
  }
  // mounted() {}
};
</script>
<style scoped lang="scss">
.mu-item-title {
  font-size: 0.9rem;
}
/deep/.mu-text-field-input {
  font-size: 0.9rem;
  color: #9e9e9e;
}
.item-hedaer.mu-sub-header {
  height: 42px;
  line-height: 42px;
}
.item_one {
  margin: 0px 0 0 0.6rem;
  /deep/.mu-item {
    height: 55px;
  }
}
.input-items {
  /deep/.mu-item {
    height: 55px;
  }
  /deep/.mu-radio-label {
    color: #9e9e9e;
  }
}
.col {
  color: #9e9e9e;
}
.list-height {
  height: 12rem;
  li:last-child {
    margin-top: 20px;
  }
}
</style>
