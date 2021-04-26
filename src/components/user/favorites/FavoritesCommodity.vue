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
                @click="onDelete(item.pk, index)"
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
        <!-- 底部固定栏-->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getFavorites, deleteFavorites } from "@/api/favorites";
export default {
  name: "FavoritesCommodity",
  data() {
    return {
      active: 0,
      tabs: ["全部", "优惠", "已买过"],
      favoritesList: [], // 全部列表
      favoritesDiscountList: [], // 优惠列表
      boughtList: [], // 已经购买过列表
    };
  },
  components: {},
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
    // 随着标签改变，内容也发生改变，懒加载
    onChangeTab(name, title) {
      if (title === "优惠" && this.favoritesDiscountList.length == 0) {
        console.log("发送优惠请求");
      } else if (title === "已买过" && this.boughtList.length == 0) {
        console.log("已经买过!");
      }
    },
    // 请求获取收藏夹列表
    getFavoritesList() {
      getFavorites()
        .then((res) => {
          this.favoritesList = res.data;
        })
        .catch((err) => {
          this.$toast.fail("获取数据失败");
        });
    },
    // 寻找相似商品
    onFind(type) {
      // search(type)
      //   .then((res) => {})
      //   .catch((err) => {});
      console.log("寻找相似商品");
    },
    // 删除该条收藏记录
    onDelete(id, index) {
      deleteFavorites(id)
        .then((res) => {
          let data = res.data;
          if (data.code === 1019) {
            this.$toast.success("删除成功!");
            this.favoritesList.splice(index, 1);
          }
        })
        .catch((err) => {
          this.$toast.fail("删除失败，服务器开了会儿小差～");
        });
    },
    // 将该商品加入购物车
    onJoin(id) {
      joinCart(id)
        .then((res) => {
          let data = res.data;
          if (data.code === 1019) {
            this.$toast.success("添加成功!");
          }
        })
        .catch((err) => {
          this.$toast.fail("添加失败，服务器开了会小差～");
        });
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

.card {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: content-box;
  width: 100%;
  height: 50px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
}
</style>