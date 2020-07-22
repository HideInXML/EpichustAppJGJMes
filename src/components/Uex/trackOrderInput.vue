<template>
  <div class="flex-bottom-auto">
    <mu-list class="input-items item-border-b" style="margin-bottom: 20px;">
      <mu-list-item class="order-item">
        <div class="title-header">
          <mu-icon class="title-icon finished" value="list_alt" size="28"></mu-icon>
          <div class="title">QWE-909878899</div>
        </div>
      </mu-list-item>
      <mu-sub-header class="item-hedaer">报工录入</mu-sub-header>
      <mu-list-item>
        <mu-list-item-action>
          <mu-icon value="bookmark_border" class="finished" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title class="item-title">
          <b class="fontcolor">车削/钻孔</b>
        </mu-list-item-title>
      </mu-list-item>
      <mu-list-item>
        <mu-list-item-action>
          <mu-icon value="location_on" class="finished" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>
          <b class="fontcolor">滚齿工位</b>
        </mu-list-item-title>
      </mu-list-item>
      <mu-list-item :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="check_circle" color="#2196f3" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-text-field  v-model="form.goodQty" type="number" placeholder="请输入良品数" underline-color="#2cb69a"></mu-text-field>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="cancel" color="#e46262" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-text-field v-model="form.badQty" type="number" placeholder="请输入不良品数" underline-color="#2cb69a"></mu-text-field>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="edit" class="finished" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-text-field  class="fontcolor" v-model="form.badReason" placeholder="请输入不良原因" underline-color="#2cb69a"></mu-text-field>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item button :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="access_time" class="finished" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content @click="timePicker = true">
          <mu-text-field  class="fontcolor" readonly v-model="form.opTime" placeholder="请输入操作时间" underline-color="#2cb69a"></mu-text-field>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-icon value="date_range" color="gery400" size="28"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
       <mu-divider style="background-color:white;"></mu-divider>
    </mu-list>
    <mu-dialog width="85%" max-width="100%" transition="slide-bottom" :open.sync="timePicker">
      <mu-appbar class="finished"  title="选择时间">
        <mu-button slot="left" icon @click="timePicker = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="comfirmTime">完成</mu-button>
      </mu-appbar>
      <div>
        <mu-time-picker class="finished" style="width:100%;" :time.sync="form.time" format="24hr"></mu-time-picker>
      </div>
    </mu-dialog>
    <mu-row class="bottom-auto">
      <mu-col span="12">
        <mu-button
          large
          class="main-bg"
          style="width:100%"
          textColor='white'
          @click="toggleStatus"
        >
          <b>{{workStatus?'完 工':'开 工'}}</b>
        </mu-button>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "TrackOrderInput",
  components: {},
  props: {},
  data() {
    return {
      form: {
        goodQty: "",
        badQty: "",
        badReason: "",
        opTime: ""
      },
      timePicker: false,
      time: undefined,
      workStatus: false
    };
  },
  methods: {
    comfirmTime() {
      console.log(this.form.time);
      this.form.opTime = moment(this.form.time).add(moment().second(), 'seconds').format("YYYY-MM-DD HH:mm:ss");
      this.timePicker = false;
    },
    toggleStatus() {
      this.workStatus = !this.workStatus;
    }
  },
  computed: {},
  mounted() {
    //console.log(moment(new Date()).format("YYYY-MM-DD hh:mm:ss"));
  }
};
</script>

<style lang="scss">
.mu-dialog .mu-dialog-body{
    padding: 0
}
.mu-item-title {
    font-size: 13px !important;
    color: #4c4e52;
    opacity: .6;
}
.mu-input-content {
    font-size: 13px !important;
    color: #4c4e52 !important;
    font-weight: bold !important;
}
.mu-text-field-input{
  color: #a3aaae !important;
}
.order-item>.mu-item-wrapper>.mu-item{
  height: 4rem;
}

input::-webkit-input-placeholder{
  font-weight: bold !important;
}
input::-moz-placeholder{
  font-weight: bold;
}
input:-moz-placeholder{
  font-weight: bold;
}
input:-ms-input-placeholder{
  font-weight: bold;
}
.fontcolor{
  opacity: .8;
}
</style>
