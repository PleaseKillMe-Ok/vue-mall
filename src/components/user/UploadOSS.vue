<template>
  <!-- 测试上传图片到oss -->
  <div id="UploadOSS">
    <van-uploader v-model="fileList" multiple />
  </div>
</template>

<script>
import client from "@/utils/oss";
export default {
  name: "UploadOSS",
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleImage() {
      let imageFormat = event.target.files[0].type.substr(6, 4);
      console.log(imageFormat);
    },
  },
};
</script>

<style>
</style>