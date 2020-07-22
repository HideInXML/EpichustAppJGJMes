<template>
  <div style="height:100vh;background-color:#f0eff4;">
    <mu-paper :z-depth="3" class="header">
      <mu-icon class="title-icon finished" value="assignment"  size="36"></mu-icon>
      <div class="title">QWE-909878899</div>
    </mu-paper>
     <mu-divider style="background-color:#f0eff4;"></mu-divider>
    <mu-list class="order-list">
      <mu-list-item
        button
        class="order-item"
        @click="goPage(item,index)"
        v-for="(item,index) of orderDetails"
        :key="index"
      >
        <div class="item-title">
          <mu-icon class="title-icon finished" value="list_alt"  size="30"></mu-icon>
          <div class="title">QWE-909878899</div>
        </div>
        <mu-row>
          <mu-col span="12" class="col-item">
            <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
            <div class="col-content">工序：车削/钻孔</div>
          </mu-col>
          <mu-col span="12" class="col-item">
            <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
            <div class="col-content">车位：车削01工位</div>
          </mu-col>
          <mu-col span="12" class="col-item">
            <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
            <div class="col-content">采集时间：2019-06-16 12：00</div>
          </mu-col>
          <mu-col span="12" class="col-item">
            <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
            <div class="col-content">
              采集状态：
              <span :class="{success:true}">完工</span>
            </div>
          </mu-col>
          <mu-col span="12" class="col-item">
            <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
            <div class="col-content">采集人：车削007</div>
          </mu-col>
          <mu-col span="12" class="col-item">
            <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
            <div class="col-content">
              良品与不良：
              <b class="success">9</b> /
              <b class="fail">2</b>
            </div>
          </mu-col>
        </mu-row>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
export default {
  name: "TrackOrderDetail",
  components: {},
  props: {},
  data() {
    return {
      orderDetails: [{}, {}]
    };
  },
  methods: {
    goPage(item, index) {
      let pageComponent = "TrackOrderInput";
      window.console.log(pageComponent);
      this.$root.api.api.openWin({
        name: "UexQuery_" + pageComponent,
        url: "./UexQuery.html",
        progress: {
          name: ""
        },
        pageParam: {
          component: pageComponent,
          title: "生产报工"
        }
      });
    }
  },
  computed: {},
  // mounted() {}
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 11px 5px 7px 5px;
  height: 4.5rem;
  .title-icon {
    margin: 0 12px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #323e48;
  }
}
.order-list.mu-list {
  padding: 0;
  .order-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    .item-title {
      display: flex;
      font-size: 16px;
      color: #9e9e9e;
      padding-left:1px;
      .title {
        margin-left: 10px;
        margin-top: 3px;
      }
    }
    & /deep/ .mu-item {
      padding: 12px 16px;
      height: auto;
      align-items: flex-start;
      flex-direction: column;
      .row {
        width: 100%;
        color:#a3aaae;
        
      }
      .col-item {
        display: flex;
        font-size: 13px;
        margin-top: 5px;
        margin-top: 4px;
      }
      .dot-icon {
        margin: 5px 10px 0 0;
      }
      .success {
        color: #2cb69a;
      }
      .fail {
        color: #e1261c;
      }
      .col-content{
        color:#9e9e9e;
      }
    }
  }
}
</style>
