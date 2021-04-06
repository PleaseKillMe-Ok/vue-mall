<template>
  <!-- 顶部工具栏 -->
  <div id="TopTool">
    <van-nav-bar
      :title="title"
      right-text="更多"
      @click-right="many"
      left-arrow
      @click-left="back"
    />
    <!-- 动作面板 -->
    <ActionSheet
      :actionList="actionList"
      :show="show"
      @close="close"
    ></ActionSheet>
  </div>
</template>

<script>
const ActionSheet = () => import("@/components/common/ActionSheet");
export default {
  name: "TopTool",
  props: {
    title: {
      type: String,
      default: "用户操作",
    },
    actionList: {
      type: Array,
      default: [],
    },
  },
  components: { ActionSheet },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    many() {
      this.show = !this.show;
    },
    // 点击遮罩层关闭
    close() {
      this.show = false;
    },
    // 返回首页
    back() {
      this.$router.replace({ name: "Home" });
    },
  },
};
</script>

<style>
</style>