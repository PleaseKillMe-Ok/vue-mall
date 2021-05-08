<template>
  <div id="SearchCard">
    <!-- 头部导航栏 -->
    <van-nav-bar fixed left-arrow @click-left="onBack">
      <template #title>
        <div class="search-bar">
          <!-- 存放搜索框 -->
          <van-search
            placeholder="搜索栏"
            shape="round"
            @focus="toSearch"
            class="search-line"
          ></van-search>
        </div>
      </template>
    </van-nav-bar>
    <div class="body">
      <van-row
        v-for="(item, index) in commodityList"
        :key="index"
        @click="toCommodityDetail(item.pk)"
      >
        <van-col span="10">
          <van-image
            width="140"
            height="140"
            lazy-load
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            radius="10px"
          />
        </van-col>
        <!-- 详细信息样式 -->
        <van-col span="14">
          <div class="title">
            <van-tag type="danger">小云</van-tag>
            <span class="commodity-name-intro"
              >{{ item.commodity_name }} {{ item.intro }}</span
            >
          </div>
          <div class="fuck">
            <span style="color: red"
              ><span style="font-size: 13px">¥</span>&nbsp;{{
                item.favourable_price
              }}</span
            >
            <span class="duplicated" v-if="item.price > item.favourable_price"
              >¥{{ item.price }}</span
            >
            <span class="pay">{{ item.sell_counts }}+人付款</span>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { commodityCardDemo } from "@/demo/commoditycarddemo";
import { search } from "@/api/search";
export default {
  name: "SearchCard",
  data() {
    return {
      commodityList: [], // 商品列表
    };
  },
  created() {
    // this.commodityList = commodityCardDemo;
    this.getCommodities();
  },
  methods: {
    // 根据关键字搜索商品
    getCommodities() {
      let q = this.$route.query.keyword;
      search(q, 1)
        .then((res) => {
          this.commodityList = res.data;
        })
        .catch((err) => {
          this.$toast.fail("获取数据失败，服务器开了会小差～");
        });
    },

    // 进入商品详情页
    toCommodityDetail(pk) {
      this.$router.push({ name: "CommodityDetail", query: { id: pk } });
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

<style scoped>
/* 正文商品列表 */
.body {
  margin-top: 80px;
}

.search-line {
  height: 46px;
}

.commodity-name-intro {
  font-size: 18px;
  text-align: left;
}
.sell {
  font-size: 16px;
  color: grey;
  opacity: 0.8;
  text-align: left;
}
/* 原价 */
.duplicated {
  text-decoration: line-through;
  color: grey;
  opacity: 0.8;
  font-size: 14px;
}

.pay {
  font-size: 15px;
  color: grey;
  opacity: 0.8;
}

.fuck {
  margin-top: 15px;
}
</style>