<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" v-if="menuData.length">
      <swiper-slide v-for="(value,i) in menuData" :key="i">
        <mu-container class="demo-container">
          <mu-row>
            <mu-col
              @click="goPage(item)"
              span="3"
              sm="3"
              md="3"
              lg="3"
              xl="3"
              v-for="(item,index) in value"
              :key="index"
            >
              <mu-ripple color="rgba(0,0,0,0.2)" :opacity="0.3" class="custom-icon">
                <!-- <div :style="{opacity:item.isActive?'1':'0.5'}" class="icon-wrapper"> -->
                <div>
                  <mu-avatar class="icon-img" v-if="isUseDefaultColor" :color="item.bgColor">
                    <mu-icon :value="item.iconName" size="28" v-if="item.isIcon"></mu-icon>
                    <img
                      class="icon-img"
                      style="width:35px !important;height:35px !important"
                      v-else
                      :src="iconUrl(item)"
                    />
                  </mu-avatar>
                  <mu-avatar class="icon-img" v-else :color="item.iconColor">
                    <mu-icon :value="item.iconName" size="28" v-if="item.isIcon"></mu-icon>
                    <img
                      class="icon-img"
                      style="width:35px !important;height:35px !important"
                      v-else
                      :src="iconUrl(item)"
                    />
                  </mu-avatar>
                </div>
                <div class="icon-title">{{item.title}}</div>
              </mu-ripple>
            </mu-col>
          </mu-row>
        </mu-container>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <mu-row class style="padding: 0 8px;" v-else>
      <mu-col class="h-25" span="3" v-for="(index) of menuExample" :key="index">
        <div class="ex-grid-cell">
          <div class="cell-ex-icon"></div>
          <div class="cell-ex-title"></div>
          <div class="cell-ex-subtitle"></div>
        </div>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import CustomIcon from "./icon";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "IndexMenu",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CustomIcon,
    swiper,
    swiperSlide
  },
  props: {
    menuData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // true 表示使用系统自带的背景颜色   false 表示使用数据库自定义颜色
    isUseDefaultColor: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      activeIndex: 0,
      menueList: [],
      menuExample: Array.from(Array(16), (v, i) => i)
    };
  },
  computed: {},
  methods: {
    iconUrl(item) {
      let url = item.isIcon ? "" : require("../assets/img/" + item.iconName);
      //console.log("iconUrl", item);
      return url;
    },
    goPage(item) {
      let pageName = item.rel;
      this.$root.api.api.openWin({
        name: pageName,
        url: `./${pageName}.html`,
        progress: {
          type: "default"
        }
      });
    }
  },
  mounted() {
    //console.log('com',this.menuData)
  }
};
</script>

<style scoped lang="scss">
$icon-bg: rgba(146, 76, 76, 0.05);
.swiper-container {
  height: calc(72vw + 8rem);
  /deep/.swiper-pagination-bullet-active {
    background: #888;
  }
}
.ex-grid-cell {
  // height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  // border: 1px solid $icon-bg;
  .cell-ex-icon {
    width: 14vw;
    height: 14vw;
    border-radius: 4vw;
    background: $icon-bg;
    overflow: hidden;
  }
  .cell-ex-title {
    width: 60%;
    height: 0.7rem;
    background: $icon-bg;
    margin-top: 0.4rem;
  }
  .cell-ex-subtitle {
    width: 40%;
    height: 0.4rem;
    margin-top: 0.2rem;
    background: $icon-bg;
  }
}
.demo-container.is-stripe .col:nth-child(2n) .grid-cell {
  background: rgba(0, 0, 0, 0.54);
}
.h-100 {
  height: 100vh;
}
</style>
<style scoped lang="scss">
/deep/.mu-avatar {
  border-radius: 8px;
}
.custom-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  width: 100%;
  .fa-icon {
    font-size: 2rem;
  }
  .icon-title {
    font-size: 0.8rem;
    width: 96%;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    margin-top: 0.4rem;
  }
  .icon-title-icon {
    margin-top: 0.4rem;
  }
  .icon-title-img {
    margin-top: 0.4rem;
  }
  .icon-wrapper {
    transition: opacity 0.3s;
  }
  .icon-img {
    width: 14vw !important;
    max-width: 85px !important;
    height: 14vw !important;
    max-height: 85px !important;
    transition: 0.4s;
  }
}
</style>