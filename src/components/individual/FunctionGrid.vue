<template>
  <div id="FunctionGrdi">
    <van-grid>
      <van-grid-item
        v-for="(item, index) in functionList"
        :key="index"
        :border="displayIcon"
        :to="item.url"
        :url="item.url"
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
          url: "/",
          value: 2,
        },
        {
          name: "收藏夹",
          url: "",
          value: 5,
        },
        {
          name: " 红包卡卷",
          url: "",
          value: 4,
        },
        {
          name: "收货地址",
          url: "",
          value: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
.data {
  font-size: 0.7rem;
}
</style>