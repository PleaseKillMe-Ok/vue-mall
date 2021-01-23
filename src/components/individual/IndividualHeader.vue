<template>
  <div id="IndividualHeader">
    <!-- 最顶部工具栏 -->
    <TopTool></TopTool>
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
      <van-col span="10">
        <p class="username">司云中</p>
        <p class="account">帐号:syz999520</p>
      </van-col>
    </van-row>

    <!-- 功能宫格栏 -->
    <FunctionGrid></FunctionGrid>
  </div>
</template>

<script>
import TopTool from "./TopTool";
const FunctionGrid = () => import("@/components/individual/FunctionGrid");

export default {
  name: "IndividualHeader",
  components: {
    TopTool,
    FunctionGrid,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
/* 头像 */
.head-image {
  text-align: left;
  float: left;
  margin: 10px 0px 0px 20px;
}
.username {
  float: left;
  margin-top: 1rem;
  margin-left: 1.5rem;
  margin-right: 0.5rem;
  font-size: 1.5rem;
  font-weight: bolder;
}
/* 帐号 */
.account {
  float: left;
  font-size: 0.9rem;
  margin-left: 1rem;
}
</style>