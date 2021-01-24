<template>
  <!-- 顶部工具栏 -->
  <div name="TopTool">
    <van-nav-bar
      title="个人中心"
      right-text="个人信息"
      @click-right="setting"
    />
  </div>
</template>

<script>
export default {
  name: "TopTool",
  data() {
    return {};
  },
  methods: {
    // 跳转到设置界面
    setting() {
      this.$router.push("/setting");
    },
  },
};
</script>

<style>
</style>