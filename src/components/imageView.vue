<template>
  <div>
    <section class="preview">
      <mu-grid-list :cols="cols">
        <mu-grid-tile v-for="(item, index) in imageList" :key="index">
          <img :src="item.image" preview="0"/>
        </mu-grid-tile>
      </mu-grid-list>
    </section>
  </div>
</template>

<script>
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
import Vue from "vue";

Vue.use(preview, { fullscreenEl: false });
export default {
  name: "ImageView",
  props: {
    cols: {
      type: Number,
      default: () => {
        return 2;
      }
    },
    imageList:{
      type: Array,
      default: () =>{
       return [{
          image: ""
        }
      ]
      }
    }
  },
  data() {
    return {

    };
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style scoped lang="scss">
/deep/.mu-grid-tile-titlebar {
  background-color: rgba(0, 0, 0, 0);
  height: 0;
}
.mu-grid-list{
  .mu-grid-tile-wrapper{
    height: 100px !important;
  }
}
</style>

