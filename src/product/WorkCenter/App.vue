<template>
  <div id="app">
    <safe-header v-bind="{title:'工作中心列表',color: 'blue'}"></safe-header>
    <tree-select></tree-select>
  </div>
</template>
<script >
import http from "../../utils/http.js";
import SafeHeader from "../../components/safeHeader";
import TreeSelect from "../../components/treeselect";

// import "muse-ui-message/dist/muse-ui-message.css";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

// import Storage from "../../utils/storage.js";
export default {
  name: "WorkCell",
  components: {
    SafeHeader,
    TreeSelect
  },
  data() {
    return {};
  },
  methods: {
    async getAllWorkCenterAndCellByLoginName() {
      let res = await http.getAllWorkCenterAndCellByLoginName();
      console.log(res);
    },
    goBack() {
      this.$root.api.api.closeWin();
    }
  },
  mounted() {
    this.getAllWorkCenterAndCellByLoginName();
  }
};
</script>
