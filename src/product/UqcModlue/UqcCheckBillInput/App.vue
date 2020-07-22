<template>
  <div id="app" style="height: 100vh;background-color:white;">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'检测单录入',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <!-- 数据录入 -->
    <section class="sessionOne" style="70vh;">
      <mu-paper :z-depth="2">
        <mu-list class="input-items" style="margin-top:15px;">
          <mu-sub-header
            class="item-hedaer"
            style="background-color:rgb(240, 239, 244);font-size: 16px;padding-top:10px;"
          >基础数据录入</mu-sub-header>

          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="games" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title class="fontcolor">请选择检测单</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider style="width:77.5%;margin:0 auto;"></mu-divider>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="location_on" class="finished" size="24"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title class="fontcolor">请选择工位</mu-list-item-title>
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

    <section style="margin-top:60px;">
      <mu-row>
        <mu-col span="12">
          <mu-button
            large
            class="main-bg"
            textColor="white"
            style="width:100%"
            @click="checkBillCreate"
          >创建</mu-button>
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
  name: "UqcCheckBillInput",
  components: {
    SafeHeader
  },
  data() {
    return {
      qty: ""
    };
  },
  methods: {
    // checkBillCreate() {}
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
  height: 20rem;
  /deep/.mu-item {
    height: 80px;
  }
}
</style>
