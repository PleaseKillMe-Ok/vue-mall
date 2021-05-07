<template>
  <!-- 功能宫格栏（足迹，收藏，购物车，收货地址等) -->
  <div id="FunctionGrdi">
    <van-grid>
      <van-grid-item
        v-for="(item, index) in functionList"
        :key="index"
        :border="displayIcon"
        @click="toItemPage(item.to)"
      >
        <template #default>
          <div class="data">
            <p>{{ item.value }}</p>
            <p>{{ item.name }}</p>
          </div>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="card">
      <span class="label">我的订单</span>
      <span class="detail" @click="toOrder">查看全部订单&gt;</span>
      <van-divider class="hr" />

      <van-grid :column-num="columnNumber" :border="displayBorder">
        <van-grid-item
          v-for="(item, index) in orderfunctionList"
          :key="index"
          :to="item.url"
        >
          <!-- 徽章 -->
          <van-badge :content="item.value">
            <!-- 自定义宫格内容 -->
            <template #default>
              <div class="data">
                <van-icon :name="item.icon" class="icon" />
                <p>{{ item.name }}</p>
              </div>
            </template>
          </van-badge>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getExtraCount } from "@/api/user";
export default {
  name: "FunctionGrid",
  data() {
    return {
      displayIcon: false,
      functionList: [
        {
          name: "购物车",
          to: "Cart",
          value: 0,
        },
        {
          name: "收藏夹",
          to: "Favorites",
          value: 0,
        },
        {
          name: " 收货地址",
          to: "Address",
          value: 0,
        },
        {
          name: "足迹",
          to: "Foot",
          value: 0,
        },
      ],
      extraInfomation: {}, // 额外的信息
      displayBorder: false, // 是否显示边框
      columnNumber: 5, // 列数
      orderfunctionList: [
        {
          name: "待付款",
          status: "1",
          url: "/",
          value: 0,
          icon: "pending-payment",
        },
        {
          name: "待发货",
          status: "2",
          url: "",
          value: 0,
          icon: "paid",
        },
        {
          name: " 待收货",
          status: "3",
          url: "",
          value: 0,
          icon: "logistics",
        },
        {
          name: "评价",
          status: "4",
          url: "",
          value: 0,
          icon: "comment-o",
        },
        {
          name: "退款/售后",
          status: "6",
          url: "",
          value: 0,
          icon: "after-sale",
        },
      ],
      orderDict: {}, // 订单状态和数量的映射
    };
  },
  created() {
    this.getExtraCount();
  },
  methods: {
    // 去往订单标签页面
    toOrder() {
      this.$router.push({
        name: "Order",
        query: { previous: this.$route.path },
      });
    },
    // 去往宫格栏界面
    toItemPage(routeName) {
      this.$router.push({
        name: routeName,
        query: { previous: this.$route.path },
      });
    },
    // 获取用户足迹/收藏夹/红包卡卷/收货地址的记录个数
    getExtraCount() {
      getExtraCount()
        .then((res) => {
          this.extraInfomation = res.data;
          // 赋值
          this.functionList[0].value = this.extraInfomation.trolley_count;
          this.functionList[1].value = this.extraInfomation.collection_count;
          this.functionList[2].value = this.extraInfomation.address_count;
          this.functionList[3].value = this.extraInfomation.foot_count;
          this.orderDict = this.extraInfomation.order_dict;
          this.parseOrderDict();
        })
        .catch((res) => {
          this.$toast.fail("获取用户额外信息失败，服务器开了会小差～");
        });
    },

    // 解析{订单状态:数量}数据
    parseOrderDict() {
      for (let index in this.orderfunctionList) {
        let item = this.orderfunctionList[index];
        // 存在该status下的订单
        if (this.orderDict[item.status] != null) {
          this.orderfunctionList[index].value = this.orderDict[item.status];
        }
      }
    },
  },
};
</script>

<style scoped>
.data {
  font-size: 0.7rem;
}
.label {
  float: left;
  margin-left: 5px;
  font-size: 18px;
}
.detail {
  float: right;
  font-size: 0.7rem;
  color: gray;
}
.hr {
  margin-top: 2rem;
}

.data {
  font-size: 0.65rem;
}

.icon {
  font-size: 25px;
}
</style>