<template>
  <div id="app">
    <safe-header
      v-bind="{title:title,color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>
    <!-- <uex-plan-order-query></uex-plan-order-query> -->
    <div>
      <component :is="pageComponent"></component>
    </div>
  </div>
</template>
<script>
import SafeHeader from "../../../components/safeHeader";
import UexPlanOrderQuery from "../../../components/Uex/uexPlanOrderSelect";
import UexWorkOrderDetail from "../../../components/Uex/uexWorkOrderDetail";
import "muse-ui-loading/dist/muse-ui-loading.css";
import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

// import storage from "../../../utils/storage.js";
export default {
  name: "UexPlanOrderSelect",
  components: {
    SafeHeader,
    UexPlanOrderQuery,
    UexWorkOrderDetail
  },
  data: () => {
    return {
      pageComponent: "UexPlanOrderQuery",
      title: "计划订单查询"
    };
  },
  methods: {},
  mounted: function() {
    let pageParam = this.$root.api.api.pageParam || {};
    this.pageComponent = pageParam.component || "UexPlanOrderQuery";
    this.title = pageParam.title || this.title;
  }
};
</script>
<style scoped lang="scss">
</style>