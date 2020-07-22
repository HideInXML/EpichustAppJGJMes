<template>
  <div id="app">
    <safe-header
      v-bind="{title:'设备任务单查询',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#2cb69a',fixedTop:true}"
    ></safe-header>
    <section class="sectionOne">
      <mu-paper
        :z-depth="0"
        style="height:5rem;line-height:2rem;text-align:center;"
        class="spacing_shadowdiv"
      >
        <mu-list>
          <mu-list-item button :ripple="false">
            <mu-row style="width: 100%;color:#fff;">
              <mu-col
                span="12"
                style="font-size:1rem;text-align:center;font-weight:bold;margin-top:1rem;"
              >EQ-20190701-1101</mu-col>
              <mu-col span="1" style="text-align:right;padding-top:3px;  ">
                <mu-icon class="dot-icon" value="dashboard" color="#fff" size="16"></mu-icon>
              </mu-col>
              <mu-col
                span="9"
                style="font-size:.8rem;text-align:left;padding-top:1.5px; "
              >1300101011|储气罐</mu-col>
              <mu-col style="font-size:.8rem;text-align:right;padding-top:.5px; " span="2">已完成</mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 设备检验项 -->
    <section class="section">
      <mu-paper :z-depth="0">
        <mu-list class="item-border-b">
          <mu-sub-header class="item-hedaer">设备检验项</mu-sub-header>
          <mu-list-item
            button
            :ripple="true"
            @click="checkItemDetailClk(item,index)"
            v-for="(item,index) in checkItemList"
            :key="index"
          >
            <mu-list-item-title class="fontcolor">{{item.checkItemCode}}</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
        <mu-divider style="margin-bottom:-8px;"></mu-divider>
      </mu-paper>
    </section>

    <!-- 设备检验计划 -->
    <section class="section">
      <mu-paper :z-depth="0">
        <mu-list>
          <mu-sub-header class="item-hedaer">设备检验计划</mu-sub-header>
          <mu-list-item button :ripple="false" class="pad-top">
            <mu-list-item-action>
              <mu-icon value="format_list_bulleted" size="30" class="finished"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title class="fontcolor">RH-GJ-DY011100</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 执行信息 -->
    <section class="section">
      <mu-paper :z-depth="0">
        <mu-list class="implement-info">
          <mu-sub-header class="item-hedaer">执行信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-row style="width: 100%;margin-top: 20px;margin-bottom: 5px;">
              <mu-col span="1" style="text-align:center;">
                <mu-icon class="dot-icon finished" value="query_builder" size="20"></mu-icon>
              </mu-col>
              <mu-col
                span="11"
                style="font-size:.9rem;text-align:left;padding-bottom: 20px;color:#9e9e9e;"
              >2019-07-01~2019-07-02</mu-col>

              <mu-col span="1" style="text-align:center;">
                <mu-icon class="dot-icon finished" value="account_circle" size="20"></mu-icon>
              </mu-col>
              <mu-col span="6" style="font-size:.9rem;text-align:left;color:#9e9e9e;">admin</mu-col>
              <mu-col span="1" style="text-align:center;">
                <mu-icon class="dot-icon" value="cancel" color="#e1261c" size="20"></mu-icon>
              </mu-col>
              <mu-col style="font-size:.9rem;text-align:left;color:#9e9e9e;" span="4">异常</mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
      </mu-paper>
    </section>

    <!-- 检验项明细的弹框 -->
    <section class="checkItemDialog">
      <mu-dialog
        title="检验项明细"
        width="500"
        :scrollable="scrollable"
        :open.sync="openScroll"
        max-width="500"
        :padding="padding"
      >
        <mu-row style="width: 100%;margin-top: 10px;">
          <mu-col span="1" style="text-align:center;">
            <mu-icon value="fiber_manual_record" color="#bbb" size="20"></mu-icon>
          </mu-col>
          <mu-col
            span="11"
            style="font-size:.9rem;text-align:left;padding-bottom: 10px;"
          >检验项编码:{{checkItemList[currentIndex].checkItemCode}}</mu-col>

          <mu-col span="1" style="text-align:center;">
            <mu-icon value="fiber_manual_record" color="#bbb" size="20"></mu-icon>
          </mu-col>
          <mu-col
            span="11"
            style="font-size:.9rem;text-align:left;padding-bottom: 10px;"
          >检验项内容:{{checkItemList[currentIndex].checkItemName}}</mu-col>

          <mu-col span="1" style="text-align:center;">
            <mu-icon value="fiber_manual_record" color="#bbb" size="20"></mu-icon>
          </mu-col>
          <mu-col span="11" style="font-size:.9rem;text-align:left;padding-bottom: 10px;">维护标准/方法</mu-col>

          <mu-col span="1" style="text-align:center;">
            <mu-icon value="fiber_manual_record" color="#bbb" size="20"></mu-icon>
          </mu-col>
          <mu-col span="11" style="font-size:.9rem;text-align:left;padding-bottom: 10px;">故障维护类别/方法</mu-col>

          <mu-col span="1" style="text-align:center;">
            <mu-icon value="fiber_manual_record" color="blue500" size="20"></mu-icon>
          </mu-col>
          <mu-col span="5" style="font-size:.9rem;text-align:left;">标准值</mu-col>
          <mu-col span="1" style="text-align:center;">
            <mu-icon value="fiber_manual_record" color="green500" size="20"></mu-icon>
          </mu-col>
          <mu-col style="font-size:.9rem;text-align:left;" span="5">最小值</mu-col>

          <mu-col span="1" style="text-align:center;">
            <mu-icon value="fiber_manual_record" color="red500" size="20"></mu-icon>
          </mu-col>
          <mu-col span="5" style="font-size:.9rem;text-align:left;">最大值</mu-col>
        </mu-row>
        <mu-button slot="actions" flat color="primary" @click="closeCheckItemDialog">确认</mu-button>
      </mu-dialog>
    </section>
  </div>
</template>
<script>
import SafeHeader from "../../../components/safeHeader";
import "muse-ui-loading/dist/muse-ui-loading.css";
import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

// import storage from "../../../utils/storage.js";

let checkItemList = [
  { checkItemCode: "DJ001", checkItemName: "检测外观是否合格01" },
  { checkItemCode: "DJ002", checkItemName: "检测外观是否合格02" },
  { checkItemCode: "DJ003", checkItemName: "检测外观是否合格03" }
];
export default {
  name: "UemTaskBill",
  components: {
    SafeHeader
  },
  data: () => {
    return {
      openScroll: false,
      scrollable: true,
      padding: 0,
      checkItemList: checkItemList,
      currentIndex: 0
    };
  },
  methods: {
    checkItemDetailClk(item, index) {
      this.openScroll = true;
      this.currentIndex = index;
    },
    closeCheckItemDialog() {
      this.openScroll = false;
    }
  },
  // mounted: function() {}
};
</script>
<style scoped lang="scss">
/deep/.mu-dialog-title {
  font-weight: 600;
  line-height: 0px;
  font-size: 1rem;
}
.pad-top {
  padding-top: 10px;
}
.section {
  /deep/.mu-item {
    height: 60px;
  }
}
.implement-info {
  /deep/.mu-item {
    height: 90px;
  }
}
.checkItemDialog {
  /deep/.col {
    color: #9e9e9e;
  }
}
</style>