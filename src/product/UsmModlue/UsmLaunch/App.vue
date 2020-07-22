<template>
  <div id="app" style="height: 100vh;" class="flex-bottom-auto">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'异常发起',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <section style="background-color: #1abc9c;margin-bottom:6px;">
      <mu-paper :z-depth="1">
        <mu-list class="input-items">
          <mu-sub-header class="item-hedaer">发起信息</mu-sub-header>

          <mu-list-item button @click="selectExeType">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">异常类型</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled v-model="exeType" placeholder="请选择异常类型"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button @click="selectActive">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">工作流</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled v-model="exeActive" placeholder="请选择工作流"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button @click="selectWorkCell">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">工位</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled v-model="workCell" placeholder="请选择工位"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button @click="selectContent">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">异常内容</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" disabled v-model="exeContent" placeholder="请选择异常内容"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item button :ripple="false">
            <mu-list-item-title style="width:300px;min-width: 300px;" class="fontcolor">异常描述</mu-list-item-title>
            <mu-list-item-action>
              <mu-text-field type="text" placeholder="请输入异常描述" v-model="exeDesc"></mu-text-field>
            </mu-list-item-action>
            <mu-list-item-action>
              <mu-icon class="toggle-icon" size="22" value="create"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>

          <mu-sub-header class="item-hedaer">上传图片</mu-sub-header>
          <image-upload
            :imageList.sync="previewImgs"
            class="item-body bg-img"
            :cols="3"
            color="#1184e1"
          ></image-upload>
        </mu-list>
      </mu-paper>
    </section>

    <!--异常类型弹框-->
    <mu-container>
      <mu-dialog
        title="异常类型列表"
        width="500"
        max-width="500"
        :padding="padding"
        scrollable
        :open.sync="openScroll_exeType"
      >
        <tree-select
          :listData.sync="exeTypeListData"
          @doChildClick="doChildExeTypeClick"
          :isMultiple="isMultiple"
        ></tree-select>
        <mu-button slot="actions" flat color="primary" @click="closeExeTypeDialog">确定</mu-button>
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

    <!--工作流弹框-->
    <mu-container>
      <mu-dialog
        title="工作流列表"
        width="500"
        max-width="500"
        :padding="padding"
        scrollable
        :open.sync="openScroll_active"
      >
        <mu-list>
          <mu-list-item v-for="(item,index) in activeItem" :key="index">
            <mu-list-item-content>
              <mu-radio :label="item.actKey + ':' + item.actName" :value="item" v-model="activeOpt"></mu-radio>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <mu-button slot="actions" flat color="primary" @click="closeActiveDialog">确定</mu-button>
      </mu-dialog>
    </mu-container>

    <!--异常内容弹框-->
    <mu-container>
      <mu-dialog
        title="异常内容列表"
        width="500"
        max-width="500"
        :padding="padding"
        scrollable
        :open.sync="openScroll_content"
      >
        <mu-list>
          <mu-list-item v-for="(item,index) in contentItem" :key="index">
            <mu-list-item-content>
              <mu-radio
                :label="item.usmContentCode + ':' + item.usmContentName"
                :value="item"
                v-model="contentOpt"
              ></mu-radio>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <mu-button slot="actions" flat color="primary" @click="closeContentDialog">确定</mu-button>
      </mu-dialog>
    </mu-container>

    <section class="bottom-auto">
      <mu-row>
        <mu-col span="12">
          <mu-button large class="main-bg" textColor="white" style="width:100%" @click="doLaunch">发起</mu-button>
        </mu-col>
      </mu-row>
    </section>
  </div>
</template>
<script >
import http from "../../../utils/http.js";
import Storage from "../../../utils/storage";
import SafeHeader from "../../../components/safeHeader";
import TreeSelect from "../../../components/treeselect";
import ImageUpload from "../../../components/imageUpload";
import "muse-ui-message/dist/muse-ui-message.css";
import Toast from "muse-ui-toast";
import qs from "qs";

