<template>
  <div id="app"></div>
</template>
<script>
import "muse-ui-loading/dist/muse-ui-loading.css";
import Loading from "muse-ui-loading";

export default {
  name: "MainPage",
  components: {},
  data: () => {
    return {};
  },
  methods: {},
  mounted: function() {
    // eslint-disable-next-line no-unused-vars
    const loading = Loading();
    window.console.info(loading);
    // this.$root.api.api.closeWin({'name':Static.mainPageParams.name});
  }
};
</script>
<style scoped lang="scss">
</style>