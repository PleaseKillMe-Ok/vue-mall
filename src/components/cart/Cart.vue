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
      <van-row>
        <van-col span="2">
          <van-checkbox></van-checkbox>
        </van-col>
        <van-col span="18">
          <div class="storeTitle">
            <van-tag type="danger">小云</van-tag>
            <span>{{ key }}</span>
          </div>
        </van-col>
        <van-col span="3">
          <span @click="getVoucher(key)" class="voucher">领卷</span>
        </van-col>
      </van-row>

      <!-- 单个购物车商品-->
      <div></div>
      <div v-for="(commodity, index) in store" :key="index">
        <van-row>
          <van-col span="2">
            <van-checkbox></van-checkbox>
          </van-col>
          <van-col span="8">
            <img
              width="90%"
              height="auto"
              v-lazy="commodity.little_image"
              class="img"
              @click="toDetail(item.id)"
            />
          </van-col>
          <van-col span="13">
            <span class="intro">{{ commodity["intro"] }}</span>
            <div class="yeah">
              <span class="price-one-good">¥{{ commodity["price"] }}</span>

              <!-- <span
              v-if="!commodity.openCount"
              class="counts"
              @click="transStatus(key, index)"
              >x{{ commodity["count"] }}</span
            >
            <span v-else>
              <van-stepper
                class="counts-modify"
                :value="commodity.count"
                async-change
                @change="onChangeCount"
              /> -->
              <span>
                <van-stepper
                  class="counts-modify"
                  :value="commodity.count"
                  async-change
                  @change="onChangeCount"
                />
              </span>
            </div>
          </van-col>
        </van-row>
        <br />
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

    // 领取优惠卷
    getVoucher(name) {
      console.log("领取优惠卷", name);
    },

    // 动态改变购物车某商品的数量
    onChangeCount(id) {
      console.log("改变商品", id);
    },

    // 由固定改变成布长器
    transStatus(storeName, index) {
      this.storeList[storeName][index].openCount = true;
    },
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

.van-cell__title {
  text-align: left;
}

/* 店铺 */
.storeTitle {
  vertical-align: middle;
  text-align: left;
  margin-bottom: 25px;
  font-size: 18px;
}
/* 标签 */
.van-tag {
  vertical-align: middle;
  bottom: 5px;
}
/* 商品小图片 */
.img {
  border-radius: 10%;
}
/* 商品信息 */
.intro {
  font-size: 16px;
  font-weight: bolder;
  text-align: left;
  float: left;
  padding-left: 10px;
}
.voucher {
  font-size: 18px;
}
/* 单个商品价格的布局 */
.price-one-good {
  font-size: 24px;
  float: left;
  padding-left: 10px;
  color: red;
}

.yeah {
  margin-top: 100px;
}

/* 商品数量 */
.counts {
  background: #fbe1e1;
  float: right;
  color: red;
  border-color: #fbe1e1;
  border-width: 1px;
  border-style: solid;
  border-radius: 25%;
  text-align: center;
  vertical-align: middle;
  width: 25px;
  height: 25px;
  opacity: 0.7;
}
/* 布长器 */
.counts-modify {
  margin-left: 120px;
}
</style>