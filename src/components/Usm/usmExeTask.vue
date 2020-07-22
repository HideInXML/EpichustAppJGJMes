<template>
  <div id="app" class="flex-bottom-auto">
    <!-- 查询区域 -->
    <section>
      <mu-list class="input-items">
        <mu-list-item :ripple="false" class="input-item">
          <mu-list-item-action>
            <mu-icon value="search" class="finished" size="28"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-text-field v-model="taskName" type="text" placeholder="请输入任务名称"></mu-text-field>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item :ripple="false" class="input-item">
          <mu-checkbox v-model="selectList" value="exResponse" label="响应"></mu-checkbox>
          <mu-checkbox v-model="selectList" value="exHandling" label="处理"></mu-checkbox>
          <mu-checkbox v-model="selectList" value="exClosing" label="关闭"></mu-checkbox>
          <mu-checkbox v-model="selectList" value="exConfirmClose" label="确认关闭"></mu-checkbox>
        </mu-list-item>
      </mu-list>
    </section>

    <!-- 异常任务列表 -->
    <section style="margin-top:-20px;">
      <mu-paper :z-depth="0">
        <mu-list class="input-items item-border-b">
          <div
            v-for="(item,index) in usmList"
            :key="index"
            style="background-color: #fff;"
            @click="goPage(item,index)"
          >
            <mu-list-item avatar button :ripple="true">
              <mu-list-item-action>
                <mu-icon class="title-icon finished" value="list_alt" size="28"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{item.taskTime}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-list-item-sub-title
                  v-if="item.formCode === 'exResponse'"
                  style="color:red"
                >{{item.taskName}}</mu-list-item-sub-title>
                <mu-list-item-sub-title
                  v-else-if="item.formCode === 'exHandling'"
                  style="color:green"
                >{{item.taskName}}</mu-list-item-sub-title>
                <mu-list-item-sub-title
                  v-else-if="item.formCode === 'exClosing'"
                  style="color:purple"
                >{{item.taskName}}</mu-list-item-sub-title>
                <mu-list-item-sub-title
                  v-else-if="item.formCode === 'exConfirmClose'"
                  style="color:blue"
                >{{item.taskName}}</mu-list-item-sub-title>
                <mu-list-item-sub-title v-else>{{item.taskName}}</mu-list-item-sub-title>
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
              <mu-col class="mg-b mg-l" span="12">
                <span class="fontcolor">异常大类型:{{item.exUdiTypeName}}</span>
              </mu-col>
              <mu-col class="mg-b mg-l" span="12">
                <span class="fontcolor">异常小类型:{{item.exTypeName}}</span>
              </mu-col>
              <mu-col class="mg-b mg-l" span="12">
                <span class="fontcolor">异常内容:{{item.exContentName}}</span>
              </mu-col>
              <mu-col class="mg-l" span="12">
                <span class="fontcolor">异常描述:{{item.exceptionRemark}}</span>
              </mu-col>
              <mu-col class="mg-l" span="12">
                <span class="fontcolor">工位编码:{{item.workCellCode}}</span>
              </mu-col>
            </mu-row>
          </div>
        </mu-list>
      </mu-paper>
    </section>
  </div>
</template>
<script >
import http from "../../utils/http.js";
import Storage from "../../utils/storage";
import "muse-ui-message/dist/muse-ui-message.css";
// import Toast from "muse-ui-toast";
import qs from "qs";
import _ from "lodash";

export default {
  name: "UsmExeTask",
  components: {},
  data() {
    return {
      taskName: "",
      usmList: [],
      selectList: ["exResponse", "exHandling", "exClosing", "exConfirmClose"],
      filterList: ["exResponse", "exHandling", "exClosing", "exConfirmClose"]
    };
  },
  methods: {
    getUsmTask: _.throttle(function() {
      let loginConfig = Storage.getObject("loginConfig");
      let loginName = loginConfig.un;
      let data = qs.stringify({ loginName, taskName: this.taskName });
      http
        .post({
          url: "productPadUsmController!getUsmTask.m",
          data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            let arr = [];
            resData.forEach((item1, i) => {
              let formCode = item1.formCode;
              this.filterList.forEach((item2, j) => {
                if (formCode == item2) {
                  arr.push(item1);
                }
              });
            });
            this.usmList = arr;
          }
        });
    }, 1000),

    goPage(item, index) {
      let goPageTitle = "";
      if (item.formCode === "exResponse") {
        goPageTitle = "异常响应";
      } else if (item.formCode === "exHandling") {
        goPageTitle = "异常处理";
      } else if (item.formCode === "exClosing") {
        goPageTitle = "异常关闭";
      } else if (item.formCode === "exConfirmClose") {
        goPageTitle = "发起人确认关闭";
      }
      let pageComponent = "UsmExeOperate";
      this.$root.api.api.openWin({
        name: "UsmTask_" + pageComponent,
        url: "./UsmTask.html",
        pageParam: {
          component: pageComponent,
          title: goPageTitle,
          pageData: item
        }
      });
    }
  },
  watch: {
    taskName() {
      this.getUsmTask();
    },
    selectList(val) {
      this.filterList = [...val];
      this.getUsmTask();
    }
  },
  mounted() {
    let self = this;
    this.$root.api.api.addEventListener(
      {
        name: "refreshUsmTask"
      },
      function(ret, err) {
        self.getUsmTask();
      }
    );
    this.getUsmTask();
  }
};
</script>
<style scoped lang="scss">
.mg-b {
  margin-bottom: 0.4rem;
}
.mg-t {
  margin-top: 1rem;
}
.mg-l {
  margin-left: 2rem;
}
.bgcolor {
  background-color: #fafafa;
  padding-left: 18px;
}
.mu-item.has-avatar {
  height: 30px !important;
  line-height: 30px;
}
/deep/.mu-checkbox {
  margin-right: 12px;
  .mu-checkbox-icon {
    margin-right: 0;
  }
}
</style>