export default {
  name: "UsmLaunch",
  components: {
    SafeHeader,
    ImageUpload,
    TreeSelect
  },
  data() {
    return {
      workListData: [],
      exeTypeListData: [],
      exeBigTypeId: "",
      exeBigTypeCode: "",
      exeSmallTypeId: "",
      exeSmallTypeCode: "",
      exeType: "",
      exeContent: "",
      workCell: "",
      exeDesc: "",
      exeActive: "",
      openScroll_exeType: false,
      openScroll_workCell: false,
      openScroll_active: false,
      openScroll_content: false,
      previewImgs: [],
      padding: 15,
      exeTypeItem: {},
      workCellItem: {},
      activeItem: [],
      activeOpt: "",
      contentItem: [],
      contentOpt: "",
      isMultiple: false
    };
  },
  methods: {
    doChildExeTypeClick(item, index) {
      if (item.selected) {
        this.exeTypeItem = item;
      } else {
        this.exeTypeItem = {};
      }
    },
    doChildWorkCellClick(item, index) {
      if (item.selected) {
        this.workCellItem = item;
      } else {
        this.workCellItem = {};
      }
    },
    selectWorkCell() {
      let loginConfig = Storage.getObject("loginConfig");
      let loginName = loginConfig.un;
      let data = qs.stringify({ loginName: loginName });
      this.openScroll_workCell = true;
      http
        .post({
          url: "productPadUsmController!getWorkCenterAndWorkCell.m",
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
    selectExeType() {
      this.openScroll_exeType = true;
      http
        .post({ url: "productPadUsmController!getExeType.m", autoLogin: true })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.exeTypeListData = resData;
          }
        });
    },
    selectActive() {
      if (!this.exeType) {
        Toast.warning({
          message: "请选择异常类型",
          close: false
        });
        return false;
      }
      this.openScroll_active = true;
      let data = qs.stringify({ exeTypeCode: this.exeBigTypeCode });
      http
        .post({
          url: "productPadUsmController!getActiveByExeType.m",
          data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.activeItem = resData;
          }
        });
    },
    selectContent() {
      this.openScroll_content = true;
      let data = qs.stringify({ exeTypeCode: this.exeSmallTypeCode });
      http
        .post({
          url: "productPadUsmController!getUsmContentByExeType.m",
          data,
          autoLogin: true
        })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            let resData = JSON.parse(res.data.data);
            this.contentItem = resData;
          }
        });
    },
    // 根据异常类型 查询异常内容和工作流
    selectContentAndActive() {
      let exeSmallTypeId = this.exeSmallTypeId;
      let exeSmallTypeCode = this.exeSmallTypeCode;
      if (!exeSmallTypeId) {
        return false;
      }
      let data = qs.stringify({ exeSmallTypeId, exeSmallTypeCode });
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
            if (activeItemMap.actKey) {
              this.exeActive =
                activeItemMap.actKey + ":" + activeItemMap.actName;
            } else {
              this.exeActive = "";
            }
            if (contentItemMap.usmContentCode) {
              this.exeContent =
                contentItemMap.usmContentCode +
                ":" +
                contentItemMap.usmContentName;
            } else {
              this.exeContent = "";
            }

            this.contentOpt = contentItemMap;
            this.activeOpt = activeItemMap;
          }
        });
    },
    closeContentDialog() {
      this.openScroll_content = false;
      let contentData = this.contentOpt;
      if (!contentData) {
        Toast.warning({
          message: "未选择数据",
          close: false
        });
        return false;
      }
      this.exeContent =
        contentData.usmContentCode + ":" + contentData.usmContentName;
    },
    closeActiveDialog() {
      this.openScroll_active = false;
      let actData = this.activeOpt;
      if (!actData) {
        Toast.warning({
          message: "未选择数据",
          close: false
        });
        return false;
      }
      this.exeActive = actData.actKey + ":" + actData.actName;
    },
    closeExeTypeDialog() {
      let itemData = this.exeTypeItem;
      if (itemData.id) {
        // 有数据则赋值
        this.exeType = itemData.pname + ":" + itemData.name;
        this.exeBigTypeId = itemData.pid;
        this.exeBigTypeCode = itemData.pcode;
        this.exeSmallTypeCode = itemData.code;
        this.exeSmallTypeId = itemData.id;
        this.openScroll_exeType = false;
        this.selectContentAndActive();
      } else {
        Toast.warning({
          message: "未选择数据",
          close: false
        });
      }
    },
    closeWorkCellDialog() {
      let itemData = this.workCellItem;
      if (itemData.id) {
        // 有数据则赋值
        this.workCell = itemData.pname + ":" + itemData.name;
        this.openScroll_workCell = false;
      } else {
        Toast.warning({
          message: "未选择数据",
          close: false
        });
      }
    },
    dealFormData() {
      let returnData = {};
      let user = Storage.getObject("user");
      //let imgs = this.previewImgs; //.map(v => v.src)

      // 工作中心
      let workCenterId = this.workCellItem.pid;
      let workCenterCode = this.workCellItem.pcode;
      let workCenterName = this.workCellItem.pname;

      // 工位
      let workCellId = this.workCellItem.id;
      let workCellCode = this.workCellItem.code;
      let workCellName = this.workCellItem.name;

      // 异常内容
      let exContentId = this.contentOpt.usmContentId;
      let exContentCode = this.contentOpt.usmContentCode;
      let exContentName = this.contentOpt.usmContentName;

      // 异常描述
      let exceptionRemark = this.exeDesc;

      // 工作流
      let actKey = this.activeOpt.actKey;

      // 异常类型
      let exTypeId = this.exeTypeItem.id;
      let exTypeCode = this.exeTypeItem.code;
      let exTypeName = this.exeTypeItem.name;

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

      if (!exContentId) {
        returnData.msg = "异常内容不能为空";
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

      this.previewImgs.forEach((img, index) => {
        form.append("file" + index, img.filePrototype);
      });
      return form;
    },
    doLaunch() {
      let form = this.dealFormData();
      if (form.flag) {
        Toast.warning({
          message: form.msg,
          close: false
        });
        return false;
      }
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
            setTimeout(() => {
              this.$root.api.api.closeWin();
            }, 3000);
          } else {
            loading.close();
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
    }
  },
  // mounted() {}
};
</script>
<style scoped lang="scss">
.item-body {
  /deep/.mu-item {
    height: 60px;
  }
  /deep/.mu-item-title {
    color: #9e9e9e;
  }
}

.sectionOne {
  /deep/.mu-text-field-input {
    color: #fff;
    text-align: center;
    padding-left: 20px;
    padding-bottom: 8px;
    font-weight: bold;
    font-size: 18px;
  }
  /deep/.mu-input-line.disabled {
    border-bottom: 0;
  }
}
.mu-item-title {
  font-size: 0.9rem;
}
/deep/.mu-text-field-input {
  font-size: 0.9rem;
}
/deep/.mu-input-line.disabled {
  border-bottom: 0;
}
/deep/.mu-dialog-title {
  font-size: 18px;
}
</style>
