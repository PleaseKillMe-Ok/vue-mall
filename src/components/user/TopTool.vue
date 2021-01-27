<template>
  <!-- 顶部工具栏 -->
  <div name="TopTool">
    <van-nav-bar
      title="个人中心"
      :left-arrow="hasLeft"
      @click-right="setting"
      @click-left="goBack"
    >
      <template #right v-if="hasRight">
        <van-icon name="setting-o"></van-icon>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "TopTool",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "个人中心",
    },
    hasRight: {
      type: Boolean,
      default: true,
    },
    hasLeft: {
      type: Boolean,
      default: true,
    },
    previousPage: {
      type: String,
      default: "/individual",
    },
  },
  methods: {
    // 跳转到设置界面
    setting() {
      this.$router.push({ name: "Setting" });
    },
    goBack() {
      this.$router.push(this.previousPage);
    },
  },
};
</script>

<style>
</style>