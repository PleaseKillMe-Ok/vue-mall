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
          <div class="personal">
            <span class="name">{{ defaultAddress.recipient }}</span>
            <span class="phone">{{ defaultAddress.phone }}</span>
          </div>
          <div class="address">
            {{
              defaultAddress.province.split("/").join(" ") +
              defaultAddress.region
            }}
          </div>
        </template>
      </van-cell>
    </div>

    <!-- 订单商品 -->
    <div class="card"></div>

    <!-- 提交订单 -->
    <van-submit-bar
      :price="3050"
      button-text="提交订单"
      tip-icon="info-o"
      @submit="onSubmitOrder"
    >
      <template #default
        ><span style="color: grey">共{{ totalCount }}件</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { getDefaultAddress } from "@/api/address";
export default {
  name: "OrderGeneration",
  data() {
    return {
      defaultAddress: {}, // 默认收货地址
      totalCount: 0, // 订单中总商品的数量
      commodityTrolleyList: [], // 订单中的在购物车中选中的商品tid列表
    };
  },
  created() {
    this.getDefaultAddress();
    this.getTidList();
  },
  methods: {
    // 获取当前用户的默认地址
    getDefaultAddress() {
      getDefaultAddress()
        .then((res) => {
          this.defaultAddress = res.data;
        })
        .catch((err) => {
          this.$toast.fail("获取收货地址失败，服务器开了会小差～");
        });
    },

    // 提取tid列表
    getTidList() {
      let token = sessionStorage.getItem("Bearer-Token");
      this.commodityTrolleyList = sessionStorage.getItem(token).split(",");
      sessionStorage.removeItem(token); // 注意及时删除
      this.totalCount = this.commodityTrolleyList.length;
    },

    // 根据商品id获取商品及其店铺具体信息
    getAimCommodity() {},

    // 提交订单
    onSubmitOrder() {
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

.personal {
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
</style>