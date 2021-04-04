<template>
  <div id="Cart">
    <van-nav-bar
      :right-text="rightText"
      @click-right="manager"
      @click-left="goBack"
      left-arrow
    >
      <template #title>
        <span class="title">{{ title }}</span>
      </template>
    </van-nav-bar>
    <van-cell>共{{ totalGoods }}件商品</van-cell>

    <!-- 购物车商品布局 -->
    <div class="card" v-for="(store, key, index) in storeList" :key="index">
      <van-checkbox v-model="storeNameDict[key]">
        {{ key }}
      </van-checkbox>
      <div v-for="(commodity, index) in store" :key="index">
        <van-checkbox></van-checkbox>
        {{ commodity["intro"] }}
        <br />
        {{ commodity["price"] }} {{ commodity["count"] }}
      </div>
    </div>

    <van-submit-bar :tip="tip" tip-icon="info-o" @submit="onSubmitOrder">
      <template v-if="isOpenManage" #button>
        <van-button
          plain
          hairline
          type="primary"
          class="manage-btn"
          @click="moveFavorites"
          >移入收藏夹</van-button
        >
        <van-button plain hairline type="info" @click="deleteCommodity"
          >删除</van-button
        >
      </template>
      <template v-else #button>
        <span
          >合计: <span class="price">¥ {{ totalPrice }}</span></span
        ><van-button :disabled="disabled" round type="danger"
          >提交订单</van-button
        >
      </template>
      <template #default>
        <van-checkbox v-model="choiceAll" class="select-all-checkbox"
          >全选</van-checkbox
        >
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { storeList, storeNameDict } from "@/demo/cartdemo";
export default {
  name: "Cart",
  data() {
    return {
      title: "购物车",
      totalPrice: 0,
      totalGoods: 0,
      tip: "", // 提示信息
      choiceAll: false,
      disabled: true, // 是否禁用按钮
      commodityList: [],
      isOpenManage: false,
      rightText: "管理",
      storeList: [],
      storeNameDict: {},
    };
  },
  created() {
    this.storeList = storeList;
    this.storeNameDict = storeNameDict;
  },
  watch: {
    // 全选商品
    choiceAll(newValue, oldValue) {
      this.disabled = !this.disabled;
    },

    // 监听商品列表变化
    commodityList(newValue, oldValue) {
      if (newValue.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
  methods: {
    // 管理购物车中的商品
    manager() {
      if (this.isOpenManage) {
        this.rightText = "管理";
      } else {
        this.rightText = "完成";
      }
      this.isOpenManage = !this.isOpenManage;
    },

    // 返回首页
    goBack() {
      this.$router.push("/");
    },

    // 提交订单
    onSubmitOrder() {},

    // 删除商品
    deleteCommodity() {
      this.$dialog
        .confirm({
          message: "确认删除该宝贝吗?",
        })
        .then(() => {
          console.log("删除成功");
        })
        .catch(() => {});
    },

    // 加入收藏夹
    moveFavorites() {},
  },
};
</script>

<style scoped>
.title {
  font-size: 1rem;
  font-weight: bolder;
}

/* 底部提交栏 */
.submit-bar {
  position: fixed;
  bottom: 50px;
  display: flex;
}

/* 清理按钮 */
.manage-btn {
  margin-left: 40px;
  margin-right: 10px;
}

.price {
  font-size: 16px;
  color: red;
}

.van-submit-bar {
  bottom: 50px !important;
}
</style>