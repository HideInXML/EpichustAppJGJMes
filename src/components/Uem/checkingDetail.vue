<template>
  <div class="flex-bottom-auto">
    <mu-paper style="padding:0 16px 12px" :z-depth="2">
      <div class="title-header">
        <mu-icon class="title-icon finished" value="list_alt" size="28"></mu-icon>
        <div class="title">QWE-909878899</div>
      </div>
      <p class="fontcolor">维护计划名称：DJ004</p>
      <p class="fontcolor">维护时间：2019-06-30</p>
      <p class="fontcolor">设备编码：01qty222</p>
      <p class="fontcolor">设备名称：存储罐</p>
      <p class="fontcolor">维护周期：10</p>
    </mu-paper>
    <mu-sub-header class="item-hedaer">报工录入</mu-sub-header>
    <div style="padding:12px;">
      <mu-flex align-items="center" class="check-info">
        <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
        <div class="col-content fontcolor">工序：车削/钻孔</div>
      </mu-flex>
      <mu-flex align-items="center" class="check-info">
        <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
        <div class="col-content fontcolor">检测项内容：外观是否合格</div>
      </mu-flex>
      <mu-flex align-items="center" class="check-info">
        <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
        <div class="col-content fontcolor">维护标准/方法：点检外观</div>
      </mu-flex>
      <mu-flex align-items="center" class="check-info">
        <mu-icon class="dot-icon" value="fiber_manual_record" color="#bbb" size="10"></mu-icon>
        <div class="col-content fontcolor">故障维护类别/方法：机械</div>
      </mu-flex>
      <mu-flex align-items="center" class="check-info">
        <mu-icon class="dot-icon" value="fiber_manual_record" color="#2cb69a" size="10"></mu-icon>
        <div class="col-content fontcolor">标准值：30</div>
      </mu-flex>
      <mu-flex align-items="center" class="check-info">
        <mu-icon class="dot-icon" value="fiber_manual_record" color="blue400" size="10"></mu-icon>
        <div class="col-content fontcolor">最小值：20</div>
      </mu-flex>
      <mu-flex align-items="center" class="check-info">
        <mu-icon class="dot-icon" value="fiber_manual_record" color="red400" size="10"></mu-icon>
        <div class="col-content fontcolor">最大值：100</div>
      </mu-flex>
    </div>
    <mu-sub-header class="item-hedaer">点检信息录入</mu-sub-header>
    <mu-list class="input-items item-border-b" style>
      <mu-list-item :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="edit" class="finished" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-text-field
            v-model="form.actualValue"
            type="number"
            placeholder="请输入实际测量值"
            underline-color="#2cb69a"
          ></mu-text-field>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item :ripple="false" class="input-item">
        <mu-list-item-title>
          <span class="fontcolor">完成情况</span>
        </mu-list-item-title>
        <mu-list-item-content>
          <mu-flex justify-content="around">
            <mu-radio :value="true" v-model="form.completeStatus" label="合格"></mu-radio>
            <mu-radio :value="false" v-model="form.completeStatus" label="不合格"></mu-radio>
          </mu-flex>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item :ripple="false" class="input-item">
        <mu-list-item-title>
          <span class="fontcolor">完成结果</span>
        </mu-list-item-title>
        <mu-list-item-content>
          <mu-flex justify-content="around">
            <mu-radio :value="true" v-model="form.completeResult" label="合格"></mu-radio>
            <mu-radio :value="false" v-model="form.completeResult" label="不合格"></mu-radio>
          </mu-flex>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item button :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="date_range" color="gery400" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-date-input v-model="form.startDate" placeholder="选择开始时间" type="dateTime" full-width></mu-date-input>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item button :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="date_range" color="gery400" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-date-input v-model="form.endDate" placeholder="选择结束时间" type="dateTime" full-width></mu-date-input>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item :ripple="false" class="input-item">
        <mu-list-item-action>
          <mu-icon value="person" class="finished" size="28"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-select v-model="form.select" placeholder="请选择操作人">
            <mu-option
              v-for="(option,index) of persons"
              :key="index"
              :label="option"
              :value="option"
            ></mu-option>
          </mu-select>
        </mu-list-item-content>
      </mu-list-item>
      <mu-sub-header class="item-hedaer">备件信息录入</mu-sub-header>
      <mu-list-item button @click="pickerOpen = true" class="input-item">
        <mu-list-item-content>
          <mu-text-field
            v-model="form.actualValue"
            type="number"
            placeholder="备件信息录入"
            underline-color="#2cb69a"
          ></mu-text-field>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-icon value="play_arrow" class="finished" size="28"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-row class="bottom-auto">
      <mu-col span="12">
        <mu-button large color="white" class="main-bg" style="width:100%" @click="submit">
          <b>提 交</b>
        </mu-button>
      </mu-col>
    </mu-row>
    <mu-dialog
      width="85%"
      max-width="100%"
      fullscreen
      transition="slide-bottom"
      :open.sync="pickerOpen"
    >
      <mu-appbar color="#fff" textColor="grey900" title="备品备件" class="check-appbar">
        <mu-button slot="left" textColor="#1184e1" icon @click="pickerOpen = false">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" textColor="#1184e1" flat @click="comfirmSelect">完成</mu-button>
      </mu-appbar>
      <div>
        <mu-list class="input-items">
          <mu-list-item :ripple="false" class="input-item">
            <mu-list-item-action>
              <mu-icon value="search" class="finished" size="28"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-text-field
                v-model="pickerSearch"
                type="text"
                placeholder="请输入备件编号"
                underline-color="#2cb69a"
              ></mu-text-field>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <mu-paper
          class="demo-paper check-detail"
          :z-depth="5"
          v-for="(item,index) in alternativeList"
          :key="index"
        >
          <mu-list>
            <mu-list-item :ripple="false">
              <mu-list-item-content>
                <mu-list-item-title class="fontcolor">{{item.identifier}}</mu-list-item-title>
                <mu-list-item-sub-title>
                  <span class="fontcolor">{{item.category}}</span>
                </mu-list-item-sub-title>
              </mu-list-item-content>
              <div class="isSafe">
                <p :style="'color:'+item.color">
                  <b>{{item.safe}}</b>
                  &nbsp;{{item.state}}
                </p>
                <div class="hot">
                  <div class="Bars">
                    <div :style="'width:'+item.safe+'%;'+'background:'+item.color+';'"></div>
                  </div>
                  <span :style="'color:'+item.color">&nbsp;{{item.safe}}%</span>
                </div>
              </div>
            </mu-list-item>
            <mu-list-item :ripple="false" avatar>
              <mu-list-item-action>
                <mu-icon value="room" size="20"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-content class="fontcolor">{{item.address}}</mu-list-item-content>
            </mu-list-item>
            <mu-list-item :ripple="false" avatar>
              <mu-list-item-action>
                <mu-icon value="brightness_1" size="16"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-content class="fontcolor">备件型号：{{item.model}}</mu-list-item-content>
            </mu-list-item>
            <mu-list-item :ripple="false">
              <mu-list-item-content>
                <mu-text-field
                  v-model="useNum"
                  type="text"
                  placeholder="请输入使用数量"
                  underline-color="#2cb69a"
                ></mu-text-field>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name: "CheckingDetail",
  components: {},
  props: {},
  data() {
    return {
      form: {},
      persons: ["001", "002", "003", "004"],
      pickerOpen: false,
      pickerSearch: "",
      useNum: "",
      background: "",
      alternativeList: [
        {
          identifier: "F0805-0787",
          category: "涂料",
          safe: "70",
          state: "安全",
          address: "涂装线边库",
          model: "BJ008"
        },
        {
          identifier: "F0805-0788",
          category: "螺帽",
          safe: "15",
          state: "预警",
          address: "涂装线边库",
          model: "BJ008"
        }
      ]
    };
  },
  methods: {
    goPage(item, index) {
      let pageComponent = "TrackOrderInput";
      window.console.log(pageComponent);
      this.$root.api.api.openWin({
        name: "UexQuery_" + pageComponent,
        url: "./UexQuery.html",
        progress: {
          name: ""
        },
        pageParam: {
          component: pageComponent,
          title: "生产报工"
        }
      });
    },
    submit() {
      //
    },
    comfirmSelect() {
      //
    },
    getColor: function() {
      let arr = this.alternativeList;
      arr.forEach((item, index) => {
        if (item.safe) {
          item.safe > 60 ? (item.color = "#27da96") : (item.color = "#d32f2f");
        }
      });
      this.alternativeList = arr;
      return this.alternativeList;
    }
  },
  computed: {},
  mounted() {
    this.getColor();
  }
};
</script>

<style scope lang="scss">
.check-info {
  font-size: 16px;
  margin: 5px 0;
  .col-content {
    margin-left: 10px;
  }
}
.isSafe {
  width: 35%;
  p {
    margin: 0;
    text-align: center;
  }
  .hot {
    span {
      font-size: 10px;
      font-weight: bold;
    }
    .Bars {
      display: inline-block;
      position: relative;
      width: 70%;
      padding: 1px;
      border-radius: 25px;
      height: 10px;
      background-color: #dbdbdb;
    }

    .Bars div {
      display: block;
      position: relative;
      height: 100%;
      line-height: 100%;
      border-radius: 25px;
    }
  }
}
.likeDiv {
  box-shadow: 10px 6px 4px 4px rgba(0, 0, 0, 0.4),
    0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
// .mu-item-title {
//   font-size: 20px !important;
//   font-weight: 600;
// }
.mu-item-sub-title {
  font-size: 18px !important;
  font-weight: 700;
  padding-left: 25px;
}

.mu-paper-round {
  margin: 5px;
}
.check-detail {
  /deep/.mu-item.has-avatar {
    height: 30px;
  }
}
.check-appbar {
  /deep/.mu-appbar .mu-icon-button {
    color: none;
  }
}
</style>
