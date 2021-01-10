<template>
  <div class="HeadNavigation">
    <van-nav-bar
      :title="title"
      :left-text="left_text"
      :right-text="right_text"
      v-model="previous"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 帮助文档 -->
    <van-dialog v-model="show" title="帮助文档" show-cancel-button>
      <!-- 将子组件数据传出来 -->
      <Helper></Helper>
    </van-dialog>
  </div>
</template>



<script>
import { Toast } from "vant";
import Helper from "../common/Helper";
export default {
  name: "HeadNavigation",
  components: { Helper },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onClickLeft() {
      Toast.success(this.previous);
    },
    onClickRight() {
      this.show = true;
    },
  },
  props: ["title", "left_text", "right_text", "previous"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0 auto;
  padding: 0 auto;
}
</style>
