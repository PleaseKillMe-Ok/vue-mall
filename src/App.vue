<template>
  <div>
    <div id="app">
      <!-- 布局嵌套 -->
      <el-container>
        <el-header>头部</el-header>
        <el-container>
          <el-aside width="300px">轮播图</el-aside>
          <el-container>
            <el-main>
              <router-view name="carouselmap"></router-view>
              <router-view name="recommand"></router-view>
            <router-view name="universal"></router-view>
            </el-main>
            <el-footer></el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      history: [],
    };
  },
  components: {
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
  background-color: red;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* footer固定底部 */
.el-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
