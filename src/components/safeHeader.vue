<template>
  <div :class="{fixedTop:fixedTop}" ref="headerTop">
    <mu-appbar :style="headerStyle" :title="title" :color="color" :textColor="textColor">
      <mu-button icon slot="left" v-if="isBack" @click="goBack()">
        <mu-icon value="chevron_left" class="main-font" size="36"></mu-icon>
      </mu-button>
      <slot name="leftArea" slot="left"></slot>
      <slot name="rightArea" slot="right"></slot>
    </mu-appbar>
  </div>
</template>

<script>
export default {
  name: "SafeHeader",
  props: {
    title: {
      type: String,
      default: () => {
        return "标题";
      }
    },
    color: {
      // color和textColor 的设置，参照 https://muse-ui.org/#/zh-CN/color
      type: String,
      default: () => {
        return "";
      }
    },
    textColor: {
      type: String,
      default: () => {
        return "";
      }
    },
    fixedTop: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    isBack: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    backIconColor: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data: () => {
    return {
      paddingTop: 0
    };
  },
  computed: {
    headerStyle() {
      return {
        paddingTop: this.paddingTop + "px",
        height: this.paddingTop + 56 + "px"
      };
    }
  },
  methods: {
    goBack() {
      this.$root.api.api.closeWin();
    }
  },
  mounted: function() {
    this.paddingTop = window.api ? window.api.safeArea.top : 0;
    if (this.$refs.headerTop.nextSibling != null) {
      this.$refs.headerTop.nextSibling.style.paddingTop =
        (this.fixedTop
          ? this.paddingTop + this.$refs.headerTop.offsetHeight
          : 0) + "px";
    }
  }
};
</script>

<style scoped lang="scss">
/deep/.mu-appbar-title {
  font-size: 18px;
  margin-left: -20px;
}
.mu-appbar {
  width: 100%;
}
.fixedTop {
  position: fixed;
  width: 100%;
  background: #fff;
  z-index: 100;
}
</style>
<style>
.fixedTop + * {
  padding-top: 80px;
}
.mu-appbar-title {
  text-align: center;
  margin-right: 2rem;
}
</style>

