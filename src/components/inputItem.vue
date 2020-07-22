<template>
  <div class="inputItem">
    <div class="leftText">{{textName}}</div>
    <div class="rightText">
      <input
        ref="myInput"
        :type="inputType"
        :readonly="readonly"
        class="inputstyle"
        :placeholder="placeholder"
        @input="inputChanged($event)"
        @focus="inputFocus()"
        @blur="inputBlur()"
        @change="inputChangeVal()"
        v-model="inputVal"
      />
      <mu-icon @click="clearData()" v-show="isShow" value="cancel" color="grey500" size="20"></mu-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputItem",
  props: ["textName", "placeholder", "inputType", "readonly"],
  data() {
    return {
      isShow: false,
      inputVal: ""
    };
  },
  // mounted() {},

  methods: {
    //监听输入框事件
    inputChanged: function($event) {
      this.stateChange();
      this.$emit("inputChanged", $event); //将值放在自定义的事件函数中作为参数
    },
    inputFocus() {
      this.stateChange();
    },
    inputBlur() {
      this.stateChange();
    },
    inputChangeVal() {
      this.stateChange();
    },
    stateChange() {
      if (this.inputVal.length) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    clearData() {
      this.inputVal = "";
      this.$refs.myInput.focus();
    }
  },
  computed: {}
};
</script>


<style scoped>
input:focus {
  outline: none;
  border: 1px solid #fff;
  border-bottom: 1px solid #5cb85c;
}
input[readonly="readonly"]:focus {
  outline: none;
  border: 1px solid #fff;
}
.inputItem {
  width: 100%;
  height: 50px;
  font-size: 0.9rem;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  /* border-bottom: 1px solid #eceef1; */
}
.leftText {
  width: 40%;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  word-break: break-all;
  word-wrap: break-word;
  text-indent: 5px;
}
.rightText {
  width: 84%;
}
.inputstyle {
  width: auto;
  min-width: 50%;
  border: none;
  outline: none;
  color: #757575;
  text-indent: 10px;
  width: 80%;
  /* border-bottom: 1px solid #6a7c9f; */
}
</style>
