<template>
  <div id="Home">
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
    <!-- 轮播图组件 -->
    <Swipe></Swipe>

    <!-- 领红包优惠卷组件 -->
    <Voucher></Voucher>
    <!-- 抢红包组件 -->
    <Seckill></Seckill>
    <!-- 每日优惠商品组件 -->
    <Bargain></Bargain>
    <!-- 商品组件 -->
    <CommodityCard></CommodityCard>
  </div>
</template>

<script>
const Helper = () => import("@/components/common/Helper");
const Swipe = () => import("@/components/common/Swipe");
const Voucher = () => import("@/components/common/Voucher");
const Seckill = () => import("@/components/common/Seckill");
const Bargain = () => import("@/components/common/Bargain");
const CommodityCard = () => import("@/components/commodity/CommodityCard");

export default {
  name: "Home",
  data() {
    return {
      show: false,
      rightText: "帮助",
      previous: "",
    };
  },
  components: {
    Helper,
    Swipe,
    Voucher,
    Seckill,
    Bargain,
    CommodityCard,
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
      this.$router.push({ name: "Search" });
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
