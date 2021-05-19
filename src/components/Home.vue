<template>
  <div id="Home">
    <!-- 头部导航栏组件 -->
    <HeaderLine></HeaderLine>
    <!-- 轮播图组件 -->
    <Swipe></Swipe>
    <!-- 领红包优惠卷组件 -->
    <!-- <Voucher></Voucher> -->
    <!-- 抢红包组件 -->
    <!-- <Seckill></Seckill> -->
    <!-- 每日优惠商品组件 -->
    <!-- <Bargain></Bargain> -->
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
const HeaderLine = () => import("@/components/common/HeaderLine");

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
    HeaderLine,
  },
};
</script>

<style scoped>
</style>
