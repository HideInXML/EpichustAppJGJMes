<template>
  <div id="app" style="height: 100vh;" class="flex-bottom-auto">
    <section>
      <mu-paper :z-depth="0" class="spacing_shadowdiv">
        <mu-list style=" height: 6rem;">
          <mu-list-item button :ripple="false">
            <mu-row style="width: 100%;color:#fff;">
              <mu-col span="12" style="font-size:.9rem;text-align:left;margin-top:24px;">异常编号</mu-col>
              <mu-col
                span="12"
                style="font-size:1rem;text-align:center;margin-top:10px;"
              >{{pageData.usmBillCode}}</mu-col>

              <mu-col span="12" style="font-size:.8rem;text-align:left;margin-top:10px;">
                <mu-flex class="flex-wrapper" align-items="center">
                  <mu-flex class="flex-demo" justify-content="around" fill>异常大类型:</mu-flex>
                  <mu-flex class="flex-demo" justify-content="start" fill>{{pageData.exUdiTypeName}}</mu-flex>
                  <mu-flex class="flex-demo" justify-content="around" fill>异常内容:</mu-flex>
                  <mu-flex class="flex-demo" justify-content="start" fill>{{pageData.exContentName}}</mu-flex>
                </mu-flex>
              </mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 发起信息 -->
    <section style="background-color: #1abc9c;margin-bottom:6px;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">发起信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">异常小类型</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.exTypeName"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">发起人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.launchId"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">发起时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.launchDate"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">异常描述</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.exceptionRemark"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 响应信息 -->
    <section
      style="background-color: #1abc9c;margin-bottom:6px;"
      v-show="pageData.formCode === 'exHandling' || pageData.formCode === 'exClosing' || pageData.formCode === 'exConfirmClose' "
    >
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">响应信息</mu-sub-header>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">响应人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.responseId"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">响应时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.responseDate"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">响应备注</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.responseRemark"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 处理信息 -->
    <section
      style="background-color: #1abc9c;margin-bottom:6px;"
      v-show="pageData.formCode === 'exClosing' || pageData.formCode === 'exConfirmClose' "
    >
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">处理信息</mu-sub-header>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">处理人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.handlId"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">处理时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.handlDate"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">处理措施</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.handlMeasureName"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">处理备注</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.handlRemark"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 关闭信息 -->
    <section
      style="background-color: #1abc9c;margin-bottom:6px;"
      v-show="pageData.formCode === 'exConfirmClose' "
    >
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">关闭信息</mu-sub-header>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">关闭人</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.closeId"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">关闭时间</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.closeDate"
              ></mu-text-field>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">关闭备注</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field
                type="text"
                disabled
                underline-color="#1abc9c"
                v-model="usmBillData.closeRemark"
              ></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="22" value="create"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!--异常处理措施弹框-->
    <mu-container>
      <mu-dialog
        title="异常处理措施列表"
        width="500"
        max-width="500"
        :padding="padding"
        scrollable
        :open.sync="openScroll_measure"
      >
        <mu-list>
          <mu-list-item v-for="(item,index) in measureList" :key="index">
            <mu-list-item-content>
              <mu-radio
                :label="item.usmMeasureCode + ':' + item.usmMeasureName"
                :value="item"
                v-model="usmMeasureOpt"
              ></mu-radio>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <mu-button slot="actions" flat color="primary" @click="closeMeasureDialog">确定</mu-button>
      </mu-dialog>
    </mu-container>

    <!--异常原因弹框-->
    <mu-container>
      <mu-dialog
        title="异常原因列表"
        width="500"
        max-width="500"
        :padding="padding"
        scrollable
        :open.sync="openScroll_reason"
      >
        <mu-list>
          <mu-list-item v-for="(item,index) in reasonList" :key="index">
            <mu-list-item-content>
              <mu-radio
                :label="item.usmReasonCode + ':' + item.usmReasonName"
                :value="item"
                v-model="usmReasonOpt"
              ></mu-radio>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <mu-button slot="actions" flat color="primary" @click="closeReasonDialog">确定</mu-button>
      </mu-dialog>
    </mu-container>

    <!-- 异常响应编辑信息区域 -->
    <section
      style="background-color: #1abc9c;margin-bottom:6px;"
      v-show="pageData.formCode === 'exResponse' "
    >
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">编辑信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title class="fontcolor">是否转移</mu-list-item-title>
            <mu-list-item-action>
              <mu-switch v-model="isTransfer"></mu-switch>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">转移备注</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" placeholder="请输入备注" v-model="transRemark"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="22" value="create"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 异常处理编辑信息区域 -->
    <section
      style="background-color: #1abc9c;margin-bottom:6px;"
      v-show="pageData.formCode === 'exHandling' "
    >
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">编辑信息</mu-sub-header>

          <mu-list-item button @click="opMeasureDialog">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">异常措施</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled v-model="exeMeasureText" placeholder="请选择异常措施"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">备注</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" placeholder="请输入备注" v-model="exHandlRemark"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="22" value="create"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 异常关闭编辑信息区域 -->
    <section
      style="background-color: #1abc9c;margin-bottom:6px;"
      v-show="pageData.formCode === 'exClosing' "
    >
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">编辑信息</mu-sub-header>

          <mu-list-item button @click="opReasonDialog">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">异常原因</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled v-model="exeReasonText" placeholder="请选择异常原因"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">备注</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" placeholder="请输入备注" v-model="exCloseRemark"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="22" value="create"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <!-- 异常确认关闭编辑信息区域 -->
    <section
      style="background-color: #1abc9c;margin-bottom:6px;"
      v-show="pageData.formCode === 'exConfirmClose' "
    >
      <mu-paper :z-depth="1">
        <mu-list class="input-items item-border-b">
          <mu-sub-header class="item-hedaer">编辑信息</mu-sub-header>
          <mu-list-item button :ripple="false">
            <mu-list-item-title class="fontcolor">是否关闭</mu-list-item-title>
            <mu-list-item-action>
              <mu-switch v-model="isClose"></mu-switch>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <section>
      <mu-row>
        <mu-col span="12">
          <mu-button large class="main-bg" textColor="white" style="width:100%" @click="doSumbit">提交</mu-button>
        </mu-col>
      </mu-row>
    </section>
  </div>
