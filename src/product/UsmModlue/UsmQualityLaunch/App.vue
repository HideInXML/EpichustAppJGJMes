<template>
  <div id="app" style="height: 100vh;" class="flex-bottom-auto">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'质量异常发起',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <!-- 工作流 -->
    <section class="sectionOne">
      <mu-paper
        :z-depth="0"
        class="spacing_shadowdiv"
        style="height:5rem;line-height:2rem;text-align:center;"
      >
        <mu-list>
          <mu-list-item button :ripple="true">
            <mu-row style="width: 100%;color:#fff;" @click="selectActiveLookUp">
              <mu-col
                span="12"
                style="font-size:16px;text-align:left;margin-top:2rem;font-weight:bold;"
              >工作流</mu-col>
              <mu-col span="10" style="font-size:1rem;text-align:center;">
                <mu-text-field
                  type="text"
                  disabled
                  underline-color="#1abc9c"
                  v-model="activeCode"
                  placeholder="请选择工作流"
                ></mu-text-field>
              </mu-col>
              <mu-col span="2" style="text-align:right;padding-top:5px;">
                <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_right"></mu-icon>
              </mu-col>
            </mu-row>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </section>

    <mu-list class="input-items">
      <mu-sub-header class="item-hedaer">工位录入</mu-sub-header>
      <mu-list-item button>
        <mu-list-item-action>
          <mu-icon value="location_on" class="finished" size="24"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title class="fontcolor">请选择工位</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>

      <mu-sub-header class="item-hedaer">异常内容录入</mu-sub-header>
      <mu-list-item :ripple="false">
        <mu-list-item-action>
          <mu-icon value="info" class="finished" size="24"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-action>
          <mu-text-field
            type="text"
            underline-color="#1abc9c"
            v-model="exeContent"
            placeholder="请输入异常内容"
          ></mu-text-field>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item :ripple="false">
        <mu-list-item-action>
          <mu-icon value="info" class="finished" size="24"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-action>
          <mu-text-field
            type="text"
            underline-color="#1abc9c"
            v-model="exeDesc"
            placeholder="请输入异常描述"
          ></mu-text-field>
        </mu-list-item-action>
      </mu-list-item>
      <mu-sub-header class="item-hedaer">上传图片</mu-sub-header>
      <image-upload :imageList.sync="previewImgs"></image-upload>
      <mu-divider style="margin-top:6px;"></mu-divider>
    </mu-list>

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
// import "muse-ui-loading/dist/muse-ui-loading.css";
// import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";
import ImageUpload from "../../../components/imageUpload";

export default {
  name: "UsmQualityLaunch",
  components: {
    SafeHeader,
    ImageUpload
  },
  data() {
    return {
      activeCode: "EX-SB-01",
      exeContent: "",
      exeDesc: "",
      previewImgs: []
    };
  },
  methods: {
    selectActiveLookUp() {
      //
    },
    doLaunch() {
      let user = Storage.getObject("user");
      //let imgs = this.previewImgs; //.map(v => v.src)
      let form = new FormData();
      form.append("moduleName", "usm");
      form.append("un", user.username);
      this.previewImgs.forEach((img, index) => {
        form.append("file" + index, img.filePrototype);
      });
      const loading = this.$loading({});
      http
        .post({ url: "productPadCommController!doUploadFile.m", data: form })
        .then(res => {
          if (res.status == 200 && res.data.erroCode == 0) {
            loading.close();
          } else {
            loading.close();
          }
        });
    }
  },
  // mounted() {}
};
</script>
<style scoped lang="scss">
.input-items {
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
</style>
