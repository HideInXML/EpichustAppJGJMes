<template>
  <div id="app" style="height: 100vh;">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:title,color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>
    <div>
      <component v-bind:is="pageComponent"></component>
    </div>
  </div>
</template>
<script >
// import http from "../../../utils/http.js";
import SafeHeader from "../../../components/safeHeader";
import UsmExeSelect from "../../../components/Usm/usmExeSelect";
import UsmExeDetail from "../../../components/Usm/usmExeDetail";
// import "muse-ui-loading/dist/muse-ui-loading.css";
// import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

export default {
  name: "UsmQuery",
  components: {
    SafeHeader,
    UsmExeSelect,
    UsmExeDetail
  },
  data() {
    return {
      title: "异常查询",
      pageComponent: "UsmExeSelect"
    };
  },
  methods: {},
  mounted() {
    let pageParam = this.$root.api.api.pageParam || {};
    this.pageComponent = pageParam.component || this.pageComponent;
    this.title = pageParam.title || this.title;
  }
};
</script>
<style scoped lang="scss">
.mu-item-title {
  font-size: 0.9rem;
}
/deep/.mu-text-field-input {
  font-size: 0.9rem;
}
/deep/.mu-input-line.disabled {
  border-bottom: 0;
}
</style>
