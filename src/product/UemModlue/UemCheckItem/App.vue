<template>
  <div id="app" class="app-page">
    <safe-header
      v-bind="{title:'设备检测项',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#1abc9c',fixedTop:true}"
    ></safe-header>
    <!-- <component v-bind:is="pageComponent"></component> -->
    <mu-list class="input-items input-form">
      <mu-sub-header class="item-hedaer">检验类别</mu-sub-header>
      <mu-list-item button>
        <mu-list-item-action>
          <mu-icon value="format_list_bulleted" color="#1abc9c" class="main-font" size="30"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title class="fontcolor" style="font-size:16px;">请选择检验类别</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>

      <mu-sub-header class="item-hedaer">使用设备</mu-sub-header>
      <mu-list-item button>
        <mu-list-item-action>
          <mu-icon value="devices_other" color="#1abc9c" class="main-font" size="30"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title class="fontcolor" style="font-size:16px;">请选择设备</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>

      <mu-sub-header class="item-hedaer">检测项录入</mu-sub-header>
      <mu-list-item button :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="text_fields" color="#1abc9c" class="main-font" size="30"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-text-field
            v-model="form.input"
            placeholder="输入检测项编码"
            class="main-input-border"
            underline-color="#1abc9c"
          ></mu-text-field>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item button :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="insert_comment" color="#1abc9c" class="main-font" size="30"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-text-field v-model="form.input" placeholder="输入检测项名称" class="main-input-border"></mu-text-field>
        </mu-list-item-content>
      </mu-list-item>

      <mu-sub-header class="item-hedaer">检测性质</mu-sub-header>
      <mu-list-item>
        <mu-list-item-content>
          <div class="button-switch">
            <mu-button
              @click="chooseOne('prop')"
              :class="{'main-bg':form.checkType == 'prop'}"
              :textColor="form.checkType == 'prop'?'green50':'grey900'"
            >定性</mu-button>
            <mu-button
              @click="chooseOne('number')"
              :class="{'main-bg':form.checkType == 'number'}"
              :textColor="form.checkType == 'number'?'green50':'grey900'"
            >定量</mu-button>
          </div>
        </mu-list-item-content>
      </mu-list-item>

      <div class="check-box" v-if="form.checkType == 'prop'">
        <mu-list-item>
          <mu-list-item-content>
            <mu-row>
              <mu-col class="demo-snackbar-radio" :key="p" v-for="p in propCheckArray" span="6">
                <mu-radio
                  style="width:100%"
                  class="finished"
                  v-model="form.propCheck"
                  :value="p"
                  :label="p"
                ></mu-radio>
              </mu-col>
            </mu-row>
          </mu-list-item-content>
        </mu-list-item>
      </div>
      <div class="check-box" v-if="form.checkType == 'number'">
        <mu-list-item button :ripple="false" class="input-item">
          <mu-list-item-action>
            <mu-icon value="filter_vintage" color="#1abc9c" class="main-font" size="30"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-text-field
              v-model="form.input"
              type="number"
              placeholder="良品率： ~ %"
              underline-color="#1abc9c"
            ></mu-text-field>
          </mu-list-item-content>
        </mu-list-item>
      </div>
    </mu-list>
    <mu-row class="submit-box">
      <mu-col span="12">
        <mu-button large textColor='white' class="main-bg" style="width:100%">提交</mu-button>
      </mu-col>
    </mu-row>
  </div>
</template>
<script>
import SafeHeader from "../../../components/safeHeader";

import "muse-ui-loading/dist/muse-ui-loading.css";
import "muse-ui-message/dist/muse-ui-message.css";
//import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

// import storage from "../../../utils/storage.js";

export default {
  name: "UemCheckItem",
  components: {
    SafeHeader
    //EquipSelectInput
  },
  data: () => {
    return {
      propCheckArray: ["合格", "不合格"],
      color: '',
      form: {
        checkType: "prop"
      }
    };
  },
  methods: {
    chooseOne(type) {
      console.log(type);
      this.form.checkType = type;
      // if(type == 'prop'){
      //   this.color = '#1abc9c'
      // }else{
      //   this.color = '#grey900'
      // }
      
    }
  },
  // mounted: function() {
    
  // }
};
</script>
<style scoped lang="scss">
.app-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  & > * {
    width: 100%;
    flex-grow: 0;
  }
  .submit-box {
    margin-top: auto;
  }
}
.input-form {
  .item-hedaer.mu-sub-header {
    line-height: 30px;
    margin: 0;
    background: #eaeaea;
    color: #333;
    font-weight: bold;
  }
  .mu-input {
    margin: 0;
    padding: 6px 0;
  }
  .input-item {
    margin: 10px 0;
  }
  .button-switch {
    border: 1px solid #eaeaea;
    border-radius: 5px;
    overflow: hidden;
    .mu-button {
      width: 50%;
    }
  }
}
.check-box {
  margin-top: 15px;
  /deep/.mu-radio-label {
    color: #9e9e9e;
  }
}
</style>
<style>
.mu-radio-wrapper {
  justify-content: center !important;
}
</style>
