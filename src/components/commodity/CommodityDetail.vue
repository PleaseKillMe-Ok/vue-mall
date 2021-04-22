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
        <van-icon name="cart-o" class="icon" @click="toCart"></van-icon>
        <van-icon name="share-o" class="icon" @click="share"></van-icon>
      </template>
    </van-nav-bar>

    <!-- 轮播图 -->
    <van-swipe class="swipe">
      <van-swipe-item v-for="(image, index) in swipeImage" :key="index">
        <img v-lazy="image" class="head-image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品基本信息 -->
    <div class="card">
      <van-row class="c-price"
        >¥{{ commodityInformation.price
        }}<span
          class="c-f-price"
          v-if="
            commodityInformation.price > commodityInformation.favourable_price
          "
          >¥{{ commodityInformation.favourable_price }}</span
        ></van-row
      >
      <van-row class="c-intro">
        {{ commodityInformation.intro }}
      </van-row>

      <van-row>
        <van-col span="8"></van-col>
        <van-col span="8"></van-col>
        <van-col span="8"></van-col>
      </van-row>
    </div>

    <!-- 基本操作-->
    <div class="card">
      <van-cell-group>
        <van-cell
          class="operation-cell"
          title="选择"
          label="选择商品属性"
          is-link
          @click="openChoice(commodityInformation.id)"
        >
          <template #title>
            <van-row>
              <van-col span="4"> 选择 </van-col>
              <van-col span="10"
                ><span class="bolder">{{ firstProp.name }}</span
                >类别等
              </van-col>
              <van-col span="8"
                >有<span class="bolder">{{
                  Object.keys(firstProp.sku_values).length
                }}</span
                >种可供选择</van-col
              >
            </van-row>
          </template>
        </van-cell>

        <van-cell class="operation-cell" is-link @click="goAddress">
          <template #title>
            <van-row>
              <van-col span="4"> 发货 </van-col>
              <van-col span="6">
                {{ store.province.split("/").join(" ") }}</van-col
              >
              <van-col span="8">
                快递: <span v-if="freight.is_free">免运费</span>
                <span v-else>有运费</span>
              </van-col>
            </van-row>
          </template>
          <template #label>
            配送至：
            {{ defaultAddress.province.split("/").join(" ") }}</template
          >
        </van-cell>

        <van-cell
          class="operation-cell"
          title="参数"
          label="查看商品参数"
          is-link
        >
          <template #title>
            参数
            {{ commodityInformation.spu ? commodityInformation.spu : "无" }}
          </template></van-cell
        >
      </van-cell-group>
    </div>

    <!-- 宝贝评价 -->
    <div class="card">
      <van-cell class="remark-title" is-link>
        <template #title> 商品评价({{ remarkCount || 0 }}) </template>
        <template #default>
          <span style="color: #c36e23; font-weight: 500">查看全部</span>
        </template>
      </van-cell>

      <ul>
        <li v-for="(item, index) in remarkList" :key="index">
          <van-row>
            <!-- 头像 -->
            <van-col span="3">
              <img v-lazy="item.head_image" class="head-image" />
            </van-col>
            <!-- 用户名 -->
            <van-col span="4" class="consumer">
              {{ item.consumer }}
            </van-col>
            <!-- 评论时间 -->
            <van-col span="18" class="reward-time">
              {{ item.reward_time }}
            </van-col>
          </van-row>

          <van-row>
            <van-col span="23" class="reward-content">
              {{ item.reward_content }}
            </van-col>
          </van-row>
        </li>
      </ul>
    </div>

    <!-- 店铺介绍 -->
    <div class="card">
      <van-row>
        <!-- 店铺logo -->
        <van-col span="4">
          <img v-lazy="store.logo" class="head-image" />
        </van-col>
        <!-- 店铺名+店铺等级-->
        <van-col span="12">
          <span class="store-name">{{ store.name }}</span>
          <span>{{ store.rank }}</span>
        </van-col>
        <!-- 店铺分数 -->
        <van-col span="7">
          <span class="score">商品描述:{{ store.description_score }}</span>
          <span class="score">卖家服务:{{ store.service_score }}</span>
          <span class="score">物流服务:{{ store.logistics_score }}</span>
        </van-col>
      </van-row>
      <van-row>
        <!-- 按钮 -->
        <van-button plain hairline type="danger" class="btn" round
          >进店逛逛</van-button
        >
      </van-row>
    </div>

    <!-- 商品详情 -->
    <div class="">
      <van-divider>商品详情</van-divider>
      <div v-for="(image, index) in commodityImages" :key="index">
        <img v-lazy="image" width="100%" height="auto" />
      </div>
    </div>

    <!-- 看了又看 -->
    <div class="card look-again"><van-divider>猜你喜欢</van-divider></div>

    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="star"
        text="收藏"
        @click="onCollect"
        v-if="collection.is_collected"
        color="red"
      />
      <van-goods-action-icon
        icon="star-o"
        text="收藏"
        @click="onCollect"
        v-else
      />
      <van-goods-action-icon icon="friends-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺" @click="toStore" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="joinCart"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="buy" />
    </van-goods-action>
    <!-- sku属性值选择动作面板 -->
    <van-action-sheet v-model="showSkuProps">
      <template #default>
        <SkuPropsSelector
          :propsValues="propsValues"
          :commodityInformation="commodityInformation"
          @closeSkuProps="showSkuProps = false"
        >
        </SkuPropsSelector>
      </template>
    </van-action-sheet>
  </div>
</template>