</template>
<script >
import http from "../../utils/http.js";
import Storage from "../../utils/storage";
import "muse-ui-message/dist/muse-ui-message.css";
import Message from "muse-ui-message";
import qs from "qs";
// import Toast from "muse-ui-toast";

export default {
  name: "UsmExeOperate",
  components: {},
  props: {
    pageData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      loginName: Storage.getObject("loginConfig").un,
      usmBillData: {},
      transRemark: "", // 异常响应备注
      exHandlRemark: "", // 异常处理备注
      exCloseRemark: "", // 异常关闭备注
      isTransfer: false, // 是否转移
      isClose: false, // 是否关闭
      openScroll_measure: false,
      openScroll_reason: false,
      exeMeasureText: "",
      exeReasonText: "",
      usmMeasureOpt: "",
      usmReasonOpt: "",
      padding: 15,
      measureList: [],
      reasonList: []
    };
  },
  methods: {
    opMeasureDialog() {
      this.openScroll_measure = true;
      this.getUsmMeasureByExeType();
    },
    opReasonDialog() {
      this.openScroll_reason = true;
      this.getUsmReasonByExeType();
    },
    closeMeasureDialog() {
      this.openScroll_measure = false;
      let Code = this.usmMeasureOpt.usmMeasureCode || "";
      let Name = this.usmMeasureOpt.usmMeasureName || "";
      this.exeMeasureText = Code + ":" + Name;
      // 这代码啥意思
      // this.exeMeasureText = ":"
      //   ? (this.exeMeasureText = "")
      //   : (this.exeMeasureText = this.exeMeasureText);
    },
    closeReasonDialog() {
      this.openScroll_reason = false;
      this.exeReasonText =
        this.usmReasonOpt.usmReasonCode + ":" + this.usmReasonOpt.usmReasonName;
      let Code = this.usmReasonOpt.usmReasonCode || "";
      let Name = this.usmReasonOpt.usmReasonName || "";
      this.exeReasonText = Code + ":" + Name;
      // 这代码啥意思
      // this.exeReasonText = ":"
      //   ? (this.exeReasonText = "")
      //   : (this.exeReasonText = this.exeReasonText);
    },
    // 获取异常处理措施
    getUsmMeasureByExeType() {
      let loginName = this.loginName;
      let exeTypeId = this.pageData.exTypeId;
      let data = qs.stringify({ loginName, exeTypeId });
      http
        .post({
          url: "productPadUsmController!getUsmMeasureByExeType.m",
          data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.measureList = resData;
          }
        });
    },
    // 获取异常原因
    getUsmReasonByExeType() {
      let loginName = this.loginName;
      let exeTypeId = this.pageData.exTypeId;
      let data = qs.stringify({ loginName, exeTypeId });
      http
        .post({
          url: "productPadUsmController!getUsmReasonByExeType.m",
          data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.reasonList = resData;
          }
        });
    },
    getUsmBill() {
      let loginName = this.loginName;
      let usmBillId = this.pageData.usmBillId;
      let formCode = this.pageData.formCode;
      let flag = "1";
      if (formCode === "exResponse") {
        flag = "1";
      } else if (formCode === "exHandling") {
        flag = "3";
      } else if (formCode === "exClosing") {
        flag = "7";
      } else if (formCode === "exConfirmClose") {
        flag = "9";
      }
      let data = qs.stringify({ loginName, usmBillId, flag });
      http
        .post({
          url: "productPadUsmController!getUsmBill.m",
          data: data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.usmBillData = resData;
          }
        });
    },
    getUrl() {
      let formCode = this.pageData.formCode;
      let url = "";
      if (formCode === "exResponse") {
        url = "productPadUsmController!dealResponseTask.m";
      } else if (formCode === "exHandling") {
        url = "productPadUsmController!dealHandlTask.m";
      } else if (formCode === "exClosing") {
        url = "productPadUsmController!dealCloseTask.m";
      } else if (formCode === "exConfirmClose") {
        url = "productPadUsmController!dealConfirmCloseTask.m";
      }
      return url;
    },
    getData() {
      let loginName = this.loginName;
      let usmBillId = this.pageData.usmBillId; //异常单据id
      let isTransfer = this.isTransfer; // 是否转移
      let transRemark = this.transRemark; //异常响应备注
      let taskId = this.pageData.taskId; // 任务id

      let usmMeasureId = this.usmMeasureOpt.usmMeasureId; // 异常处理措施id
      let exHandlRemark = this.exHandlRemark; // 异常处理备注

      let usmReasonId = this.usmReasonOpt.usmReasonId; // 异常原因id
      let exCloseRemark = this.exCloseRemark; // 异常关闭备注

      let isClose = this.isClose; // 是否关闭

      let data = qs.stringify({
        loginName,
        usmBillId,
        isTransfer,
        transRemark,
        taskId,
        usmMeasureId,
        exHandlRemark,
        usmReasonId,
        exCloseRemark,
        isClose
      });
      return data;
    },
    doSumbit() {
      let data = this.getData();
      let url = this.getUrl();
      http
        .post({ url, data, autoLogin: true })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            Message.alert("操作成功", "提示", {
              type: "success",
              okLabel: "确定" // 对话框确定按钮文字
            }).then(({ result }) => {
              if (result) {
                this.$root.api.api.sendEvent({
                  name: "refreshUsmTask",
                  extra: {}
                });
                this.$root.api.api.closeWin();
              }
            });
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }
  },
  mounted() {
    this.getUsmBill();
  }
};
</script>
<style scoped lang="scss">
.mu-item-title {
  font-size: 0.9rem;
}
/deep/.mu-text-field-input {
  font-size: 0.9rem;
  color: #9e9e9e;
}
/deep/.mu-input-line.disabled {
  border-bottom: 0;
}
/deep/.mu-input-focus-line {
  display: block !important;
}
</style>
