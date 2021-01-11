<template>
  <div id="IndividualHeader">
    <!-- 最顶部工具栏 -->
    <TopTool></TopTool>
    <!-- 头像框 -->
    <!-- <HeadImage></HeadImage> -->
  </div>
</template>

<script>
import TopTool from "./TopTool";
import HeadImage from "./HeadImage";

export default {
  name: "IndividualHeader",
  components: {
    TopTool,
    HeadImage,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
/* .van-nav-bar__content {
  height: 80px !important;
} */
</style>