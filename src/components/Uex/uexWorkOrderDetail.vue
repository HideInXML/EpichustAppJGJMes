<template>
  <div>
    <mu-paper :z-depth="1" style="position: absolute;width: 94%;left: 3%;margin-top: 10px;">
      <mu-list class="list">
        <mu-list-item class="epic-list-item">
          <mu-row class="epic-row" style="width: 100%;">
            <mu-col class="epic-col epic-text-style epic-text-color" span="12">PO-20190327</mu-col>
            <mu-col class="epic-col fontcolor" span="9">一工厂|工艺路线|从动轴一轴</mu-col>
            <mu-col class="epic-col epic-text-style-font-qty" span="3">1200个</mu-col>
            <mu-col span="12">
              <vm-progress :percentage="30" class="epic-progress"></vm-progress>
            </mu-col>
          </mu-row>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
    </mu-paper>

    <mu-paper :z-depth="1"  style="position: absolute;width: 94%;left: 3%;margin-top: 120px;">
      <mu-sub-header style="color: #666;font-size: 14px;font-weight: 600;background-color: #f0eff4;">生产任务</mu-sub-header>
      <epic-step
        style="margin-top:10px"
        class="initHeight"
        :now-step="nowStep"
        :step-list="stepList"
        :lableTextStyle="{'margin-left':' 0px','font-size': '15px',color:'#2cb69a','font-weight': '600'}"
        :lableContentStyle="{'margin-left': '0px','font-size': '13px',color: 'rgba(0, 0, 0, 0.51)','font-weight': '600'}"
        style-type="style1"
        direction="vertical"
      ></epic-step>
    </mu-paper>
  </div>
</template>

<script>
import EpicStep from "../epic-step";
let data = [
  {
    lableText: "WO-20190628-110",
    lableContent: "2019-06-28 12:12:00",
    state: "完工"
  },
  {
    lableText: "WO-20190628-110",
    lableContent: "2019-06-28 12:12:00",
    state: "完工"
  },
  {
    lableText: "WO-20190628-110",
    lableContent: "2019-06-28 12:12:00",
    state: "开工"
  },
  {
    lableText: "WO-20190628-110",
    lableContent: "2019-06-28 12:12:00",
    state: "未完工"
  }
];

export default {
  name: "UexWorkOrderDetail",
  components: {
    EpicStep
  },
  props: {},
  data() {
    return {
      nowStep: 2,
      stepList: data
    };
  },
  methods: {},
  computed: {},
  // mounted() {}
};
</script>

<style lang="scss" scoped>
.initHeight {
  height: auto;
  overflow: scroll;
}
.mu-paper /deep/ .mu-list {
  padding: 0 8px 0;
  margin-top: 10px;
}
/deep/ .mu-item {
  padding: 0;
}
  .epic-list-item {
    height: 5rem;
    padding-top: 10px;
    margin: 3px 0;
    .epic-row {
      .epic-col {
        height: 28px;
        line-height: 28px;
        vertical-align: middle;
      }
      .epic-text-style {
        padding-left: 1rem;
        padding-top: 2px;
      }
      .epic-text-color {
        color: #1abc9c;
        font-size: 1rem;
        font-weight: bold;
      }
      .epic-text-style-font {
        color: #9e9e9e;
        font-size: 0.8rem;
        padding-left: 0px;
      }
      .epic-text-style-font-qty {
        color: rgba(0, 0, 0, 0.66);
        font-size: 1.2rem;
        font-weight: bold;
      }
      .epic-progress {
        margin: 10px 0;
        border-radius: 6px;
      }
    }
  }


.epic-step-container {
  .epic-step-row {
    // background-color: #34CD99;
    margin-top: 18px;
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.mu-sub-header{
  line-height: 42px;
}
</style>
