<template>
  <div style="height:100vh;background-color: #f0eff4;">
    <section style="margin-bottom:6px;">
      <mu-paper :z-depth="0">
        <mu-list class="input-items item-border-b">
          <div v-for="(item,index) in 5" :key="index"   style="background-color: #fff;">
            <mu-list-item avatar button :ripple="true" @click="goPage(item,index)">
              <mu-list-item-action>
                <mu-icon class="title-icon finished" value="list_alt"  size="28"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>20190712001{{index+1}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-list-item-sub-title>查看详情</mu-list-item-sub-title>
              </mu-list-item-action>
              <mu-list-item-action>
                <mu-button icon>
                  <mu-icon
                    class="title-icon"
                    value="keyboard_arrow_right"
                    color="#bdbdbd"
                    size="30"
                  ></mu-icon>
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-row class="mg-b bgcolor">
              <mu-col class="mg-b mg-l" span="12"><span class="fontcolor">异常类型:设备异常</span></mu-col>
              <mu-col class="mg-b mg-l" span="12"><span class="fontcolor">异常内容:CNC们异常</span></mu-col>
              <mu-col class="mg-l" span="12"><span class="fontcolor">异常描述:CNR左门损坏</span></mu-col>
            </mu-row>
          </div>
        </mu-list>
      </mu-paper>
    </section>
  </div>
</template>

<script>
export default {
  name: "UsmExeSelect",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    goPage(item, index) {
      let pageComponent = "UsmExeDetail";
      window.console.log(pageComponent);
      this.$root.api.api.openWin({
        name: "UsmQuery_" + pageComponent,
        url: "./UsmQuery.html",
        progress: {
          name: ""
        },
        pageParam: {
          component: pageComponent,
          title: "异常详情"
        }
      });
    }
  },
  computed: {},
  // mounted() {}
};
</script>

<style scope lang="scss">
.mg-b {
  margin-bottom: .4rem;
}
.mg-t {
  margin-top: 1rem;
}
.mg-l {
  margin-left: 2rem;
}
.bgcolor{
  background-color: #fafafa;
  padding-left: 18px;
}
.mu-item.has-avatar{
  height: 30px !important;
   line-height: 30px;
}
</style>
