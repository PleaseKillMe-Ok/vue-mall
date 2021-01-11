<template>
  <div>
    <div id="app">
      <!-- 头部导航栏 -->
      <router-view name="header"></router-view>
      <!-- 标签 -->

      <router-view name="select"></router-view>
      <!-- 轮播图 -->
      <router-view name="swipe"></router-view>

      <!-- 主要内容 -->
      <!-- <Car></Car> -->
      <router-view />
      <!-- <TestAxios></TestAxios> -->

      <!-- 尾部标签 -->
      <Footer @head_info="set_head_info"></Footer>
    </div>
  </div>
</template>

<script>
// 导入头部导航栏
import HeadNavigation from "./components/common/HeadNavigation";
// 导入购物车
import Car from "./components/cart/Car";
// 导入底部栏
import Footer from "./components/common/Footer";

// 测试Axios请求
import TestAxios from "./components/common/TestAxios";

export default {
  name: "App",
  data() {
    return {
      title: "首页",
      left_tip: "返回",
      right_tip: "帮助",
      previous: "/",
    };
  },
  components: {
    HeadNavigation,
    Car,
    Footer,
    TestAxios,
  },
  methods: {
    /* 获取子组件footer传递过来的信息,动态设置headline的信息 */
    set_head_info: function (head_information) {
      this.title = head_information.title;
      this.previous = head_information.previous;
    },
  },
};
</script>

<style>
* {
  margin: 0px auto;
  padding: 0px auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: burlywood;
}
</style>
