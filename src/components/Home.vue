<template>
  <div id="Home">
    <!-- 头部导航栏 -->
    <van-nav-bar
      :left-text="left_text"
      :right-text="right_text"
      v-model="previous"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
    >
      <template #title>
        <van-search
          v-model="search_value"
          placeholder="请输入搜索关键词"
          input-align="center"
          shape="round"
          maxlength="30"
          @focus="toSearch"
        ></van-search>
      </template>
    </van-nav-bar>
    <!-- 帮助文档 -->
    <van-dialog v-model="show" title="帮助文档" show-cancel-button>
      <Helper></Helper>
    </van-dialog>
    <Swipe></Swipe>
  </div>
</template>

<script>
const Helper = () => import("@/components/common/Helper");
const Swipe = () => import("@/components/common/Swipe");
export default {
  name: "Home",
  data() {
    return {
      show: false,
      search_value: "",
      left_text: "返回",
      right_text: "帮助",
      previous: "",
    };
  },
  components: {
    Helper,
    Swipe,
  },
  methods: {
    // 导航栏左侧点击事件
    onClickLeft() {
      Toast.success("返回上一个界面");
    },
    // 导航栏右侧点击事件
    onClickRight() {
      this.show = true;
    },
    // 进入搜索详情界面
    toSearch() {
      // 路由跳转
      this.$router.push("/search");
    },
  },
};
</script>

<style scoped>
.van-nav-bar__content {
  height: 60px !important;
  background-color: #e66838;
}
</style>
