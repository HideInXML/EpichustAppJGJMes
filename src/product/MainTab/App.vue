<template>
  <div id="app">
    <safe-header
      v-bind="{title:$t('base.epichust'),color:'#fff',textColor:'#76777b',fixedTop:true}"
    ></safe-header>
    <div class="component-wrapper">
      <keep-alive>
        <component v-bind:is="pageComponent" v-on:changeTab="ComChangeTab"></component>
      </keep-alive>
    </div>

    <section class="footer">
      <mu-bottom-nav @change="switchTab" :value="tabValue">
        <mu-bottom-nav-item :title="$t('base.main_page')" icon="menu"></mu-bottom-nav-item>
        <mu-bottom-nav-item :title="$t('base.message')" icon="message"></mu-bottom-nav-item>
        <mu-bottom-nav-item :title="$t('base.mine')" icon="person"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </section>
  </div>
</template>
<script>
import SafeHeader from "../../components/safeHeader";
import Menu from "../Menu/App";
import Massage from "../Massage/App";
import Mine from "../Mine/App";
import pullRefresh from "../../components/pullRefresh.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "MainTab",
  components: {
    SafeHeader,
    Menu,
    Massage,
    Mine,
    pullRefresh,
    swiper,
    swiperSlide
  },
  data: () => {
    return {
      shift: "movies",
      pageComponent: "Menu",
      mainComponents: ["Menu", "Massage", "Mine"],
      tabValue: 0
    };
  },
  computed: {},
  methods: {
    switchTab(val) {
      this.pageComponent = this.mainComponents[val];
      this.tabValue = val;
    },
    ComChangeTab(val) {
      let that = this;
      this.$root.api.api.setTabBarAttr({
        index: val,
        callback: function() {
          that.switchTab(val);
        }
      });
    }
  },
  // mounted: function() {}
};
</script>
<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0px;
  z-index: 999;
  width: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.component-wrapper {
  padding-bottom: 56px;
}
/deep/.mu-appbar-title {
  margin-left: 20px;
}
</style>