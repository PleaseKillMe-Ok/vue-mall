<template>
  <div id="OrderGeneration">
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <!-- 收货地址 -->
    <div class="card">
      <van-cell
        center
        is-link
        :to="{ name: 'Address', query: { previous: $route.path } }"
      >
        <template #icon><van-icon name="location-o" class="icon" /> </template>
        <template #default>
          <div class="block">
            <span class="name">{{ defaultAddress.recipient }}</span>
            <span class="phone">{{ defaultAddress.phone }}</span>
          </div>
          <div class="address">
            {{ address }}
          </div>
        </template>
      </van-cell>
    </div>

    <!-- 订单商品 -->
    <div
      class="card"
      v-for="(item, key, indexDict) in storeDict"
      :key="indexDict"
    >
      <!-- {{ orderCommodityList }} -->
      <van-row>
        <van-col span="4"><van-tag type="danger">小云</van-tag></van-col>
        <van-col span="18" class="store-name">{{ key }}</van-col>
      </van-row>

      <div v-for="(sku, index) in item" :key="index">
        <van-row>
          <van-col span="8"
            ><van-image
              width="110"
              height="110"
              radius="10"
              class="img"
              src="https://django-e-mall.oss-cn-shanghai.aliyuncs.com/u%3D3324287611%2C3832720410%26fm%3D26%26gp%3D0.jpg"
            />
          </van-col>
          <van-col span="12">
            <span class="intro block">{{ sku.intro }}</span>
            <span class="sku block">{{ sku.skuName }}</span>
            <span class="sku block">{{ sku.properties }}</span>
          </van-col>
          <van-col span="4">
            <span class="price block">{{ sku.favourablePrice }}</span>
            <span class="count block">{{ sku.count }}</span>
          </van-col>
        </van-row>

        <!-- 额外信息 -->
        <div class="extra sku-commodity">
          <van-row>
            <van-col span="8">
              <span class="delivery-1 block">配送方式：</span>
            </van-col>
            <van-col span="8">
              <span class="delivery-2 block">普通配送</span>
            </van-col>
            <van-col span="8">
              <span class="delivery-3 block"
                >快递 &nbsp;&nbsp;{{ sku.is_free ? "免邮" : "不包邮" }}</span
              >
            </van-col>
          </van-row>
        </div>
      </div>
    </div>

    <!-- 提交订单 -->
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      tip-icon="info-o"
      @submit="onSubmitOrder"
    >
      <template #default
        ><span style="color: grey">共{{ totalCount }}件</span>
      </template></van-submit-bar
    >
  </div>
</template>

<script>
import { getDefaultAddress } from "@/api/address";
import { getSeveralCommodityDetail } from "@/api/order";
export default {
  name: "OrderGeneration",
  data() {
    return {
      defaultAddress: {}, // 默认收货地址
      totalCount: 0, // 订单中总商品的数量
      commodityTrolleyList: [], // 订单中的在购物车中选中的商品tid列表
      address: "", // 收货地址
      orderCommodityList: [], // 订单中sku的详细信息
      storeDict: {}, // 店铺和sku映射表 {store_name:[commodity1, commodity2]}
      totalPrice: 0, // 订单中商品总价格
    };
  },
  created() {
    this.getDefaultAddress();
    this.getTidList();
    this.getAimCommodity();
  },
  methods: {
    // 获取当前用户的默认地址
    getDefaultAddress() {
      getDefaultAddress()
        .then((res) => {
          this.defaultAddress = res.data;
          this.address =
            this.defaultAddress.province.split("/").join(" ") +
            this.defaultAddress.region;
        })
        .catch((err) => {
          this.$toast.fail("获取收货地址失败，服务器开了会小差～");
        });
    },

    // 提取tid列表
    getTidList() {
      let token = sessionStorage.getItem("Bearer-Token");
      this.commodityTrolleyList = sessionStorage.getItem(token).split(",");
      // sessionStorage.removeItem(token); // 注意及时删除
      this.totalCount = this.commodityTrolleyList.length;
    },

    // 根据商品id获取商品及其店铺具体信息
    getAimCommodity() {
      let load = this.$toast.loading({
        message: "加载中",
        forbidClick: true,
      });
      let data = {
        pk_list: this.commodityTrolleyList,
      };
      getSeveralCommodityDetail(data)
        .then((res) => {
          let data = res.data;
          this.orderCommodityList = data;
          this.parseData();
          load.clear();
        })
        .catch((err) => {
          this.$toast.fail("获取订单商品失败");
          load.clear();
        });
    },

    parseData() {
      // 解析请求获取到的订单内SKU信息
      for (let index in this.orderCommodityList) {
        let item = this.orderCommodityList[index];
        let store_name = item.store_name;
        let commodity_name = item.commodity_name;
        let sku = item.sku; // sku项
        if (this.storeDict[store_name] == null) {
          // 如果storeDict中不存在该店铺键名
          this.$set(this.storeDict, store_name, new Array());
        }
        let singleTotalPrice = sku.favourable_price * item.count;
        let strProperties = "";
        for (let key in sku.properties) {
          strProperties += key + ":" + sku.properties[key] + ";";
        }
        // 将单个商品详细信息加入this.storeDict
        this.storeDict[store_name].push({
          tid: item.pk,
          cid: item.cid,
          sid: sku.pk,
          commodityName: commodity_name,
          favourablePrice: sku.favourable_price,
          intro: item.intro,
          skuName: sku.name,
          skuImage: sku.image,
          count: item.count,
          totalPrice: sku.favourable_price * item.count,
          properties: strProperties,
          is_free: item.is_free,
        });

        this.totalPrice += singleTotalPrice;
      }

      this.totalPrice *= 100; // 适配vant框架，需要乘100
    },

    // 提交订单
    onSubmitOrder() {
      let load = this.$toast.loading({
        message: "提交中...",
        forbidClick: true,
      });
      console.log("提交订单");
    },

    // 返回购物车界面
    onBack() {
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>

<style scoped>
.icon {
  font-size: 30px;
  color: white;
  background-color: orange;
  border-radius: 50%;
}

.block {
  display: block;
}

.name {
  font-size: 18px;
  margin-left: 20px;
}

.phone {
  color: grey;
  opacity: 0.9;
}

.address {
  margin-left: 20px;
}

.store-name {
  text-align: left;
  font-size: 18px;
}

.img {
  margin-top: 10px;
}

.intro {
  font-size: 16px;
  margin-top: 10px;
  text-align: left;
}

.sku {
  color: grey;
  font-size: 16px;
  text-align: left;
  margin-top: 5px;
}

.price {
  color: grey;
  margin-top: 12px;
  font-size: 16px;
}
.price::before {
  content: "¥";
}
.count {
  color: grey;
  font-size: 15px;
  margin-top: 5px;
}
.count::before {
  content: "×";
}

/* 配送方式 */
.delivery-1 {
  font-size: 17px;
  margin-top: 20px;
  text-align: right;
}

.delivery-2 {
  font-size: 17px;
  text-align: left;
  margin-top: 20px;
  color: grey;
}

.delivery-3 {
  font-size: 17px;
  text-align: right;
  margin-top: 20px;
}
/* 额外信息 */
.extra {
  margin-bottom: 20px;
}

.sku-commodity {
  margin-bottom: 50px;
}
</style>