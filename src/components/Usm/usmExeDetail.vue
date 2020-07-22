<template>
  <div id="app" style="height: 100vh;">
    <section>
      <mu-paper :z-depth="0"  class='spacing_shadowdiv'>
        <mu-list style=" height: 6rem;">
          <mu-list-item button :ripple="false">
            <mu-row style="width: 100%;color:#fff;">
              <mu-col span="12" style="font-size:.9rem;text-align:left;margin-top:20px;">异常编号</mu-col>
              <mu-col
                span="12"
                style="font-size:1rem;text-align:center;margin-top:10px;"
              >USM_EX_BILL_20190711</mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <section style="background-color: #1abc9c;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">发起信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">发起人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" v-model="launchId" disabled underline-color="#1abc9c"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">发起时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="launchTime"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-sub-header class="item-hedaer">响应信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">响应人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="responseId"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">响应时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="responseTime"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-sub-header class="item-hedaer">处理信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">处理人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="dealId"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">处理时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="dealTime"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">处理措施</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="dealMeasure"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

           <mu-sub-header class="item-hedaer">关闭信息</mu-sub-header>
           <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">关闭人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="closeId"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

           <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;">关闭时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled underline-color="#1abc9c" v-model="closeTime"></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

        </mu-list>
      </mu-paper>
    </section>
  </div>
</template>

<script>
export default {
  name: "UsmExeDetail",
  components: {},
  props: {},
  data() {
    return {
      launchId: "admin",
      launchTime: "2019-07-11 13:15:46",
      responseId: "YJH",
      responseTime: "2019-07-11 15:26:38",
      dealId: "2230512",
      dealTime: "2019-07-12 09:26:35",
      dealMeasure: "螺丝松动拧紧",
      closeId: '2356',
      closeTime: '2019-07-13 09:26:35'
    };
  },
  methods: {},
  computed: {},
  // mounted() {}
};
</script>

<style scope lang="scss">
.mu-item-title {
  font-size: 0.9rem;
}
/deep/.mu-text-field-input {
  font-size: 0.9rem;
}
/deep/.mu-input-line.disabled {
  border-bottom: 0;
}
.item-hedaer.mu-sub-header{
  background-color: #f0eff4 !important;
}

</style>
