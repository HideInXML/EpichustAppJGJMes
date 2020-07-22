<template>
  <div class="app">
    <div class="list" @click="goPage('uexWorkOrderDetail')">
      <mu-row class="list-content" style="width: 

100%;">
        <mu-col class="machine_name" span="12">PO-20190327</mu-col>
        <mu-col class="machine_properties fontcolor" span="12">一工厂|工艺路线|从动轴一轴</mu-col>
        <mu-col class="machine_icon" span="1">
          <mu-icon class="icon" value="fiber_manual_record" color="#bbb" size="8"></mu-icon>
        </mu-col>
        <mu-col class="status" span="2">未开工</mu-col>
        <mu-col class="schedule" span="7">
          <vm-progress :percentage="30" class="epic-progress"></vm-progress>
        </mu-col>
        <mu-col class="number" span="2">40个</mu-col>
      </mu-row>
    </div>

    <div class="list" @click="goPage('uexWorkOrderDetail')">
      <mu-row class="list-content" style="width: 

100%;">
        <mu-col class="machine_name" span="12">PO-20190327</mu-col>
        <mu-col class="machine_properties fontcolor" span="12">一工厂|工艺路线|从动轴一轴</mu-col>
        <mu-col class="machine_icon" span="1">
          <mu-icon class="icon" value="fiber_manual_record" color="#bbb" size="8"></mu-icon>
        </mu-col>
        <mu-col class="status" span="2">未开工</mu-col>
        <mu-col class="schedule" span="7">
          <vm-progress :percentage="70" class="epic-progress"></vm-progress>
        </mu-col>
        <mu-col class="number" span="2">40个</mu-col>
      </mu-row>
    </div>
    <div class="list" @click="goPage('uexWorkOrderDetail')">
      <mu-row class="list-content" style="width: 

100%;">
        <mu-col class="machine_name" span="12">PO-20190327</mu-col>
        <mu-col class="machine_properties fontcolor" span="12">一工厂|工艺路线|从动轴一轴</mu-col>
        <mu-col class="machine_icon" span="1">
          <mu-icon class="icon" value="fiber_manual_record" color="#bbb" size="8"></mu-icon>
        </mu-col>
        <mu-col class="status" span="2">未开工</mu-col>
        <mu-col class="schedule" span="7">
          <vm-progress :percentage="100" class="epic-progress"></vm-progress>
        </mu-col>
        <mu-col class="number" span="2">40个</mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "UexPlanOrderSelect",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    goPage(pageComponent) {
      this.$root.api.api.openWin({
        name: "UexPlanOrderSelect_" + pageComponent,
        url: "./UexPlanOrderSelect.html",
        pageParam: {
          component: pageComponent,
          title: "工单详情"
        },
        progress: {}
      });
    }
  },
  computed: {},
  // mounted() {}
};
</script>

<style lang="scss" scoped>
.app {
  overflow: hidden;
  background-color: #f0eff4;
  min-height: 100vh;
}

/deep/ .list {
  padding: 0 8px 10px 8px;
  margin-top: 10px;
  background-color: white;
  overflow: hidden;
}

.list-content {
  height: 5rem;
  padding-top: 10px;
  margin: 3px 0;
  .machine_properties {
    height: 28px;
    line-height: 28px;
    vertical-align: middle;
    padding-left: 10px;
  }
  .machine_name {
    color: #1abc9c;
    font-size: 1rem;
    font-weight: bold;
    padding-left: 10px;
  }
  .machine_icon {
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .status {
    color: #9e9e9e;
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
  .number {
    color: rgba(0, 0, 0, 0.66);
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .schedule {
    background-color: white;
    margin: 6px 0;
    border-radius: 6px;
    margin-bottom: 10px;
  }
}
</style>