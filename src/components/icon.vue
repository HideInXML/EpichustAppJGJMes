<template>
  <div class>
    <mu-ripple color="rgba(0,0,0,0.2)" :opacity="0.3" class="custom-icon">
      <!-- <font-awesome-icon :icon="icon.iconName" :color="icon.color" class="fa-icon" v-if="icon.isIcon"/> -->
      <mu-avatar class="icon-img" :color="icon.iconColor">
        <mu-icon :value="icon.iconName" size="28" v-if="icon.isIcon"></mu-icon>
        <img
          class="icon-img"
          style="width:35px !important;height:35px !important"
          v-else
          :src="iconUrl"
        />
      </mu-avatar>
      <div class="icon-title">{{icon.title}}</div>
      <!-- <div class="icon-title icon-title-icon" v-if="icon.isIcon">{{icon.title}}</div>
      <div class="icon-title icon-title-img" v-else>{{icon.title}}</div>-->
    </mu-ripple>
  </div>
</template>

<script>
import "muse-ui-message/dist/muse-ui-message.css";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faBolt,
//   faCrown,
//   faBus,
//   faCalendar,
//   faCertificate
// } from "@fortawesome/free-solid-svg-icons";
// //目前 只有在先引用且注册图标之后，才能使用awesome font图标
// library.add(faBolt, faCrown, faBus, faCalendar, faCertificate);

export default {
  name: "CustomIcon",
  props: {
    icon: {
      type: Object,
      default: () => {
        return {
          id: "1",
          title: "设置",
          url: "",
          iconName: "bolt",
          iconUrl: "",
          isIcon: true,
          faIcon: true
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    iconUrl() {
      let url = this.icon.isIcon
        ? ""
        : require("../assets/img/" + this.icon.iconName);
      console.log("iconUrl", this.icon);
      return url;
    }
  }
  // mounted() {
  //     this.icon.iconUrl = this.icon.isIcon ? '' : require("../assets/img/"+this.icon.iconName);
  //     console.log('icon',this.icon)
  // }
};
</script>

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
  .icon-img {
    width: 14vw !important;
    max-width: 85px !important;
    height: 14vw !important;
    max-height: 85px !important;
  }
}
</style>
