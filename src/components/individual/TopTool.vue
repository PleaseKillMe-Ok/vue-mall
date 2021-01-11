<template>
  <div name="TopTool">
    <van-nav-bar
      title="个人中心"
      right-text="个人信息"
      @click-right="disPlayInformation"
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
    // 跳转到个人详细信息页
    disPlayInformation() {
        this.$router.push("/individual/information")
    },
  },
};
</script>

<style>
</style>