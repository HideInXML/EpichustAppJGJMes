<template>
  <div id="app" style="height:100vh;" class="flex-bottom-auto">
    <safe-header
      v-bind="{title:'设备检验任务创建',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <!-- 基础信息 -->
    <section>
      <mu-paper :z-depth="0" style="margin-top:20px;">
        <mu-list class="item-border-b">
          <mu-sub-header class="item-hedaer">基础信息</mu-sub-header>
          <mu-list-item button :ripple="false" class="input-item">
            <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
            <InputItem
              inputType="text"
              textName="检验计划名称"
              placeholder="请输入检验计划名称"
              @inputChanged="inputChangedMer($event)"
              class="fontcolor"
            ></InputItem>
          </mu-list-item>
          <mu-list-item button :ripple="false" class="input-item">
            <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
            <InputItem inputType="text" textName="检验计划编码" placeholder="请输入检验计划编码" class="fontcolor"></InputItem>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 关联信息方式一 -->
    <!-- <section>
      <mu-paper :z-depth="0">
        <mu-list class="item-border-b">
          <mu-sub-header class="item-hedaer">关联信息</mu-sub-header>
          <mu-list-item button :ripple="false" class="input-item">
            <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
            <InputItem inputType="text" textName="检验模板" readonly="readonly" placeholder="请选择检验模板" @inputChanged="inputChangedMer($event)"></InputItem>
            <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
          </mu-list-item>
          <mu-list-item button :ripple="false" class="input-item">
              <mu-icon value="games" color="#e1261c" size="12"></mu-icon>
              <InputItem inputType="text" textName="维护周期" readonly="readonly" placeholder="请选择维护周期"></InputItem>
          </mu-list-item>
        </mu-list>
      </mu-paper> 
    </section>-->

    <!-- 关联信息方式二 -->
    <section style="margin-top:-8px;">
      <mu-list class="input-form">
        <mu-sub-header class="item-hedaer">关联信息</mu-sub-header>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="format_list_bulleted" size="24" class="finished"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title class="fontcolor">请选择检验模板</mu-list-item-title>

          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="format_list_bulleted" class="finished" size="24"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title class="fontcolor">请选择维护周期</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </section>

    <!-- 时间信息 -->
    <section style="margin-top:-8px;">
      <mu-list class="input-items item-border-b" style="margin-bottom: 20px;">
        <mu-sub-header class="item-hedaer">时间信息</mu-sub-header>
        <mu-list-item button :ripple="false" class="input-item">
          <mu-list-item-action>
            <mu-icon value="access_time" class="finished" size="28"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content ref="startTime" @click="timeClik(0)">
            <mu-text-field
              readonly
              v-model="form.startTime"
              placeholder="请选择开始时间"
              underline-color="#1abc9c"
            ></mu-text-field>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="date_range" color="gery400" size="28"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>

        <mu-list-item button :ripple="false" class="input-item">
          <mu-list-item-action>
            <mu-icon value="access_time" class="finished" size="28"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content ref="endTime" @click="timeClik(1)">
            <mu-text-field
              readonly
              v-model="form.endTime"
              placeholder="请选择结束时间"
              underline-color="#1abc9c"
            ></mu-text-field>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-icon value="date_range" color="gery400" size="28"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
    </section>

    <!-- 测试 -->
    <!-- <section>
      <mu-row>
        <mu-col span="12">
          <mu-date-input
            icon="access_time"
            action-icon="date_range"
            actions
            display-color="gery400"
            container="dialog"
            format="YYYY-MM-DD HH:mm:ss"
            v-model="value11"
            label="选择日期和时间"
            type="dateTime"
            label-float
            full-width
            landscape
          ></mu-date-input>
        </mu-col>
      </mu-row>
    </section>-->

    <section class="bottom-auto">
      <mu-row>
        <mu-col span="12">
          <mu-button large class="main-bg" textColor="white" style="width:100%">生成任务单</mu-button>
        </mu-col>
      </mu-row>
    </section>

    <!-- 时间弹框 -->
    <mu-dialog width="85%" max-width="100%" transition="slide-bottom" :open.sync="timePicker">
      <mu-appbar class="finished" title="选择时间">
        <mu-button slot="left" icon @click="timePicker = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="comfirmTime">完成</mu-button>
      </mu-appbar>
      <div>
        <mu-time-picker class="finished" style="width:100%;" :time.sync="form.time" format="24hr"></mu-time-picker>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
import SafeHeader from "../../../components/safeHeader";
import InputItem from "../../../components/inputItem";
import "muse-ui-loading/dist/muse-ui-loading.css";
import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

// import storage from "../../../utils/storage.js";
import moment from "moment";
export default {
  name: "UemTaskCreate",
  components: {
    SafeHeader,
    InputItem
  },
  data: () => {
    return {
      form: {
        startTime: "",
        endTime: ""
      },
      value11: undefined,
      currentIndex: 0,
      timePicker: false,
      time: undefined
    };
  },
  methods: {
    inputChangedMer: function(e) {
      //console.log(e)
    },
    comfirmTime() {
      if (this.currentIndex == 0) {
        this.form.startTime = moment(this.form.time)
          .add(moment().second(), "seconds")
          .format("YYYY-MM-DD HH:mm:ss");
      } else if (this.currentIndex == 1) {
        this.form.endTime = moment(this.form.time)
          .add(moment().second(), "seconds")
          .format("YYYY-MM-DD HH:mm:ss");
      }
      this.timePicker = false;
    },
    timeClik(val) {
      this.currentIndex = val;
      this.timePicker = true;
    }
  },
  // mounted: function() {}
};
</script>
<style scoped lang="scss">
/deep/.mu-dialog .mu-dialog-body {
  padding: 0;
}

.input-items,
.item-border-b,
.input-form {
  /deep/.mu-item {
    height: 60px;
  }
  /deep/.input-item {
    margin: 0 !important;
  }
}
</style>