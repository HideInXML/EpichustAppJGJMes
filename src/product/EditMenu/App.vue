<template>
  <div id="app">
    <safe-header v-bind="{title:$t('base.edit_menu'),color: 'primary',fixedTop:true,isBack:true}">
      <template v-slot:rightArea>
        <!-- <mu-icon value="how_to_reg"></mu-icon> -->
        <mu-button flat @click="saveMenuConf()">{{$t('base.save')}}</mu-button>
      </template>
    </safe-header>
    <div>
      <mu-container v-for="level of level1" :key="level.id">
        <mu-sub-header>{{level.title}}</mu-sub-header>
        <mu-row>
          <mu-col
            @click="chooseItem(item)"
            span="3"
            v-for="(item,index) in menuList[level.id]"
            :key="index"
          >
            <custom-icon :icon="item"></custom-icon>
            <mu-icon
              :value="item.isChoosed?'check_circle':'panorama_fish_eye'"
              :color="item.isChoosed?'lightGreen500':'grey400'"
              class="check-item"
            ></mu-icon>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>
  </div>
</template>
<script >
import business from "../../utils/business_product.js";
import SafeHeader from "../../components/safeHeader";
import CustomIcon from "../../components/icon";

import "muse-ui-message/dist/muse-ui-message.css";
import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

import Storage from "../../utils/storage.js";
import _ from "lodash";

export default {
  name: "EditMenu",
  components: {
    SafeHeader,
    CustomIcon
  },
  data() {
    return {
      level1: [{}],
      menuList: []
    };
  },
  methods: {
    chooseItem(item) {
      //check_box
      //check_box_outline_blank
      item.isChoosed = !item.isChoosed;
    },
    saveMenuConf() {
      let menuList = _.chain(this.menuList)
        .map(item => item)
        .flatten()
        .value();
      let menuFilter = _.zipObject(
        _.map(menuList, item => item.id),
        _.map(menuList, item => item.isChoosed)
      );
      Storage.setObject("menuFilter", menuFilter);
      Toast.success({
        message: this.$i18n.t("message.message_editmenu_save"),
        close: false
      });
      this.$root.api.api.sendEvent({
        name: "menuDataRefresh",
        extra: {}
      });
    }
  },
  mounted() {
    business.getMenulist({ filter: false, fold: false }).then(res => {
      let menuFilter = Storage.getObject("menuFilter");
      menuFilter = menuFilter || false;
      this.level1 = _.filter(res, item => {
        return item.menuLevel == "1";
      });
      this.menuList = _.chain(res)
        .map(item => {
          item.isChoosed = menuFilter ? menuFilter[item.id] : true;
          return item;
        })
        .groupBy(item => {
          return item.pid;
        })
        .value();
    });
  }
};
</script>
<style scoped lang="scss">
.check-item {
  position: absolute;
  top: 38%;
  left: 65%;
}
.mu-sub-header {
  color: #9e9e9e;
  font-size: 16px;
  line-height: 48px;
  padding-left: 16px;
  width: 100%;
  font-weight: bold;
}
</style>
