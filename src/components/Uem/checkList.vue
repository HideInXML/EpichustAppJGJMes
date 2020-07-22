<template>
  <div style="height:100vh;background-color:#f0eff4;">
    <!-- <mu-list class="input-items">
      <mu-list-item :ripple="false" class="input-item">
        <mu-list-item-title >标题标题标题标题</mu-list-item-title>
        <mu-list-item-content>
          <mu-text-field v-model="form.goodQty" type="number" placeholder="请输入良品数" underline-color="green400"></mu-text-field>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>-->
    <mu-paper :z-depth="0" style="margin:0;">
      <mu-list class="check-list item-border-b" style="background-color:#f0eff4;">
        <div
          v-for="(item,index) in orderDetails"
          :key="index"
          button
          class="check-item"
          @click="goPage(item,index)"
        >
          <mu-list-item avatar button :ripple="true" style="background-color:white;">
            <mu-list-item-action>
              <mu-icon class="title-icon finished" value="list_alt"  size="28"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>QWE-909878899{{index+1}}</mu-list-item-title>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon class="title-icon" value="keyboard_arrow_right" color="#bdbdbd" size="30"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
          <mu-row class="mg-b bgcolor">
            <mu-col class="mg-b mg-l" span="12">
              <span class="fontcolor">点检日期：2019-06-30</span>
            </mu-col>
            <mu-col class="mg-b mg-l" span="12">
              <span class="fontcolor">维护计划名称：DJ004</span>
            </mu-col>
            <mu-col class="mg-b mg-l" span="12">
              <span class="fontcolor">设备编码：01qty222</span>
            </mu-col>
            <mu-col class="mg-b mg-l" span="12">
              <span class="fontcolor">设备名称：存储罐</span>
            </mu-col>
            <mu-col class="mg-l" span="12">
              <span class="fontcolor">维护周期：10</span>
            </mu-col>
          </mu-row>
          <mu-flex class="check-status" align-items="center">
            <mu-icon
              class="dot-icon"
              value="fiber_manual_record"
              :color="item.extension?'#e46262':'#2cb69c'"
              size="10"
            ></mu-icon>
            <div
              style="margin-left:10px"
              :class="item.extension?'fail_new':'success_new'"
            >{{item.status}}</div>
          </mu-flex>
        </div>
      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: "CheckList",
  components: {},
  props: {},
  data() {
    return {
      orderDetails: [
        {
          status: "延期",
          extension: true
        },
        {
          status: "正常",
          extension: false
        }
      ]
    };
  },
  methods: {
    goPage(item, index) {
      let pageComponent = "CheckingDetail";
      window.console.log(pageComponent);
      this.$root.api.api.openWin({
        name: "UemChecking_" + pageComponent,
        url: "./UemChecking.html",
        progress: {
          name: ""
        },
        pageParam: {
          component: pageComponent,
          title: "设备点检明细"
        }
      });
    }
  },
  computed: {},
  mounted() {
    console.log(this.orderDetails);
  }
};
</script>

<style scope lang="scss">
.check-list {
  .check-item {
    position: relative;
  }
  .check-status {
    position: absolute;
    bottom: 12px;
    right: 16px;
  }
  .mg-b {
    margin-bottom: .5rem;
  }
  .mg-l:last-child {
    margin-bottom: 1rem;
  }
   .mg-l:nth-child(1) {
    margin-top: 1rem;
  }
  /deep/.mu-item.has-avatar{
    height: 48px;
  }
}
.bgcolor {
  background-color: #fafafa;
  padding-left: 50px;
}
</style>
