<template>
  <div id="HeaderLine">
    <!-- 头部导航栏 -->
    <van-nav-bar :right-text="rightText" @click-right="onClickRight" fixed>
      <template #left>
        <span class="title">小云商城</span>
      </template>
      <template #title>
        <div class="search-bar">
          <!-- 存放搜索框 -->
          <van-search
            placeholder="搜索栏"
            shape="round"
            @focus="toSearch"
          ></van-search>
        </div>
      </template>
    </van-nav-bar>
    <!-- 帮助文档 -->
    <van-dialog v-model="show" title="帮助文档" show-cancel-button>
      <Helper></Helper>
    </van-dialog>
  </div>
</template>

<script>
const Helper = () => import("@/components/common/Helper");
export default {
  name: "HeaderLine",
  data() {
    return {
      show: false,
      rightText: "帮助",
      previous: "",
    };
  },
  components: {
    Helper,
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
      this.$router.push({
        name: "Search",
        query: { previous: this.$route.path },
      });
    },
  },
};
</script>

<style scoped>
/* 搜索框 */
.van-search--show-action {
  height: 46px;
}
.search-bar {
  height: 100%;
  padding: 0px auto !important;
}
.van-search {
  padding: 0px 8px 0px 0;
}

.title {
  color: blueviolet;
  font-weight: bold;
}
</style>