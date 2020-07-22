<template>
  <div id="app">
    <safe-header v-bind="{title:$t('base.factory_list'),color: 'blue',fixedTop:true,isBack:true}"></safe-header>
    <div>
      <mu-container>
        <mu-row>
          <mu-col>
            <mu-paper :z-depth="1">
              <mu-list>
                <mu-list-item
                  avatar
                  button
                  @click="doConfirm(item,index)"
                  v-for="(item,index) in factoryList"
                  :key="index"
                >
                  <mu-list-item-content>
                    <mu-radio
                      :value="item.siteCode"
                      :label="item.siteName +'(' + item.siteCode + ')' "
                      v-model="factotyCode"
                    ></mu-radio>
                  </mu-list-item-content>
                </mu-list-item>
              </mu-list>
            </mu-paper>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>
  </div>
</template>
<script >
import business from "../../utils/business_product.js";
import SafeHeader from "../../components/safeHeader";
import _ from "lodash";
import "muse-ui-message/dist/muse-ui-message.css";
import Toast from "muse-ui-toast";
import Message from "muse-ui-message";
import Storage from "../../utils/storage.js";
export default {
  name: "Factory",
  components: {
    SafeHeader
  },
  data() {
    return {
      factoryList: [],
      factotyCode: ""
    };
  },
  methods: {
    goBack() {
      this.$root.api.api.closeWin();
    },
    doConfirm(item, index) {
      Message.confirm(
        this.$i18n.t("message.message_factory_isconfirm") +
          `:${item.siteName}(${item.siteCode})` +
          this.$i18n.t("base.tips"),
        this.$i18n.t("base.prompt"),
        {
          type: "warning",
          okLabel: this.$i18n.t("base.confirm"),
          cancelLabel: this.$i18n.t("base.cancel")
        }
      ).then(({ result }) => {
        if (result) {
          this.saveStorage(item);
        }
      });
    },
    saveStorage(item) {
      Storage.setObject("multipleObj", item);
      //清除上一个工厂中绑定的工位
      Storage.removeItem("cellObj");
      Storage.removeItem("workCells");
      this.goBack();
    },
    async getFactory() {
      try {
        let res = await business.getFactory();
        if (res.status == 200 && res.data.erroCode == 0) {
          let multipleObj = Storage.getObject("multipleObj");
          let resObj = res.data.data.map((value, key, arr) => {
            if (value.siteCode == multipleObj.siteCode) {
              value.selected = true;
            } else {
              value.selected = false;
            }
            return value;
          });
          this.factotyCode = _.find(resObj, function(obj) {
            return obj.selected == true;
          }).siteCode;
          this.factoryList = resObj;
        } else {
          Toast.error({
            message: JSON.stringify(res.data.msg),
            close: false
          });
        }
      } catch (error) {
        Toast.error({
          message: JSON.stringify(error),
          close: false
        });
      }
    }
  },
  mounted() {
    this.getFactory();
    //从LocalStrong中拿到在登陆页面选择的语言类型
    let lang = Storage.getObject("lang").value;
    if (lang) {
      this.$i18n.locale = lang;
    } else {
      this.$i18n.locale = "cn";
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  padding: 0;
  .mu-paper-round {
    border-radius: 0;
  }
  .mu-item {
    height: 3rem;
    max-height: 5rem;
    padding: 0 0.5rem;
  }
}
</style>
