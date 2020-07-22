<template>
  <div style="height: 100vh;width: 100vw;">
    <!-- 头部 -->
    <section class="header">
      <div
        class="header-title"
        @click="selectWorkCell"
        v-if="workCellAndWorkCenterText"
      >{{workCellAndWorkCenterText}}</div>
      <div class="header-title" @click="selectWorkCell" v-else>选择工位</div>
    </section>

    <!-- 内容 -->
    <section class="content">
      <mu-row>
        <!-- 左边 -->
        <mu-col
          span="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
          style="display: flex;height: 90vh;flex-direction: column;"
        >
          <div class="left-item" style="display:flex;flex-grow:1.2">
            <div class="left-item-title">Andon</div>
            <div class="left-item-title">触发</div>
            <div class="left-item-title">响应</div>
            <div class="left-item-title">完成</div>
          </div>

          <div
            class="left-item"
            v-for="(item,index) in exBigTypeList"
            :key="index"
            style="display:flex;flex-grow:2"
          >
            <div class="left-item-title left-item-wrap">
              <div class="left-item-content">{{item.udiName}}</div>
              <div>{{item.exForignerName}}</div>
            </div>
            <div class="left-item-title" v-for="(item2,idx) in status" :key="idx">
              <div
                class="left-item-circle"
                ref="circleSize"
                :class="circleStyle(item.exCurrentFormCode,idx)"
                @click="doOperate(item,idx,index)"
              ></div>
            </div>
          </div>
        </mu-col>
        <!-- 右边 -->
        <mu-col
          span="12"
          sm="12"
          md="4"
          lg="4"
          xl="4"
          style="display: flex;height: 90vh;flex-direction: column;"
        >
          <div class="right-item right-item-firth" style="display:flex;flex-grow:1">
            <div>
              <div>运行状态</div>
              <div>Product State</div>
            </div>
          </div>
          <div
            class="right-item right-item-second"
            :class="rightRunstatusClass"
            style="display:flex;flex-grow:3"
          >
            <div>
              <div>{{rightRunstatusText}}</div>
            </div>
          </div>
          <div class="right-item right-item-third" style="display:flex;flex-grow:6">
            <div style="display: flex;flex-direction: column;height: 60vh;">
              <mu-row class="right-item-line">
                <mu-col span="5" fill>异常小类代码:</mu-col>
                <mu-col
                  span="7"
                  fill
                  style="display: flex;"
                >{{currentData2.exTypeCode ? currentData2.exTypeCode : ""}}</mu-col>
              </mu-row>
              <mu-row class="right-item-line">
                <mu-col span="5" fill>异常小类名称:</mu-col>
                <mu-col
                  span="7"
                  fill
                  style="display: flex;"
                >{{currentData2.exTypeName ? currentData2.exTypeName : ""}}</mu-col>
              </mu-row>
              <mu-row class="right-item-line">
                <mu-col span="5" fill>异常原因编码:</mu-col>
                <mu-col
                  span="7"
                  fill
                >{{currentData2.exContentCode ? currentData2.exContentCode : ""}}</mu-col>
              </mu-row>
              <mu-row class="right-item-line">
                <mu-col span="5" fill>异常原因名称:</mu-col>
                <mu-col
                  span="7"
                  fill
                >{{currentData2.exContentName ? currentData2.exContentName : ""}}</mu-col>
              </mu-row>
            </div>
          </div>
        </mu-col>
      </mu-row>
    </section>

    <!--响应弹框-->
    <mu-container>
      <mu-dialog
        title="响应"
        width="500"
        max-width="500"
        :padding="padding"
        scrollable
        :open.sync="openScroll"
      >
        <mu-row>
          <mu-col span="12">
            <mu-select
              label="请选择异常小类"
              v-model="currentData.exTypeName"
              full-width
              @change="smallTypeChangeEvt"
            >
              <mu-option
                v-for="(item,index) in exTypeList"
                :key="index"
                :label="item.exTypeName || ''"
                :value="item.exTypeName || ''"
              ></mu-option>
            </mu-select>
          </mu-col>
          <mu-col span="12">
            <mu-select
              label="请选择异常异常原因"
              v-model="currentData.exContentName"
              full-width
              @change="contentChangeEvt"
            >
              <mu-option
                v-for="(item,index) in exContentList"
                :key="index"
                :label="item.usmContentName || ''"
                :value="item.usmContentName || ''"
              ></mu-option>
            </mu-select>
          </mu-col>
        </mu-row>
        <mu-button slot="actions" flat color="primary" @click="closeDialogToLanch">确定</mu-button>
      </mu-dialog>
    </mu-container>

    <!--工位弹框-->
    <mu-container>
      <mu-dialog
        title="工位列表"
        width="500"
        max-width="500"
        :padding="padding"
        scrollable
        :open.sync="openScroll_workCell"
      >
        <tree-select
          :listData.sync="workListData"
          @doChildClick="doChildWorkCellClick"
          :isMultiple="isMultiple"
        ></tree-select>
        <mu-button slot="actions" flat color="primary" @click="closeWorkCellDialog">确定</mu-button>
      </mu-dialog>
    </mu-container>
  </div>
