<template>
  <div id="app" style="height: 100vh;">
    <!-- 头部导航 -->
    <safe-header
      v-bind="{title:'订单图表查看',color:'#fff',textColor:'#000',isBack:true,backIconColor: '#4da274',fixedTop:true}"
    ></safe-header>

    <!-- 柱状图 -->
    <section class="demo-container is-stripe" style="background-color: #fff;">
      <mu-row>
        <mu-col span="12">
          <div class="grid-cell">
            <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
          </div>
        </mu-col>
      </mu-row>
    </section>

    <!-- 饼状图 -->
    <section class="demo-container is-stripe" style="background-color: #fff;margin-top:0rem;">
      <mu-row>
        <mu-col span="12">
          <div class="grid-cell">
            <div id="myChart2" :style="{width: '100%', height: '300px'}"></div>
          </div>
        </mu-col>
      </mu-row>
    </section>

    <!-- 折线图 -->
    <section class="demo-container is-stripe" style="background-color: #fff;margin-top:0rem;">
      <mu-row>
        <mu-col span="12">
          <div class="grid-cell">
            <div id="myChart3" :style="{width: '100%', height: '300px'}"></div>
          </div>
        </mu-col>
      </mu-row>
    </section>
  </div>
</template>
<script >
// import http from "../../../utils/http.js";
import SafeHeader from "../../../components/safeHeader";

// import "muse-ui-message/dist/muse-ui-message.css";
// import Loading from "muse-ui-loading";
// import Toast from "muse-ui-toast";
// import Message from "muse-ui-message";
// import Storage from "../../../utils/storage.js";

// import echarts from 'echarts'
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/toolbox");

export default {
  name: "UmpOrderSelect",
  components: {
    SafeHeader
  },
  data() {
    return {
      datas: [100, 50]
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画
      // 绘制图表
      let that = this;
      myChart.setOption({
        title: {
          text: "订单查询柱状图",
          textStyle: {
            color: "black"
          },
          top: "10%",
          x: "center"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        color: ["#3398DB", "rgba(90, 160, 40, 0.8)"],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "20%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: ["计划数", "完工数"],
          axisLabel: {
            textStyle: {
              color: "purple"
            }
          },
          axisLine: {
            lineStyle: {
              color: "green"
            }
          },
          axisTick: {
            lineStyle: {
              color: "yellow"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#aaa", "#ddd"]
            }
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          nameTextStyle: {
            color: "red"
          },
          axisLabel: {
            textStyle: {
              color: "purple"
            }
          },
          axisLine: {
            lineStyle: {
              color: "green"
            }
          },
          axisTick: {
            lineStyle: {
              color: "yellow"
            }
          }
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: that.datas
          }
        ]
      });
      myChart.hideLoading();
      myChart.on("click", function(params) {
        // 控制台打印数据的名称
        console.log(params);
      });
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      // let that = this;
      myChart2.setOption({
        title: {
          text: "订单查询饼状图",
          textStyle: {
            color: "black"
          },
          subtext: "",
          top: "15%",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          top: "10%",
          data: ["计划数", "完工数"]
        },
        color: ["#3398DB", "rgba(90, 160, 40, 0.8)"],
        toolbox: {
          show: true,
          top: "15%",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 100, name: "计划数" },
              { value: 50, name: "完工数" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawLine3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      // let that = this;
      myChart3.setOption({
        title: {
          text: "订单查询折线图",
          textStyle: {
            color: "black"
          },
          top: "3%",
          x: "center"
        },
        legend: {
          left: "left",
          top: "10%",
          data: ["计划数", "完工数"]
        },
        color: ["#3398DB", "rgba(90, 160, 40, 0.8)"],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          show: true,
          top: "1%",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "20%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
          axisLabel: {
            textStyle: {
              color: "purple"
            }
          },
          axisLine: {
            lineStyle: {
              color: "green"
            }
          },
          axisTick: {
            lineStyle: {
              color: "yellow"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#aaa", "#ddd"]
            }
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            color: "red"
          },
          axisLabel: {
            textStyle: {
              color: "purple"
            }
          },
          axisLine: {
            lineStyle: {
              color: "green"
            }
          },
          axisTick: {
            lineStyle: {
              color: "yellow"
            }
          }
        },
        series: [
          {
            name: "计划数",
            type: "line",
            data: [100, 120, 100, 150, 120, 180, 138]
          },
          {
            name: "完工数",
            type: "line",
            data: [150, 50, 98, 86, 73, 69, 160, 92]
          }
        ]
      });
    },
    goBack() {
      this.$root.api.api.closeWin();
    }
  },
  mounted() {
    let that = this;
    window.onresize = () => {
      return (() => {
        // window.location.reload();
        that.drawLine();
        that.drawLine2();
        that.drawLine3();
      })();
    };
    this.drawLine();
    this.drawLine2();
    this.drawLine3();
  }
};
</script>
<style scoped lang="scss">
</style>
