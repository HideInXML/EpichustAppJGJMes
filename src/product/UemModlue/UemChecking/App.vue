<template>
  <div id="app">
    <safe-header
      v-bind="{title:title,color:'#fff',textColor:'#000',isBack:true,backIconColor: 'green400',fixedTop:true}"
    ></safe-header>
    <div>
      <component v-bind:is="pageComponent"></component>
    </div>
  </div>
</template>
<script>
import SafeHeader from "../../../components/safeHeader";
import CheckList from "../../../components/Uem/checkList";
import CheckingDetail from "../../../components/Uem/checkingDetail";

import "muse-ui-loading/dist/muse-ui-loading.css";
import "muse-ui-message/dist/muse-ui-message.css";
//import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

// import storage from "../../../utils/storage.js";

export default {
  name: "UemChecking", // 设备点检
  components: {
    SafeHeader,
    CheckList,
    CheckingDetail
  },
  data: () => {
    return {
      title: "设备点检",
      pageComponent: "CheckList"
    };
  },
  methods: {},
  mounted: function() {
    let pageParam = this.$root.api.api.pageParam || {};
    this.pageComponent = pageParam.component || this.pageComponent;
    this.title = pageParam.title || this.title;
  }
};
</script>
<style scoped lang="scss">
</style>
