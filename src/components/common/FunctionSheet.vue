<template>
  <!-- 功能直达自定义面板 -->
  <div id="FunctionSheet">
    <!-- 配置栏动作面版 -->
    <van-action-sheet v-model="childShow" @click-overlay="onOverlay">
      <van-grid :gutter="gutter" :column-num="columnNumber">
        <van-grid-item
          v-for="(item, index) in gridList"
          :key="index"
          :icon="item.icon"
          :text="item.name"
          :to="item.to"
        >
          <template #text>
            <p class="text">{{ item.name }}</p>
          </template>
        </van-grid-item>
      </van-grid>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "FunctionSheet",
  data() {
    return {
      gutter: 10,
      columnNumber: 3,
      childShow: false,
    };
  },
  watch: {
    show() {
      this.childShow = this.show;
    },
  },
  methods: {
    // 点击遮罩层关闭
    onOverlay() {
      this.$emit("close");
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    gridList: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 0.8rem;
}
</style>