<template>
  <div class>
    <input
      type="file"
      style="display:none"
      @change="chooseImage($event)"
      :accept="fileType"
      :isCompress="isCompress"
      multiple
      ref="imageInput"
    />
    <div @click="selectImage" style="width:100%">
      <slot name="buttonRow">
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="image" class="finished" size="24"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>选择图片</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="30" value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </slot>
    </div>

    <div class="preview">
      <mu-grid-list class="gridlist-demo" :cols="cols">
        <mu-grid-tile
          v-for="(item,index) in imageList"
          :key="index"
          @touchstart="showDeleteButton(index)"
          @touchend="clearLoop"
          class
        >
          <img :src="item.src" preview="0" />
          <span slot="title">{{item.name}}</span>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
  </div>
</template>

<script>
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
import Vue from "vue";

Vue.use(preview, { fullscreenEl: false });
export default {
  name: "ImageUpload",
  props: {
    imageList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fileType: {
      type: String,
      default: () => {
        return "image/*";
      }
    },
    cols: {
      type: Number,
      default: () => {
        return 2;
      }
    },
    isCompress: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data: () => {
    return {
      deletLoop: null
    };
  },
  computed: {},
  methods: {
    selectImage() {
      this.$refs.imageInput.click();
    },
    imageChange(e) {
      let windowURL = window.URL || window.webkitURL;
      let _imageList = Array.from(e.target.files).map(v => {
        return {
          src: windowURL.createObjectURL(v),
          name: v.name,
          filePrototype: v
        };
      });
      _imageList = [...this.imageList, ..._imageList];
      this.$emit("update:imageList", _imageList);
      this.$preview.on("imageLoadComplete", (e, item) => {
        console.log(this.$preview.self);
      });
    },
    showDeleteButton(index) {
      this.clearLoop();
      this.deletLoop = setTimeout(() => {
        let _imageList = this.imageList.filter((v, i) => {
          return i != index;
        });
        this.$emit("update:imageList", _imageList);
        this.$root.api.api.toast({
          msg: "删除第" + (index + 1) + "图片",
          duration: 2000,
          location: "middle"
        });
      }, 1000);
    },
    clearLoop() {
      window.clearInterval(this.deletLoop);
    },
    chooseImage(e) {
      if (this.isCompress) {
        this.btnUploadFile(e);
      } else {
        this.imageChange(e);
      }
      console.log(this.isCompress);
    },
    //对图片进行旋转，压缩的方法，最终返回base64  渲染给img标签的src
    compress(img, fileType) {
      let degree = 0;
      let drawWidth;
      let drawHeight;
      let width;
      let height;
      drawWidth = img.width;
      drawHeight = img.height;
      //以下改变一下图片大小
      let maxSide = Math.max(drawWidth, drawHeight);
      if (maxSide > 1024) {
        let minSide = Math.min(drawWidth, drawHeight);
        minSide = (minSide / maxSide) * 1024;
        maxSide = 1024;
        if (drawWidth > drawHeight) {
          drawWidth = maxSide;
          drawHeight = minSide;
        } else {
          drawWidth = minSide;
          drawHeight = maxSide;
        }
      }
      let canvas = document.createElement("canvas");
      width = drawWidth;
      height = drawHeight;
      canvas.width = width
      canvas.height = height;
      let context = canvas.getContext("2d");
      //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
      /*if ($.device.ios) {
        switch (this.orientation) {
          //iphone横屏拍摄，此时home键在左侧
          case 3:
            degree = 180;
            drawWidth = -width;
            drawHeight = -height;
            break;
          //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
          case 6:
            canvas.width = height;
            canvas.height = width;
            degree = 90;
            drawWidth = width;
            drawHeight = -height;
            break;
          //iphone竖屏拍摄，此时home键在上方
          case 8:
            canvas.width = height;
            canvas.height = width;
            degree = 270;
            drawWidth = -width;
            drawHeight = height;
            break;
        }
      }*/
      //使用canvas旋转校正
      context.rotate((degree * Math.PI) / 180);
      context.drawImage(img, 0, 0, drawWidth, drawHeight);
      // 压缩0.5就是压缩百分之50
      let base64data = canvas.toDataURL(fileType, 0.5);
      canvas = context = null;
      this.urlbase = base64data;
      return base64data;
    },
    btnUploadFile(e) {
      //获取图片
      let self = this;
      // eslint-disable-next-line no-unused-vars
      //let filechooser = this.$refs.imageInput;
      let files = e.target.files;
      let windowURL = window.URL || window.webkitURL;
      let imgArray = Array.from(files).map(v => {
        return {
          src: windowURL.createObjectURL(v),
          name: v.name,
          filePrototype: v
        };
      });
      imgArray.forEach((item, index) => {
        let reader = new FileReader();
        (reader.onload = function() {
          let img = new Image();
          //进行图片的渲染
          img.onload = function() {
            //图片旋转压缩处理后的base64
            let compressedDataUrl = self.compress(img, item.filePrototype.type);
            let arr = compressedDataUrl.split(",");
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            //new File([u8arr], filename, {type:mime});
            let file = new File([u8arr], item.name, { type: mime });
            let imagResultList = [];
            let json = {};
            json["filePrototype"] = file;
            json["name"] = file.name;
            json["src"] = windowURL.createObjectURL(file);
            imagResultList.push(json);
            imagResultList = [...self.imageList, ...imagResultList];
            self.$emit("update:imageList", imagResultList);
          };
          img.src = item.src;
        })();
        // reader.readAsDataURL(files[0]);
        console.log(reader);
      });
      this.$preview.on("imageLoadComplete", (e, item) => {
        console.log(this.$preview.self);
      });
    }
  },
  // mounted: function() {}
};
</script>

<style scoped lang="scss">
.mu-grid-tile-wrapper {
  transition: opacity 0.3s linear 0;
  &:active {
    opacity: 0.7;
  }
}
</style>

