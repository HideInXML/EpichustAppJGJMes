<template>
  <div id="app" style="height: 100vh;" class="flex-bottom-auto">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:title,color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>
    <div>
       <component v-bind:is="pageComponent" :pageData="pageData"></component>
    </div>
  </div>
</template>
<script >
// import http from "../../../utils/http.js";
// import Storage from "../../../utils/storage";
import SafeHeader from "../../../components/safeHeader";
// import "muse-ui-message/dist/muse-ui-message.css";
// import Toast from "muse-ui-toast";
// import qs from "qs";

import UsmExeTask from "../../../components/Usm/usmExeTask";
import UsmExeOperate from "../../../components/Usm/usmExeOperate";

export default {
  name: "UsmLaunch",
  components: {
    SafeHeader,
    UsmExeTask,
    UsmExeOperate,
  },
  data() {
    return {
      title: '异常任务',
      pageComponent:'UsmExeTask',
      taskName: "",
      usmList: [],
      pageData: {},
    };
  },
  methods: {
  
  },
  mounted() {
    let pageParam = this.$root.api.api.pageParam || {}
    this.pageComponent = pageParam.component || this.pageComponent
    this.title = pageParam.title || this.title;
    this.pageData = pageParam.pageData || {};
    //console.log(this.pageData);
    
  }
};
</script>
<style scoped lang="scss">
.mg-b {
  margin-bottom: .4rem;
}
.mg-t {
  margin-top: 1rem;
}
.mg-l {
  margin-left: 2rem;
}
.bgcolor{
  background-color: #fafafa;
  padding-left: 18px;
}
.mu-item.has-avatar{
  height: 30px !important;
   line-height: 30px;
}
</style>
