<template>
  <div id="app" style="height: 100vh;">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:$t('base.workplace_list'),color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>
    <!-- 提示是否有数据 -->
    <div style="height: 90vh;line-height:90vh;font-size:24px;text-align:center;" v-if="!islist">没有数据</div>
    <!-- 分类选择组件 -->
    <tree-select style="height: 90vh;" :listData.sync="list" v-if="islist"></tree-select>

    <!-- 按钮区域 -->
    <section class="btn">
      <mu-bottom-nav>
        <mu-button
          round
          color="primary"
          class="main-bg"
          style="margin: 1rem;"
          @click="doSaveWorkCell"
          :disabled="!islist"
        >
          <mu-icon value="save"></mu-icon>
          {{$t('base.save')}}
        </mu-button>
        <mu-button round color="primary" class="main-bg" @click="queryWorkCell" :disabled="!islist">
          <mu-icon value="search"></mu-icon>
          {{$t('base.check')}}
        </mu-button>
        <mu-button
          round
          color="primary"
          class="main-bg"
          style="margin: 1rem;"
          @click="resetWorkCell"
          :disabled="!islist"
        >
          <mu-icon value="reply"></mu-icon>
          {{$t('base.resetting')}}
        </mu-button>
      </mu-bottom-nav>
    </section>

    <!-- 确认绑定弹框 -->
    <mu-container>
      <mu-dialog
        :title="$t('base.binding_workstations')"
        width="350"
        :scrollable="scrollable"
        :open.sync="openScroll"
        max-width="500"
        :padding="padding"
      >
        <mu-list>
          <mu-list-item
            v-for="(item,index) in bindWorkCells"
            :key="index"
          >{{$t('base.workstation')}}:({{item.code}}){{item.name}},{{$t('base.workcenter')}}:{{item.pname}}</mu-list-item>
        </mu-list>
        <mu-button
          slot="actions"
          flat
          color="primary"
          :esc-press-close="false"
          :overlay-close="false"
          @click="openScroll = false"
        >{{$t('base.cancel')}}</mu-button>
        <mu-button slot="actions" flat color="primary" @click="confirm">{{$t('base.confirm_bind')}}</mu-button>
      </mu-dialog>
    </mu-container>

    <!-- 查看工位绑定弹框 -->
    <mu-container>
      <mu-dialog
        :title="$t('base.binded_workstations')"
        width="500"
        :scrollable="scrollableHasBind"
        :open.sync="openScrollHasBind"
        max-width="500"
        :padding="padding"
      >
        <mu-list>
          <mu-list-item
            v-for="(item,index) in hasBindCell"
            :key="index"
          >{{$t('base.workstation')}}:({{item.code}}){{item.name}},{{$t('base.workcenter')}}:{{item.pname}}</mu-list-item>
        </mu-list>
        <mu-button
          slot="actions"
          flat
          color="primary"
          @click="openScrollHasBind = false"
        >{{$t('base.confirm')}}</mu-button>
      </mu-dialog>
    </mu-container>
  </div>
</template>
<script >
import business from "../../utils/business_product";
import SafeHeader from "../../components/safeHeader";
import TreeSelect from "../../components/treeselect";
import Loading from "muse-ui-loading";

import Toast from "muse-ui-toast";
// import "muse-ui-message/dist/muse-ui-message.css";
// import Message from "muse-ui-message";

import Storage from "../../utils/storage.js";
import _ from "lodash";

export default {
  name: "WorkCell",
  components: {
    SafeHeader,
    TreeSelect
  },
  data() {
    return {
      list: [],
      hasBindCell: [],
      scrollable: true,
      openScroll: false,
      scrollableHasBind: true,
      openScrollHasBind: false,
      padding: 15,
      bindWorkCells: [],
      update: 0,
      islist: false
    };
  },
  methods: {
    confirm() {
      this.hasBindCell = this.bindWorkCells;
      Storage.setObject("cellObj", this.bindWorkCells);
      Storage.setObject("workCells", this.bindWorkCells);
      this.openScroll = false;
    },
    queryWorkCell() {
      this.openScrollHasBind = true;
    },
    doSaveWorkCell() {
      let workCells = this.getBindWorkCell();
      if (workCells.length == 0) {
        Toast.error({
          message: this.$i18n.t("message.message_workcell_nobind"),
          close: false,
          position: "bottom"
        });
        return false;
      }
      this.openScroll = true;
    },
    resetWorkCell() {
      Storage.removeItem("cellObj");
      Storage.removeItem("workCells");
      this.hasBindCell = [];
      this.list = this.setBindWorkCell(this.list);
      Toast.success({
        message: this.$i18n.t("message.message_workcell_resetsuccess"),
        close: false,
        position: "bottom"
      });
      console.log(this.getBindWorkCell());
    },
    getBindWorkCell() {
      let _workCells = _.chain(this.list)
        .map(item => item.childData)
        .flatten()
        .filter(item => item.selected)
        .value();
      this.bindWorkCells = _workCells;
      return _workCells;
    },
    setBindWorkCell(_list) {
      let bindId = _.map(this.hasBindCell, item => item.id);
      _list.forEach(center => {
        center.childData.forEach(cell => {
          cell.selected = bindId.includes(cell.id);
        });
      });
      return _list;
    },
    async getAllWorkCenterAndCellByLoginName() {
      const loading = Loading({
        text: this.$i18n.t("message.message_workcell_load"),
        //overlayColor:"rgba(0, 0, 0, .5)",
        size: 60
      });
      let list = await business
        .getAllWorkCenterAndCellByLoginName()
        .then(res => {
          if (res.status == 200 && res.data.data) {
            let listData = JSON.parse(res.data.data);
            return listData;
          }
        })
        .catch(err => {
          Toast.error({ message: err, close: false });
        })
        .finally(e => {
          loading.close();
        });
      list = this.setBindWorkCell(list);
      this.list = list;
      console.log(this.list);

      this.list.length == 0 ? (this.islist = false) : (this.islist = true);
    }
  },
  mounted() {
    this.hasBindCell = Storage.getObject("workCells");

    this.getAllWorkCenterAndCellByLoginName();
  }
};
</script>
<style lang="scss">
.h-100 {
  height: 100%;
}
</style>
