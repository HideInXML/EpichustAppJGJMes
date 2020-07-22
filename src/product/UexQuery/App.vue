<template>
  <div id="app">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:title,color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>
    <div>
      <component v-bind:is="pageComponent"></component>
    </div>

    <!-- <plan-order-select></plan-order-select> -->
    <!-- <TrackOrderDetail/> -->
  </div>
</template>
<script >
// import http from "../../utils/http.js";
import SafeHeader from "../../components/safeHeader";
import PlanOrderSelect from "../../components/Uex/planOrderSelect";
import TrackOrderDetail from "../../components/Uex/trackOrderDetail";
import TrackOrderInput from "../../components/Uex/trackOrderInput";
// import Loading from "muse-ui-loading";

// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";
// import Storage from "../../utils/storage.js";
import "muse-ui-message/dist/muse-ui-message.css";

export default {
  name: "UexQuery",
  components: {
    SafeHeader,
    PlanOrderSelect,
    TrackOrderDetail,
    TrackOrderInput
  },
  data() {
    return {
      title:'生产报工查询',
      pageComponent: "PlanOrderSelect"
    };
  },
  methods: {
    goBack() {
      this.$root.api.api.closeWin();
    }
  },
  mounted() {
    console.log(this.$root.api.api.pageParam);
    let pageParam = this.$root.api.api.pageParam || {};
    this.pageComponent = pageParam.component || "PlanOrderSelect";
    this.title = pageParam.title || this.title;
  }
};
</script>
<style scoped lang="scss">
#app {
  background-color: #fff;
}
</style>
