<template>
  <div>
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<script>
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
  background-color: #f7f8fa;
  height: 100vh; /* 屏幕即使没有元素也会张开100% */
}
.card {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 12px #ebedf0;
  margin-left: 10px;
  margin-right: 10px;
}
.half-left-card {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 44%;
  padding: 10px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 12px #ebedf0;
  float: left;
}
.half-right-card {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 43%;
  padding: 10px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 12px #ebedf0;
  float: right;
}
</style>
