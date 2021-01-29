<template>
  <div id="Cart">
    <van-nav-bar
      right-text="管理"
      @click-right="manager"
      @click-left="goBack"
      left-arrow
    >
      <template #title>
        <span class="title">{{ title }}</span>
      </template>
    </van-nav-bar>
    <van-cell>共{{ totalGoods }}件商品</van-cell>
    <div class="card">
      双层循环
    </div>
    <!-- <van-submit-bar
      :price="3050"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar> -->
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      title: "购物车",
      totalGoods: 0,
    };
  },
  methods: {
    // 管理购物车中的商品
    manager() {},
    // 返回首页
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 1rem;
  font-weight: bolder;
}
</style>