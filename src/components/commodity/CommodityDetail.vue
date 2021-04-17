<template>
  <!-- 商品详情页 -->
  <div id="CommodityDetail">
    <!-- 导航 -->
    <van-nav-bar left-arrow>
      <template #title>
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          type="round"
        />
      </template>
      <template #right>
        <van-icon name="cart-o" class="icon" @click="share"></van-icon>
        <van-icon name="share-o" class="icon" @click="toCart"></van-icon>
      </template>
    </van-nav-bar>

    <!-- 轮播图 -->
    <van-swipe class="swipe">
      <van-swipe-item v-for="(image, index) in swipeImage" :key="index">
        <img v-lazy="image" style="width: 100%; height: auto" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品基本信息 -->
    <div class="card">商品信息</div>

    <!-- 销售属性-->
    <div class="card">销售属性</div>

    <!-- 宝贝评价 -->
    <div class="card">宝贝评价</div>

    <!-- 店铺介绍 -->
    <div class="card">店铺介绍+详情</div>

    <!-- 看了又看 -->
    <div class="card">看了又看</div>

    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="star-o" text="收藏" @click="onCollect" />
      <van-goods-action-icon
        icon="friends-o"
        text="客服"
        @click="onClickIcon"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" @click="toStore" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="joinCart"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="buy" />
    </van-goods-action>
  </div>
</template>

<script>
import { swipeImage } from "@/demo/commodityDetail";
import { addFavorites } from "@/api/favorites/";
export default {
  name: "CommodityDetail",
  data() {
    return {
      commodityInformation: [],
      searchValue: "",
      swipeImage: [
        // 轮播图
      ],
    };
  },
  created() {
    this.swipeImage = swipeImage;
  },
  methods: {
    // 根据商品id获取数据
    getCommodityDetail() {
      let id = this.$route.query.id;
      getCommodityDetail(id)
        .then((res) => {
          this.commodityInformation = res.data;
        })
        .catch((err) => {});
    },

    // 分享
    share() {
      console.log("分享");
    },

    // 去往购物车
    toCart() {
      console.log("分享");
      this.$router.push({ name: "Cart" });
    },

    // 立即购买
    buy() {
      console.log("立即购买");
    },

    // 加入购物车
    joinCart() {
      console.log("加入购物车");
    },

    // 加入收藏夹
    onCollect() {
      let data = { commodity_pk: this.id };
      addFavorites(data)
        .then((res) => {
          let data = res.data;
          if (data.code === 1020) this.$toast.success("添加失败");
        })
        .catch((err) => {
          this.$toast.fail("添加失败，服务器开了会小差～");
        });
      console.log("加入收藏夹");
    },

    // 进入店铺
    toStore() {
      console.log("进入店铺");
    },
  },
};
</script>

<style scoped>
.van-search {
  padding: 0px;
}
.icon {
  font-size: 20px;
  padding-left: 10px;
}
</style>