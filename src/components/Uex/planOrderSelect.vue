<template>
  <div style="background-color:#f0eff4;margin-top:-20px;">
    <mu-paper :z-depth="1" class="demo-list-wrap" @click="goPage('trackOrderDetail')">
      <mu-list textline="three-line">
        <mu-list-item-title class="mu-list-item-title" style="font-size: 16px !important;">
          <mu-icon
            value="apps"
            size="22"
            class="finished"
            style="float: left;flex-shrink: 0; margin-top: 20px;margin-left: 20px;"
          ></mu-icon>
          <span style="margin-left:-40%;">WO-20190624-1101</span>
          <mu-icon
            class="mu-list-item-title-icon"
            value="keyboard_arrow_right"
            color="rgb(158, 158, 158)"
          ></mu-icon>
        </mu-list-item-title>
        <mu-divider class="mu-divider"></mu-divider>

        <mu-list-item button :ripple="false" class="first_item">
          <mu-list-item-content class="mu-list-item-content">
            <mu-row gutter>
              <mu-col span="8">
                <mu-icon class="mu-row-icon" value="alarm_on" size="18" color="rgb(158, 158, 158)"></mu-icon>
                <div class="grid-cell fontcolor">2019-06-24 12:12:12</div>
              </mu-col>
              <mu-col span="4">
                <mu-icon class="mu-row-icon" value="weekend" size="18" color="rgb(158, 158, 158)"></mu-icon>
                <div class="grid-cell fontcolor">从动主轴</div>
              </mu-col>
            </mu-row>
            <mu-row gutter>
              <mu-col span="8">
                <mu-icon
                  class="mu-row-icon"
                  value="location_on"
                  size="18"
                  color="rgb(158, 158, 158)"
                ></mu-icon>
                <div class="grid-cell fontcolor">工作中心</div>
              </mu-col>
              <mu-col span="4">
                <mu-icon class="mu-row-icon" value="add_box" size="18" color="rgb(158, 158, 158)"></mu-icon>
                <div class="grid-cell fontcolor">3个</div>
              </mu-col>
            </mu-row>
            <mu-row gutter>
              <mu-col span="8">
                <mu-icon class="mu-row-icon" value="build" size="18" color="rgb(158, 158, 158)"></mu-icon>
                <div class="grid-cell fontcolor">工艺路线</div>
              </mu-col>
            </mu-row>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-paper>

    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-list :dense="true">
        <mu-sub-header class="mu-sub-header-list item-header">订单信息</mu-sub-header>
        <mu-list-item class="order-mu-list-item">
          <mu-icon
            value="assignment"
            size="22"
            class="finished"
            style="margin-left:6px;margin-bottom:1px;opacity:.6;    flex-shrink: 0;"
          ></mu-icon>
          <mu-list-item-title class="mu-sub-header-list-title fontcolor">PO-20190624-1101</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-paper>

    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-list textline="three-line">
        <mu-sub-header class="mu-sub-header-list">完成进度</mu-sub-header>
        <mu-list-item
          avatar
          button
          :ripple="false"
          style="position: relative;left: 4rem;margin:10px 0 10px 0; "
        >
          <vm-progress
            type="circle"
            :percentage="67"
            :stroke-width="10"
            strokeColor="#01b3e3"
            :width="100"
          ></vm-progress>
          <div class="mu-circular-progress-ringht">
            <vm-progress
              type="circle"
              :percentage="percentage"
              :stroke-width="6"
              strokeColor="#01b3e3"
              :width="70"
            >{{percentage}}个</vm-progress>
            <div class="mu-circular-progress-ringht-title">已经完成工序</div>
          </div>
        </mu-list-item>
      </mu-list>
    </mu-paper>

    <mu-paper :z-depth="0" class="demo-list-wrap done">
      <mu-container>
        <div class="demo-vsteper-container">
          <mu-stepper :active-step="curentStep" orientation="vertical" :linear="linear">
            <mu-step class="mu-step-container mu-step-comm">
              <mu-step-label style="color:#2196F3">
                <mu-icon slot="icon" value="check_circle" class="finished"></mu-icon>
                <span class="finished">已完成</span>
              </mu-step-label>
              <p class="mu-step-p-color">TO-20190625-1101</p>
              <mu-step-content>
                <p class="mu-step-p-color">TO-20190625-1101</p>
              </mu-step-content>
            </mu-step>
            <mu-step class="mu-step-container mu-step-comm">
              <mu-step-label style="color:black">
                <mu-icon slot="icon" value="query_builder" class="finished"></mu-icon>
                <span class="fontcolor">进行中</span>
              </mu-step-label>
              <mu-step-content>
                <p class="mu-step-p-color">TO-20190625-1102</p>
              </mu-step-content>
            </mu-step>
            <mu-step class="mu-step-container">
              <mu-step-label>
                <mu-icon slot="icon" value="linear_scale" color="#9e9e9e"></mu-icon>
                <span class="fontcolor">待进行</span>
              </mu-step-label>
              <mu-step-content>
                <p class="mu-step-p-color">TO-20190625-1103</p>
              </mu-step-content>
            </mu-step>
          </mu-stepper>
        </div>
      </mu-container>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: "PlanOrder",
  components: {},
  props: {},
  data() {
    return {
      curentStep: 1,
      linear: false,
      percentage: 2
    };
  },
  methods: {
    goPage(pageComponent) {
      window.console.log(pageComponent);
      this.$root.api.api.openWin({
        name: "UexQuery_" + pageComponent,
        url: "./UexQuery.html",
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

<style scoped lang="scss">
/deep/.mu-item-action {
  min-width: 40px;
}

.mu-item.has-avatar {
  height: 40px !important;
  line-height: 4px;
}

.demo-list-wrap {
  margin: 10px 0 0 0;
  .mu-list-three-line /deep/ .mu-item {
    height: 102px !important;
  }
  width: 100%;

  .mu-list-item-title {
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    line-height: 4rem;
    height: 3rem;
    margin-left: 12%;
    .mu-list-item-title-icon {
      font-size: 2rem;
      line-height: 2rem;
      vertical-align: middle;
      position: absolute;
      right: 28px;
      top: 20px;
    }
  }
  .mu-divider {
    margin-left: 12%;
    width: 80%;
  }
  .mu-list-item-content {
    .row {
      margin-bottom: 0.7rem;
      font-size: 0.8rem;

      color: rgb(158, 158, 158);
      &:last-child {
        margin-bottom: 0;
      }
      .mu-row-icon {
        position: absolute;
        left: 0.3rem;
      }
    }
  }
  .mu-sub-header-list {
    color: rgba(0, 0, 0, 0.87);
    font-weight: bold;
  }
  .order-mu-list-item {
    height: 2.5rem;
    .mu-sub-header-list-title {
      font-weight: bold;
      padding-left: 17%;
      font-size: 16px !important;
    }
  }
  .vm-progress {
    left: -0.5rem;
  }
  .vm-progress /deep/ .vm-progress__text {
    font-size: 1.5rem !important;
    color: #9e9e9e;
  }

  .mu-circular-progress-ringht {
    position: relative;
    left: 3.5rem;
    .vm-progress /deep/ .vm-progress__text {
      font-size: 1rem !important;
    }
    .mu-circular-progress-ringht-title {
      color: #1184e1;
      position: relative;
      top: -0.1rem;
      right: 0.8rem;
    }
  }
  .demo-vsteper-container {
    .mu-step-container {
      .mu-step-content {
        border-left: 3px solid #1abc9c;
        margin-top: 7px;
        margin-left: 1.5rem;
        .mu-step-p-color {
          color: #1abc9c;
          font-size: 0.8rem;
          height: 1rem;
        }
      }
    }
    .mu-step-comm {
      height: 4rem;
    }
  }
  /deep/.mu-step-connector-line {
    min-height: 35px;
  }
}

.done {
  margin-top: 0px !important;
}

.demo-list-wrap .mu-list-item-title {
  margin-left: 0;
  text-align: center;
}
.demo-list-wrap .first_item {
  margin: 0 0 0 12%;
  width: 84%;
  /deep/.mu-item-content .mu-list-item-content {
    padding-right: 20px;
  }
}
.mu-sub-header {
  line-height: 35px;
}
.fontcolor {
  padding-left: 1.3rem;
}
</style>
