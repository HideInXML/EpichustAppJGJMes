<template>
  <div id="app">
    <safe-header
      v-bind="{title:title,color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>
    <!-- <component v-bind:is="pageComponent"></component> -->
    <div>
      <equip-select></equip-select>
    </div>
  </div>
</template>
<script>
import SafeHeader from "../../../components/safeHeader";
import EquipSelect from "../../../components/Uem/equipSelect";
// import EquipSelectInput from "../../../components/Uem/equipSelectInput";
import "muse-ui-loading/dist/muse-ui-loading.css";
import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";

// import storage from "../../../utils/storage.js";
export default {
  name: "UemQuery",
  components: {
    SafeHeader,
    EquipSelect
  },
  data: () => {
    return {
      // pageComponent:'EquipSelect',
      title: "设备查询"
    };
  },
  methods: {},
  mounted: function() {
    // let pageParam = this.$root.api.api.pageParam || {}
    // this.pageComponent = pageParam.component || 'EquipSelect'
    // this.title = pageParam.title || this.title;
  }
};
</script>
<style scoped lang="scss">
</style>