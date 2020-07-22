<template>
  <div>
    <mu-container class="content">
      <mu-row class="h-100">
        <mu-col span="5" class="content-box h-100">
          <mu-paper :z-depth="1">
            <mu-list>
              <mu-list-item
                button
                @click="doParentClick(item,index)"
                v-for="(item,index) in listData"
                :key="index"
                class="main-border"
                :class="{ active:index==currentIndex}"
              >
                <mu-list-item-title>{{item.name}}</mu-list-item-title>
                <mu-list-item-action class="item-icon">
                  <mu-icon
                    class="toggle-icon main-font"
                    size="26"
                    color="primary"
                    value="chevron_right"
                  ></mu-icon>
                </mu-list-item-action>
                <div v-show="false" class="parentId">{{item.id}}</div>
                <div v-show="false" class="parentCode">{{item.code}}</div>
                <div v-show="false" class="parentName">{{item.name}}</div>
              </mu-list-item>
            </mu-list>
          </mu-paper>
        </mu-col>

        <mu-col span="7" class="content-box h-100">
          <mu-paper :z-depth="1">
            <mu-list>
              <mu-list-item
                button
                v-for="(item,index) in cellList"
                :key="index"
                @click="doChildClick(item,index)"
                :class="{itemActive:item.selected == true}"
              >
                <mu-list-item-action>
                  <mu-checkbox readonly v-model="item.selected"></mu-checkbox>
                </mu-list-item-action>
                <mu-list-item-title>{{item.name}}</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-paper>
        </mu-col>
      </mu-row>
    </mu-container>
  </div>
</template>

<script>
// import http from "../utils/http.js";
// import jquery from 'jquery';
// import Vue from "vue";
// import Storage from "../utils/storage.js";

// Vue.prototype.$ = jquery;
export default {
  name: "treeSelect",
  components: {},
  data() {
    return {
      currentIndex: 0,
      selectedUpdate: 0,
      radio: ""
    };
  },
  props: {
    listData: {
      type: Array,
      default: () => {
        return [{}, {}];
      }
    },
    isMultiple: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  methods: {
    doParentClick(item, index) {
      if (this.currentIndex == index) {
        return false;
      }
      this.currentIndex = index;
    },
    doChildClick(item, index) {
      if (this.isMultiple) {
        item.selected = !item.selected;
        this.selectedUpdate = this.selectedUpdate++;
        this.$emit("doChildClick", item, index);
      } else {
        let res = this.listData[this.currentIndex].childData.map((data, i) => {
          data.selected = false;
          return data;
        });
        item.selected = true;
        this.selectedUpdate = this.selectedUpdate++;
        this.listData[this.currentIndex].childData = res;
        this.$emit("doChildClick", item, index);
      }
    }
  },
  computed: {
    cellList() {
      //就靠这个来驱动刷新
      //let temp1 = this.selectedUpdate;
      let _listData = this.listData.length ? this.listData : [{}, {}];
      return _listData[this.currentIndex].childData;
    }
  },
  // mounted() {}
};
</script>

<style scoped lang="scss">
.content {
  .mu-item-sub-title,
  .mu-item-title {
    color: #999;
  }
  /deep/.mu-radio-wrapper .mu-radio-label {
    color: #999 !important;
  }
  height: 100%;
  padding: 0;
  overflow: hidden;
  .mu-paper-round {
    border-radius: 0;
  }
  .content-box {
    overflow-y: auto;
    & > .mu-paper {
      min-height: 100%;
    }
  }
  .item-icon {
    position: absolute;
    right: 0;
  }
}
.active {
  border-left: 4px solid;
  .mu-item-sub-title,
  .mu-item-title {
    color: black;
  }
}
.itemActive {
  .mu-item-sub-title,
  .mu-item-title {
    color: black;
  }
}
.radioActive {
  /deep/.mu-radio-wrapper .mu-radio-label {
    color: black !important;
  }
}
</style>
