<template>
  <div id="OrderTab">
    <van-nav-bar
      title="订单"
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />

    <!-- 标签页 -->
    <van-tabs v-model="active" @click="choiceStatus">
      <!-- 具体订单数据  -->
      <van-tab
        v-for="(code, status, index) in orderStatus"
        :key="index"
        :title="status"
      >
        <div
          class="card"
          v-for="(order, keyOrder, index) in orderStoreCommodityMap"
          :key="index"
        >
          <div v-for="(store, keyStore, j) in order" :key="j">
            <van-row>
              <van-col span="3"> <van-tag type="danger">小云</van-tag></van-col>
              <van-col span="10" class="store-name">{{ keyStore }}</van-col>
              <van-col span="9" class="status">{{
                keyOrder.split("-")[1]
              }}</van-col>
            </van-row>
            <div v-for="(sku, m) in store" :key="m">
              <van-row>
                <van-col span="7">
                  <van-image
                    width="100"
                    height="100"
                    radius="10"
                    class="img"
                    src="https://django-e-mall.oss-cn-shanghai.aliyuncs.com/u%3D3324287611%2C3832720410%26fm%3D26%26gp%3D0.jpg"
                  />
                </van-col>
                <van-col span="12">
                  <span class="intro block">{{ sku.intro }}</span>
                  <span class="sku block">{{ sku.skuName }}</span>
                  <span class="sku block">{{ sku.properties }}</span>
                  <van-tag plain color="red" class="tag block"
                    >七天无理由退换</van-tag
                  >
                </van-col>
                <van-col span="4">
                  <span class="price block">{{ sku.favourablePrice }}</span>
                  <span class="count block">{{ sku.counts }}</span>
                </van-col>
              </van-row>

              <!-- 订单操作 -->
              <span class="syznb">
                <span style="color: grey; font-size: 16px"
                  >总价&nbsp;¥{{ sku.favourablePrice * sku.counts }}</span
                >
                <span style="font-weight: bolder; font-size: 16px"
                  >需付款&nbsp;</span
                ><span>¥{{ sku.favourablePrice * sku.counts }}</span>
              </span>
              <span class="syznb">
                <van-button
                  round
                  plain
                  size="normal"
                  class="btn"
                  @click="cancelOrder"
                  >取消订单</van-button
                >
                <van-button
                  round
                  plain
                  size="normal"
                  type="danger"
                  class="btn"
                  @click="payOrder"
                  >付款</van-button
                >
              </span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { displayOrder } from "@/api/order";
export default {
  name: "OrderTab",
  data() {
    return {
      active: 0,
      orderStatus: {
        全部: "0",
        待付款: "1",
        待发货: "2",
        待收货: "3",
        交易成功: "4",
        已取消: "5",
        售后中: "6",
        正在退货: "7",
      },
      orderList: [], // 订单列表
      orderStoreCommodityMap: {}, // 存储一个订单中的店铺与商品sku的映射，{order_id:{store_name1:[{commodity_name:'衬衫男'...},{store_name2}]}}
    };
  },
  created() {
    this.choiceStatus("0", "全部");
  },
  methods: {
    // 根据不同状态显示不同订单信息
    choiceStatus(name, title) {
      displayOrder(name)
        .then((res) => {
          this.orderList = res.data;
          this.parseData(this.orderList);
        })
        .catch((err) => {
          this.$toast.fail("获取订单数据失败，服务器开了会小差～");
        });
    },

    // 解析数据-->以订单号为大类分类，然后在大类中按照店铺进行分类
    parseData() {
      for (let index in this.orderList) {
        let orderItem = this.orderList[index];
        let orderDetails = orderItem.order_details;
        let key = orderItem.order_id + "-" + orderItem.status; // orderid+status组合程键
        this.$set(this.orderStoreCommodityMap, key, {}); // 响应式构建订单号map
        for (let j in orderDetails) {
          let commodity = orderDetails[j].commodity;
          let sku = orderDetails[j].sku;
          if (this.orderStoreCommodityMap[key][commodity.store_name] == null) {
            // 响应式构建店铺子map
            this.$set(
              this.orderStoreCommodityMap[key],
              commodity.store_name,
              new Array()
            );
          }
          // 构造skuprop
          let strProperties = "";
          for (let key in sku.properties) {
            strProperties += key + ":" + sku.properties[key] + ";";
          }
          // 向数组中写入sku相关数据
          this.orderStoreCommodityMap[key][commodity.store_name].push({
            commodityName: commodity.commodity_name, // 商品名
            intro: commodity.intro, // 商品简介
            sid: sku.sid, // sku的sid
            favourablePrice: sku.favourable_price, // sku的优惠价格
            properties: strProperties, // sku的字符串属性及值
            image: sku.image, // sku图片
            skuName: sku.name, // sku名称
            counts: orderDetails[j].counts, // 购买的sku数量
          });
        }
      }
    },

    // 取消订单
    cancelOrder() {
      this.$dialog
        .confirm({
          title: "取消订单",
          message: "取消订单后，该订单下的其他商品也将被取消，请确认是否继续？",
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    payOrder() {},

    // 返回上一页
    onBack() {
      this.$router.push({ path: this.$route.query.previous });
    },
  },
};
</script>

<style scoped>
/* 店铺名 */
.store-name {
  text-align: left;
  font-size: 17px;
}

/* 订单状态 */
.status {
  text-align: right;
  font-size: 16px;
  color: #ef6511;
}

.block {
  display: block;
}

/* sku图片 */
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

.tag {
  margin-top: 10px;
  width: 50%;
  background-color: #f7f1de;
}

.btn {
  text-align: right;
  height: 35px;
}

.syznb {
  display: block;
  margin-top: 15px;
  margin-bottom: 20px;
  text-align: right;
}
</style>