
<template>
  <div style="height:100vh;background-color:#f0eff4;">
    <div class="equip-item">
      <div class="item-title">
        <mu-icon class="title-icon finished" value="subtitles" size="30"></mu-icon>
        <div class="title fontcolor">清洗|10021001</div>
        <mu-icon class="title-icon-end finished" value="pause" size="25"></mu-icon>
      </div>
      <mu-row class="mu-row-content">
        <mu-col span="12" class="col-item">
          <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
          <div class="col-content fontcolor">轴工段工作中心</div>
        </mu-col>
        <mu-col span="12" class="col-item">
          <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
          <div class="col-content fontcolor">从动轴一轴车削01工位</div>
        </mu-col>
      </mu-row>
    </div>

    <div class="equip-item">
      <div class="item-title">
        <mu-icon class="title-icon finished" value="subtitles" size="30"></mu-icon>
        <div class="title fontcolor">车削|10021002</div>
        <mu-icon class="title-icon-end fail_new" value="power_settings_new" size="25"></mu-icon>
      </div>
      <mu-row class="mu-row-content">
        <mu-col span="12" class="col-item">
          <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
          <div class="col-content fontcolor">小齿工段工作中心</div>
        </mu-col>
        <mu-col span="12" class="col-item">
          <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
          <div class="col-content fontcolor">从动轴一轴车削02工位</div>
        </mu-col>
      </mu-row>
    </div>

    <div class="equip-item">
      <div class="item-title">
        <mu-icon class="title-icon finished" value="subtitles" size="30"></mu-icon>
        <div class="title fontcolor">轮毂|10021002</div>
        <mu-icon class="title-icon-end finished" value="pause" size="25"></mu-icon>
      </div>
      <mu-row class="mu-row-content">
        <mu-col span="12" class="col-item">
          <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
          <div class="col-content fontcolor">小齿工段工作中心</div>
        </mu-col>
        <mu-col span="12" class="col-item">
          <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
          <div class="col-content fontcolor">从动轴一轴车削03工位</div>
        </mu-col>
      </mu-row>
    </div>

    <div class="equip-item">
      <div class="item-title">
        <mu-icon class="title-icon finished" value="subtitles" size="30"></mu-icon>
        <div class="title fontcolor">轮毂|10021002</div>
        <mu-icon class="title-icon-end fail_new" value="power_settings_new" size="25"></mu-icon>
      </div>
      <mu-row class="mu-row-content">
        <mu-col span="12" class="col-item">
          <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
          <div class="col-content fontcolor">小齿工段工作中心</div>
        </mu-col>
        <mu-col span="12" class="col-item">
          <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
          <div class="col-content fontcolor">从动轴一轴车削03工位</div>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "EquipSelect",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    goPage(pageComponent) {
      this.$root.api.api.openWin({
        name: "UemQuery_" + pageComponent,
        url: "./UemQuery.html",
        pageParam: {
          title: "设备检验项",
          component: pageComponent
        }
      });
    }
  },
  computed: {},
  // mounted() {}
};
</script>

<style lang="scss">
.equip-item:nth-child(1) {
  margin-top: 0px !important;
}
.equip-item {
  padding: 12px 0;
  margin-top: 10px;
  background-color: white;
  .item-title {
    display: flex;
    font-size: 1rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.64);
    vertical-align: middle;
    height: 2rem;
    line-height: 2rem;
    padding: 0 20px;
    .title {
      margin-left: 10px;
    }
    .title-icon-end {
      position: absolute;
      right: 8%;
    }
  }
  /deep/.row {
    padding-left: 1.9rem;
  }
  .col-item {
    display: flex;
    font-size: 15px;
    margin-top: 5px;
    height: auto;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
  }
  .dot-icon {
    position: absolute;
    top: 4px;
    left: 28px;
  }
  .col-content {
    padding-left: 42px;
  }
  .success {
    color: #66bc69;
  }
  .fail {
    color: #e93e3e;
  }
}
</style>
