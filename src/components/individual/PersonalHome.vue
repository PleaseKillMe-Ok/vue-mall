<template>
  <!-- 个人主页 -->

  <div id="PersonalHome">
    <!-- 配置栏动作面版 -->
    <van-action-sheet v-model="show" @select="onSelect">
        <div class="content">内容</div>
    </van-action-sheet>

    <van-nav-bar
      left-text="返回"
      right-text="按钮"
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
export default {
  name: "PersonalHome",
  data() {
    return {
      show: false,
      actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/individual");
    },
    onClickRight() {
      this.show = true;
    },
    // 选择配置动作栏的某一项后回调
    onSelect(item) {
      this.show = false;
      Toast(item.name);
    },
    // 进入个人资料页
    toPersonal() {},
  },
};
</script>

<style scoped>


</style>