</template>

<script >
// import axios from "axios";
import http from "../../../utils/http.js";
import Storage from "../../../utils/storage";
import qs from "qs";

import TreeSelect from "../../../components/treeselect";

import "muse-ui-message/dist/muse-ui-message.css";
import Toast from "muse-ui-toast";

export default {
  name: "UsmAndon",
  components: {
    TreeSelect
  },
  data() {
    return {
      loginName: Storage.getObject("loginConfig").un,
      openScroll: false,
      openScroll_workCell: false,
      workListData: [],
      workCellItem: {},
      workCellAndWorkCenterText: "",
      padding: 15,
      isMultiple: false,
      exTypeList: [
        // {
        //   exTypeId: "1",
        //   exTypeCode: "EX-20190904-SB-01",
        //   exTypeName: "设备异常小类01"
        // },
      ],
      exContentList: [
        // {
        //   usmContentId: "1",
        //   usmContentCode: "EX-JXS20190904-CON1",
        //   usmContentName: "设备机械手损坏01"
        // },
      ],
      exactiveMap: {},
      currentData: {
        exType: "", // 当前的异常类型对象
        exTypeName: "", // 当前的异常类型名称
        exContent: "", // 当前的异常内容对象
        exContentName: "", // 当前的异常内容名称
        usmBill: "" // 当前准备操作的单据
      },
      currentData2: {
        exType: "", // 当前的异常类型对象
        exTypeCode: "", // 当前的异常类型编码
        exTypeName: "", // 当前的异常类型名称
        exContent: "", // 当前的异常内容对象
        exContentCode: "", // 当前的异常内容编码
        exContentName: "", // 当前的异常内容名称
        usmBill: "" // 当前准备操作的单据
      },
      currentIndex: "",
      currentIdx: "",
      exBigTypeList: [
        {
          exTypeCode: "EX-SB",
          exTypeName: "设备",
          exForignerName: "Machine",
          exCurrentFormCode: "", // 0 触发  1 响应   2 完成
          udiCode: "SB_EXCEPTION"
        },
        {
          exTypeCode: "EX-ZL",
          exTypeName: "质量",
          exForignerName: "Quality",
          exCurrentFormCode: "", // 0 触发  1 响应   2 完成
          udiCode: "SC_EXCEPTION"
        },
        {
          exTypeCode: "EX-WL",
          exTypeName: "物料",
          exForignerName: "Material",
          exCurrentFormCode: "", // 0 触发  1 响应   2 完成
          udiCode: "WL_EXCEPTION"
        }
      ],
      status: [
        "circle-active-green",
        "circle-active-yellow",
        "circle-active-red"
      ],
      rightStuts: [
        "right-stuts-red",
        "right-stuts-yellow",
        "right-stuts-green"
      ],
      rightStutsTxt: ["报警", "响应", "运行"],
      rightRunstatusClass: "", // 右边运行状态的颜色
      rightRunstatusText: "运行" // 右边运行状态
    };
  },
  methods: {
    circleStyle(formCode, idx) {
      const status = [
        "circle-active-red",
        "circle-active-yellow",
        "circle-active-green"
      ];
      if (!formCode) {
        return "circle-active-default";
      }

      formCode = +formCode;
      idx = +idx;
      if (formCode == idx) {
        return status[idx];
      } else {
        return "circle-active-default";
      }
    },
    rightStutsStyle() {
      let resRed = this.exBigTypeList.findIndex(item => {
        return item.exCurrentFormCode == "0";
      });
      if (resRed >= 0) {
        // 有触发状态的数据,则右边的状态变为红色
        return 0;
      } else {
        let resYellow = this.exBigTypeList.findIndex(item => {
          return item.exCurrentFormCode == "1";
        });
        if (resYellow >= 0) {
          // 有响应状态的数据,则右边的状态变为黄色
          return 1;
        } else {
          // 有完成状态的数据,则右边的状态变为绿色
          return 2;
        }
      }
    },
    //点击原形触发的事件
    doOperate(item, idx, index) {
      this.currentIndex = index; // 行 index
      this.currentIdx = idx; // 列 index
      if (idx == 0) {
        // 触发时弹框显示
        if (item.exCurrentFormCode == "0" || item.exCurrentFormCode == "1") {
          // 已经是发起状态的不允许点击
          return false;
        }
        this.openScroll = true;
        // this.currentData.usmBill = item;
        this.currentData.exContentName = "";
        this.currentData.exTypeName = "";
        this.getUsmExeSmallType(item);
      } else if (idx == 1) {
        // 响应时直接提交操作
        if (
          item.exCurrentFormCode == "1" ||
          item.exCurrentFormCode == "2" ||
          item.exCurrentFormCode == "8"
        ) {
          // 已经是响应状态的不允许点击
          return false;
        }
        this.dealResponseTask(item);
      } else {
        // 完成时操作
        if (
          item.exCurrentFormCode == "2" ||
          item.exCurrentFormCode == "0" ||
          item.exCurrentFormCode == "8"
        ) {
          // 已经是完成状态的不允许点击
          return false;
        }
        this.dealHandlTask(item);
      }
    },
    // 点击异常类型,内容弹出框,确认按钮触发的时间
    closeDialogToLanch() {
      this.openScroll = false;
      // ajax提交操作
      this.doLanch();
    },
    dealFormData() {
      let returnData = {};
      let user = Storage.getObject("user");

      // 工作中心
      let workCenterId = this.workCellItem.pid;
      let workCenterCode = this.workCellItem.pcode;
      let workCenterName = this.workCellItem.pname;

      // 工位
      let workCellId = this.workCellItem.id;
      let workCellCode = this.workCellItem.code;
      let workCellName = this.workCellItem.name;

      // 异常内容
      let exContentId =
        this.currentData.exContent == ""
          ? ""
          : this.currentData.exContent.usmContentId;
      let exContentCode =
        this.currentData.exContent == ""
          ? ""
          : this.currentData.exContent.usmContentCode;
      let exContentName =
        this.currentData.exContent == ""
          ? ""
          : this.currentData.exContent.usmContentName;

      // 异常描述
      let exceptionRemark = "";

      // 工作流
      let actKey = this.exactiveMap.actKey;

      // 异常类型
      let exTypeId = this.currentData.exType.exTypeId;
      let exTypeCode = this.currentData.exType.exTypeCode;
      let exTypeName = this.currentData.exType.exTypeName;

      if (!workCellId) {
        returnData.msg = "工位不能为空";
        returnData.flag = true;
        return returnData;
      }

      if (!exTypeId) {
        returnData.msg = "异常类型不能为空";
        returnData.flag = true;
        return returnData;
      }

      if (!actKey) {
        returnData.msg = "工作流不能为空";
        returnData.flag = true;
        return returnData;
      }
      let form = new FormData();
      form.append("moduleName", "usm");
      form.append("username", user.username);

      form.append("workCenterId", workCenterId);
      form.append("workCenterCode", workCenterCode);
      form.append("workCenterName", workCenterName);

      form.append("workCellId", workCellId);
      form.append("workCellCode", workCellCode);
      form.append("workCellName", workCellName);

      form.append("exTypeId", exTypeId);
      form.append("exTypeCode", exTypeCode);
      form.append("exTypeName", exTypeName);

      form.append("exContentId", exContentId);
      form.append("exContentCode", exContentCode);
      form.append("exContentName", exContentName);

      form.append("actKey", actKey);

      form.append("exceptionRemark", exceptionRemark);

      return form;
    },
    getData(item) {
      let loginName = this.loginName;
      let usmBillId = item.usmBillId; //异常单据id
      let isTransfer = false; // 是否转移
      let transRemark = ""; //异常响应备注
      let taskId = ""; // 任务id

      let usmReasonId = ""; // 异常原因id
      let exCloseRemark = ""; // 异常关闭备注

      if (!usmBillId) {
        return false;
      }
      let data = qs.stringify({
        loginName,
        usmBillId,
        isTransfer,
        transRemark,
        taskId,
        usmReasonId,
        exCloseRemark
      });
      return data;
    },
    //异常发起(响应操作)
    doLanch() {
      let form = this.dealFormData();
      if (form.flag) {
        Toast.warning({
          message: form.msg,
          close: false
        });
        return false;
      }
      console.log(form);

      const loading = this.$loading({});
      http
        .post({
          url: "productPadUsmController!doUsmLaunch.m",
          data: form,
          autoLogin: false
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            loading.close();
            Toast.success({
              message: res.data.msg,
              close: false
            });
            this.getUsmBillStateByWorkCell();
            this.currentData2.exTypeCode = this.currentData.exType.exTypeCode;
            this.currentData2.exTypeName = this.currentData.exType.exTypeName;
            this.currentData2.exContentCode = this.currentData.exContent
              ? this.currentData.exContent.usmContentCode
              : "";
            this.currentData2.exContentName = this.currentData.exContent
              ? this.currentData.exContent.usmContentName
              : "";
          } else {
            Toast.warning({
              message: res.data.msg,
              close: false
            });
          }
        })
        .catch(err => {
          loading.close();
          console.log(JSON.stringify(err));
        });
    },
    dealResponseTask(item) {
      let data = this.getData(item);
      if (!data) {
        return;
      }
      const loading = this.$loading({});
      http
        .post({
          url: "productPadUsmController!dealResponseTask.m",
          data,
          autoLogin: true
        })
        .then(res => {
          loading.close();
          if (res.status == 200 && res.data.erroCode == 0) {
            Toast.success({
              message: "操作成功",
              close: false
            });
            this.getUsmBillStateByWorkCell();
          } else {
            Toast.error({
              message: res.data.msg,
              close: false
            });
          }
        })
        .catch(err => {
          loading.close();
          console.log(JSON.stringify(err));
        });
    },
    dealHandlTask(item) {
      let data = this.getData(item);
      if (!data) {
        return;
      }
      const loading = this.$loading({});
      http
        .post({
          url: "productPadUsmController!dealHandlTask.m",
          data,
          autoLogin: true
        })
        .then(res => {
          loading.close();
          if (res.status == 200 && res.data.erroCode == 0) {
            Toast.success({
              message: "操作成功",
              close: false
            });
            this.clearRightData();
            this.getUsmBillStateByWorkCell();
          } else {
            Toast.error({
              message: res.data.msg,
              close: false
            });
          }
        })
        .catch(err => {
          loading.close();
          console.log(JSON.stringify(err));
        });
    },
    // 右边输入框数据清空
    clearRightData() {
      this.currentData.exContent = "";
      this.currentData.exContentName = "";
      this.currentData.exType = "";
      this.currentData.exTypeName = "";
      this.currentData.usmBill = "";

      this.currentData2.exContent = "";
      this.currentData2.exContentCode = "";
      this.currentData2.exContentName = "";
      this.currentData2.exType = "";
      this.currentData2.exTypeCode = "";
      this.currentData2.exTypeName = "";
      this.currentData2.usmBill = "";
    },
    // 工作中心,工位查询
    selectWorkCell() {
      let loginName = this.loginName;
      let data = qs.stringify({ loginName });
      this.openScroll_workCell = true;
      http
        .post({
          url: "productPadUsmController!getUsmWorkCenterAndCell.m",
          data: data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.workListData = resData;
          }
        });
    },
    doChildWorkCellClick(item, index) {
      if (item.selected) {
        this.workCellItem = item;
      } else {
        this.workCellItem = {};
      }
    },
    // 关闭工位选择的弹框
    closeWorkCellDialog() {
      let itemData = this.workCellItem;
      if (itemData.id) {
        // 有数据则赋值
        this.workCellAndWorkCenterText = itemData.pname + ":" + itemData.name;
        this.openScroll_workCell = false;
        this.getUsmBillStateByWorkCell(0);
      } else {
        Toast.warning({
          message: "未选择数据",
          close: false
        });
      }
    },
    // 查询异常状态
    getUsmBillStateByWorkCell() {
      let loginName = this.loginName;
      let data = qs.stringify({ loginName, workCellId: this.workCellItem.id });
      http
        .post({
          url: "productPadUsmController!getUsmBillStateByWorkCell.m",
          data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.exBigTypeList = resData;
            console.log(resData);
            //判断是否存在红色
            let timeList = [];
            resData.forEach(item => {
              if (item.exCurrentFormCode == 0 && item.launchDate != "") {
                timeList.push(item.launchDate);
              }
            });

            if (timeList.length == 0) {
              resData.forEach(item => {
                if (item.exCurrentFormCode == 1 && item.launchDate != "") {
                  timeList.push(item.launchDate);
                }
              });
            }
            for (let i = 0; i < timeList.length; i++) {
              let tem = 0;
              for (let j = i + 1; j < timeList.length; j++) {
                if (timeList[i] > timeList[j]) {
                  tem = timeList[j];
                  timeList[j] = timeList[i];
                  timeList[i] = tem;
                }
              }
            }
            resData.forEach((item, i) => {
              if (item.launchDate == timeList[0]) {
                console.log(item);

                this.currentData2 = item;
                this.currentData2.exContentCode = item.contentCode;
                this.currentData2.exContentName = item.contentName;
              }
            });
            if (timeList.length == 0) {
              this.clearRightData();
            }
            // 0 红色  1 黄色  2 绿色
            let resRunstatus = this.rightStutsStyle();
            this.rightRunstatusClass = this.rightStuts[resRunstatus];
            this.rightRunstatusText = this.rightStutsTxt[resRunstatus];
            let self = this;

            if (
              self.currentIndex === "" &&
              self.workCellItem.id === undefined
            ) {
              // 初始化页面全部变成白色
              let resData = self.exBigTypeList.map((item, index) => {
                item.exCurrentFormCode = "8";
                return item;
              });
              self.exBigTypeList = resData;
            } else if (
              self.currentIndex === "" &&
              self.workCellItem.id !== undefined
            ) {
              // 初始化页面之后,选择工位,将所有绿色小球变成白色
              let resData = self.exBigTypeList.map((item, index) => {
                if (item.exCurrentFormCode === "2") {
                  item.exCurrentFormCode = "8";
                }
                return item;
              });
              self.exBigTypeList = resData;
            } else if (
              self.currentIndex !== "" &&
              self.workCellItem.id !== undefined
            ) {
              // 每一个点击操作之后,把所有绿色小球变成白色
              let resData = self.exBigTypeList.map((item, index) => {
                if (item.exCurrentFormCode === "2") {
                  item.exCurrentFormCode = "8";
                }
                return item;
              });
              self.exBigTypeList = resData;
            }
            if (self.currentIndex !== "") {
              // 单击当前行的 完成操作时,将小球的颜色先变绿色,几秒钟之后变成白色
              if (
                self.exBigTypeList[self.currentIndex].exCurrentFormCode == "8"
              ) {
                self.exBigTypeList[self.currentIndex].exCurrentFormCode = "2";
              }
              setTimeout(() => {
                if (self.currentIndex === "") {
                } else {
                  // if(self.exBigTypeList[self.currentIndex].exCurrentFormCode == "2"){
                  //   self.exBigTypeList[self.currentIndex].exCurrentFormCode = "8";
                  // }
                  let resData = self.exBigTypeList.map((item, index) => {
                    if (item.exCurrentFormCode === "2") {
                      item.exCurrentFormCode = "8";
                    }
                    return item;
                  });
                  self.exBigTypeList = resData;
                }
              }, 5000);
            }
          }
        });
    },
    // 选择异常类型的改变事件
    smallTypeChangeEvt() {
      let resData = this.exTypeList.filter(
        item => item["exTypeName"] == this.currentData.exTypeName
      );
      this.currentData.exType = resData[0];
      this.currentData.exContent = "";
      this.getUsmContentByExeType();
    },
    // 选择异常内容的改变事件
    contentChangeEvt() {
      let resData = this.exContentList.filter(
        item => item["usmContentName"] == this.currentData.exContentName
      );
      this.currentData.exContent = resData[0];
    },
    // 根据异常大类查询异常小类
    getUsmExeSmallType(item) {
      let udiCode = item.udiCode;
      let loginName = this.loginName;
      let data = qs.stringify({ loginName, udiCode });
      http
        .post({
          url: "productPadUsmController!getUsmExeSmallType.m",
          data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.exTypeList = resData;
          }
        });
    },
    // 根据异常类型查询异常内容
    getUsmContentByExeType() {
      let exeSmallTypeId = this.currentData.exType.exTypeId;
      let exeSmallTypeCode = this.currentData.exType.exTypeCode;
      let loginName = this.loginName;
      let data = qs.stringify({ loginName, exeSmallTypeId, exeSmallTypeCode });
      http
        .post({
          url: "productPadUsmController!getUsmContentAndActiveByExeType.m",
          data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            let { activeItemMap, contentItemMap } = resData;

            this.exContentList = [contentItemMap];
            this.exactiveMap = activeItemMap;
          }
        });
    }
  },
  computed: {},
  mounted() {
    this.getUsmBillStateByWorkCell();
  }
};
</script>
<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
}
.header {
  height: 10vh;
  width: 100vw;
  background-image: -webkit-radial-gradient(
    45px 45px,
    circle cover,
    #060d3a,
    #345172
  );
  color: #fff;
  font-size: 2.5vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .header-title {
    margin-left: 2vw;
    cursor: pointer;
    &:hover {
      color: #d1e61a;
    }
  }
}
.content {
  height: 90vh;
  background-color: rgb(212, 177, 212);
  color: #fff;
  font-weight: bold;
  // 左边部分的样式
  .left-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: grey;
    font-size: 2vw;
    text-align: center;
    .left-item-title {
      width: 25vw;
      box-sizing: border-box;
      border: #bdbdbd solid 1px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9e9e9e;
      .left-item-circle {
        width: 6.5vw !important;
        height: 6.5vw !important;
        background-color: skyblue;
        border-radius: 50%;
        box-shadow: 10px 6px 20px #333333;
      }
      .left-item-circle:hover {
        cursor: pointer;
        opacity: 0.5;
      }
      .circle-active-yellow {
        background-image: -webkit-radial-gradient(
          45px 45px,
          circle cover,
          yellow,
          orange
        );
      }
      .circle-active-green {
        background-image: -webkit-radial-gradient(
          45px 45px,
          circle cover,
          #28ec28,
          #036908
        );
      }
      .circle-active-red {
        background-image: -webkit-radial-gradient(
          45px 45px,
          circle cover,
          #de6565,
          #98150a
        );
      }
      .circle-active-default {
        background-image: -webkit-radial-gradient(
          45px 45px,
          circle cover,
          white,
          #e0e0e0
        );
      }
    }
    .left-item-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .left-item-content {
        letter-spacing: 10px;
      }
    }
  }
  // 右边部分的样式
  .right-item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
  .right-item-firth {
    background-color: #767986;
  }
  .right-item-second {
    font-size: 4vw;
    background-color: #51b01d;
  }
  .right-stuts-green {
    background-color: #51b01d;
  }
  .right-stuts-red {
    background-color: red;
  }
  .right-stuts-yellow {
    background-color: yellow;
  }
  .right-item-third {
    background-color: #5e5959;
    font-weight: bold;
    text-align: left;
    .right-item-line {
      display: flex;
      flex-grow: 1;
      font-size: 1.5vw;
      width: 32vw;
      background-color: #9e9e9e;
      border-radius: 5px;
      align-content: center;
      margin: 5px auto;
    }
  }
}

@media screen and (min-width: 569px) and (max-width: 767px) {
  .content {
    .left-item {
      font-size: 3vw;
      .left-item-title {
        .left-item-circle {
          width: 8vw !important;
          height: 8vw !important;
        }
      }
    }
    .right-item {
      font-size: 3vw;
    }
    .right-item-second {
      font-size: 4vw !important;
    }
    .right-item-third {
      .right-item-line {
        display: flex;
        flex-grow: 1;
        font-size: 3vw;
        width: 90vw;
        align-content: center;
        margin: 5px auto;
      }
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 574px) {
  .header {
    font-size: 3.5vw;
    height: 8vh;
  }
  .content {
    .left-item {
      font-size: 3.5vw;
      .left-item-title {
        .left-item-circle {
          width: 8vw !important;
          height: 8vw !important;
        }
      }
    }
    .right-item {
      font-size: 3vw;
    }
    .right-item-second {
      font-size: 4vw !important;
    }
    .right-item-third {
      .right-item-line {
        display: flex;
        flex-grow: 1;
        font-size: 3vw;
        width: 90vw;
        align-content: center;
        margin: 5px auto;
      }
    }
  }
}
</style>
