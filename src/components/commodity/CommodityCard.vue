<template>
  <!-- 商品小卡片 -->
  <div id="CommodityCard">
    <!-- 根据奇偶左右排序 -->
    <div
      v-for="(item, index) in commoditys"
      :key="index"
      class="tiles-wrap"
      style="display: block; height: 100%"
    >
     <!-- 懒加载图片 -->
      <li class="half-left-card">
        <img
          width="100%"
          height="auto"
          v-lazy="item.little_image"
          @click="toDetail(item.id)"
        />
        <div class="info">
          <div class="intro">
            {{ item.intro }}
          </div>
          <p>
            <span class="price">¥{{ item.favourable_price }}</span>
            <span class="buy">{{ item.sell_counts }}已付款</span>
            <span type="small" v-if="item.isFreeFreight" class="hot">包邮</span>
          </p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { commodityCardDemo } from "@/demo/commoditycarddemo";
export default {
  name: "CommodityCard",
  components: { commodityCardDemo },
  data() {
    return {
      commoditys: [],
    };
  },
  created() {
    this.commoditys = commodityCardDemo;
  },
  methods: {
    // 根据id进入商品详情页
    toDetail(id) {
      this.$router.push({ name: "CommodityDetail", query: { id: id } });
    },
  },
};
</script>

<style scoped>
/* 商品流式布局 */
.tiles-wrap li {
  -moz-box-sizing: border-box;
  /* box-sizing: border-box; */
}
.tiles-wrap li {
  display: block;
  opacity: 1;
  text-align: center;
  list-style-type: none;
  background-color: #fff;
  float: left;
  cursor: pointer;
  width: 46%;
  padding: 2px;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 6px;
  height: auto;
}

.tiles-wrap {
  position: relative;
  margin: 10px 0;
  padding: 0;
  list-style-type: none;
  display: block;
  height: 100%;
}

/* 商品信息 */
.info {
  padding-bottom: 10px;
}
.intro {
  font-size: 17px;
  text-align: left;
  display: block;
  padding-left: 10px;
}
.price {
  color: red;
  font-size: 16px;
  float: left;
  padding-left: 10px;
  padding-top: 4px;
}
.buy {
  color: grey;
  opacity: 0.8;
  font-size: 15px;
}

/* 包邮标记 */
.hot {
  background: #fbe1e1;
  width: 40px;
  height: 15px;
  text-align: center;
  color: red;
  font-size: 12px !important;
  border-radius: 25%;
  border-width: 1px;
  border-style: solid;
  border-color: #f7b9b9;
}
</style>