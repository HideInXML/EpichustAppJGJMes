<template>
  <div id="app" style="height: 100vh;">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'异常处理',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
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

          <mu-list-item style="height:7rem;  margin: 0px 0 0 0.6rem;">
            <mu-row style="width: 100%;height:4rem;margin-top:10px;">
              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="drafts"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;"><span class="fontcolor">设备异常</span></mu-col>
              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="border_color"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;"><span class="fontcolor">CNC防护门异常</span></mu-col>

              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="person"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;"><span class="fontcolor">admin</span></mu-col>

              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="access_time"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;"><span class="fontcolor">2019-07-09 16:22:00</span></mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 响应信息 -->
    <section style="background-color: #1abc9c;margin-bottom:6px;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items">
          <mu-sub-header class="item-hedaer">响应信息</mu-sub-header>
           <mu-list-item style="height:3.6rem;padding-top:10px;"> 
            <mu-row>
              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="person"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;"><span class="fontcolor">admin</span></mu-col>

              <mu-col span="2" style="text-align:center;margin-top:0.3rem;">
                <mu-icon class="toggle-icon" color="#999" size="18" value="access_time"></mu-icon>
              </mu-col>
              <mu-col span="10" style="text-align:left;margin-top:0.3rem;"><span class="fontcolor">2019-07-09 16:22:00</span></mu-col>
            </mu-row>
          </mu-list-item>

        </mu-list>
      </mu-paper>
    </section>

    <!-- 处理措施 -->
    <section style="background-color: #1abc9c;margin-bottom:6px;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items">
          <mu-sub-header class="item-hedaer">处理信息</mu-sub-header>

          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="info" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                underline-color="#1abc9c"
                v-model="remark"
                placeholder="请输入处理措施"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>


    <section>
      <mu-row>
        <mu-col span="12">
          <mu-button large class="main-bg" textcolor="white" style="width:100%;margin-top:10px;" @click="doSumbit">处理</mu-button>
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
}
.mu-item{
  padding: 10px 16px 0 16px !important;
}
.mu-list>.item-hedaer.mu-sub-header{
  padding-top:10px;
}

</style>
