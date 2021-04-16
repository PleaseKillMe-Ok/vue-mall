<template>
  <div id="FavoritesCommodity">
    <!-- 一级滑动标签页 -->
    <van-tabs v-model="active" animated @click="onChangeTab">
      <!-- 二级滑动标签页 -->
      <van-tab v-for="(tab, index) in tabs" :title="tab" :key="index">
        <div v-for="(item, index) in favoritesList" :key="index">
          <!-- 滑动单元格 -->
          <van-swipe-cell>
            <template #left>
              <van-button
                square
                text="找相似"
                type="info"
                class="find-button"
                @click="onFind(item.commodity_type)"
              />
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="onDelete(item.pk)"
              />
              <van-button
                square
                text="加入购物车"
                type="warning"
                class="join-button"
                @click="onJoin(item.pk)"
              />
            </template>
            <!-- 商品面板 -->
            <van-card
              :price="item.favourable_price"
              :desc="item.intro"
              :title="item.commodity_name"
              :origin-price="item.price"
              class="goods-card"
              thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
            >
              <template #tags>
                <van-tag plain type="danger" style="float: left">失效</van-tag>
              </template>
              <template #footer>
                <van-button size="mini">找相似</van-button>
              </template>
            </van-card>
          </van-swipe-cell>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getFavorites } from "@/api/favorites";
export default {
  name: "FavoritesCommodity",
  data() {
    return {
      active: 0,
      tabs: ["全部", "优惠", "已买过"],
      favoritesList: [],
    };
  },
  props: {
    isOpenManage: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.getFavoritesList();
  },
  methods: {
    // 随着标签改变，内容也发生改变
    onChangeTab(name, title) {},
    // 请求获取收藏夹列表
    getFavoritesList() {
      getFavorites()
        .then((res) => {
          this.favoritesList = res.data;
        })
        .catch((err) => {});
    },
    // 寻找相似商品
    onFind(type) {
      console.log("寻找相似商品");
    },
    // 删除该条收藏记录
    onDelete(id) {
      console.log("删除该条收藏记录");
    },
    // 将该商品加入购物车
    onJoin(id) {
      console.log("商品加入购物车");
    },
  },
};
</script>

<style scoped>
.van-card__title {
  max-height: 32px;
  font-weight: 500;
  line-height: 16px;
}
.van-card__desc {
  max-height: 20px;
  text-align: left;
  color: #646566;
  line-height: 20px;
}
.goods-card {
  margin: 0;
  font-size: 15px;
  background-color: white;
}
/* 每个商品左侧按钮 */
.delete-button {
  /* height: 100%; */
  width: 100%;
}
.join-button {
  /* height: 100%; */
  width: 100%;
}
.find-button {
  /* height: 100%; */
  width: 100%;
  background-color: #d40c0c;
  border: none;
}
</style>