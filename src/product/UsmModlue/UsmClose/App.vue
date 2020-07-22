<template>
  <div id="app" style="height: 100vh;">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'异常关闭',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <section class="sectionOne">
      <mu-paper :z-depth="0"  class="spacing_shadowdiv">
        <mu-list style=" height: 6rem;">
          <mu-list-item button :ripple="false">
            <mu-row style="width: 100%;color:#fff;">
              <mu-col span="12" style="font-size:.9rem;text-align:left;margin-top:24px;">异常编号</mu-col>

              <mu-col
                span="12"
                style="font-size:1rem;text-align:center;margin-top:10px;"
              >USM_EX_BILL_20190711</mu-col>

              <mu-col span="12" style="font-size:.8rem;text-align:left;margin-top:10px;">
                <mu-flex class="flex-wrapper" align-items="center">
                  <mu-flex class="flex-demo" justify-content="around" fill>异常类型:</mu-flex>
                  <mu-flex class="flex-demo" justify-content="start" fill>设备异常</mu-flex>
                  <mu-flex class="flex-demo" justify-content="around" fill>异常内容:</mu-flex>
                  <mu-flex class="flex-demo" justify-content="start" fill>CRC防护门损坏</mu-flex>
                </mu-flex>
              </mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 待关闭信息 -->
    <section style="background-color: #1abc9c;margin-bottom:6px;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">发起信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">发起人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">发起时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="launchTime"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-sub-header class="item-hedaer">响应信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">响应人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="responseId"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">响应时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="responseTime"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-sub-header class="item-hedaer">处理信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">处理人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="dealId"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">处理时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="dealTime"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">处理措施</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="dealMeasure"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <section>
      <mu-row>
        <mu-col span="12">
          <mu-button large class="main-bg" textColor="white" style="width:100%" @click="doSumbit">确认关闭</mu-button>
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
      launchId: "admin",
      launchTime: "2019-07-11 13:15:46",
      responseId: "YJH",
      responseTime: "2019-07-11 15:26:38",
      dealId: '2230512',
      dealTime: '2019-07-12 09:26:35',
      dealMeasure: '螺丝松动拧紧',
    };
  },
  methods: {
    // doSumbit() {}
  },
  // mounted() {}
};
</script>
<style scoped lang="scss">
.mu-item-title {
  font-size: 0.9rem;
}
/deep/.mu-text-field-input {
  font-size: 0.9rem;
  color:#9e9e9e;
}
/deep/.mu-input-line.disabled {
  border-bottom: 0;
}
</style>
