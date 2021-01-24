<template>
  <!-- 个人主页 -->

  <div id="PersonalHome">
    <FunctionSheet :show="show" @close="close"></FunctionSheet>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-badge dot>
          <van-icon name="chat" size="20" />
        </van-badge>
      </template>
    </van-nav-bar>

    <!-- 简要个人信息栏 -->
    <van-row @click="toPersonal">
      <van-col span="8">
        <van-image
          class="head-image"
          width="5rem"
          height="5rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          round
      /></van-col>
      <van-col span="10">
        <p class="username">司云中</p>
        <p class="account">帐号:syz999520</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
const FunctionSheet = () => import("@/components/common/FunctionSheet");
export default {
  name: "PersonalHome",
  data() {
    return {
      show: false,
      actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
    };
  },
  components: {
    FunctionSheet,
  },
  methods: {
    onClickLeft() {
      this.$router.push("/individual");
    },
    onClickRight() {
      this.show = true;
    },
    // 进入个人资料页
    toPersonal() {},
    // 关闭动作面板
    close() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
</style>