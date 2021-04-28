<template>
  <div id="SearchCard">
    <!-- 头部导航栏 -->
    <van-nav-bar fixed left-arrow @click="onBack">
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
    商品搜索结果界面
    <div v-for="(item, index) in commodityList" :key="index">
      {{ item.intro }}
    </div>
  </div>
</template>

<script>
import { commodityCardDemo } from "@/demo/commoditycarddemo";
export default {
  name: "SearchCard",
  data() {
    return {
      commodityList: [], // 商品列表
    };
  },
  created() {
    this.commodityList = commodityCardDemo;
  },
  methods: {
    // 根据关键字搜索商品
    getCommodities() {
      let q = this.$route.query.keyword;
      search(keyword)
        .then((res) => {
          this.commodityList = res.data;
        })
        .catch((err) => {
          this.$toast.fail("获取数据失败，服务器开了会小差～");
        });
    },

    // 进入搜索界面
    toSearch() {
      this.$router.push({ name: "Search", query: this.$route.path });
    },

    // 返回上一页
    onBack() {
      this.$router.push({ path: this.$route.query.previous });
    },
  },
};
</script>

<style>
</style>