<script>
import { swipeImage, remarkDict, storeDict } from "@/demo/commodityDetailDemo";
import { addFavorites, deleteFavorites } from "@/api/favorites/";
import { getCommodityDetail } from "@/api/commodity";
import { getDefaultAddress } from "@/api/address";
const SkuPropsSelector = () =>
  import("@/components/commodity/SkuPropsSelector");

export default {
  name: "CommodityDetail",
  components: { SkuPropsSelector },
  data() {
    return {
      commodityInformation: {}, // 存储商品详细信息
      searchValue: "",
      swipeImage: [], // 轮播图
      remarkList: {}, // 评论列表按照时间取3个出来
      remarkCount: 0, // 评论个数
      storeDict: {}, // 店铺信息
      commodityImages: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ], // 商品详情大图
      showSkuProps: false, // 是否开启sku属性面板
      propsValues: [], // 商品sku键值对
      firstProp: {}, // 第一个类目信息，如果存在的话
      store: {}, // 店铺信息
      freight: {}, // 快递运费信息
      defaultAddress: {}, // 用户默认地址信息
      collection: {}, // 该商品是否被用户收藏
    };
  },
  created() {
    this.swipeImage = swipeImage;
    this.remarkList = remarkDict.data;
    this.remarkCount = remarkDict.count;
    this.storeDict = storeDict;
    this.getCommodityDetail();
    this.getDefaultAddress();
  },
  methods: {
    // 根据商品id获取数据
    getCommodityDetail() {
      let id = this.$route.query.id;
      getCommodityDetail(id)
        .then((res) => {
          this.commodityInformation = res.data;
          // 按照逗号分割大图字符串，生成图片列表
          this.commdodityImages = this.commodityInformation.big_image.split(
            ","
          );
          // 解析类目属性和值数组
          this.propsValues = this.commodityInformation.sku_props;
          // 解析第一个类目信息
          this.firstProp =
            this.propsValues.length > 0 ? this.propsValues[0] : {};
          this.store = this.commodityInformation.store;
          this.freight = this.commodityInformation.freight;
          this.collection = this.commodityInformation.collection;
        })
        .catch((err) => {
          this.$toast.fail("获取商品详情失败，服务器开了会小差～");
        });
    },

    // 获取当前登录的用户信息
    getDefaultAddress() {
      getDefaultAddress()
        .then((res) => {
          this.defaultAddress = res.data;
        })
        .catch((err) => {
          this.$toast.fail("获取用户地址失败，服务器开了会小差～");
        });
    },
    // 打开商品sku选择菜单
    openChoice(id) {
      this.showSkuProps = true;
    },

    // 进入收货地址选项
    goAddress() {
      this.$router.push({
        name: "Address",
        query: { previous: this.$route.path + "?id=" + this.$route.query.id },
      });
    },

    // 分享
    share() {
      console.log("分享");
    },

    // 去往购物车
    toCart() {
      this.$router.push({ name: "Cart" });
    },

    // 立即购买
    buy() {
      this.showSkuProps = true;
    },

    // 加入购物车
    joinCart() {
      this.showSkuProps = true;
    },

    // 加入收藏夹/从购物车移除
    onCollect() {
      // 商品尚未被收藏
      if (!this.collection.is_collected) {
        let data = { commodity_pk: this.$route.query.id };
        addFavorites(data)
          .then((res) => {
            let data = res.data;
            if (data.code === 1020) {
              this.$toast.success(data.msg);
              this.collection.pk = data.data; // 赋值收藏夹的记录id值
            } else {
              this.$toast.fail(data.detail);
            }
          })
          .catch((err) => {
            this.$toast.fail("添加失败，服务器开了会小差～");
          });
      } else {
        // 删除收藏夹记录
        deleteFavorites(this.collection.pk).then((res) => {
          let data = res.data;
          if (data.code === 1019) {
            this.$toast.success(data.msg);
            this.collection.pk = null;  // id置为空
          } else this.$toast.fail(data.detail);
        });
      }
      this.collection.is_collected = !this.collection.is_collected;
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

/* 价格 */
.c-price {
  text-align: left;
  margin-left: 10px;
  margin-top: 5px;
  color: red;
}

/* 优惠价格 */
.c-f-price {
  margin-left: 15px;
  font-size: 15px;
  vertical-align: center;
  text-decoration: line-through; /* 中间加一个杠 */
  color: grey;
  opacity: 0.9;
}

/* 商品简要介绍 */
.c-intro {
  margin-left: 15px;
  font-size: 18px;
  font-weight: bolder;
  text-align: left;
}

/* 商品相关操作单元格 */
.operation-cell {
  text-align: left;
}
/* 评论标题 */
.remark-title {
  text-align: left;
  font-weight: bolder;
  font-size: 18px;
  color: black !important;
}
/* 评论者名 */
.consumer {
  font-size: 16px;
}

/* 评论时间 */
.reward-time {
  font-size: 16px;
  color: grey;
  opacity: 0.8;
  text-align: left;
  margin: 2px 10px 10px 11px; /* 超过一行会被挤到下一行 */
}

/* 评论内容 */
.reward-content {
  text-align: left;
  font-size: 16px;
  margin: 10px 5px;
}

/* 头像/logo */
.head-image {
  margin-left: 4px;
  width: 100%;
  height: auto;
}

/* 店铺名字 */
.store-name {
  display: block;
  font-weight: bold;
  opacity: 0.8;
}

/* 店铺积分 */
.score {
  display: block;
  font-size: 14px;
}
.btn {
  height: 30px;
  margin: 10px 0px;
}

/* 看了又看 */
.look-again {
  margin-bottom: 50px;
}

/* 字体加重 */
.bolder {
  font-weight: bolder;
  font-size: 18px;
  color: red;
}
</style>