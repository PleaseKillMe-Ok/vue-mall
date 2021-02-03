<template>
  <!-- 功能宫格栏 -->
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
export default {
  name: "FunctionGrid",
  data() {
    return {
      displayIcon: false,
      functionList: [
        {
          name: "足迹",
          to: "/",
          value: 2,
        },
        {
          name: "收藏夹",
          to: "",
          value: 5,
        },
        {
          name: " 红包卡卷",
          to: "",
          value: 4,
        },
        {
          name: "收货地址",
          to: "Address",
          value: 0,
        },
      ],
    };
  },
  methods: {
    toItemPage(routeName) {
      this.$router.push({ name: routeName, query: { previous: "Individual" } });
    },
  },
};
</script>

<style scoped>
.data {
  font-size: 0.7rem;
}
</style>