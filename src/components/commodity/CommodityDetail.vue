<template>
  <!-- 商品详情页 -->
  <div id="CommodityDetail"></div>
</template>

<script>
export default {
  name: "CommodityDetail",
  data() {
    return {
      commodityInformation,
    };
  },
  created() {},
  methods: {
    // 根据商品id获取数据
    getCommodityDetail() {
      let id = this.$route.query.id;
      getCommodityDetail(id)
        .then((res) => {
          this.commodityInformation = res.data;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
</style>