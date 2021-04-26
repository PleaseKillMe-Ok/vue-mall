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
    };
  },
  created() {
    this.getExtraCount();
  },
  methods: {
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
        })
        .catch((res) => {
          this.$toast.fail("获取用户额外信息失败，服务器开了会小差～");
        });
    },
  },
};
</script>

<style scoped>
.data {
  font-size: 0.7rem;
}
</style>