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
    <van-cell>共{{ commodityCount }}件商品</van-cell>
    weqwe
    {{ selectedCommodityResult }}
    <!-- 购物车商品布局 -->
    <div
      class="card commoditys-style"
      v-for="(store, name, index) in storeDict"
      :key="index"
    >
      <van-row>
        <van-col span="2">
          <van-checkbox-group v-model="selectedStoreResult">
            <van-checkbox :name="name"></van-checkbox>
          </van-checkbox-group>
        </van-col>
        <van-col span="18">
          <div class="storeTitle">
            <van-tag type="danger">小云</van-tag>
            <span>{{ name }}</span>
          </div>
        </van-col>
        <van-col span="3">
          <span @click="getVoucher(name)" class="voucher">领卷</span>
        </van-col>
      </van-row>

      <!-- 单个购物车商品-->
      <div v-for="(commodity, index) in store" :key="index" :id="commodity.id">
        <van-row>
          <van-col span="2">
            <van-checkbox-group v-model="selectedCommodityResult">
              <van-checkbox :name="commodity.tid"></van-checkbox>
            </van-checkbox-group>
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
            <span class="intro">{{ commodity.intro }}</span>
            <div class="yeah">
              <span class="price-one-good">¥{{ commodity.totalPrice }}</span>

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
                  @plus="
                    onChangeCount(
                      commodity.tid,
                      commodity.sid,
                      commodity.count + 1,
                      name,
                      index
                    )
                  "
                  @minus="
                    onChangeCount(
                      commodity.tid,
                      commodity.sid,
                      commodity.count - 1,
                      name,
                      index
                    )
                  "
                  theme="round"
                />
              </span>
            </div>
          </van-col>
        </van-row>
        <br />
      </div>
    </div>

    <van-submit-bar
      :tip="tip"
      tip-icon="info-o"
      @submit="onSubmitOrder"
      class="bottom"
    >
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
import { storeNameDict, newStoreList } from "@/demo/cartdemo";
import { getCartInfo, modifySkuCount } from "@/api/cart";
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
      storeDict: {}, // 存储{店铺名:[商品详细信息]}
      storeNameDict: {}, // 存储{店铺名:[购物车中商品的tids]}
      storeTidDict: {}, // 存储{tid:店铺名}
      commodityCount: 0, // 购物车中商品个数
      selectedStoreResult: [], // 选中的店铺结果数组
      selectedCommodityResult: [], // 选中的商品结果Map
    };
  },
  created() {
    this.getCartInfo();
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

    // 监听选中的店铺名数组
    /**
     * 当用户选中/取消了某个店铺复选框，则将其所下属的所有商品加入/撤离选中商品结果字典
     * newValue/oldValue为一个Object，数组对象
     */
    selectedStoreResult(newValue, oldValue) {
      // 通过状态前后数组长度判断是选中还是取消
      console.log(newValue.length, oldValue.length);
      if (newValue.length > oldValue.length) {
        // 选中
        for (let index in this.storeDict[newValue[newValue.length - 1]]) {
          this.selectedCommodityResult.push(
            this.storeDict[newValue[0]][index].tid
          ); // 向selectedCommodityResult中添加tid
        }
      } else if (newValue.length === oldValue.length) {
        // 此处由于该店铺下所有商品都被选中，回调该监听器
      } else {
        // 取消
        if (newValue.length === 0) {
          // 直接清空数组，防止出现越界异常
          this.selectedCommodityResult = [];
        } else {
          // 删除指定的商品
          for (let index in this.storeDict[oldValue[oldValue.length - 1]]) {
            // 依次删除出现在该店铺下的商品
            let i = this.selectedCommodityResult.indexOf(
              this.storeDict[newValue[0]][index].tid
            );
            this.selectedCommodityResult.splice(i, 1);
          }
        }
      }
    },

    // 监听选中的商品数组
    /**
     * 当
     */
    selectedCommodityResult(newValue, oldValue) {
      if (newValue.length > oldValue.length) {
        let storeName = this.storeTidDict[newValue[newValue.length - 1]];
        let tempCount = 0;
        let aimCount = this.storeNameDict[storeName].length;
        for (let index in this.storeNameDict[storeName]) {
          if (
            this.selectedCommodityResult.includes(
              this.storeNameDict[storeName][index]
            )
          )
            tempCount += 1;
        }
        console.log(tempCount, aimCount);
        if (tempCount == aimCount) {
          this.selectedStoreResult.push(storeName);
        }
      } else if (newValue.length === oldValue.length) {
        //
      } else {
        let storeName = this.selectedStoreResult[oldValue[oldValue.length - 1]];
        let i = this.selectedStoreResult.indexOf(storeName);
        this.selectedStoreResult.splice(i, 1);
      }
    },

    // 监听选中的商品结果集合
  },
  methods: {
    // 获取购物车中的数据
    getCartInfo() {
      getCartInfo()
        .then((res) => {
          this.commodityList = res.data;
          this.commodityCount = this.commodityList.length;
          this.parseData();
        })
        .catch((err) => {
          this.$toast.fail("获取购物车信息失败，服务器开了会小差～");
        });
    },

    // 解析数据为字典， {storeName1:[commodity1, commodity2], storeName2:[]...}
    parseData() {
      for (let index in this.commodityList) {
        let item = this.commodityList[index];
        let store = item.commodity_info.store;
        let commodity = item.commodity_info;
        if (this.storeDict[store.name] == null) {
          // 如果storeDict中不存在该店铺键名
          this.$set(this.storeDict, store.name, new Array());
          this.$set(this.storeNameDict, store.name, new Array());
        }
        let favourable_price =
          item.sksku_infou == null
            ? commodity.favourable_price
            : item.sku_info.favourable_price;
        let count = item.count;
        // 将单个商品详细信息加入this.storeDict
        this.storeDict[store.name].push({
          tid: item.pk,
          cid: commodity.id,
          sid: item.sku,
          commodityName: commodity.commodity_name,
          price: item.sku_info == null ? commodity.price : item.sku_info.price,
          favourable_price: favourable_price,
          intro: commodity.intro,
          status: commodity.status,
          skuName: item.sku_info == null ? "" : item.sku_info.name,
          littleImage: commodity.little_image,
          openCount: false,
          count: count,
          totalPrice: favourable_price * count,
        });

        this.storeNameDict[store.name].push(item.pk); // {storName:[tid1,tid2,tid...]}

        this.storeTidDict[item.pk] = store.name; // {tid1:storeName1, tid2:storeName2, tid3:storeName2}
      }
    },

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
    onChangeCount(tid, sid, count, storeName, index) {
      let data = {
        tid: tid, // 购物车指定记录的id
        sid: sid, // 购物车指定商品的sku的id
        count: count, // 购物车指定商品的变化后的数量
      };
      // 发送修改购买的商品sku的数量
      modifySkuCount(data)
        .then((res) => {
          let data = res.data;
          if (data.code == 1069) {
            // 更新对应单个商品总价格
            this.storeDict[storeName][index].totalPrice = data.new_price;
            this.storeDict[storeName][index].count = count;
          }
        })
        .catch((err) => {
          this.$toast.fail("商品数量修改失败，服务器开了会小差～");
        });
    },

    // 由固定改变成布长器
    transStatus(storeName, index) {
      this.storeDict[storeName][index].openCount = true;
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

/* 所有商品整体布局 */
.commoditys-style {
  margin-bottom: 100px;
}
</style>