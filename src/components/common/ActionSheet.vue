<template>
  <!-- 通用面板 -->
  <div id="ActionSheet">
    <van-action-sheet
      v-model="childShow"
      :actions="actionList"
      @select="onSelect"
      @click-overlay="onOverlay"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  name: "ActionSheet",
  data() {
    return {
      childShow: false,
    };
  },
  watch: {
    show() {
      this.childShow = this.show;
    },
  },
  props: {
    actionList: {
      type: Array,
      default: [],
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 选择某项,进入某页
    onSelect(item) {
      this.$emit("close");
      this.$router.push(item.to);
    },
    // 回调父组件关闭事件
    onOverlay() {
      this.$emit("close");
    },
    // // 回调父组件事件
    onCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>