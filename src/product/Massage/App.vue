<template>
  <div id="app">
     <div>
       <component v-bind:is="pageComponent" :pageData="pageData"></component>
    </div>
  </div>
</template>
<script>
import UsmExeTask from "../../components/Usm/usmExeTask.vue";
import UsmExeOperate from "../../components/Usm/usmExeOperate.vue";
export default {
  name: "Massage",
  components: {
    UsmExeTask,
    UsmExeOperate,
  },
  data: () => {
    return {
      title: '异常任务',
      pageComponent:'UsmExeTask',
      taskName: "",
      usmList: [],
      pageData: {},
    };
  },
  methods: {},
  mounted: function() {
    let pageParam = this.$root.api.api.pageParam || {}
    this.pageComponent = pageParam.component || this.pageComponent
    this.title = pageParam.title || this.title;
    this.pageData = pageParam.pageData || {};
  }
};
</script>
<style scoped lang="scss">
</style>