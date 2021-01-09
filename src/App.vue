<template>
  <div>
    <div id="app">
      <!-- 头部导航栏 -->
      <HeadNavigation title="首页" left_text="提示" right_text="提示"></HeadNavigation>
      <router-view name="swipe"></router-view>
      <!-- 循环中绑定编号, 使用:key="index" -->
      <!-- <Car></Car> -->

      <!-- 尾部标签 -->
      <router-view name="footer"></router-view>
    </div>
  </div>
</template>

<script>
// 1.导入外部组件
import HeadNavigation from './components/common/HeadNavigation'

// 2.导入购物车
import Car from './components/cart/Car'

export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
    HeadNavigation,
    Car
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
