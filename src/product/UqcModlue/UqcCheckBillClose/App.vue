<template>
  <div id="app" style="height: 100vh;" class="flex-bottom-auto">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'检测单关闭',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <!-- 检测单号 -->
    <section>
      <mu-paper
        :z-depth="0"
        class="spacing_shadowdiv main-bg"
        style="height:5rem;line-height:2rem;text-align:center;"
      >
        <mu-list>
          <mu-list-item button :ripple="false">
            <mu-row style="width: 100%;color:#fff;" @click="selectCheckBillLookUp">
              <mu-col
                span="12"
                style="font-size:16px;text-align:left;font-weight:bold;margin-top:1rem;"
              >检测单号</mu-col>
              <mu-col
                span="10"
                style="font-size:1rem;text-align:center;padding-top: 4px;"
              >{{checkBillCode}}</mu-col>
              <mu-col span="2" style="text-align:right;padding-top: 5px;">
                <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_right"></mu-icon>
              </mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 数据录入 -->
    <section style="background-color: #2cb69a;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items">
          <mu-sub-header class="item-hedaer">数据录入</mu-sub-header>
          <mu-list-item button :ripple="false" class="input-item">
            <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
            <InputItem
              @inputChanged="inputVal($event,'planQty')"
              inputType="number"
              textName="计划检测数"
              placeholder="请输入计划检测数"
              class="fontcolor"
            ></InputItem>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item button :ripple="false" class="input-item">
            <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
            <InputItem
              @inputChanged="inputVal($event,'actQty')"
              inputType="number"
              textName="实际检测数"
              placeholder="请输入实际检测数"
              class="fontcolor"
            ></InputItem>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item button :ripple="false" class="input-item">
            <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
            <InputItem
              @inputChanged="inputVal($event,'uneffectiveQty')"
              inputType="number"
              textName="不良数"
              placeholder="请输入不良数"
              class="fontcolor"
            ></InputItem>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item button :ripple="false" class="input-item">
            <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
            <InputItem
              @inputChanged="inputVal($event,'effectiveQty')"
              inputType="number"
              textName="良品数"
              placeholder="请输入良品数"
              class="fontcolor"
            ></InputItem>
          </mu-list-item>
          <mu-divider></mu-divider>
        </mu-list>
      </mu-paper>
    </section>

    <section class="bottom-auto">
      <mu-row>
        <mu-col span="12">
          <mu-button
            large
            color="#2cb69a"
            class="main-bg"
            style="width:100%"
            @click="checkBillClose"
          >关闭</mu-button>
        </mu-col>
      </mu-row>
    </section>
  </div>
</template>
<script >
// import http from "../../../utils/http.js";
import SafeHeader from "../../../components/safeHeader";
import InputItem from "../../../components/inputItem";
import "muse-ui-loading/dist/muse-ui-loading.css";
import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

export default {
  name: "UqcCheckBillClose",
  components: {
    SafeHeader,
    InputItem
  },
  data() {
    return {
      checkBillCode: "WIP-20190703-1001",
      planQty: "",
      actQty: "",
      uneffectiveQty: "",
      effectiveQty: ""
    };
  },
  methods: {
    inputVal(e, val) {
      if (val === "planQty") {
        this.planQty = e.target.value;
      } else if (val === "actQty") {
        this.actQty = e.target.value;
      } else if (val === "uneffectiveQty") {
        this.uneffectiveQty = e.target.value;
      } else if (val === "effectiveQty") {
        this.effectiveQty = e.target.value;
      }
    },
    selectCheckBillLookUp() {
      this.checkBillCode = "WIP-20190703-1002";
    },
    checkBillClose() {
      console.log(
        this.planQty,
        this.actQty,
        this.uneffectiveQty,
        this.effectiveQty
      );
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
</style>
