<template>
  <!-- 个人主页 -->

  <div id="PersonalHome">
    <FunctionSheet
      :show="show"
      :gridList="gridList"
      @close="close"
    ></FunctionSheet>
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
    <van-row>
      <van-col span="8">
        <van-image
          class="head-image"
          width="5rem"
          height="5rem"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          round
      /></van-col>
      <van-col span="16">
        <p class="username">司云中</p>
        <div class="button">
          <van-button plain round type="info" @click="toDetail"
            >编辑资料</van-button
          >
          <van-button plain round type="info" @click="toSelf"
            >隐私设置</van-button
          >
        </div>
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
      gridList: [
        {
          name: "首页",
          icon: "cart",
          to: "/",
        },
        {
          name: "消息",
          icon: "cart",
          to: "/message",
        },
        {
          name: "搜索",
          icon: "cart",
          to: "/search",
        },
        {
          name: "我要反馈",
          icon: "cart",
          to: "/feedback",
        },
        {
          name: "分享主页",
          icon: "cart",
          to: "",
        },
      ],
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
    // 关闭动作面板
    close() {
      this.show = false;
    },
    // 进入个人资料界面
    toDetail() {},
    // 进入个人隐私设置界面
    toSelf() {},
  },
};
</script>

<style scoped>
/* 头像 */
.van-image {
  margin: 20px;
}
.username {
  float: left;
  margin: 5px;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bolder;
}
.button {
  float: left;
}

.van-button {
  height: 30px;
}
</style>