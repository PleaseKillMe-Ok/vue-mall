<template>
  <div id="OrderLine">
    <div class="card">
      <span class="label">我的订单</span>
      <span class="detail">查看全部订单&gt;</span>
      <van-divider class="hr" />

      <van-grid :column-num="columnNumber" :border="displayBorder">
        <van-grid-item
          v-for="(item, index) in functionList"
          :key="index"
          :to="item.url"
        >
          <!-- 徽章 -->
          <van-badge :content="item.value">
            <!-- 自定义宫格内容 -->
            <template #default>
              <div class="data">
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
export default {
  name: "OrderLine",
  data() {
    return {
      displayBorder: false, // 是否显示边框
      columnNumber: 5, // 列数
      functionList: [
        {
          name: "待付款",
          url: "/",
          value: 2,
        },
        {
          name: "待发货",
          url: "",
          value: 5,
        },
        {
          name: " 待收货",
          url: "",
          value: 4,
        },
        {
          name: "评价",
          url: "",
          value: 0,
        },
        {
          name: "退款/售后",
          url: "",
          value: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
.label {
  float: left;
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
</style>