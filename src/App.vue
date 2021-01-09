<template>
  <div>
    <div id="app">
      <!-- 头部导航栏 -->
      <HeadNavigation
        :title="title"
        :left_text="left_tip"
        :right_text="right_tip"
        @head_info="set_head_info"
      ></HeadNavigation>
      <!-- 轮播图 -->
      <router-view name="swipe"></router-view>

      <!-- 主要内容 -->
      <!-- <Car></Car> -->

      <!-- 尾部标签 -->
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// 1.导入头部导航栏
import HeadNavigation from "./components/common/HeadNavigation";
// 2.导入购物车
import Car from "./components/cart/Car";
// 3.导入底部栏
import Footer from "./components/common/Footer";

export default {
  name: "App",
  data() {
    return {
      title: "首页",
      left_tip: "返回",
      right_tip: "帮助",
    };
  },
  components: {
    HeadNavigation,
    Car,
    Footer,
  },
   methods: {
    /* 获取子组件footer传递过来的信息,动态设置headline的信息 */
    set_head_info:function(head_information) {
      this.title = head_information.title;
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
